import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { User, WorkoutSession, WorkoutHistory } from '../types';
import {
  getUser,
  getHistory,
  getActiveSession,
  getTheme,
  setTheme as persistTheme,
} from '../utils/localStorage';

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
  user: User | null;
  history: WorkoutHistory;
  activeSession: WorkoutSession | null;
  theme: 'dark' | 'light';
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }
  | { type: 'SET_ACTIVE_SESSION'; payload: WorkoutSession }
  | { type: 'UPDATE_ACTIVE_SESSION'; payload: WorkoutSession }
  | { type: 'CLEAR_ACTIVE_SESSION' }
  | { type: 'APPEND_SESSION'; payload: WorkoutSession }
  | { type: 'SET_HISTORY'; payload: WorkoutHistory }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'dark' | 'light' };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_USER':
      return { ...state, user: null };
    case 'SET_ACTIVE_SESSION':
    case 'UPDATE_ACTIVE_SESSION':
      return { ...state, activeSession: action.payload };
    case 'CLEAR_ACTIVE_SESSION':
      return { ...state, activeSession: null };
    case 'APPEND_SESSION':
      return {
        ...state,
        history: {
          ...state.history,
          sessions: [...state.history.sessions, action.payload],
        },
      };
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
    case 'TOGGLE_THEME': {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      persistTheme(next);
      return { ...state, theme: next };
    }
    case 'SET_THEME':
      persistTheme(action.payload);
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const initialState: AppState = {
    user: getUser(),
    history: getHistory(),
    activeSession: getActiveSession(),
    theme: getTheme(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Apply dark/light class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
