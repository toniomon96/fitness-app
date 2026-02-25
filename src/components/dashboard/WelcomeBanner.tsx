import type { User } from '../../types';
import { GoalBadge } from '../ui/Badge';

interface WelcomeBannerProps {
  user: User;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function WelcomeBanner({ user }: WelcomeBannerProps) {
  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {getGreeting()}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user.name} 👋
          </h1>
        </div>
        <GoalBadge goal={user.goal} />
      </div>
    </div>
  );
}
