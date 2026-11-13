import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/feedback/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate, apiErrorMessage } from '../../utils';
import { Bookmark, Building2, MapPin, Clock, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const LearnerSavedInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = async () => {
    try {
      // Dedicated endpoint: GET /internships/saved (includes saved listings
      // that are no longer publicly visible — the public catalogue does not).
      const saved = await internshipsService.getSavedInternships();
      setInternships(saved);
    } catch (err: any) {
      toast.error(apiErrorMessage(err, 'Failed to load saved internships'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await internshipsService.toggleSave(id);
      setInternships((prev) => prev.filter((i) => i.id !== id));
      toast.success('Removed from saved internships');
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Internships"
        description="Bookmarked opportunities to review and apply before deadlines."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Saved Internships' },
        ]}
        actions={
          <Link to="/learner/internships">
            <Button size="sm" variant="primary">
              Discover More
            </Button>
          </Link>
        }
      />

      {loading ? (
        <LoadingSpinner size="lg" label="Loading saved internships..." />
      ) : internships.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="w-8 h-8" />}
          title="No Saved Internships"
          description="Bookmark internship opportunities while browsing to keep track of upcoming application deadlines."
          action={
            <Link to="/learner/internships">
              <Button size="sm" variant="primary">
                Browse Internships
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} className="bg-white dark:bg-neutral-900 flex flex-col justify-between">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="brand">{internship.category}</Badge>
                  <button
                    onClick={() => handleRemove(internship.id)}
                    className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                  {internship.title}
                </h3>

                <p className="text-xs font-semibold text-brand-800 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {internship.organizationName}
                </p>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    {internship.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    Due: {formatDate(internship.deadline)}
                  </span>
                </div>
              </CardContent>

              <div className="p-5 pt-0">
                <Link to={`/internships/${internship.id}`} className="block">
                  <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View & Apply
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
