import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import type { UserTrainingProfile, Program, ExperienceLevel } from '../../types';
import { OnboardingChat } from './OnboardingChat';
import { ProfileSummaryCard } from './ProfileSummaryCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { setUser, resetProgramCursors } from '../../utils/localStorage';
import { apiBase } from '../../lib/api';
import { useApp } from '../../store/AppContext';
import { supabase } from '../../lib/supabase';
import { upsertTrainingProfile, saveAiGeneratedProgram } from '../../lib/db';

// Step 0: Account, Step 1: Name, Step 2: AI Chat, Step 3: Profile summary + generate
const STEPS = ['Account', 'Name', 'Discover', 'Your Plan'];

export function OnboardingForm() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [profile, setProfile] = useState<UserTrainingProfile | null>(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function nextFromAccount() {
    setEmailError('');
    setPasswordError('');
    if (!email.trim()) { setEmailError('Please enter your email'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Please enter a valid email'); return; }
    if (password.length < 6) { setPasswordError('Password must be at least 6 characters'); return; }
    setStep(1);
  }

  function nextFromName() {
    if (!name.trim()) { setNameError('Please enter your name'); return; }
    setNameError('');
    setStep(2);
  }

  function handleProfileComplete(aiProfile: UserTrainingProfile) {
    setProfile(aiProfile);
    setStep(3);
  }

  async function handleProgramReady(program: Program) {
    if (!profile) return;
    setSubmitError('');
    setLoading(true);

    try {
      // 1. Create Supabase account
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setSubmitError(signUpError.message);
        setStep(0);
        return;
      }
      if (!data.user) {
        setSubmitError('Account creation failed. Please try again.');
        return;
      }

      const userId = data.user.id;

      // 2. Server-side profile setup (handles email confirmation enabled)
      // Map the AI profile goal to a single Goal for the legacy User interface
      const primaryGoal = (profile.goals[0] ?? 'general-fitness') as 'hypertrophy' | 'fat-loss' | 'general-fitness';
      const experienceLevel: ExperienceLevel = profile.trainingAgeYears === 0
        ? 'beginner'
        : profile.trainingAgeYears <= 2
          ? 'intermediate'
          : 'advanced';

      // Save AI-generated program — get the assigned ID back
      const programId = await saveAiGeneratedProgram(userId, program);

      const profileRes = await fetch(`${apiBase}/api/setup-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          name: name.trim(),
          goal: primaryGoal,
          experienceLevel,
          activeProgramId: programId,
        }),
      });

      if (!profileRes.ok) {
        const body = await profileRes.json().catch(() => ({})) as { error?: string };
        await supabase.auth.signOut();
        setSubmitError(body.error ?? 'Profile setup failed. Please try again.');
        return;
      }

      // Email confirmation is ON — session is null
      if (!data.session) {
        setSubmitError('✉️ Check your email and click the confirmation link, then sign in.');
        setStep(0);
        return;
      }

      // 3. Save AI training profile to Supabase (best-effort)
      await upsertTrainingProfile(userId, profile).catch(() => {
        // Non-fatal — training_profiles table may not exist yet in development
      });

      // 4. Update client state
      const user = {
        id: userId,
        name: name.trim(),
        goal: primaryGoal,
        experienceLevel,
        activeProgramId: programId,
        onboardedAt: new Date().toISOString(),
        theme: 'dark' as const,
      };

      setUser(user);
      resetProgramCursors(programId);
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_THEME', payload: 'dark' });
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 px-6 py-8">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={[
              'h-2 rounded-full transition-all duration-300',
              i === step ? 'w-6 bg-brand-500' : i < step ? 'w-2 bg-brand-400' : 'w-2 bg-slate-700',
            ].join(' ')}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Step 0 — Account */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Create account</h1>
              <p className="mt-2 text-slate-400">Sign up to sync your data across all devices.</p>
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              autoFocus
              autoComplete="email"
              onKeyDown={(e) => e.key === 'Enter' && nextFromAccount()}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                autoComplete="new-password"
                onKeyDown={(e) => e.key === 'Enter' && nextFromAccount()}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 bottom-3 text-slate-400 hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-brand-400 hover:text-brand-300 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        )}

        {/* Step 1 — Name */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">What's your name?</h1>
              <p className="mt-2 text-slate-400">This is how Omnexus will greet you.</p>
            </div>
            <Input
              label="Your name"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && nextFromName()}
              className="text-lg py-3"
            />
          </div>
        )}

        {/* Step 2 — AI Chat */}
        {step === 2 && (
          <OnboardingChat userName={name} onComplete={handleProfileComplete} />
        )}

        {/* Step 3 — Profile summary + generate program */}
        {step === 3 && profile && (
          <>
            <ProfileSummaryCard
              profile={profile}
              onProgramReady={handleProgramReady}
            />
            {submitError && (
              <p className="mt-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}
            {loading && (
              <p className="mt-3 text-sm text-slate-400 text-center">Creating your account…</p>
            )}
          </>
        )}
      </div>

      {/* Navigation — only shown on steps 0 and 1 */}
      {step < 2 && (
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="ghost" onClick={back} className="text-slate-300">
              <ArrowLeft size={18} />
              Back
            </Button>
          )}
          <Button
            onClick={step === 0 ? nextFromAccount : nextFromName}
            fullWidth
            size="lg"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
