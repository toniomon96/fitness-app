import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { getUser } from './utils/localStorage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { ProgramDetailPage } from './pages/ProgramDetailPage'
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage'
import { ExerciseDetailPage } from './pages/ExerciseDetailPage'
import { ActiveWorkoutPage } from './pages/ActiveWorkoutPage'
import { HistoryPage } from './pages/HistoryPage'

function AuthGuard() {
  const user = getUser()
  if (!user) return <Navigate to="/onboarding" replace />
  return <Outlet />
}

function OnboardingGuard() {
  const user = getUser()
  if (user) return <Navigate to="/" replace />
  return <OnboardingPage />
}

export const router = createBrowserRouter([
  { path: '/onboarding', element: <OnboardingGuard /> },
  {
    element: <AuthGuard />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/programs', element: <ProgramsPage /> },
      { path: '/programs/:programId', element: <ProgramDetailPage /> },
      { path: '/library', element: <ExerciseLibraryPage /> },
      { path: '/library/:exerciseId', element: <ExerciseDetailPage /> },
      { path: '/workout/active', element: <ActiveWorkoutPage /> },
      { path: '/history', element: <HistoryPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
