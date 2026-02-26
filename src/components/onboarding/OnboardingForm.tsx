import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';
import type { Goal, ExperienceLevel } from '../../types';
import { GoalCard } from './GoalCard';
import { ExperienceSelector } from './ExperienceSelector';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { setUser, resetProgramCursors } from '../../utils/localStorage';
import { programs } from '../../data/programs';
import { recommendProgram } from '../../utils/programUtils';
import { useApp } from '../../store/AppContext';
import { supabase } from '../../lib/supabase';

const STEPS = ['Account', 'Name', 'Goal', 'Experience', 'Confirm'];

export function OnboardingForm() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState<Goal>('hypertrophy');
  const [level, setLevel] = useState<ExperienceLevel>('beginner');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const recommended = recommendProgram(goal, level, programs);

  function next() {
    if (step === 0) {
      setEmailError('');
      setPasswordError('');
      if (!email.trim()) {
        setEmailError('Please enter your email');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError('Please enter a valid email');
        return;
      }
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      }
    }
    if (step === 1) {
      if (!name.trim()) {
        setNameError('Please enter your name');
        return;
      }
      setNameError('');
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function finish() {
    if (!recommended) return;
    setSubmitError('');
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

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

      // Use server-side endpoint so the profile insert works even when Supabase
      // email confirmation is enabled (no client session available yet).
      const profileRes = await fetch('/api/setup-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          name: name.trim(),
          goal,
          experienceLevel: level,
          activeProgramId: recommended.id,
        }),
      });

      if (!profileRes.ok) {
        const body = await profileRes.json().catch(() => ({}));
        await supabase.auth.signOut();
        setSubmitError(body.error ?? 'Profile setup failed. Please try again.');
        return;
      }

      // Email confirmation is ON — session is null; ask user to confirm then sign in.
      if (!data.session) {
        setSubmitError(
          '✉️ Check your email and click the confirmation link, then sign in.',
        );
        setStep(0);
        return;
      }

      const user = {
        id: userId,
        name: name.trim(),
        goal,
        experienceLevel: level,
        activeProgramId: recommended.id,
        onboardedAt: new Date().toISOString(),
        theme: 'dark' as const,
      };

      setUser(user);
      resetProgramCursors(recommended.id);
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
              i === step
                ? 'w-6 bg-brand-500'
                : i < step
                  ? 'w-2 bg-brand-400'
                  : 'w-2 bg-slate-700',
            ].join(' ')}
          />
        ))}
      </div>

      <div className="flex-1">
        {/* Step 0 — Account */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Create account</h1>
              <p className="mt-2 text-slate-400">
                Sign up to sync your data across all devices.
              </p>
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
              onKeyDown={(e) => e.key === 'Enter' && next()}
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
                onKeyDown={(e) => e.key === 'Enter' && next()}
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
              <p className="mt-2 text-slate-400">
                This is how Omnexus will greet you.
              </p>
            </div>
            <Input
              label="Your name"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && next()}
              className="text-lg py-3"
            />
          </div>
        )}

        {/* Step 2 — Goal */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                What's your goal?
              </h1>
              <p className="mt-2 text-slate-400">
                We'll build a program around what you want to achieve.
              </p>
            </div>
            <div className="space-y-3">
              {(['hypertrophy', 'fat-loss', 'general-fitness'] as Goal[]).map(
                (g) => (
                  <GoalCard
                    key={g}
                    goal={g}
                    selected={goal === g}
                    onSelect={setGoal}
                  />
                ),
              )}
            </div>
          </div>
        )}

        {/* Step 3 — Experience */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Your experience level?
              </h1>
              <p className="mt-2 text-slate-400">
                We'll match you with an appropriate program intensity.
              </p>
            </div>
            <ExperienceSelector value={level} onChange={setLevel} />
          </div>
        )}

        {/* Step 4 — Confirm */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                You're all set, {name}!
              </h1>
              <p className="mt-2 text-slate-400">
                Here's the program we've picked for you:
              </p>
            </div>
            {recommended && (
              <div className="rounded-2xl border border-brand-500/40 bg-brand-900/20 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-brand-400 mb-2">
                  Recommended Program
                </p>
                <p className="text-xl font-bold text-white">
                  {recommended.name}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {recommended.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {recommended.daysPerWeek} days/week
                  </span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {recommended.estimatedDurationWeeks} weeks
                  </span>
                  {recommended.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {submitError && (
              <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}
            <p className="text-sm text-slate-500">
              You can always switch programs later from the Programs tab.
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <Button
            variant="ghost"
            onClick={back}
            className="text-slate-300"
            disabled={loading}
          >
            <ArrowLeft size={18} />
            Back
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button onClick={next} fullWidth size="lg">
            Continue
            <ArrowRight size={18} />
          </Button>
        ) : (
          <Button
            onClick={finish}
            fullWidth
            size="lg"
            variant="success"
            disabled={loading}
          >
            {loading ? (
              'Creating account…'
            ) : (
              <>
                <Check size={18} />
                Start Training
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
