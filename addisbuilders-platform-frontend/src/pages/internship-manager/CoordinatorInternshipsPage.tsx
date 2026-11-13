import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { formatDate } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle,
  Edit3,
  ExternalLink,
  Building2,
  Search,
  Briefcase,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  Filter,
} from 'lucide-react';

export const CoordinatorInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'CLOSED'>('ALL');

  useEffect(() => {
    let cancelled = false;
    internshipsService
      .getMyInternships()
      .then((data) => {
        if (!cancelled) {
          setInternships(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Filtered internships computation
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [internships, searchQuery, statusFilter]);

  // Quick Stats
  const stats = useMemo(() => {
    const total = internships.length;
    const published = internships.filter((i) => i.status === 'PUBLISHED').length;
    const drafts = internships.filter((i) => i.status === 'DRAFT').length;
    const totalApplicants = internships.reduce((sum, i) => sum + (i.applicantsCount || 0), 0);
    return { total, published, drafts, totalApplicants };
  }, [internships]);

  const columns: Column<Internship>[] = [
    {
      key: 'title',
      header: 'Listing & Organization',
      render: (i) => (
        <div className="max-w-md py-1">
          <p className="font-extrabold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 transition-colors">
            {i.title}
          </p>
          <p className="text-xs text-brand-800 font-semibold flex items-center gap-1.5 mt-1">
            <Building2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span className="truncate">{i.organizationName}</span>
          </p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Mode',
      render: (i) => (
        <div className="flex flex-col gap-1.5 items-start">
          <Badge variant="brand" className="font-bold text-[11px] px-2.5 py-0.5">
            {i.category}
          </Badge>
          <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
            {i.workMode}
          </span>
        </div>
      ),
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (i) => (
        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          {formatDate(i.deadline)}
        </div>
      ),
    },
    {
      key: 'applicants',
      header: 'Candidates',
      render: (i) => (
        <div className="flex items-center gap-1.5 font-black text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800/60 px-2.5 py-1 rounded-lg border border-neutral-200/60 dark:border-neutral-800 w-fit">
          <Users className="w-3.5 h-3.5 text-brand-700" />
          <span>{i.applicantsCount || 0}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (i) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link to={`/internship-manager/internships/edit/${i.id}`}>
            <Button size="sm" variant="outline" title="Edit listing" className="h-8 px-2.5 text-xs font-bold">
              <Edit3 className="w-3.5 h-3.5 mr-1 text-neutral-600 dark:text-neutral-400" /> Edit
            </Button>
          </Link>
          <Link to={`/internships/${i.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="Preview public listing" className="h-8 w-8 p-0">
              <ExternalLink className="w-4 h-4 text-neutral-400 hover:text-brand-700 transition-colors" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8 max-w-7xl mx-auto pb-20"
    >
      {/* Header */}
      <PageHeader
        title="Institutional Internship Listings"
        description="Review, draft, and publish accredited industry internship placements for university students."
        breadcrumbs={[
          { label: 'Coordinator', href: '/internship-manager/dashboard' },
          { label: 'Internships' },
        ]}
        actions={
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/internship-manager/internships/new">
              <Button
                size="sm"
                variant="primary"
                leftIcon={<PlusCircle className="w-4 h-4" />}
                className="font-extrabold bg-gradient-to-r from-brand-800 to-emerald-700 text-white shadow-md border-0"
              >
                Publish New Internship 🚀
              </Button>
            </Link>
          </motion.div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Placements', value: stats.total, icon: Briefcase, color: 'text-brand-800 bg-brand-50 border-brand-200' },
          { label: 'Active Live', value: stats.published, icon: CheckCircle2, color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
          { label: 'Drafts', value: stats.drafts, icon: Clock, color: 'text-amber-800 bg-amber-50 border-amber-200' },
          { label: 'Total Applicant Reach', value: stats.totalApplicants, icon: Users, color: 'text-teal-800 bg-teal-50 border-teal-200' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neutral-100/50 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">{stat.label}</span>
              <div className={`p-2 rounded-xl border ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Toolbar & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by title, organization, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-neutral-50/80 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] font-bold text-neutral-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {(['ALL', 'PUBLISHED', 'DRAFT', 'CLOSED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-brand-800 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredInternships}
          isLoading={loading}
          rowKey={(i) => i.id}
          emptyTitle="No matching internships found"
          emptyDescription="Try adjusting your search query or status filter, or publish a new placement listing."
        />
      </div>
    </motion.div>
  );
};