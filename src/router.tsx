import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { useApp } from './store/AppContext'
import { supabase } from './lib/supabase'
import { setUser, setCustomPrograms } from './utils/localStorage'
import * as db from './lib/db'
import { runMigrationIfNeeded } from './lib/dataMigration'
import type { User } from './types'
import { OnboardingPage } from './pages/OnboardingPage'
import { LoginPage } from './pages/LoginPage'
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

function AuthGuard() {
  const { session, loading: authLoading } = useAuth()
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [syncing, setSyncing] = useState(false)
  // Tracks whether we've hydrated Supabase data for the current session
  const hydratedRef = useRef(false)

  useEffect(() => {
    if (!session && !authLoading && state.user) {
      dispatch({ type: 'CLEAR_USER' })
      hydratedRef.current = false
      return
    }

    if (!session || authLoading || hydratedRef.current) return

    async function hydrate() {
      if (!session) return
      setSyncing(true)
      try {
        let user = state.user

        // Cross-device: no local profile — fetch from Supabase
        if (!user) {
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

        // One-time migration of old localStorage data → Supabase
        await runMigrationIfNeeded(user.id)

        // Fetch all cloud data and hydrate AppContext + localStorage
        const [history, learningProgress, customPrograms] = await Promise.all([
          db.fetchHistory(user.id),
          db.fetchLearningProgress(user.id),
          db.fetchCustomPrograms(user.id),
        ])

        dispatch({ type: 'SET_HISTORY', payload: history })
        if (learningProgress) {
          dispatch({ type: 'SET_LEARNING_PROGRESS', payload: learningProgress })
        }
        // Write custom programs back to localStorage so existing code finds them
        setCustomPrograms(customPrograms)

        hydratedRef.current = true
      } catch (err) {
        console.error('[AuthGuard] Hydration failed:', err)
        // Still mark as hydrated so the user isn't stuck on the loading screen
        hydratedRef.current = true
      } finally {
        setSyncing(false)
      }
    }

    hydrate()
  }, [session, authLoading])

  if (authLoading || syncing) return <LoadingScreen />
  if (!session) return <Navigate to="/login" replace />
  // Session is set but user hasn't been hydrated into state yet — wait.
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

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/onboarding', element: <OnboardingGuard /> },
      { path: '/login', element: <LoginGuard /> },
      { path: '/privacy', element: <PrivacyPolicyPage /> },
      {
        element: <AuthGuard />,
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
          { path: '/feed', element: <ActivityFeedPage /> },
          { path: '/friends', element: <FriendsPage /> },
          { path: '/leaderboard', element: <LeaderboardPage /> },
          { path: '/challenges', element: <ChallengesPage /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
])
