import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- added

  useEffect(() => {
    const token = authService.getToken();
    const userData = authService.getUser();

    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    authService.saveUser(userData); // optional, if you store token
    navigate('/dashboard'); // redirect after login
  };

  const logout = () => {
    setUser(null);
    authService.logout();
    navigate('/login'); // redirect after logout
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
