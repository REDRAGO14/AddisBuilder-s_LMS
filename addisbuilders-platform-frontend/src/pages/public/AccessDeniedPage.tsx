import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, LayoutDashboard, LogOut } from 'lucide-react';
import { USER_ROLES } from '../../constants';

export const AccessDeniedPage: React.FC = () => {
  const { user, role, logout } = useAuth();

  const userDashboard = role ? USER_ROLES[role]?.defaultPath : '/login';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 dark:border-neutral-800 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Access Restricted</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
          You do not have administrative authorization to view this protected section.
        </p>

        {user && (
          <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300">
            <p>
              Signed in as: <strong className="text-neutral-900 dark:text-neutral-100">{user.fullName}</strong>
            </p>
            <p className="mt-0.5">
              Assigned Role: <span className="font-semibold text-brand-800">{USER_ROLES[user.role]?.label}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5 mt-6 justify-center">
          <Link to={userDashboard}>
            <Button variant="primary" size="sm" className="w-full" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
              Go to My Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            leftIcon={<LogOut className="w-4 h-4 text-neutral-500" />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
