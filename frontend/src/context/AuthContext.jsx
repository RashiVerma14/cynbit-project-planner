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
      const msg = error.response?.data?.message || 'Authentication failed. Please verify credentials.';
      return { success: false, error: msg };
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
    <AuthContext.Provider value={{ admin, token, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
