import { z } from 'zod';

// ==================== LOGIN ====================

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;


// ==================== REGISTER ====================

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),

    role: z.enum([
      'LEARNER',
      'MENTOR',
      'INTERNSHIP_COORDINATOR',
      'EMPLOYER',
    ] as const),

    phone: z.string().optional(),
    university: z.string().optional(),
    department: z.string().optional(),
    studentId: z.string().optional(),
    employeeId: z.string().optional(),

    proofDocumentUrl: z
      .string()
      .url('Enter a valid proof document URL')
      .startsWith('https://', 'URL must use HTTPS')
      .optional()
      .or(z.literal('')),

    organizationName: z.string().optional(),
    organizationDescription: z.string().optional(),
    organizationWebsite: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .superRefine((data, ctx) => {
    if (data.role === 'MENTOR') {
      if (!data.university?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'University is required',
          path: ['university'],
        });
      }

      if (!data.department?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Department is required',
          path: ['department'],
        });
      }

      if (!data.employeeId?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Employee ID is required',
          path: ['employeeId'],
        });
      }

      if (!data.proofDocumentUrl?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Proof document URL is required',
          path: ['proofDocumentUrl'],
        });
      }
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;


// ==================== FORGOT PASSWORD ====================

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;


// ==================== RESET PASSWORD ====================

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;


// ==================== USER PROFILE ====================

export const userProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  studentId: z.string().optional(),
  cvUrl: z.string().optional(),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;


// ==================== COURSE ====================

export const courseSchema = z.object({
  title: z
    .string()
    .min(5, 'Course title must be at least 5 characters')
    .max(200, 'Title cannot exceed 200 characters'),

  shortDescription: z
    .string()
    .min(10, 'Short description must be at least 10 characters')
    .max(200, 'Short description cannot exceed 200 characters'),

  description: z
    .string()
    .min(30, 'Detailed description must be at least 30 characters'),

  category: z.string().min(1, 'Please select a category'),
  categoryId: z.coerce.number().optional(),

  level: z.enum([
    'ALL_LEVELS',
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
  ]),

  durationWeeks: z.coerce
    .number()
    .min(1, 'Duration must be at least 1 week')
    .max(52),

  thumbnailUrl: z.string().url('Must be a valid URL').or(z.string().min(1)),

  learningObjectives: z
    .string()
    .min(10, 'List at least one learning objective (one per line)'),

  status: z.enum([
    'DRAFT',
    'PENDING_REVIEW',
    'PUBLISHED',
    'ARCHIVED',
  ]),
});

export type CourseFormData = z.infer<typeof courseSchema>;


// ==================== ASSIGNMENT ====================

export const assignmentSchema = z.object({
  courseId: z.string().min(1, 'Please select a course'),
  title: z.string().min(3, 'Assignment title is required'),
  description: z.string().min(10, 'Provide a brief summary'),
  instructions: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),

  totalPoints: z.coerce
    .number()
    .min(1, 'Total points must be at least 1')
    .max(100)
    .optional(),

  maxPoints: z.coerce
    .number()
    .min(1, 'Max points must be at least 1')
    .max(100)
    .optional(),

  attachmentUrl: z.string().optional(),
});

export type AssignmentFormData = z.infer<typeof assignmentSchema>;


// ==================== SUBMISSION ====================

export const submissionSchema = z
  .object({
    content: z.string().optional(),
    textAnswer: z.string().optional(),
    attachmentUrl: z.string().optional(),
    fileUrl: z.string().optional(),
  })
  .refine(
    (data) =>
      !!(
        data.content ||
        data.textAnswer ||
        data.attachmentUrl ||
        data.fileUrl
      ),
    {
      message: 'Please provide either a written solution or an attached file',
      path: ['content'],
    }
  );

export type SubmissionFormData = z.infer<typeof submissionSchema>;


// ==================== GRADE SUBMISSION ====================

export const gradeSubmissionSchema = z.object({
  grade: z.coerce
    .number()
    .min(0, 'Grade cannot be negative')
    .max(100, 'Grade cannot exceed 100'),

  feedback: z.string().optional(),

  status: z.enum([
    'SUBMITTED',
    'UNDER_REVIEW',
    'GRADED',
    'RETURNED',
  ]).optional(),
});

export type GradeSubmissionFormData = z.infer<typeof gradeSubmissionSchema>;


// ==================== INTERNSHIP ====================

export const internshipSchema = z.object({
  organizationId: z.coerce.number().min(1, 'Host organization is required'), // <-- Added this field
  title: z.string().min(5, 'Internship title must be at least 5 characters'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(2, 'Location is required (e.g. Addis Ababa or Remote)'),

  workMode: z.enum([
    'ONSITE',
    'HYBRID',
    'REMOTE',
  ]),

  stipend: z.string().optional(),

  durationMonths: z.coerce
    .number()
    .min(1, 'Duration must be at least 1 month')
    .max(24),

  deadline: z.string().min(1, 'Application deadline is required'),

  description: z.string().min(30, 'Full job description is required'),

  responsibilities: z
    .string()
    .min(10, 'List responsibilities (one per line)'),

  requirements: z
    .string()
    .min(10, 'List requirements (one per line)'),

  eligibility: z.string().min(5, 'Eligibility criteria is required'),

  status: z.enum([
    'DRAFT',
    'PENDING_REVIEW',
    'PUBLISHED',
    'CLOSED',
    'REJECTED',
  ]),
});

export type InternshipFormData = z.infer<typeof internshipSchema>;


// ==================== INTERNSHIP APPLICATION ====================

export const internshipApplicationSchema = z.object({
  coverLetter: z
    .string()
    .min(30, 'Cover letter must be at least 30 characters')
    .max(5000, 'Cover letter cannot exceed 5000 characters'),

  cvUrl: z.string().optional(),
  resumeUri: z.string().optional(),
});

export type InternshipApplicationFormData = z.infer<
  typeof internshipApplicationSchema
>;


// ==================== ORGANIZATION PROFILE ====================

export const organizationProfileSchema = z.object({
  name: z.string().min(2, 'Organization name is required'),
  industry: z.string().min(2, 'Industry is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  website: z.string().url('Must be a valid website URL'),
  location: z.string().min(2, 'Location is required'),
  contactEmail: z.string().email('Valid contact email is required'),
  contactPhone: z.string().min(7, 'Valid contact phone is required'),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
});

export type OrganizationProfileFormData = z.infer<
  typeof organizationProfileSchema
>;


// ==================== ORGANIZATION VERIFICATION ====================

export const organizationVerificationSchema = z.object({
  registrationNumber: z
    .string()
    .min(3, 'Official registration/license number is required'),

  taxId: z
    .string()
    .min(3, 'Tax identification number (TIN) is required'),

  documentName: z.string().min(2, 'Document name or title is required'),

  documentUrl: z
    .string()
    .min(1, 'Verification document link or file is required'),

  notes: z.string().optional(),
});

export type OrganizationVerificationFormData = z.infer<
  typeof organizationVerificationSchema
>;


// ==================== CONTACT FORM ====================

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(4, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
