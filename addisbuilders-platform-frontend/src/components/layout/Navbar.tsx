import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';
import { Button } from '../ui/Button';
import { Menu, X, Home, BookOpen, Briefcase, Mail, LogIn, LayoutDashboard } from 'lucide-react';
import { USER_ROLES } from '../../constants';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { label: t('nav.home', 'HOME'), href: '/', icon: <Home className="w-4 h-4" /> },
    { label: t('nav.courses', 'COURSES'), href: '/courses', icon: <BookOpen className="w-4 h-4" /> },
    { label: t('nav.internships', 'INTERNSHIPS'), href: '/internships', icon: <Briefcase className="w-4 h-4" /> },
    { label: t('nav.contact', 'CONTACT'), href: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    return USER_ROLES[user.role]?.defaultPath || '/learner/dashboard';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/90 dark:border-neutral-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-900 dark:bg-brand-800 flex items-center justify-center p-2 text-white shadow-sm transition-transform group-hover:scale-105">
              <img src="/logo.svg" alt="AddisBuilder's Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors">
                AddisBuilder<span className="text-brand-600 dark:text-brand-400">’s</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
                {t('brand.tagline', 'Learning & Internships')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls & Auth Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <LanguageSelector />
            <ThemeToggle />

            <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardPath()}>
                  <Button variant="primary" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                    {t('nav.dashboard', 'Dashboard')}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                    {t('nav.signIn', 'Sign In')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    {t('nav.getStarted', 'Get Started')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Action Controls & Menu Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              aria-label={t('nav.toggleMenu', 'Toggle menu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <Link to={getDashboardPath()} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                  {t('nav.goToDashboard', 'Go to Dashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t('nav.signIn', 'Sign In')}
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    {t('nav.registerNow', 'Register Now')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
