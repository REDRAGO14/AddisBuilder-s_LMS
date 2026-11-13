import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/feedback/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { INTERNSHIP_CATEGORIES, WORK_MODES } from '../../constants';
import { formatDate } from '../../utils';
import { Briefcase, Building2, MapPin, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { toast } from 'sonner';

export const InternshipsPage: React.FC = () => {
  const { t } = useLanguage();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [workMode, setWorkMode] = useState('All');
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    internshipsService
      .getInternships({
        search: search || undefined,
        category: category !== 'All' ? category : undefined,
        workMode: workMode !== 'All' ? workMode : undefined,
      })
      .then((data) => {
        if (isMounted) {
          setInternships(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search, category, workMode]);

  const handleToggleSave = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.info('Sign in as a student to save internships to your dashboard.');
      return;
    }
    try {
      const res = await internshipsService.toggleSave(id);
      setInternships((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isSaved: res.isSaved } : i))
      );
      toast.success(res.isSaved ? 'Internship saved to your list' : 'Internship removed from saved list');
    } catch {
      toast.error('Failed to update saved status');
    }
  };

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...INTERNSHIP_CATEGORIES.map((c) => ({ value: c, label: c })),
  ];

  const workModeOptions = [
    { value: 'All', label: t('publicPages.internships.allModes', 'All Work Modes') },
    ...WORK_MODES,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader
        title={t('publicPages.internships.title', 'Find University Internships')}
        description={t('publicPages.internships.subtitle', 'Verified practical internship opportunities from industry employers and university industry linkage programs.')}
        breadcrumbs={[{ label: t('nav.home', 'Home'), href: '/' }, { label: t('nav.internships', 'Internships') }]}
      />

      {/* Filter Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/90 dark:border-neutral-800 shadow-xs mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t('publicPages.internships.searchPlaceholder', 'Search by role, company, skills, or city...')}
          className="max-w-md w-full"
        />

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-48">
            <Select
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              options={workModeOptions}
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Internships List */}
      {loading ? (
        <LoadingSpinner size="lg" label="Searching verified internship listings..." />
      ) : internships.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-8 h-8" />}
          title="No internships found"
          description="We couldn't find any listings matching your search criteria. Try modifying your filters."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setCategory('All');
                setWorkMode('All');
              }}
            >
              Clear Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} hoverEffect className="flex flex-col h-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="brand">{internship.category}</Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                        {internship.workMode}
                      </span>
                      <button
                        onClick={(e) => handleToggleSave(internship.id, e)}
                        className="text-neutral-400 hover:text-brand-800 dark:hover:text-emerald-400 transition-colors p-1"
                        title={internship.isSaved ? 'Remove from saved' : 'Save internship'}
                      >
                        {internship.isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-brand-800 dark:text-emerald-400 fill-brand-100 dark:fill-brand-950" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                    {internship.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-800 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {internship.organizationName}
                  </p>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {internship.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1 truncate max-w-[140px]">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
                      {internship.location}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                      Deadline: {formatDate(internship.deadline)}
                    </span>
                  </div>

                  {internship.stipend && (
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                      {internship.stipend}
                    </p>
                  )}

                  <Link to={`/internships/${internship.id}`} className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      {t('common.view', 'View & Apply')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
