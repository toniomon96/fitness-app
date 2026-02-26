import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { useApp } from './store/AppContext'
import { supabase } from './lib/supabase'
import { setUser, setCustomPrograms, getGuestProfile } from './utils/localStorage'
import * as db from './lib/db'
import { runMigrationIfNeeded } from './lib/dataMigration'
import type { User } from './types'
import { OnboardingPage } from './pages/OnboardingPage'
import { LoginPage } from './pages/LoginPage'
import { GuestSetupPage } from './pages/GuestSetupPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { ProgramDetailPage } from './pages/ProgramDetailPage'
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage'
import { ExerciseDetailPage } from './pages/ExerciseDetailPage'
import { ActiveWorkoutPage } from './pages/ActiveWorkoutPage'
import { HistoryPage } from './pages/HistoryPage'
import { LearnPage } from './pages/LearnPage'
import { CourseDetailPage } from './pages/CourseDetailPage'
import { LessonPage } from './pages/LessonPage'
import { InsightsPage } from './pages/InsightsPage'
import { AskPage } from './pages/AskPage'
import { ProgramBuilderPage } from './pages/ProgramBuilderPage'
import { ProfilePage } from './pages/ProfilePage'
import { ActivityFeedPage } from './pages/ActivityFeedPage'
import { FriendsPage } from './pages/FriendsPage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { ChallengesPage } from './pages/ChallengesPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { CookieConsent } from './components/ui/CookieConsent'
import { GuestBanner } from './components/ui/GuestBanner'

function RootLayout() {
  return (
    <>
      <Outlet />
      <CookieConsent />
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-950">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-brand-500" />
    </div>
  )
}

/**
 * Allows both authenticated Supabase users AND local guest users.
 * Supabase users get full cloud hydration; guests load from localStorage only.
 * Community routes use AuthOnlyGuard instead.
 */
function GuestOrAuthGuard() {
  const { session, loading: authLoading } = useAuth()
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [syncing, setSyncing] = useState(false)
  const hydratedRef = useRef(false)

  useEffect(() => {
    // Signed-out authenticated user — clear state
    if (!session && !authLoading && state.user && !state.user.isGuest) {
      dispatch({ type: 'CLEAR_USER' })
      hydratedRef.current = false
      return
    }

    // Guest already loaded — nothing to do
    if (!session && !authLoading && state.user?.isGuest) return

    // Supabase session hydration
    if (!session || authLoading || hydratedRef.current) return

    async function hydrate() {
      if (!session) return
      setSyncing(true)
      try {
        let user = state.user

        if (!user || user.isGuest) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (!profile) {
            navigate('/onboarding', { replace: true })
            return
          }

          user = {
            id: profile.id,
            name: profile.name,
            goal: profile.goal,
            experienceLevel: profile.experience_level,
            activeProgramId: profile.active_program_id ?? undefined,
            onboardedAt: profile.created_at,
            theme: 'dark',
          } satisfies User

          setUser(user)
          dispatch({ type: 'SET_USER', payload: user })
        }

        await runMigrationIfNeeded(user.id)

        const [history, learningProgress, customPrograms] = await Promise.all([
          db.fetchHistory(user.id),
          db.fetchLearningProgress(user.id),
          db.fetchCustomPrograms(user.id),
        ])

        dispatch({ type: 'SET_HISTORY', payload: history })
        if (learningProgress) {
          dispatch({ type: 'SET_LEARNING_PROGRESS', payload: learningProgress })
        }
        setCustomPrograms(customPrograms)

        hydratedRef.current = true
      } catch (err) {
        console.error('[GuestOrAuthGuard] Hydration failed:', err)
        hydratedRef.current = true
      } finally {
        setSyncing(false)
      }
    }

    hydrate()
  }, [session, authLoading])

  if (authLoading || syncing) return <LoadingScreen />

  // No Supabase session — check for guest profile
  if (!session) {
    const guest = getGuestProfile()
    if (guest) {
      if (!state.user) {
        dispatch({ type: 'SET_USER', payload: guest })
      }
      return (
        <>
          <GuestBanner />
          <div className="pt-9">
            <Outlet />
          </div>
        </>
      )
    }
    return <Navigate to="/login" replace />
  }

  if (!state.user) return <LoadingScreen />
  return <Outlet />
}

/**
 * Hard auth required — community features need a real Supabase account.
 * Guests see an upgrade prompt instead of a broken page.
 */
function AuthOnlyGuard() {
  const { session, loading } = useAuth()
  const { state } = useApp()

  if (loading) return <LoadingScreen />

  if (!session) {
    return (
      <div className="flex flex-col min-h-dvh bg-slate-50 dark:bg-slate-950 items-center justify-center px-6 text-center gap-4">
        <span className="text-4xl">👥</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Community requires an account
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
          Create a free account to connect with friends, compete on the leaderboard, and join challenges.
        </p>
        <a
          href="/onboarding"
          className="mt-2 inline-block rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
        >
          Create Free Account
        </a>
        <a href="/login" className="text-sm text-brand-400 hover:text-brand-300">
          Already have an account? Sign in
        </a>
      </div>
    )
  }

  if (!state.user) return <LoadingScreen />
  return <Outlet />
}

function OnboardingGuard() {
  const { session, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (session) return <Navigate to="/" replace />
  return <OnboardingPage />
}

function LoginGuard() {
  const { session, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (session) return <Navigate to="/" replace />
  return <LoginPage />
}

function GuestGuard() {
  const { session, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (session) return <Navigate to="/" replace />
  if (getGuestProfile()) return <Navigate to="/" replace />
  return <GuestSetupPage />
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/onboarding', element: <OnboardingGuard /> },
      { path: '/login', element: <LoginGuard /> },
      { path: '/guest', element: <GuestGuard /> },
      { path: '/privacy', element: <PrivacyPolicyPage /> },
      {
        // Accessible to guests and authenticated users
        element: <GuestOrAuthGuard />,
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/programs', element: <ProgramsPage /> },
          { path: '/programs/builder', element: <ProgramBuilderPage /> },
          { path: '/programs/:programId', element: <ProgramDetailPage /> },
          { path: '/library', element: <ExerciseLibraryPage /> },
          { path: '/library/:exerciseId', element: <ExerciseDetailPage /> },
          { path: '/workout/active', element: <ActiveWorkoutPage /> },
          { path: '/history', element: <HistoryPage /> },
          { path: '/learn', element: <LearnPage /> },
          { path: '/learn/:courseId', element: <CourseDetailPage /> },
          { path: '/learn/:courseId/:moduleId', element: <LessonPage /> },
          { path: '/insights', element: <InsightsPage /> },
          { path: '/ask', element: <AskPage /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
      {
        // Community — full Supabase account required
        element: <AuthOnlyGuard />,
        children: [
          { path: '/feed', element: <ActivityFeedPage /> },
          { path: '/friends', element: <FriendsPage /> },
          { path: '/leaderboard', element: <LeaderboardPage /> },
          { path: '/challenges', element: <ChallengesPage /> },
        ],
      },
    ],
  },
])
