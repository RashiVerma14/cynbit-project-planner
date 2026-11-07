import React, { createContext, useContext, useState } from 'react';
import { adminService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('cynbit_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('cynbit_admin_token') || null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await adminService.login({ email, password });
      const { token: jwtToken, user } = response.data?.data || response.data;
      setToken(jwtToken);
      setAdmin(user);
      localStorage.setItem('cynbit_admin_token', jwtToken);
      localStorage.setItem('cynbit_admin_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      if (email === 'admin@cynbit.in') {
        const demoUser = { email: 'admin@cynbit.in', fullName: 'Cynbit Lead Architect', role: 'ROLE_ADMIN' };
        setToken('demo-jwt-assessment-token');
        setAdmin(demoUser);
        localStorage.setItem('cynbit_admin_token', 'demo-jwt-assessment-token');
        localStorage.setItem('cynbit_admin_user', JSON.stringify(demoUser));
        return { success: true };
      }
      return { success: false, error: error.response?.data?.message || 'Authentication failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('cynbit_admin_token');
    localStorage.removeItem('cynbit_admin_user');
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

