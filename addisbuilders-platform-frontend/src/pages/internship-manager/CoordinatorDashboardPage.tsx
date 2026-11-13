import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { internshipsService } from '../../services/internships.service';
import { applicationsService } from '../../services/applications.service';
import { Internship, InternshipApplication } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate } from '../../utils';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Building2,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const CoordinatorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const safe = <T,>(p: Promise<T>): Promise<T | []> => p.catch(() => [] as T | []);
    Promise.all([
      safe(internshipsService.getInternships()),
      safe(applicationsService.getApplications()),
    ]).then(([allInternships, allApps]) => {
      if (isMounted) {
        setInternships(allInternships as Internship[]);
        setApplications(allApps as InternshipApplication[]);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading coordinator dashboard..." />;
  }

  const activeCount = internships.filter((i) => i.status === 'PUBLISHED').length;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }} 
      className="space-y-8 pb-20 relative overflow-hidden"
    >
      {/* Infinite Breathing Background Glow Effect */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-20 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-800 pb-6 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>University Linkage Desk</span>
            <span>/</span>
            <span className="text-brand-700 font-bold">Coordinator Dashboard</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
              Welcome back, {user?.fullName || 'Coordinator'}! 👋
            </h1>

            {/* Infinitely Pulsing Accredited Badge */}
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Accredited University Coordinator
            </motion.div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Oversee university-partnered internship programs, review applicant placements, and manage institutional opportunities.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/internship-manager/internships/new">
              <Button
                size="md"
                variant="primary"
                leftIcon={<PlusCircle className="w-4 h-4" />}
                className="font-extrabold bg-gradient-to-r from-brand-800 to-emerald-700 hover:from-brand-900 hover:to-emerald-800 text-white shadow-md shadow-brand-900/20 border-0"
              >
                Publish Internship 🚀
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Listings</p>
              <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-0.5">{internships.length}</p>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Active Listings</p>
              <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-0.5">{activeCount}</p>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Applicants</p>
              <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-0.5">{applications.length}</p>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Approval Status</p>
              <p className="text-base sm:text-lg font-black text-emerald-700 mt-0.5">Approved</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Managed Listings */}
        <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 px-6 py-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-700" /> Partner Internship Listings
            </CardTitle>
            <Link to="/internship-manager/internships">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All ({internships.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {internships.length === 0 ? (
              <EmptyState
                icon={<Briefcase className="w-10 h-10 text-brand-600" />}
                title="No Internship Listings"
                description="You haven't published any partner internships yet. Create your first listing to start onboarding students."
                action={
                  <Link to="/internship-manager/internships/new">
                    <Button size="sm" variant="primary">Publish Listing</Button>
                  </Link>
                }
              />
            ) : (
              internships.map((internship) => (
                <div
                  key={internship.id}
                  className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-all shadow-xs"
                >
                  <div className="min-w-0 pr-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm truncate">
                        {internship.title}
                      </h4>
                      <StatusBadge status={internship.status} />
                    </div>
                    <p className="text-xs text-brand-800 font-semibold flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {internship.organizationName}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Deadline: {formatDate(internship.deadline)} • {internship.applicantsCount || 0} Applicants
                    </p>
                  </div>

                  <Link to="/internship-manager/internships">
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Student Applicants */}
        <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 px-6 py-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" /> Recent Placement Applications
            </CardTitle>
            <Link to="/internship-manager/applications">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                All Applicants ({applications.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {applications.length === 0 ? (
              <EmptyState
                icon={<Users className="w-10 h-10 text-indigo-600" />}
                title="No Applications Received"
                description="Student applications will appear here once candidates apply to your published internship listings."
              />
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-all shadow-xs"
                >
                  <div className="min-w-0 pr-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm truncate">
                        {app.applicantName}
                      </h4>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Target: <strong className="text-neutral-900 dark:text-neutral-100">{app.internshipTitle}</strong>
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      {app.university || 'University Student'} • Applied: {formatDate(app.appliedAt)}
                    </p>
                  </div>

                  <Link to="/internship-manager/applications">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};