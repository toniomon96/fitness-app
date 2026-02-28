import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { App } from './App'
import { initStatusBar, hideSplashScreen, registerAndroidBackButton, isAndroid } from './lib/capacitor'

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found. Ensure index.html contains <div id="root"></div>.');

// Initialize native status bar before first render so it's ready immediately.
// No-op on web.
initStatusBar();

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// After React's first paint: hide splash screen and register Android back button.
// requestAnimationFrame fires after the browser commits the first frame so the
// splash hides over real content — not a blank white screen.
requestAnimationFrame(() => {
  hideSplashScreen(); // no-op on web

  if (isAndroid) {
    registerAndroidBackButton(() => window.history.back());
  }
});
