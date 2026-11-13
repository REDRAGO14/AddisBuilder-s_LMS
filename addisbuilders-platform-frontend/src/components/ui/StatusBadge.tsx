import React from 'react';
import { Badge } from './Badge';
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  FileCheck,
  Building2,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  ApprovalStatus,
  ApplicationStatus,
  VerificationStatus,
  CourseStatus,
  InternshipStatus,
  SubmissionStatus,
} from '../../types';

export interface StatusBadgeProps {
  status:
    | ApprovalStatus
    | ApplicationStatus
    | VerificationStatus
    | CourseStatus
    | InternshipStatus
    | SubmissionStatus
    | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { t } = useLanguage();

  switch (status) {
    case 'APPROVED':
    case 'VERIFIED':
    case 'ACCEPTED':
    case 'PUBLISHED':
    case 'ACTIVE':
    case 'GRADED':
      return (
        <Badge variant="success" className={className}>
          <CheckCircle2 className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-emerald-600 dark:text-emerald-400" />
          {status === 'PUBLISHED'
            ? t('status.published', 'Published')
            : status === 'VERIFIED'
            ? t('status.verified', 'Verified')
            : status === 'APPROVED'
            ? t('status.approved', 'Approved')
            : status === 'ACCEPTED'
            ? t('status.accepted', 'Accepted')
            : status === 'GRADED'
            ? t('status.graded', 'Graded')
            : t('status.active', 'Active')}
        </Badge>
      );

    case 'PENDING':
    case 'SUBMITTED':
    case 'PENDING_APPROVAL':
    case 'PENDING_REVIEW':
      return (
        <Badge variant="warning" className={className}>
          <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-amber-600 dark:text-amber-400" />
          {status === 'SUBMITTED'
            ? t('status.submitted', 'Submitted')
            : status === 'PENDING_APPROVAL'
            ? t('status.pendingApproval', 'Pending Approval')
            : t('status.pendingReview', 'Pending Review')}
        </Badge>
      );

    case 'RETURNED':
      return (
        <Badge variant="warning" className={className}>
          <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-amber-600 dark:text-amber-400" />
          {t('status.returned', 'Returned')}
        </Badge>
      );

    case 'REVIEWING':
    case 'SHORTLISTED':
    case 'INTERVIEW_SCHEDULED':
      return (
        <Badge variant="info" className={className}>
          <Send className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-blue-600 dark:text-blue-400" />
          {status === 'REVIEWING'
            ? t('status.underReview', 'Under Review')
            : status === 'SHORTLISTED'
            ? t('status.shortlisted', 'Shortlisted')
            : t('status.interviewScheduled', 'Interview Scheduled')}
        </Badge>
      );

    case 'UNVERIFIED':
      return (
        <Badge variant="neutral" className={className}>
          <Building2 className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-slate-500 dark:text-neutral-400" />
          {t('status.unverified', 'Unverified')}
        </Badge>
      );

    case 'DRAFT':
      return (
        <Badge variant="neutral" className={className}>
          <FileCheck className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-slate-500 dark:text-neutral-400" />
          {t('status.draft', 'Draft')}
        </Badge>
      );

    case 'REJECTED':
      return (
        <Badge variant="danger" className={className}>
          <XCircle className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-red-600 dark:text-red-400" />
          {t('status.rejected', 'Rejected')}
        </Badge>
      );

    case 'SUSPENDED':
    case 'CLOSED':
    case 'ARCHIVED':
    case 'INACTIVE':
    case 'LATE':
      return (
        <Badge variant="danger" className={className}>
          <AlertTriangle className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1 text-rose-600 dark:text-rose-400" />
          {status === 'SUSPENDED'
            ? t('status.suspended', 'Suspended')
            : status === 'CLOSED'
            ? t('status.closed', 'Closed')
            : status === 'ARCHIVED'
            ? t('status.archived', 'Archived')
            : status === 'LATE'
            ? t('status.late', 'Late')
            : t('status.inactive', 'Inactive')}
        </Badge>
      );

    default:
      return <Badge className={className}>{status}</Badge>;
  }
};
