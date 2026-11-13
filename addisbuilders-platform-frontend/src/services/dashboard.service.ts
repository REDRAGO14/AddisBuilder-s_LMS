import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { LearnerDashboardResponse, MentorDashboardResponse } from '../types';

export const dashboardService = {
  async getLearnerDashboard(): Promise<LearnerDashboardResponse> {
    if (USE_MOCK) {
      const [courses, asgs, subs, apps, saved] = await Promise.all([
        mockStorage.getCourses(),
        mockStorage.getAssignments(),
        mockStorage.getSubmissions(),
        mockStorage.getApplications(),
        mockStorage.getInternships(),
      ]);

      const enrolled = courses.filter((c) => c.isEnrolled);
      const active = enrolled.filter((c) => (c.progressPercentage || 0) < 100);
      const completed = enrolled.filter((c) => (c.progressPercentage || 0) === 100);
      const mySubs = subs.filter((s) => s.studentId === 'user-learner-1');
      const graded = mySubs.filter((s) => s.status === 'GRADED');
      const totalScore = graded.reduce((sum, s) => sum + (s.grade || 0), 0);
      const avgGrade = graded.length > 0 ? Number((totalScore / graded.length).toFixed(1)) : 88.5;

      return {
        learnerId: 1,
        learnerName: 'Abebe Kebede',
        enrolledCourses: enrolled.length || 3,
        activeCourses: active.length || 2,
        completedCourses: completed.length || 1,
        totalLessons: 42,
        completedLessons: 28,
        overallCompletionPercentage: 66.7,
        pendingAssignments: asgs.length || 4,
        submittedAssignments: mySubs.length || 3,
        gradedSubmissions: graded.length || 2,
        averageGrade: avgGrade,
        savedInternships: saved.filter((i) => i.isSaved).length || 2,
        internshipApplications: apps.length || 2,
        unreadNotifications: 3,
      };
    }

    const response = await apiClient.get<LearnerDashboardResponse>('/dashboard/learner');
    return response.data;
  },

  async getMentorDashboard(): Promise<MentorDashboardResponse> {
    if (USE_MOCK) {
      const [courses, asgs, subs] = await Promise.all([
        mockStorage.getCourses(),
        mockStorage.getAssignments(),
        mockStorage.getSubmissions(),
      ]);

      const published = courses.filter((c) => c.status === 'PUBLISHED');
      const drafts = courses.filter((c) => c.status === 'DRAFT');
      const pendingGrading = subs.filter((s) => s.status === 'SUBMITTED' || s.status === 'UNDER_REVIEW');
      const graded = subs.filter((s) => s.status === 'GRADED');
      const totalScore = graded.reduce((sum, s) => sum + (s.grade || 0), 0);
      const avgGrade = graded.length > 0 ? Number((totalScore / graded.length).toFixed(1)) : 85.0;

      return {
        mentorId: 1,
        mentorName: 'Dr. Hanna Tesfaye',
        totalCourses: courses.length || 3,
        publishedCourses: published.length || 2,
        draftCourses: drafts.length || 1,
        totalStudents: 124,
        activeStudents: 110,
        completedStudents: 14,
        totalAssignments: asgs.length || 5,
        upcomingAssignments: 2,
        pendingSubmissions: pendingGrading.length || 4,
        gradedSubmissions: graded.length || 8,
        averageGrade: avgGrade,
        unreadNotifications: 2,
      };
    }

    const response = await apiClient.get<MentorDashboardResponse>('/dashboard/mentor');
    return response.data;
  },
};
