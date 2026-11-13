import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatDate } from '../../utils';
import { PlusCircle, Edit, Users, ExternalLink } from 'lucide-react';

export const EmployerInternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Owner listings incl. DRAFT/CLOSED: GET /internships/mine.
    // The public catalogue (GET /internships/listings) only returns PUBLISHED.
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

  const columns: Column<Internship>[] = [
    {
      key: 'title',
      header: 'Job Title & Category',
      render: (i) => (
        <div className="max-w-md">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{i.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="brand">{i.category}</Badge>
            <span className="text-xs text-neutral-500">{i.workMode}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (i) => <span className="text-xs text-neutral-700 dark:text-neutral-300">{i.location}</span>,
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (i) => <span className="text-xs text-neutral-700 dark:text-neutral-300">{formatDate(i.deadline)}</span>,
    },
    {
      key: 'applicants',
      header: 'Applicants',
      render: (i) => (
        <span className="font-bold text-neutral-900 dark:text-neutral-100">{i.applicantsCount} candidates</span>
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
        <div className="flex items-center justify-end gap-2">
          <Link to={`/employer/applicants`}>
            <Button size="sm" variant="outline" leftIcon={<Users className="w-3.5 h-3.5" />}>
              Applicants
            </Button>
          </Link>
          <Link to={`/internships/${i.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="View live listing">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Internship Postings"
        description="Publish and maintain corporate internship listings for university talent across Ethiopia."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'My Internships' },
        ]}
        actions={
          <Link to="/employer/internships/new">
            <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Post New Internship
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={internships}
        isLoading={loading}
        rowKey={(i) => i.id}
        emptyTitle="No internships posted yet"
        emptyDescription="Create your first internship posting to connect with top university applicants."
        emptyAction={
          <Link to="/employer/internships/new">
            <Button size="sm" variant="primary">
              Post New Internship
            </Button>
          </Link>
        }
      />
    </div>
  );
};
