import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { User } from '../types';
import { UserProfileFormData } from '../schemas';

export const usersService = {
  async getProfile(): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      if (stored) {
        const u = JSON.parse(stored);
        const live = await mockStorage.getUserById(u.id);
        return live || u;
      }
      const users = await mockStorage.getUsers();
      return users[0];
    }
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  async updateProfile(data: UserProfileFormData): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const current = stored ? JSON.parse(stored) : { id: 'user-learner-1' };
      const updated = await mockStorage.updateUser(current.id, data);
      localStorage.setItem('addis_auth_user', JSON.stringify(updated));
      return updated;
    }
    const response = await apiClient.patch<User>('/users/me', data);
    return response.data;
  },

  async getAllUsers(): Promise<User[]> {
    if (USE_MOCK) {
      return mockStorage.getUsers();
    }
    const response = await apiClient.get<User[]>('/admin/users');
    return response.data;
  },

  async toggleUserActive(id: string): Promise<User> {
    if (USE_MOCK) {
      return mockStorage.toggleUserActive(id);
    }
    const response = await apiClient.patch<User>(`/admin/users/${id}/status`);
    return response.data;
  },

  async uploadProfilePhoto(file: File): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const current = stored ? JSON.parse(stored) : { id: 'user-learner-1' };
      // Simulate file conversion or blob URL
      const avatarUrl = URL.createObjectURL(file);
      const updated = await mockStorage.updateUser(current.id, { avatarUrl });
      localStorage.setItem('addis_auth_user', JSON.stringify(updated));
      return updated;
    }
    const formData = new FormData();
    formData.append('photo', file);
    const response = await apiClient.post<User>('/users/me/profile-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async removeProfilePhoto(): Promise<User> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const current = stored ? JSON.parse(stored) : { id: 'user-learner-1' };
      const updated = await mockStorage.updateUser(current.id, { avatarUrl: undefined });
      localStorage.setItem('addis_auth_user', JSON.stringify(updated));
      return updated;
    }
    const response = await apiClient.delete<User>('/users/me/profile-photo');
    return response.data;
  },
};
