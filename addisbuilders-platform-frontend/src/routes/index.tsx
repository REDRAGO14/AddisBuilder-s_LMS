import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, RoleGuard, CoordinatorApprovalGuard, MentorApprovalGuard } from './RouteGuards';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { ServicesPage } from '../pages/public/ServicesPage';
import { CoursesPage } from '../pages/public/CoursesPage';
import { CourseDetailPage } from '../pages/public/CourseDetailPage';
import { InternshipsPage } from '../pages/public/InternshipsPage';
import { InternshipDetailPage } from '../pages/public/InternshipDetailPage';
import { ContactPage } from '../pages/public/ContactPage';
import { AccessDeniedPage } from '../pages/public/AccessDeniedPage';
import { CoordinatorPendingPage } from '../pages/public/CoordinatorPendingPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';

// Learner Pages
import { LearnerDashboardPage } from '../pages/learner/LearnerDashboardPage';
import { LearnerCoursesPage } from '../pages/learner/LearnerCoursesPage';
import { LearnerCourseLearnPage } from '../pages/learner/LearnerCourseLearnPage';
import { LearnerAssignmentsPage } from '../pages/learner/LearnerAssignmentsPage';
import { LearnerSavedInternshipsPage } from '../pages/learner/LearnerSavedInternshipsPage';
import { LearnerApplicationsPage } from '../pages/learner/LearnerApplicationsPage';
import { LearnerProgressPage } from '../pages/learner/LearnerProgressPage';
import { LearnerProfilePage } from '../pages/learner/LearnerProfilePage';
import { LearnerLeaderboardPage } from '../pages/learner/LearnerLeaderboardPage';
import { LearnerAiAssistantPage } from '../pages/learner/LearnerAiAssistantPage';

// Mentor Pages
import { MentorDashboardPage } from '../pages/mentor/MentorDashboardPage';
import { MentorCoursesPage } from '../pages/mentor/MentorCoursesPage';
import { MentorCourseEditorPage } from '../pages/mentor/MentorCourseEditorPage';
import { MentorCurriculumBuilderPage } from '../pages/mentor/MentorCurriculumBuilderPage';
import { MentorMaterialsPage } from '../pages/mentor/MentorMaterialsPage';
import { MentorAssignmentsPage } from '../pages/mentor/MentorAssignmentsPage';
import { MentorSubmissionsPage } from '../pages/mentor/MentorSubmissionsPage';
import { MentorStudentsPage } from '../pages/mentor/MentorStudentsPage';

// Coordinator Pages
import { CoordinatorDashboardPage } from '../pages/internship-manager/CoordinatorDashboardPage';
import { CoordinatorInternshipsPage } from '../pages/internship-manager/CoordinatorInternshipsPage';
import { CoordinatorInternshipEditorPage } from '../pages/internship-manager/CoordinatorInternshipEditorPage';
import { CoordinatorApplicationsPage } from '../pages/internship-manager/CoordinatorApplicationsPage';

// Employer Pages
import { EmployerDashboardPage } from '../pages/employer/EmployerDashboardPage';
import { EmployerProfilePage } from '../pages/employer/EmployerProfilePage';
import { EmployerVerificationPage } from '../pages/employer/EmployerVerificationPage';
import { EmployerInternshipsPage } from '../pages/employer/EmployerInternshipsPage';
import { EmployerInternshipEditorPage } from '../pages/employer/EmployerInternshipEditorPage';
import { EmployerApplicantsPage } from '../pages/employer/EmployerApplicantsPage';
import { EmployerAnalyticsPage } from '../pages/employer/EmployerAnalyticsPage';

// Super Admin Pages
import { AdminDashboardPage } from '../pages/super-admin/AdminDashboardPage';
import { AdminUsersPage } from '../pages/super-admin/AdminUsersPage';
import { AdminCoordinatorApprovalsPage } from '../pages/super-admin/AdminCoordinatorApprovalsPage';
import { AdminMentorApprovalsPage } from '../pages/super-admin/AdminMentorApprovalsPage';
import { AdminOrganizationsPage } from '../pages/super-admin/AdminOrganizationsPage';
import { AdminModerationPage } from '../pages/super-admin/AdminModerationPage';
import { AdminCoursesPage } from '../pages/super-admin/AdminCoursesPage';
import { AdminReportsPage } from '../pages/super-admin/AdminReportsPage';
import { AdminAuditLogsPage } from '../pages/super-admin/AdminAuditLogsPage';
import { AdminSettingsPage } from '../pages/super-admin/AdminSettingsPage';

// Shared Notification Page
import { NotificationsPage } from '../pages/common/NotificationsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/internships/:internshipId" element={<InternshipDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="/unauthorized" element={<AccessDeniedPage />} />
        <Route path="/coordinator-pending" element={<CoordinatorPendingPage />} />
        <Route path="/pending-approval" element={<CoordinatorPendingPage />} />
      </Route>

      {/* Authentication Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* 4.1 Learner Protected Routes */}
      <Route
        path="/learner"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['LEARNER']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/learner/dashboard" replace />} />
        <Route path="dashboard" element={<LearnerDashboardPage />} />
        <Route path="courses" element={<LearnerCoursesPage />} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route path="courses/:courseId/learn" element={<LearnerCourseLearnPage />} />
        <Route path="assignments" element={<LearnerAssignmentsPage />} />
        <Route path="assignments/:assignmentId" element={<LearnerAssignmentsPage />} />
        <Route path="internships" element={<InternshipsPage />} />
        <Route path="saved-internships" element={<LearnerSavedInternshipsPage />} />
        <Route path="applications" element={<LearnerApplicationsPage />} />
        <Route path="progress" element={<LearnerProgressPage />} />
        <Route path="leaderboard" element={<LearnerLeaderboardPage />} />
        <Route path="ai-assistant" element={<LearnerAiAssistantPage />} />
        <Route path="profile" element={<LearnerProfilePage />} />
        <Route
          path="notifications"
          element={<NotificationsPage rolePrefix="learner" roleLabel="Learner" />}
        />
      </Route>

      {/* 4.2 Mentor Protected Routes */}
      <Route
        path="/mentor"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['MENTOR']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/mentor/dashboard" replace />} />
        <Route path="dashboard" element={<MentorDashboardPage />} />
        <Route path="courses" element={<MentorCoursesPage />} />
        <Route path="courses/new" element={<MentorApprovalGuard><MentorCourseEditorPage /></MentorApprovalGuard>} />
        <Route path="courses/:courseId/edit" element={<MentorApprovalGuard><MentorCourseEditorPage /></MentorApprovalGuard>} />
        <Route path="courses/:courseId/curriculum" element={<MentorApprovalGuard><MentorCurriculumBuilderPage /></MentorApprovalGuard>} />
        <Route path="students" element={<MentorStudentsPage />} />
        <Route path="students/:studentId" element={<MentorStudentsPage />} />
        <Route path="materials" element={<MentorApprovalGuard><MentorMaterialsPage /></MentorApprovalGuard>} />
        <Route path="courses/:courseId/materials" element={<MentorApprovalGuard><MentorMaterialsPage /></MentorApprovalGuard>} />
        <Route path="assignments" element={<MentorAssignmentsPage />} />
        <Route path="assignments/new" element={<MentorApprovalGuard><MentorAssignmentsPage /></MentorApprovalGuard>} />
        <Route path="submissions" element={<MentorApprovalGuard><MentorSubmissionsPage /></MentorApprovalGuard>} />
        <Route path="progress" element={<LearnerProgressPage />} />
        <Route path="profile" element={<LearnerProfilePage />} />
        <Route
          path="notifications"
          element={<NotificationsPage rolePrefix="mentor" roleLabel="Mentor" />}
        />
      </Route>

      {/* 4.3 Internship Coordinator Protected Routes */}
      <Route
        path="/internship-manager"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['INTERNSHIP_COORDINATOR']}>
              <CoordinatorApprovalGuard>
                <DashboardLayout />
              </CoordinatorApprovalGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/internship-manager/dashboard" replace />} />
        <Route path="dashboard" element={<CoordinatorDashboardPage />} />
        <Route path="internships" element={<CoordinatorInternshipsPage />} />
        <Route path="internships/new" element={<CoordinatorInternshipEditorPage />} />
        <Route path="/internship-manager/internships/:id/edit" element={<CoordinatorInternshipEditorPage />} />
        <Route path="applications" element={<CoordinatorApplicationsPage />} />
        <Route path="profile" element={<LearnerProfilePage />} />
        <Route
          path="notifications"
          element={
            <NotificationsPage rolePrefix="internship-manager" roleLabel="Coordinator" />
          }
        />
      </Route>

      {/* 4.4 Employer / Organization Protected Routes */}
      <Route
        path="/employer"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['EMPLOYER']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/employer/dashboard" replace />} />
        <Route path="dashboard" element={<EmployerDashboardPage />} />
        <Route path="organization" element={<EmployerProfilePage />} />
        <Route path="verification" element={<EmployerVerificationPage />} />
        <Route path="internships" element={<EmployerInternshipsPage />} />
        <Route path="internships/new" element={<EmployerInternshipEditorPage />} />
        <Route path="internships/:internshipId/edit" element={<EmployerInternshipEditorPage />} />
        <Route path="applicants" element={<EmployerApplicantsPage />} />
        <Route path="analytics" element={<EmployerAnalyticsPage />} />
        <Route
          path="notifications"
          element={<NotificationsPage rolePrefix="employer" roleLabel="Employer" />}
        />
      </Route>

      {/* 4.5 Super Admin Protected Routes */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['SUPER_ADMIN']}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="coordinator-approvals" element={<AdminCoordinatorApprovalsPage />} />
        <Route path="mentor-approvals" element={<AdminMentorApprovalsPage />} />
        <Route path="organizations" element={<AdminOrganizationsPage />} />
        <Route path="moderation" element={<AdminModerationPage />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Catch-all Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
