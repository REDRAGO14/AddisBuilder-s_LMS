import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { MentorRequest, ApprovalStatus } from '../types';

export const mentorsService = {
  async getMyStatus(): Promise<{ status: ApprovalStatus; notes?: string }> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (!user) return { status: 'PENDING' };
      return {
        status: user.mentorStatus || 'APPROVED',
        notes: 'Faculty credentials verified by administration.',
      };
    }
    const response = await apiClient.get<{ status: ApprovalStatus; notes?: string }>('/mentors/me/status');
    return response.data;
  },

  async getAdminRequests(): Promise<MentorRequest[]> {
    if (USE_MOCK) {
      return mockStorage.getMentorRequests();
    }
    const response = await apiClient.get<MentorRequest[]>('/admin/mentor-requests');
    return response.data;
  },

  async decideRequest(id: string, decision: ApprovalStatus, notes?: string): Promise<MentorRequest> {
    if (USE_MOCK) {
      return mockStorage.decideMentorRequest(id, decision, notes);
    }
    const response = await apiClient.post<MentorRequest>(`/admin/mentor-requests/${id}/decision`, {
      status: decision,
      notes,
    });
    return response.data;
  },
};
