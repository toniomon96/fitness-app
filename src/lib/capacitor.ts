/**
 * Capacitor platform utilities for Omnexus.
 *
 * All functions are safe to call in a browser (they are no-ops on web).
 * Dynamic imports inside each async function ensure tree-shaking works and
 * the web bundle never evaluates native bridge code.
 */

/**
 * Returns 'ios', 'android', or 'web'.
 * Uses window.Capacitor (injected by the native bridge) — safe at module level.
 */
export function getPlatform(): 'ios' | 'android' | 'web' {
  try {
    const cap = (window as Window & { Capacitor?: { getPlatform(): string } }).Capacitor;
    if (cap) {
      const p = cap.getPlatform();
      if (p === 'ios' || p === 'android') return p;
    }
  } catch {
    // Not native
  }
  return 'web';
}

export const isNative  = getPlatform() !== 'web';
export const isIOS     = getPlatform() === 'ios';
export const isAndroid = getPlatform() === 'android';

/**
 * Set the native status bar to dark style + slate-950 background.
 * On Android, keeps the status bar in the layout (no overlay).
 * No-op on web.
 */
export async function initStatusBar(): Promise<void> {
  if (!isNative) return;
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0f172a' });
    if (isAndroid) {
      await StatusBar.setOverlaysWebView({ overlay: false });
    }
  } catch (err) {
    console.warn('[Capacitor] StatusBar init failed:', err);
  }
}

/**
 * Hide the splash screen with a short fade.
 * Should be called after React's first paint (inside requestAnimationFrame).
 * No-op on web.
 */
export async function hideSplashScreen(): Promise<void> {
  if (!isNative) return;
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide({ fadeOutDuration: 200 });
  } catch (err) {
    console.warn('[Capacitor] SplashScreen hide failed:', err);
  }
}

/**
 * Register the Android hardware back button.
 * Navigates back in history; if at the root, minimises the app.
 * No-op on iOS and web.
 *
 * @returns A cleanup function that removes the listener.
 */
export async function registerAndroidBackButton(
  onBack: () => void,
): Promise<() => void> {
  if (!isAndroid) return () => {};
  try {
    const { App } = await import('@capacitor/app');
    const handle = await App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        onBack();
      } else {
        App.minimizeApp();
      }
    });
    return () => handle.remove();
  } catch (err) {
    console.warn('[Capacitor] Back button handler failed:', err);
    return () => {};
  }
}

/**
 * Trigger a haptic impact feedback.
 * Great for set completion (light), UI confirmations (medium), errors (heavy).
 * No-op on web.
 */
export async function triggerHaptic(
  style: 'light' | 'medium' | 'heavy' = 'medium',
): Promise<void> {
  if (!isNative) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    const styleMap = {
      light:  ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy:  ImpactStyle.Heavy,
    };
    await Haptics.impact({ style: styleMap[style] });
  } catch (err) {
    console.warn('[Capacitor] Haptics impact failed:', err);
  }
}

/**
 * Trigger a haptic notification feedback.
 * Use 'success' for PR celebrations, 'warning' for rest timer, 'error' for failures.
 * No-op on web.
 */
export async function triggerHapticNotification(
  type: 'success' | 'warning' | 'error' = 'success',
): Promise<void> {
  if (!isNative) return;
  try {
    const { Haptics, NotificationType } = await import('@capacitor/haptics');
    const typeMap = {
      success: NotificationType.Success,
      warning: NotificationType.Warning,
      error:   NotificationType.Error,
    };
    await Haptics.notification({ type: typeMap[type] });
  } catch (err) {
    console.warn('[Capacitor] Haptics notification failed:', err);
  }
}
