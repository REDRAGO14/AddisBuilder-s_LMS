import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { InternshipApplication, ApplicationStatus } from '../types';

export const applicationsService = {
  async getApplications(params?: { internshipId?: string; applicantId?: string }): Promise<InternshipApplication[]> {
    if (USE_MOCK) {
      return mockStorage.getApplications(params?.internshipId, params?.applicantId);
    }
    const response = await apiClient.get<InternshipApplication[]>('/applications', { params });
    return response.data;
  },

  async getMyApplications(): Promise<InternshipApplication[]> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored ? JSON.parse(stored) : null;
      return mockStorage.getApplications(undefined, user?.id);
    }
    const response = await apiClient.get<InternshipApplication[]>('/internships/applications/my');
    return response.data;
  },

  async apply(data: {
    internshipId: string;
    internshipTitle?: string;
    organizationName?: string;
    coverLetter: string;
    cvUrl?: string;
    resumeUri?: string;
  }): Promise<InternshipApplication> {
    // Both fields are required by the backend (spec §6.12). Never fabricate a
    // resume URL — an empty value lets the API validation surface properly.
    const resumeUri = data.resumeUri || data.cvUrl || '';
    const payload = {
      coverLetter: data.coverLetter,
      resumeUri,
    };

    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const user = stored
        ? JSON.parse(stored)
        : {
            id: 'user-learner-1',
            fullName: 'Abebe Kebede',
            email: 'learner@addisbuilder.edu',
            phone: '+251 91 123 4567',
            university: 'Addis Ababa University',
            department: 'Computer Science',
          };

      return mockStorage.createApplication({
        internshipId: data.internshipId,
        internshipTitle: data.internshipTitle || 'Internship Opportunity',
        organizationName: data.organizationName || 'Partner Organization',
        coverLetter: data.coverLetter,
        cvUrl: resumeUri,
        applicantId: user.id,
        applicantName: user.fullName,
        applicantEmail: user.email,
        applicantPhone: user.phone,
        university: user.university,
        department: user.department,
        cvFileName: 'Candidate_Resume.pdf',
      });
    }

    const response = await apiClient.post<InternshipApplication>(
      `/internships/listings/${data.internshipId}/apply`,
      payload
    );
    return response.data;
  },

  async updateStatus(id: string, status: ApplicationStatus, notes?: string): Promise<InternshipApplication> {
    if (USE_MOCK) {
      return mockStorage.updateApplicationStatus(id, status, notes);
    }
    const response = await apiClient.patch<InternshipApplication>(`/applications/${id}/status`, { status, notes });
    return response.data;
  },
};
