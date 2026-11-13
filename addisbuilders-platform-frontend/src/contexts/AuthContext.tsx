import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, ApprovalStatus } from '../types';
import { authService } from '../services/auth.service';
import { LoginFormData, RegisterFormData } from '../schemas';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  coordinatorStatus?: ApprovalStatus;
  login: (credentials: LoginFormData) => Promise<User>;
  register: (data: RegisterFormData) => Promise<User>;
  logout: () => Promise<void>;
  updateCurrentUser: (updated: Partial<User>) => void;
  switchDemoRole: (role: UserRole) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from localStorage on initial load
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = authService.getCurrentUser();
        const token = authService.getToken();
        if (storedUser && token) {
          setUser(storedUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginFormData): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const updateCurrentUser = useCallback((updated: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updated };
      localStorage.setItem('addis_auth_user', JSON.stringify(next));
      return next;
    });
  }, []);

  // Helpful convenience method to test-drive any of the 5 roles instantly with preloaded demo data
  const switchDemoRole = async (targetRole: UserRole): Promise<void> => {
    const demoAccounts: Record<UserRole, { email: string; pass: string }> = {
      LEARNER: { email: 'learner@addisbuilder.edu', pass: 'password123' },
      MENTOR: { email: 'mentor@addisbuilder.edu', pass: 'password123' },
      INTERNSHIP_COORDINATOR: { email: 'coordinator@addisbuilder.edu', pass: 'password123' },
      EMPLOYER: { email: 'employer@addisbuilder.edu', pass: 'password123' },
      SUPER_ADMIN: { email: 'admin@addisbuilder.edu', pass: 'password123' },
    };

    const target = demoAccounts[targetRole];
    if (target) {
      await login({ email: target.email, password: target.pass });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isLoading,
        coordinatorStatus: user?.coordinatorStatus,
        login,
        register,
        logout,
        updateCurrentUser,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
