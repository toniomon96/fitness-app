import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center bg-slate-50 dark:bg-slate-950">
          <p className="text-4xl mb-4">⚠️</p>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
            An unexpected error occurred. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 text-sm font-medium rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-all"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
