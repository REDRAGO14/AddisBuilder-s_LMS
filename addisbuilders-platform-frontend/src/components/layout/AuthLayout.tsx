import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';

export const AuthLayout: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-100/70 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative transition-colors duration-200">
      {/* Top right language & theme quick controls */}
      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-11 h-11 rounded-xl bg-brand-900 dark:bg-brand-800 flex items-center justify-center p-2 text-white shadow-sm transition-transform group-hover:scale-105">
            <img src="/logo.svg" alt="AddisBuilder's Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            AddisBuilder<span className="text-brand-600 dark:text-brand-400">’s</span>
          </span>
        </Link>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t('brand.subTitle', 'University Learning & Internship Platform')}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-neutral-900 py-8 px-6 sm:px-10 shadow-sm border border-neutral-200/90 dark:border-neutral-800 rounded-2xl transition-colors">
          <Outlet />
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1 rtl:mr-0 rtl:ml-1 rtl:rotate-180" />
            {t('auth.backToLogin', 'Back to AddisBuilder’s home')}
          </Link>
        </div>
      </div>
    </div>
  );
};
