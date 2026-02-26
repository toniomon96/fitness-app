import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../store/AppContext';
import { setUser } from '../utils/localStorage';
import type { User } from '../types';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (!data.user) {
        setError('Sign in failed. Please try again.');
        return;
      }

      // Fetch profile from Supabase to hydrate local state
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile) {
        // Profile missing — redirect to onboarding to complete setup
        navigate('/onboarding', { replace: true });
        return;
      }

      const user: User = {
        id: profile.id,
        name: profile.name,
        goal: profile.goal,
        experienceLevel: profile.experience_level,
        activeProgramId: profile.active_program_id ?? undefined,
        onboardedAt: profile.created_at,
        theme: 'dark',
      };

      setUser(user);
      dispatch({ type: 'SET_USER', payload: user });
      navigate('/', { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 px-6 py-12">
      <div className="flex flex-col items-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mb-4">
          <LogIn size={26} className="text-brand-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="mt-2 text-slate-400 text-sm">Sign in to your Omnexus account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4 max-w-sm w-full mx-auto">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
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

        {error && (
          <p className="text-sm text-red-400 rounded-lg bg-red-900/20 border border-red-800 px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={loading || !email || !password}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>

        <p className="text-center text-sm text-slate-400 mt-4">
          Don't have an account?{' '}
          <Link
            to="/onboarding"
            className="text-brand-400 hover:text-brand-300 font-medium"
          >
            Create one
          </Link>
        </p>

        <div className="relative flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-xs text-slate-600">or</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <Link
          to="/guest"
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-400 hover:border-slate-600 hover:text-slate-300 transition-colors"
        >
          Try without an account
        </Link>
      </form>
    </div>
  );
}
