import { AppProvider } from './store/AppContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
