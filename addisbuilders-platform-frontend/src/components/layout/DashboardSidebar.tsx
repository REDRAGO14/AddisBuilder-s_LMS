import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  BookmarkCheck,
  FileText,
  TrendingUp,
  UserCheck,
  Building2,
  Users,
  ShieldCheck,
  FolderKanban,
  GraduationCap,
  Bell,
  Settings,
  ClipboardList,
  Layers,
  FileCheck,
  LogOut,
  X,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { USER_ROLES } from '../../constants';
import { getInitials } from '../../utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onCloseMobile }) => {
  const { user, role, logout } = useAuth();
  const { t } = useLanguage();

  const getRoleNavItems = (): NavItem[] => {
    switch (role) {
      case 'LEARNER':
        return [
          { label: t('dashboards.sidebar.overview', 'Overview'), href: '/learner/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.myCourses', 'My Courses'), href: '/learner/courses', icon: <BookOpen className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.assignments', 'Assignments'), href: '/learner/assignments', icon: <ClipboardList className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.findInternships', 'Find Internships'), href: '/learner/internships', icon: <Briefcase className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.savedInternships', 'Saved Internships'), href: '/learner/saved-internships', icon: <BookmarkCheck className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.applications', 'Applications'), href: '/learner/applications', icon: <FileText className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.learningProgress', 'Learning Progress'), href: '/learner/progress', icon: <TrendingUp className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.leaderboard', 'Leaderboard'), href: '/learner/leaderboard', icon: <Trophy className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.smartAssistant', 'Smart Assistant'), href: '/learner/ai-assistant', icon: <Sparkles className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.profile', 'Profile'), href: '/learner/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.notifications', 'Notifications'), href: '/learner/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'MENTOR':
        return [
          { label: t('dashboards.sidebar.overview', 'Overview'), href: '/mentor/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.myCourses', 'My Courses'), href: '/mentor/courses', icon: <BookOpen className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.students', 'Students'), href: '/mentor/students', icon: <Users className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.materials', 'Course Materials'), href: '/mentor/materials', icon: <Layers className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.assignments', 'Assignments'), href: '/mentor/assignments', icon: <ClipboardList className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.submissions', 'Submissions'), href: '/mentor/submissions', icon: <FileCheck className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.learningProgress', 'Learner Progress'), href: '/mentor/progress', icon: <TrendingUp className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.profile', 'Profile'), href: '/mentor/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.notifications', 'Notifications'), href: '/mentor/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'INTERNSHIP_COORDINATOR':
        return [
          { label: t('dashboards.sidebar.overview', 'Overview'), href: '/internship-manager/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.internships', 'Internships'), href: '/internship-manager/internships', icon: <Briefcase className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.applications', 'Applications'), href: '/internship-manager/applications', icon: <FileText className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.profile', 'Profile'), href: '/internship-manager/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.notifications', 'Notifications'), href: '/internship-manager/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'EMPLOYER':
        return [
          { label: t('dashboards.sidebar.overview', 'Overview'), href: '/employer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.orgProfile', 'Organization Profile'), href: '/employer/organization', icon: <Building2 className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.verification', 'Verification'), href: '/employer/verification', icon: <ShieldCheck className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.internships', 'My Internships'), href: '/employer/internships', icon: <Briefcase className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.applicants', 'Applicants'), href: '/employer/applicants', icon: <FileText className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.analytics', 'Recruitment Analytics'), href: '/employer/analytics', icon: <TrendingUp className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.notifications', 'Notifications'), href: '/employer/notifications', icon: <Bell className="w-4 h-4" /> },
        ];

      case 'SUPER_ADMIN':
        return [
          { label: t('dashboards.sidebar.overview', 'Overview'), href: '/super-admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.users', 'Users'), href: '/super-admin/users', icon: <Users className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.coordinatorApprovals', 'Coordinator Approvals'), href: '/super-admin/coordinator-approvals', icon: <GraduationCap className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.mentorApprovals', 'Mentor Approvals'), href: '/super-admin/mentor-approvals', icon: <GraduationCap className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.organizations', 'Organizations'), href: '/super-admin/organizations', icon: <Building2 className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.moderation', 'Internship Moderation'), href: '/super-admin/moderation', icon: <Briefcase className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.courseManagement', 'Course Management'), href: '/super-admin/courses', icon: <FolderKanban className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.reports', 'Reports & Analytics'), href: '/super-admin/reports', icon: <TrendingUp className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.auditLogs', 'Audit Logs'), href: '/super-admin/audit-logs', icon: <FileCheck className="w-4 h-4" /> },
          { label: t('dashboards.sidebar.settings', 'Settings'), href: '/super-admin/settings', icon: <Settings className="w-4 h-4" /> },
        ];

      default:
        return [];
    }
  };

  const navItems = getRoleNavItems();
  const roleConfig = role ? USER_ROLES[role] : null;

  return (
    <aside className="w-64 h-full bg-white dark:bg-neutral-900 border-r rtl:border-r-0 rtl:border-l border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shrink-0 select-none transition-colors duration-200">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-200 dark:border-neutral-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-900 dark:bg-brand-800 flex items-center justify-center p-1.5 text-white">
              <img src="/logo.svg" alt="AddisBuilder's" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-neutral-100 tracking-tight text-base">{t('brand.name', 'AddisBuilder’s')}</span>
              <span className="block text-[10px] text-brand-800 dark:text-brand-400 font-semibold tracking-wider uppercase">{t('common.portal', 'Portal')}</span>
            </div>
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Role Badge Indicator */}
        {roleConfig && (
          <div className="px-5 py-3 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40">
            <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-1">
              {t('common.activeWorkspace', 'Active Workspace')}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{roleConfig.label}</span>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]" aria-label="Dashboard sidebar">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-brand-800 dark:group-hover:text-brand-400">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 font-semibold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Profile / Logout */}
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5 min-w-0">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {getInitials(user?.fullName)}
              </div>
            )}
            <div className="min-w-0 text-left rtl:text-right">
              <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">{user?.fullName}</p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title={t('nav.signOut', 'Sign Out')}
            aria-label={t('nav.signOut', 'Sign Out')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
