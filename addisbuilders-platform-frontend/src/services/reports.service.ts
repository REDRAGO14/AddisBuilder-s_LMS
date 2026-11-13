import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { DashboardStats, AuditLog } from '../types';

export const reportsService = {
  async getOverviewStats(): Promise<DashboardStats> {
    if (USE_MOCK) {
      const [users, courses, internships, applications, coordRequests, submissions] = await Promise.all([
        mockStorage.getUsers(),
        mockStorage.getCourses(),
        mockStorage.getInternships(),
        mockStorage.getApplications(),
        mockStorage.getCoordinatorRequests(),
        mockStorage.getSubmissions(),
      ]);

      const learners = users.filter((u) => u.role === 'LEARNER').length;
      const mentors = users.filter((u) => u.role === 'MENTOR').length;
      const pendingCoords = coordRequests.filter((r) => r.status === 'PENDING').length;
      const pendingGrades = submissions.filter((s) => s.status === 'SUBMITTED').length;

      return {
        totalLearners: learners,
        totalMentors: mentors,
        totalCourses: courses.length,
        totalInternships: internships.length,
        totalApplications: applications.length,
        pendingApprovals: pendingCoords,
        pendingVerifications: 1,
        activeEnrollments: 240,
        completionRate: 88,
        submissionsCount: submissions.length,
        gradesPending: pendingGrades,
      };
    }
    const response = await apiClient.get<DashboardStats>('/admin/reports/overview');
    return response.data;
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    if (USE_MOCK) {
      return mockStorage.getAuditLogs();
    }
    const response = await apiClient.get<AuditLog[]>('/admin/audit-logs');
    return response.data;
  },
};
