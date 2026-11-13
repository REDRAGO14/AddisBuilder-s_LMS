import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Assignment, AssignmentSubmission, SubmissionStatus } from '../types';

export const assignmentsService = {
  async getAssignments(courseId?: string): Promise<Assignment[]> {
    if (USE_MOCK) {
      return mockStorage.getAssignments(courseId);
    }
    if (courseId) {
      const response = await apiClient.get<Assignment[]>(`/courses/${courseId}/assignments`);
      return response.data;
    }
    const response = await apiClient.get<Assignment[]>('/assignments');
    return response.data;
  },

  async getAssignmentById(id: string): Promise<Assignment> {
    if (USE_MOCK) {
      const list = await mockStorage.getAssignments();
      const item = list.find((a) => String(a.id) === String(id));
      if (!item) throw new Error('Assignment not found');
      return item;
    }
    const response = await apiClient.get<Assignment>(`/assignments/${id}`);
    return response.data;
  },

  async createAssignment(data: {
    courseId: string;
    title: string;
    description: string;
    dueDate: string;
    totalPoints?: number;
    maxPoints?: number;
    attachmentUrl?: string;
    courseTitle?: string;
  }): Promise<Assignment> {
    const payload = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      maxPoints: Number(data.maxPoints ?? data.totalPoints ?? 100),
      attachmentUrl: data.attachmentUrl || null,
    };

    if (USE_MOCK) {
      return mockStorage.createAssignment({
        courseId: data.courseId,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        dueAt: data.dueDate,
        maxPoints: payload.maxPoints,
        totalPoints: payload.maxPoints,
        attachmentUrl: data.attachmentUrl,
        courseTitle: data.courseTitle || 'Selected Course',
      });
    }

    const response = await apiClient.post<Assignment>(`/courses/${data.courseId}/assignments`, payload);
    return response.data;
  },

  async updateAssignment(id: string, updates: Partial<Assignment>): Promise<Assignment> {
    if (USE_MOCK) {
      const list = await mockStorage.getAssignments();
      const updatedList = list.map((a) => (String(a.id) === String(id) ? { ...a, ...updates } : a));
      localStorage.setItem('addis_mock_assignments', JSON.stringify(updatedList));
      const found = updatedList.find((a) => String(a.id) === String(id));
      if (!found) throw new Error('Assignment not found');
      return found;
    }
    const response = await apiClient.patch<Assignment>(`/assignments/${id}`, updates);
    return response.data;
  },

  async deleteAssignment(id: string): Promise<void> {
    if (USE_MOCK) {
      const list = await mockStorage.getAssignments();
      const filtered = list.filter((a) => String(a.id) !== String(id));
      localStorage.setItem('addis_mock_assignments', JSON.stringify(filtered));
      return;
    }
    await apiClient.delete(`/assignments/${id}`);
  },

  async getSubmissions(assignmentId?: string, studentId?: string): Promise<AssignmentSubmission[]> {
    if (USE_MOCK) {
      return mockStorage.getSubmissions(assignmentId, studentId);
    }
    if (assignmentId) {
      const response = await apiClient.get<AssignmentSubmission[]>(`/assignments/${assignmentId}/submissions`);
      return response.data;
    }
    const response = await apiClient.get<AssignmentSubmission[]>('/assignments/submissions');
    return response.data;
  },

  async getMySubmissions(): Promise<AssignmentSubmission[]> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      return mockStorage.getSubmissions(undefined, user?.id);
    }
    const response = await apiClient.get<AssignmentSubmission[]>('/users/me/submissions');
    return response.data;
  },

  async submitAssignment(data: {
    assignmentId: string;
    assignmentTitle?: string;
    courseId?: string;
    courseTitle?: string;
    content?: string;
    textAnswer?: string;
    attachmentUrl?: string;
    attachmentName?: string;
    fileUrl?: string;
  }): Promise<AssignmentSubmission> {
    const payload = {
      textAnswer: data.textAnswer || data.content || '',
      fileUrl: data.fileUrl || data.attachmentUrl || null,
    };

    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored
        ? JSON.parse(stored)
        : { id: 'user-learner-1', fullName: 'Abebe Kebede', email: 'learner@addisbuilder.edu' };
      return mockStorage.createSubmission({
        assignmentId: data.assignmentId,
        assignmentTitle: data.assignmentTitle || 'Assignment Solution',
        courseId: data.courseId || 'course-1',
        courseTitle: data.courseTitle || 'Course Title',
        content: payload.textAnswer,
        attachmentUrl: payload.fileUrl || undefined,
        studentId: user.id,
        studentName: user.fullName,
        studentEmail: user.email,
      });
    }

    const response = await apiClient.post<AssignmentSubmission>(`/assignments/${data.assignmentId}/submit`, payload);
    return response.data;
  },

  async gradeSubmission(
    submissionId: string,
    grade: number,
    feedback?: string,
    status: SubmissionStatus = 'GRADED'
  ): Promise<AssignmentSubmission> {
    if (USE_MOCK) {
      return mockStorage.gradeSubmission(submissionId, grade, feedback || '');
    }
    const response = await apiClient.patch<AssignmentSubmission>(`/submissions/${submissionId}/grade`, {
      grade,
      feedback,
      status,
    });
    return response.data;
  },
};