import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Internship } from '../types';

export const internshipsService = {
  async getInternships(filters?: {
    category?: string;
    workMode?: string;
    search?: string;
    postedById?: string;
    status?: string;
  }): Promise<Internship[]> {
    if (USE_MOCK) {
      let list = await mockStorage.getInternships();
      if (filters?.category && filters.category !== 'All') {
        list = list.filter((i) => i.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters?.workMode && filters.workMode !== 'All') {
        list = list.filter((i) => i.workMode === filters.workMode);
      }
      if (filters?.status && filters.status !== 'All') {
        list = list.filter((i) => i.status === filters.status);
      }
      if (filters?.postedById) {
        list = list.filter((i) => i.postedById === filters.postedById);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (i) =>
            i.title.toLowerCase().includes(q) ||
            i.organizationName.toLowerCase().includes(q) ||
            i.location.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q)
        );
      }
      return list;
    }

    const response = await apiClient.get<Internship[]>('/internships/listings', {
      params: {
        category: filters?.category,
        workMode: filters?.workMode,
        search: filters?.search,
      },
    });
    return response.data;
  },

  async getInternshipById(id: string): Promise<Internship> {
    if (USE_MOCK) {
      const internship = await mockStorage.getInternshipById(id);
      if (!internship) throw new Error('Internship not found');
      return internship;
    }
    const response = await apiClient.get<Internship>(`/internships/listings/${id}`);
    return response.data;
  },

  async createInternship(data: Omit<Internship, 'id' | 'createdAt' | 'applicantsCount'>): Promise<Internship> {
    const payload = {
      ...data,
      // Guaranteed fallback to Organization ID 1 so backend validation never fails
      organizationId: Number(data.organizationId || 1),
      requirements: Array.isArray(data.requirements) ? data.requirements.join('\n') : data.requirements,
      responsibilities: Array.isArray(data.responsibilities)
        ? data.responsibilities.join('\n')
        : data.responsibilities,
      deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
    };

    if (USE_MOCK) {
      return mockStorage.createInternship(data);
    }
    const response = await apiClient.post<Internship>('/internships/listings', payload);
    return response.data;
  },

  async updateInternship(id: string, updates: Partial<Internship>): Promise<Internship> {
    const payload = {
      ...updates,
      organizationId: Number(updates.organizationId || 1),
      requirements: Array.isArray(updates.requirements) ? updates.requirements.join('\n') : updates.requirements,
      responsibilities: Array.isArray(updates.responsibilities)
        ? updates.responsibilities.join('\n')
        : updates.responsibilities,
      deadline: updates.deadline ? new Date(updates.deadline).toISOString() : undefined,
    };

    if (USE_MOCK) {
      return mockStorage.updateInternship(id, updates);
    }
    const response = await apiClient.patch<Internship>(`/internships/listings/${id}`, payload);
    return response.data;
  },

  async closeInternship(id: string): Promise<Internship> {
    if (USE_MOCK) {
      return mockStorage.updateInternship(id, { status: 'CLOSED' });
    }
    const response = await apiClient.post<Internship>(`/internships/listings/${id}/close`);
    return response.data;
  },

  async deleteInternship(id: string): Promise<void> {
    if (USE_MOCK) {
      const list = await mockStorage.getInternships();
      const filtered = list.filter((i) => String(i.id) !== String(id));
      localStorage.setItem('addis_mock_internships', JSON.stringify(filtered));
      return;
    }
    await apiClient.delete(`/internships/listings/${id}`);
  },

  async toggleSave(id: string): Promise<{ isSaved: boolean }> {
    if (USE_MOCK) {
      return mockStorage.toggleSaveInternship(id);
    }
    const response = await apiClient.post<{ isSaved: boolean }>(`/internships/listings/${id}/save`);
    return response.data;
  },

  async getSavedInternships(): Promise<Internship[]> {
    if (USE_MOCK) {
      const list = await mockStorage.getInternships();
      return list.filter((i) => i.isSaved);
    }
    const response = await apiClient.get<Internship[]>('/internships/saved');
    return response.data;
  },

  async getMyInternships(): Promise<Internship[]> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      const list = await mockStorage.getInternships();
      return list.filter((i) => i.postedById === user?.id || i.organizationId === user?.organizationId);
    }
    const response = await apiClient.get<Internship[]>('/internships/mine');
    return response.data;
  },

  async getAllInternshipsAdmin(): Promise<Internship[]> {
    if (USE_MOCK) {
      return mockStorage.getInternships();
    }
    const response = await apiClient.get<Internship[]>('/internships/admin');
    return response.data;
  },
};