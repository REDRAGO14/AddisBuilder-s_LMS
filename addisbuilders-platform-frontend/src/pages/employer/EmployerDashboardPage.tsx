import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { organizationsService } from '../../services/organizations.service';
import { internshipsService } from '../../services/internships.service';
import { applicationsService } from '../../services/applications.service';
import { Organization, Internship, InternshipApplication } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import {
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const EmployerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [org, setOrg] = useState<Organization | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applicants, setApplicants] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Resilient loading: a new employer may get 404/403 on GET /organizations/my
    // (no organization yet) — degrade to null instead of crashing the dashboard.
    Promise.all([
      organizationsService.getMyOrganization().catch(() => null),
      internshipsService.getInternships().catch(() => [] as Internship[]),
      applicationsService.getApplications().catch(() => [] as InternshipApplication[]),
    ]).then(([myOrg, allInternships, allApps]) => {
      if (isMounted) {
        setOrg(myOrg);
        setInternships(allInternships);
        setApplicants(allApps);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading employer recruitment portal..." />;
  }

  const isVerified = org?.verificationStatus === 'APPROVED' || org?.verificationStatus === 'VERIFIED';
  const totalApplicants = applicants.length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${org?.name || 'Organization'} Portal`}
        description="Manage corporate profiles, publish verified internship listings, and review qualified university applicants."
        breadcrumbs={[{ label: 'Employer', href: '/employer/dashboard' }, { label: 'Dashboard' }]}
        badge={<StatusBadge status={org?.verificationStatus || 'UNVERIFIED'} />}
        actions={
          <div className="flex gap-2.5">
            <Link to="/employer/internships/new">
              <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
                Post Internship
              </Button>
            </Link>
          </div>
        }
      />

      {/* Verification Notice Banner if not verified */}
      {!isVerified && (
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs text-amber-900">
              <p className="font-bold">Organization Verification Pending</p>
              <p className="mt-0.5">
                Submit official registration documents and TIN clearance to receive full publication approval.
              </p>
            </div>
          </div>
          <Link to="/employer/verification">
            <Button size="sm" variant="outline" className="bg-white dark:bg-neutral-900">
              Complete Verification
            </Button>
          </Link>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Open Listings</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{internships.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Applicants</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{totalApplicants}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Verification</p>
            <p className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-1">{org?.verificationStatus}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Shortlisted</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
              {applicants.filter((a) => a.status === 'SHORTLISTED').length}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Internships */}
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Posted Internships</CardTitle>
            <Link to="/employer/internships">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {internships.map((i) => (
              <div
                key={i.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">{i.title}</h4>
                    <StatusBadge status={i.status} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {i.workMode} • Deadline: {formatDate(i.deadline)} • {i.applicantsCount} Applicants
                  </p>
                </div>

                <Link to="/employer/internships">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Applicants */}
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Candidate Pipeline</CardTitle>
            <Link to="/employer/applicants">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Review All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {applicants.map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">{app.applicantName}</h4>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">Applied for: {app.internshipTitle}</p>
                </div>

                <Link to="/employer/applicants">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
