import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';
import { notificationsService } from '../../services/notifications.service';
import { Notification, UserRole } from '../../types';
import {
  Menu,
  Bell,
  Search,
  ExternalLink,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getInitials } from '../../utils';
import { USER_ROLES } from '../../constants';

export interface DashboardTopbarProps {
  onOpenMobileSidebar: () => void;
}

export const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ onOpenMobileSidebar }) => {
  const { user, role, logout, switchDemoRole } = useAuth();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    notificationsService.getNotifications().then((list) => {
      if (isMounted) setNotifications(list);
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = async () => {
    await notificationsService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleRoleChange = async (targetRole: UserRole) => {
    setRoleSwitcherOpen(false);
    await switchDemoRole(targetRole);
    const dest = USER_ROLES[targetRole]?.defaultPath || '/learner/dashboard';
    navigate(dest);
  };

  return (
    <header className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      {/* Left section: mobile hamburger & breadcrumb or title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{t('brand.name', 'AddisBuilder’s')}</span>
          <span>/</span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {role ? USER_ROLES[role]?.label : t('common.portal', 'Portal')}
          </span>
        </div>
      </div>

      {/* Right section: theme, language, demo role quick-switcher, public site link, notifications & profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Language & Theme Controls */}
        <LanguageSelector />
        <ThemeToggle />

        {/* Quick Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setRoleSwitcherOpen(!roleSwitcherOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors shadow-xs"
            title="Switch demo persona to test any role dashboard"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-700 dark:text-brand-400" />
            <span className="hidden md:inline">{t('common.switchRole', 'Switch Role')}:</span>
            <span>{role ? USER_ROLES[role]?.label.split('/')[0].trim() : 'Select'}</span>
            <ChevronDown className="w-3 h-3 text-brand-700 dark:text-brand-400" />
          </button>

          {roleSwitcherOpen && (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-56 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg py-2 z-50 text-left rtl:text-right">
              <div className="px-3 py-1.5 border-b border-neutral-100 dark:border-neutral-800">
                <p className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  {t('common.testAnyDashboard', 'Test Any Dashboard')}
                </p>
              </div>
              {(Object.keys(USER_ROLES) as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${
                    role === r ? 'font-semibold text-brand-800 dark:text-brand-300 bg-brand-50/70 dark:bg-brand-950/60' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span>{USER_ROLES[r].label}</span>
                  {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-brand-700 dark:text-brand-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Public Platform */}
        <Link
          to="/"
          className="hidden lg:flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-brand-400 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Go to Public Website"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{t('common.publicPortal', 'Public Portal')}</span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setRoleSwitcherOpen(false);
            }}
            className="relative p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 rtl:right-auto rtl:left-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl py-2 z-50 text-left rtl:text-right">
              <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400 tracking-wider">
                  {t('common.notifications', 'Notifications')} ({notifications.length})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-brand-800 dark:text-brand-400 hover:underline font-medium"
                  >
                    {t('common.markAllRead', 'Mark all read')}
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                {notifications.length === 0 ? (
                  <p className="p-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">{t('common.noNotifications', 'No notifications')}</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors ${
                        !n.isRead ? 'bg-brand-50/40 dark:bg-brand-950/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {n.type === 'SUCCESS' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        ) : n.type === 'WARNING' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{n.title}</p>
                          <p className="text-neutral-600 dark:text-neutral-300 mt-0.5 leading-relaxed">{n.message}</p>
                          {n.link && (
                            <Link
                              to={n.link}
                              onClick={() => setNotifOpen(false)}
                              className="text-brand-800 dark:text-brand-400 font-semibold hover:underline mt-1 inline-block"
                            >
                              {t('common.viewDetailsArrow', 'View details →')}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 rtl:pl-0 rtl:pr-2 border-l rtl:border-l-0 rtl:border-r border-neutral-200 dark:border-neutral-800">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-xs font-bold">
              {getInitials(user?.fullName)}
            </div>
          )}
          <span className="hidden md:block text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[120px]">
            {user?.fullName}
          </span>
        </div>
      </div>
    </header>
  );
};
