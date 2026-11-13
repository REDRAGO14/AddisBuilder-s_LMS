import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Organization, VerificationStatus } from '../types';

export const organizationsService = {
  async getPublicOrganizations(): Promise<Organization[]> {
    if (USE_MOCK) {
      const org = await mockStorage.getOrganization();
      return org ? [org] : [];
    }
    const response = await apiClient.get<Organization[]>('/organizations');
    return response.data;
  },

  async getPublicOrganizationById(id: string): Promise<Organization> {
    if (USE_MOCK) {
      const org = await mockStorage.getOrganization();
      if (!org) throw new Error('Organization not found');
      return org;
    }
    const response = await apiClient.get<Organization>(`/organizations/${id}`);
    return response.data;
  },

  async createOrganization(data: {
    name: string;
    description?: string;
    website?: string;
    logoUrl?: string;
    industry?: string;
    location?: string;
    contactEmail?: string;
    contactPhone?: string;
  }): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.updateOrganization(data);
    }
    const response = await apiClient.post<Organization>('/organizations', data);
    return response.data;
  },

  async getMyOrganization(): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.getOrganization();
    }
    const response = await apiClient.get<Organization>('/organizations/my');
    return response.data;
  },

  async updateMyOrganization(updates: Partial<Organization>): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.updateOrganization(updates);
    }
    const response = await apiClient.patch<Organization>('/organizations/my', updates);
    return response.data;
  },

  async submitVerification(data: {
    registrationNumber: string;
    taxId: string;
    documentName: string;
    documentUrl: string;
    notes?: string;
  }): Promise<Organization> {
    if (USE_MOCK) {
      return mockStorage.submitOrganizationVerification(data);
    }
    const response = await apiClient.post<Organization>('/organizations/me/verification', data);
    return response.data;
  },

  async getAllOrganizationsAdmin(): Promise<Organization[]> {
    if (USE_MOCK) {
      const org = await mockStorage.getOrganization();
      return org ? [org] : [];
    }
    const response = await apiClient.get<Organization[]>('/admin/organizations');
    return response.data;
  },

  async decideVerificationAdmin(
    id: string = 'org-brolf-1',
    status: VerificationStatus,
    notes?: string
  ): Promise<Organization> {
    // Map legacy 'VERIFIED' to backend 'APPROVED'
    const backendStatus = status === 'VERIFIED' ? 'APPROVED' : status === 'UNVERIFIED' ? 'REJECTED' : status;

    if (USE_MOCK) {
      return mockStorage.setOrganizationVerificationStatus(backendStatus, notes);
    }
    const response = await apiClient.post<Organization>(`/admin/organizations/${id}/verification-decision`, {
      status: backendStatus,
      notes,
    });
    return response.data;
  },
};
