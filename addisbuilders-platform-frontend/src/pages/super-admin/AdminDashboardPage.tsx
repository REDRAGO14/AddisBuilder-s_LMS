import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportsService } from '../../services/reports.service';
import { coordinatorsService } from '../../services/coordinators.service';
import { mentorsService } from '../../services/mentors.service';
import { usersService } from '../../services/users.service';
import { DashboardStats, CoordinatorRequest, MentorRequest, User } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import {
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  FolderKanban,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingRequests, setPendingRequests] = useState<CoordinatorRequest[]>([]);
  const [pendingMentorRequests, setPendingMentorRequests] = useState<MentorRequest[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Resilient loading: one failing admin endpoint must not blank the console.
    const safe = <T,>(p: Promise<T>): Promise<T | []> => p.catch(() => [] as T | []);
    Promise.all([
      reportsService.getOverviewStats().catch(() => null),
      safe(coordinatorsService.getAdminRequests()),
      safe(mentorsService.getAdminRequests()),
      safe(usersService.getAllUsers()),
    ]).then(([statsData, coordReqs, mentorReqs, usersList]) => {
      if (isMounted) {
        setStats(statsData);
        setPendingRequests((coordReqs as CoordinatorRequest[]).filter((r) => r.status === 'PENDING'));
        setPendingMentorRequests((mentorReqs as MentorRequest[]).filter((r) => r.status === 'PENDING'));
        setRecentUsers((usersList as User[]).slice(0, 5));
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading platform oversight console..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Super Admin Platform Oversight"
        description="Unified institutional governance, coordinator accreditations, corporate verifications, and system auditing."
        breadcrumbs={[{ label: 'Admin', href: '/super-admin/dashboard' }, { label: 'Dashboard' }]}
        badge={
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            Super Administrator Console
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Learners</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{stats?.totalLearners || 0}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Coordinator Requests</p>
            <p className="text-2xl font-bold text-amber-900 mt-0.5">{pendingRequests.length} Pending</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Published Courses</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{stats?.totalCourses || 0}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Internship Listings</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{stats?.totalInternships || 0}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Coordinator Requests */}
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Pending Coordinator Approvals</CardTitle>
              {pendingRequests.length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
            <Link to="/super-admin/coordinator-approvals">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Review All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="p-6 text-center text-xs text-neutral-500">
                All coordinator requests have been reviewed and decided.
              </div>
            ) : (
              pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">{req.fullName}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{req.university} - {req.department}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Requested: {formatDate(req.requestDate)}</p>
                  </div>
                  <Link to="/super-admin/coordinator-approvals">
                    <Button size="sm" variant="primary">
                      Decide
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Pending Faculty Mentor Accreditations */}
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Pending Mentor Accreditations</CardTitle>
              {pendingMentorRequests.length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              )}
            </div>
            <Link to="/super-admin/mentor-approvals">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Review All ({pendingMentorRequests.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingMentorRequests.length === 0 ? (
              <div className="p-6 text-center text-xs text-neutral-500">
                All faculty mentor applications have been reviewed and accredited.
              </div>
            ) : (
              pendingMentorRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-bold text-neutral-900 dark:text-neutral-100 text-sm truncate">{req.fullName}</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">{req.university} • {req.department}</p>
                  </div>
                  <Link to="/super-admin/mentor-approvals">
                    <Button size="sm" variant="primary">
                      Review
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Registered Users */}
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Registered Accounts</CardTitle>
            <Link to="/super-admin/users">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                User Management
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.map((u) => (
              <div
                key={u.id}
                className="p-3 rounded-xl border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60"
              >
                <div className="min-w-0 pr-3">
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm">{u.fullName}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="neutral">{u.role}</Badge>
                  <StatusBadge status={u.isActive ? 'ACTIVE' : 'INACTIVE'} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
