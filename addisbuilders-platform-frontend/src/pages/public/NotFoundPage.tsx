import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-800 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">404</span>
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mt-1">Page Not Found</h1>
        <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
          The requested address does not exist or has been relocated within the AddisBuilder’s platform.
        </p>

        <div className="flex gap-2.5 mt-6 justify-center">
          <Link to="/">
            <Button variant="primary" size="sm" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => window.history.back()} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
