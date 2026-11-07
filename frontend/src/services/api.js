import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 25000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cynbit_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const projectService = {
  calculateEstimate: (data) => api.post('/projects/estimate', data),
  submitProject: (data) => api.post('/projects', data),
  getProjectById: (id) => api.get(`/projects/${id}`),
  checkHealth: () => api.get('/health'),
};

export const adminService = {
  login: (credentials) => api.post('/admin/auth/login', credentials),
  getProjects: (params) => api.get('/admin/projects', { params }),
  getProjectDetails: (id) => api.get(`/admin/projects/${id}`),
  updateStatus: (id, statusData) => api.patch(`/admin/projects/${id}/status`, statusData),
};

export default api;

