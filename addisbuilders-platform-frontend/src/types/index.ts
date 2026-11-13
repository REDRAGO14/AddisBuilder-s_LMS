export type UserRole =
  | 'LEARNER'
  | 'MENTOR'
  | 'INTERNSHIP_COORDINATOR'
  | 'EMPLOYER'
  | 'SUPER_ADMIN';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export type ApprovalStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'SUSPENDED';

export type VerificationStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  // Legacy aliases for UI display backward compatibility
  | 'UNVERIFIED'
  | 'VERIFIED';

export type CourseLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'ALL_LEVELS';

export type CourseStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type MaterialType =
  | 'DOCUMENT'
  | 'VIDEO'
  | 'LINK'
  | 'SLIDE'
  | 'DATASET'
  | 'OTHER'
  | 'PDF'; // backward compatibility

export type ContentType =
  | 'TEXT'
  | 'VIDEO_URL'
  | 'PDF_DOWNLOAD'
  | 'LINK'
  | 'VIDEO'
  | 'ARTICLE'
  | 'LAB'
  | 'READING'
  | 'DOCUMENT';

export type EnrollmentStatus =
  | 'ACTIVE'
  | 'COMPLETED'
  | 'DROPPED';

export type SubmissionStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'GRADED'
  | 'RETURNED'
  | 'LATE';

export type InternshipStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'PUBLISHED'
  | 'CLOSED'
  | 'REJECTED'
  | 'PENDING_APPROVAL';

export type WorkMode =
  | 'ONSITE'
  | 'ON_SITE'
  | 'HYBRID'
  | 'REMOTE';

export type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'REJECTED'
  // Legacy aliases for UI translation
  | 'PENDING'
  | 'REVIEWING';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  status?: UserStatus;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  university?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  proofDocumentUrl?: string;
  cvUrl?: string;
  coordinatorStatus?: ApprovalStatus;
  mentorStatus?: ApprovalStatus;
  organizationId?: string;
  createdAt: string;
  isActive: boolean;
}

export interface AuthResponse {
  id?: number | string;
  token?: string | null;
  type?: string;
  email?: string;
  fullName?: string;
  role?: UserRole;
  coordinatorStatus?: ApprovalStatus | null;
  mentorStatus?: ApprovalStatus | null;
  university?: string | null;
  department?: string | null;
  employeeId?: string | null;
  proofDocumentUrl?: string | null;
  phone?: string | null;
  bio?: string | null;
  studentId?: string | null;
  cvUrl?: string | null;
  avatarUrl?: string | null;
  organizationId?: number | string | null;
  createdAt?: string;
  isActive?: boolean;
  // Compatibility with mock session storage
  user?: User;
  refreshToken?: string;
}

export interface CourseMaterial {
  id: string;
  courseId?: string | number;
  title: string;
  description?: string;
  type: MaterialType;
  url: string;
  order?: number;
  size?: string;
  duration?: string;
  uploadedAt?: string;
  createdAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  categoryId?: number;
  categoryName?: string;
  level: CourseLevel;
  durationWeeks: number;
  instructorId: string;
  instructorName: string;
  instructorTitle?: string;
  instructorAvatar?: string;
  thumbnailUrl: string;
  learningObjectives: string[] | string;
  materials: CourseMaterial[];
  status: CourseStatus;
  enrolledStudentsCount: number;
  isEnrolled?: boolean;
  progressPercentage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: ContentType;
  body?: string;
  contentUrl?: string;
  duration?: string;
  durationMinutes?: number;
  content?: string;
  videoUrl?: string;
  documentUrl?: string;
  lessonOrder?: number;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  moduleOrder?: number;
  lessons: Lesson[];
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatarUrl?: string;
  studentUniversity?: string;
  studentDepartment?: string;
  enrollmentDate: string;
  enrolledAt?: string;
  status: EnrollmentStatus;
  progressPercentage: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  instructorId: string;
}

export interface CourseProgressResponse {
  courseId: number;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  completedLessonIds: number[];
}

export interface Assignment {
  dueAt?: string;
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  instructions?: string;
  dueDate: string;
  totalPoints?: number;
  maxPoints?: number;
  attachmentUrl?: string;
  submissionsCount?: number;
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseId: string;
  courseTitle: string;
  studentId?: string;
  learnerId?: number | string;
  studentName?: string;
  learnerName?: string;
  studentAvatarUrl?: string;
  learnerAvatarUrl?: string;
  studentEmail?: string;
  learnerEmail?: string;
  submittedAt: string;
  content?: string;
  textAnswer?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  fileUrl?: string;
  grade?: number;
  feedback?: string;
  status: SubmissionStatus;
  gradedAt?: string;
}

export interface Internship {
  id: string;
  organizationId: string; // or number depending on your preference, but keep it consistent
  organizationName: string;
  organizationLogo?: string;
  title: string;
  category: string;
  workMode: 'ONSITE' | 'HYBRID' | 'REMOTE';
  location: string;
  durationMonths: number;
  deadline: string;
  stipend?: string;
  description: string;
  responsibilities: string[] | string;
  requirements: string[] | string;
  eligibility: string;
  status: InternshipStatus;
  postedById: string;
  postedByRole: string;
  applicantsCount?: number;
  createdAt?: string;
  isSaved?: boolean;
  hasApplied?: boolean;
}
export interface InternshipApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  organizationName: string;
  applicantId?: string;
  learnerId?: number | string;
  applicantName?: string;
  learnerName?: string;
  applicantEmail?: string;
  learnerEmail?: string;
  applicantPhone?: string;
  learnerPhone?: string;
  university?: string;
  department?: string;
  coverLetter: string;
  cvUrl?: string;
  resumeUri?: string;
  cvFileName?: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes?: string;
}

export interface OrganizationDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Organization {
  id: string;
  ownerId?: number | string;
  name: string;
  industry: string;
  description: string;
  website: string;
  location: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  registrationNumber?: string;
  taxId?: string;
  verificationDocumentName?: string;
  verificationDocumentUrl?: string;
  documents?: OrganizationDocument[];
  createdAt: string;
}

export interface CoordinatorRequest {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  university: string;
  department: string;
  employeeId: string;
  proofDocumentUrl?: string;
  status: ApprovalStatus;
  requestDate: string;
  decisionDate?: string;
  decisionNotes?: string;
}

export interface MentorRequest {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  university: string;
  department: string;
  employeeId: string;
  proofDocumentUrl: string;
  status: ApprovalStatus;
  requestDate: string;
  decisionDate?: string;
  decisionNotes?: string;
}

export interface Notification {
  id: string;
  userId?: string | number;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface DashboardStats {
  totalLearners?: number;
  totalMentors?: number;
  totalCourses?: number;
  totalInternships?: number;
  totalApplications?: number;
  totalOrganizations?: number;
  verifiedOrganizations?: number;
  pendingApprovals?: number;
  pendingVerifications?: number;
  publishedCourses?: number;
  activeEnrollments?: number;
  completionRate?: number;
  submissionsCount?: number;
  gradesPending?: number;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
}

export interface LeaderboardEntryResponse {
  rank: number;
  learnerId: number;
  learnerName: string;
  university?: string;
  department?: string;
  completedLessons: number;
  gradedSubmissions: number;
  averageGrade: number;
  points: number;
}

export interface AchievementResponse {
  code: string;
  title: string;
  description: string;
  earned: boolean;
  progressHint?: string;
}

export interface StudyPlanItem {
  lessonId: number;
  lessonTitle: string;
  moduleId: number;
  moduleTitle: string;
  durationMinutes: number;
  week: number;
  status: string;
}

export interface StudyPlanResponse {
  courseId: number;
  courseTitle: string;
  totalLessons: number;
  remainingLessons: number;
  estimatedWeeks: number;
  weeklyMinutes: number;
  items: StudyPlanItem[];
}

export interface ProgressSummaryResponse {
  learnerId: number;
  summary: string;
  enrolledCourses: number;
  completedLessons: number;
  totalLessons: number;
  completionPercentage: number;
  gradedSubmissions: number;
  averageGrade: number;
  strengths: string[];
  recommendations: string[];
}

export interface InternshipMatchResponse {
  internshipId: number;
  title: string;
  organizationName: string;
  category: string;
  workMode: WorkMode;
  location: string;
  matchScore: number;
  reasons: string[];
}

export interface AiAnswerResponse {
  answer: string;
  sources: string[];
  aiGenerated: boolean;
}

export interface LearnerDashboardResponse {
  learnerId: number;
  learnerName: string;
  enrolledCourses: number;
  activeCourses: number;
  completedCourses: number;
  totalLessons: number;
  completedLessons: number;
  overallCompletionPercentage: number;
  pendingAssignments: number;
  submittedAssignments: number;
  gradedSubmissions: number;
  averageGrade: number;
  savedInternships: number;
  internshipApplications: number;
  unreadNotifications: number;
}

export interface MentorDashboardResponse {
  mentorId: number;
  mentorName: string;
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalStudents: number;
  activeStudents: number;
  completedStudents: number;
  totalAssignments: number;
  upcomingAssignments: number;
  pendingSubmissions: number;
  gradedSubmissions: number;
  averageGrade: number;
  unreadNotifications: number;
}

export interface AdminReportResponse {
  totalLearners: number;
  totalMentors: number;
  totalCourses: number;
  totalInternships: number;
  totalApplications: number;
  totalOrganizations: number;
  verifiedOrganizations: number;
  pendingApprovals: number;
  pendingVerifications: number;
  publishedCourses: number;
  activeEnrollments: number;
  completionRate: number;
  submissionsCount: number;
  gradesPending: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: number;
  statusCode?: number;
  errors?: Record<string, string>;
  timestamp?: string;
}
