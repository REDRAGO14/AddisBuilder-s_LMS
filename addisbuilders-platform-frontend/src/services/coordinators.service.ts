import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { CoordinatorRequest, ApprovalStatus } from '../types';

export const coordinatorsService = {
  async getMyStatus(): Promise<{ status: ApprovalStatus; notes?: string }> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (!user) return { status: 'PENDING' };
      const live = await mockStorage.getUserById(user.id);
      return {
        status: live?.coordinatorStatus || user.coordinatorStatus || 'PENDING',
      };
    }
    const response = await apiClient.get<{ status: ApprovalStatus; notes?: string }>('/coordinators/me/status');
    return response.data;
  },

  async getAdminRequests(): Promise<CoordinatorRequest[]> {
    if (USE_MOCK) {
      return mockStorage.getCoordinatorRequests();
    }
    const response = await apiClient.get<CoordinatorRequest[]>('/admin/coordinator-requests');
    return response.data;
  },

  async decideRequest(id: string, decision: ApprovalStatus, notes?: string): Promise<CoordinatorRequest> {
    if (USE_MOCK) {
      return mockStorage.decideCoordinatorRequest(id, decision, notes);
    }
    const response = await apiClient.post<CoordinatorRequest>(`/admin/coordinator-requests/${id}/decision`, {
      status: decision,
      notes,
    });
    return response.data;
  },
};
