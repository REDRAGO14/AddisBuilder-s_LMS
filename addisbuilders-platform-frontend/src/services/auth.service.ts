import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { User, AuthResponse } from '../types';
import { LoginFormData, RegisterFormData } from '../schemas';

const TOKEN_KEY = 'addis_auth_token';
const USER_KEY = 'addis_auth_user';

function normalizeAuthUser(data: AuthResponse): User {
  if (data.user) {
    return data.user;
  }
  return {
    id: String(data.id ?? ''),
    email: data.email ?? '',
    fullName: data.fullName ?? '',
    role: data.role ?? 'LEARNER',
    avatarUrl: data.avatarUrl ?? undefined,
    phone: data.phone ?? undefined,
    bio: data.bio ?? undefined,
    university: data.university ?? undefined,
    department: data.department ?? undefined,
    studentId: data.studentId ?? undefined,
    employeeId: data.employeeId ?? undefined,
    proofDocumentUrl: data.proofDocumentUrl ?? undefined,
    cvUrl: data.cvUrl ?? undefined,
    coordinatorStatus: data.coordinatorStatus ?? undefined,
    mentorStatus: data.mentorStatus ?? undefined,
    organizationId: data.organizationId != null ? String(data.organizationId) : undefined,
    createdAt: data.createdAt ?? new Date().toISOString(),
    isActive: data.isActive ?? true,
  };
}

function persistSession(token: string | null | undefined, user: User) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('token', token);
  }
  const userJson = JSON.stringify(user);
  localStorage.setItem(USER_KEY, userJson);
  localStorage.setItem('user', userJson);
}

export const authService = {
  async login(credentials: LoginFormData): Promise<{ token: string; user: User }> {
    if (USE_MOCK) {
      const users = await mockStorage.getUsers();
      const user = users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
      if (!user) {
        throw new Error('Invalid email or password. Try a demo account from the login page.');
      }
      if (!user.isActive) {
        throw new Error('This account has been deactivated. Please contact support.');
      }
      const token = `mock-token-${user.id}-${Date.now()}`;
      persistSession(token, user);
      return { token, user };
    }

    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    const token = response.data.token || '';
    const user = normalizeAuthUser(response.data);
    persistSession(token, user);
    return { token, user };
  },

  async register(data: RegisterFormData): Promise<{ token: string; user: User }> {
    if (USE_MOCK) {
      const users = await mockStorage.getUsers();
      if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
        throw new Error('An account with this email already exists.');
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        phone: data.phone,
        university: data.university,
        department: data.department,
        studentId: data.studentId,
        employeeId: data.employeeId,
        proofDocumentUrl: data.proofDocumentUrl,
        coordinatorStatus: data.role === 'INTERNSHIP_COORDINATOR' ? 'PENDING' : undefined,
        mentorStatus: data.role === 'MENTOR' ? 'PENDING' : undefined,
        organizationId: data.role === 'EMPLOYER' ? 'org-brolf-1' : undefined,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      users.push(newUser);
      localStorage.setItem('addis_mock_users', JSON.stringify(users));

      // If coordinator, also add to coordinator requests
      if (data.role === 'INTERNSHIP_COORDINATOR') {
        const reqs = await mockStorage.getCoordinatorRequests();
        reqs.push({
          id: `req-${Date.now()}`,
          userId: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          university: newUser.university || 'University',
          department: newUser.department || 'Academic Department',
          employeeId: data.employeeId || 'STAFF-PENDING',
          status: 'PENDING',
          requestDate: new Date().toISOString(),
        });
        localStorage.setItem('addis_mock_coord_requests', JSON.stringify(reqs));
      }

      // If mentor, also add to mentor requests
      if (data.role === 'MENTOR') {
        const mentorReqs = await mockStorage.getMentorRequests();
        mentorReqs.push({
          id: `mreq-${Date.now()}`,
          userId: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          university: newUser.university || 'University',
          department: newUser.department || 'Department',
          employeeId: data.employeeId || 'FACULTY-001',
          proofDocumentUrl: data.proofDocumentUrl || 'https://university.edu/faculty-credentials.pdf',
          status: 'PENDING',
          requestDate: new Date().toISOString(),
        });
        localStorage.setItem('addis_mock_mentor_requests', JSON.stringify(mentorReqs));
      }

      const token = `mock-token-${newUser.id}-${Date.now()}`;
      persistSession(token, newUser);
      return { token, user: newUser };
    }

    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    const token = response.data.token || '';
    const user = normalizeAuthUser(response.data);
    persistSession(token, user);
    return { token, user };
  },

  async getMe(): Promise<User> {
    if (USE_MOCK) {
      const user = this.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      return user;
    }
    const response = await apiClient.get<AuthResponse>('/auth/me');
    const user = normalizeAuthUser(response.data);
    // Persist updated user without wiping token
    const token = this.getToken();
    persistSession(token, user);
    return user;
  },

  async logout(): Promise<void> {
    // Purely client-side per backend specification
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('token');
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(USER_KEY) || localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || localStorage.getItem('token');
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      return { message: `Password reset instructions sent to ${email}.` };
    }
    // Backend has NO password-reset endpoint (spec §10.2). Do not call a
    // nonexistent route — surface the support path instead.
    void email;
    return {
      message:
        'Self-service password reset is not available. Please contact your platform administrator to restore access.',
    };
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      return { message: 'Password has been reset successfully. You may now log in.' };
    }
    // Backend has NO password-reset endpoint (spec §10.2). Do not call a
    // nonexistent route — surface the support path instead.
    void token;
    void password;
    return {
      message:
        'Self-service password reset is not available. Please contact your platform administrator to restore access.',
    };
  },
};
