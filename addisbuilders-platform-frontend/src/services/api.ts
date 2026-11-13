import axios from 'axios';

const rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api').trim();
export const API_ORIGIN = rawUrl.replace(/\/+$/, '').replace(/\/api$/i, '');
export const API_BASE_URL = `${API_ORIGIN}/api`;
export const USE_MOCK =
  import.meta.env.MODE === 'test'
    ? true
    : import.meta.env.VITE_USE_MOCK !== 'false';

export const apiClient = axios.create({
  baseURL: API_ORIGIN,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    // Ensure all backend paths start with /api
    if (config.url && !config.url.startsWith('/api') && !config.url.startsWith('http')) {
      config.url = `/api${config.url.startsWith('/') ? '' : '/'}${config.url}`;
    }

    const token = localStorage.getItem('token') || localStorage.getItem('addis_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user storage on 401 Unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('addis_auth_token');
      localStorage.removeItem('addis_auth_user');

      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?session_expired=true';
      }
    }
    return Promise.reject(error);
  }
);

// Alias for convenience matching section 9.1
export const api = apiClient;
