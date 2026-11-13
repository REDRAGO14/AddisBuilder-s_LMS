import { UserRole } from '../types';

export const APP_NAME = "AddisBuilder's";
export const APP_TAGLINE = 'University Learning & Internship Platform';
export const DEFAULT_API_BASE_URL = 'http://localhost:8080/api';

export const USER_ROLES: Record<UserRole, { label: string; badgeColor: string; defaultPath: string }> = {
  LEARNER: {
    label: 'Student / Learner',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    defaultPath: '/learner/dashboard',
  },
  MENTOR: {
    label: 'Mentor / Instructor',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    defaultPath: '/mentor/dashboard',
  },
  INTERNSHIP_COORDINATOR: {
    label: 'Internship Coordinator',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    defaultPath: '/internship-manager/dashboard',
  },
  EMPLOYER: {
    label: 'Organization / Employer',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    defaultPath: '/employer/dashboard',
  },
  SUPER_ADMIN: {
    label: 'Super Admin',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    defaultPath: '/super-admin/dashboard',
  },
};

export const COURSE_CATEGORIES = [
  'Computer Science',
  'Software Engineering',
  'Data Science & AI',
  'Cybersecurity',
  'Electrical Engineering',
  'Business & Entrepreneurship',
  'UI/UX Design',
  'Cloud & DevOps',
];

export const INTERNSHIP_CATEGORIES = [
  'Software Development',
  'Frontend Engineering',
  'Backend Engineering',
  'Mobile App Development',
  'Data Analysis',
  'Network Engineering',
  'UI/UX Design',
  'Project Management',
];

export const WORK_MODES = [
  { value: 'ONSITE', label: 'On-site' },
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'REMOTE', label: 'Remote' },
];

export const COURSE_LEVELS = [
  { value: 'ALL_LEVELS', label: 'All Levels' },
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
];

export const MATERIAL_TYPES = [
  { value: 'SLIDE', label: 'Presentation Slides' },
  { value: 'DOCUMENT', label: 'Reading Document / PDF' },
  { value: 'VIDEO', label: 'Video Lecture' },
  { value: 'LINK', label: 'External Resource Link' },
  { value: 'DATASET', label: 'Sample Dataset / Lab Code' },
  { value: 'OTHER', label: 'Other Material' },
];

export const APPLICATION_STATUS_LABELS: Record<string, { label: string; badge: string }> = {
  SUBMITTED: { label: 'Submitted', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  UNDER_REVIEW: { label: 'Under Review', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  SHORTLISTED: { label: 'Shortlisted', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
  INTERVIEW_SCHEDULED: { label: 'Interview Scheduled', badge: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  ACCEPTED: { label: 'Offer Accepted', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  DECLINED: { label: 'Declined by Candidate', badge: 'bg-neutral-100 text-neutral-800 border-neutral-200' },
  REJECTED: { label: 'Not Selected', badge: 'bg-rose-100 text-rose-800 border-rose-200' },
  // Backward compatibility aliases
  PENDING: { label: 'Submitted', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  REVIEWING: { label: 'Under Review', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
};

/**
 * Curriculum lesson content types — exact backend enum (spec §6.6):
 * TEXT | VIDEO_URL | PDF_DOWNLOAD | LINK | VIDEO | ARTICLE | LAB
 * Presentation metadata only; these values are what the API accepts.
 */
export interface LessonTypeMeta {
  value: 'TEXT' | 'VIDEO_URL' | 'PDF_DOWNLOAD' | 'LINK' | 'VIDEO' | 'ARTICLE' | 'LAB';
  label: string;
  hint: string;
  /** Tailwind classes for the chip/badge container */
  badgeClass: string;
  /** Tailwind classes for the icon inside the badge */
  iconClass: string;
  /** Whether a contentUrl is the primary payload for this type */
  needsUrl: boolean;
}

export const LESSON_TYPES: LessonTypeMeta[] = [
  {
    value: 'VIDEO',
    label: 'Video',
    hint: 'Recorded lecture or screencast',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
    iconClass: 'text-violet-500',
    needsUrl: true,
  },
  {
    value: 'VIDEO_URL',
    label: 'Embedded Video',
    hint: 'External video embed (YouTube, Vimeo…)',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
    iconClass: 'text-violet-500',
    needsUrl: true,
  },
  {
    value: 'ARTICLE',
    label: 'Article',
    hint: 'Reading material with rich text body',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    iconClass: 'text-amber-500',
    needsUrl: false,
  },
  {
    value: 'LAB',
    label: 'Lab',
    hint: 'Hands-on exercise or code sandbox',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconClass: 'text-emerald-500',
    needsUrl: false,
  },
  {
    value: 'TEXT',
    label: 'Text',
    hint: 'Plain lesson notes or instructions',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    iconClass: 'text-blue-500',
    needsUrl: false,
  },
  {
    value: 'PDF_DOWNLOAD',
    label: 'PDF Download',
    hint: 'Downloadable document or dataset brief',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    iconClass: 'text-rose-500',
    needsUrl: true,
  },
  {
    value: 'LINK',
    label: 'Link',
    hint: 'External resource reference',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    iconClass: 'text-sky-500',
    needsUrl: true,
  },
];

/** Display metadata for values the backend no longer issues (legacy mocks). */
export const LESSON_TYPE_LEGACY_ALIASES: Record<string, LessonTypeMeta['value']> = {
  READING: 'ARTICLE',
  DOCUMENT: 'PDF_DOWNLOAD',
};
