import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Load saved auth data on refresh
  useEffect(() => {
    const token = authService.getToken();
    const userData = authService.getUser();

    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  // ✅ Login using API + save user
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      if (data.user && data.token) {
        setUser(data.user);
        authService.saveUser(data.user, data.token); // save in localStorage
        navigate('/Dashboard');
      }
      return data;
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      throw error;
    }
  };

  // ✅ Signup (optional: if you want to setUser immediately after signup)
  const signup = async (userData) => {
    try {
      const data = await authService.signup(userData);
      if (data.user && data.token) {
        setUser(data.user);
        authService.saveUser(data.user, data.token);
        navigate('/dashboard');
      }
      return data;
    } catch (error) {
      console.error('Signup error in AuthContext:', error);
      throw error;
    }
  };

  // ✅ OTP verification
  const verifyOTP = async (email, otp) => {
    try {
      const data = await authService.verifyOTP(email, otp);
      if (data.user && data.token) {
        setUser(data.user);
        authService.saveUser(data.user, data.token);
        navigate('/dashboard');
      }
      return data;
    } catch (error) {
      console.error('OTP verification error in AuthContext:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
    navigate('/login');
  };

  const value = {
    user,
    login,
    signup,
    verifyOTP,
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
