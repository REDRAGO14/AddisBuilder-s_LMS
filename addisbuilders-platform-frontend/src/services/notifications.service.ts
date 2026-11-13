import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Notification } from '../types';

export const notificationsService = {
  async getNotifications(unreadOnly = false): Promise<Notification[]> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (!user) return [];
      let list = await mockStorage.getNotifications(user.id);
      if (unreadOnly) {
        list = list.filter((n) => !n.isRead);
      }
      return list;
    }
    const response = await apiClient.get<Notification[]>('/notifications', {
      params: unreadOnly ? { unreadOnly: true } : undefined,
    });
    return response.data;
  },

  async getUnreadCount(): Promise<number> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (!user) return 0;
      const list = await mockStorage.getNotifications(user.id);
      return list.filter((n) => !n.isRead).length;
    }
    const response = await apiClient.get<{ unreadCount: number }>('/notifications/unread-count');
    return response.data.unreadCount;
  },

  async markAsRead(id: string): Promise<void> {
    if (USE_MOCK) {
      return mockStorage.markNotificationRead(id);
    }
    await apiClient.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (user) await mockStorage.markAllNotificationsRead(user.id);
      return;
    }
    await apiClient.post('/notifications/read-all');
  },

  async deleteNotification(id: string): Promise<void> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (user) {
        const notifs = await mockStorage.getNotifications(user.id);
        const filtered = notifs.filter((n) => n.id !== id);
        localStorage.setItem(`addis_mock_notifs_${user.id}`, JSON.stringify(filtered));
      }
      return;
    }
    await apiClient.delete(`/notifications/${id}`);
  },

  async clearAllNotifications(): Promise<void> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      if (user) {
        localStorage.setItem(`addis_mock_notifs_${user.id}`, JSON.stringify([]));
      }
      return;
    }
    await apiClient.delete('/notifications');
  },
};
