import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme/theme';
import Navigation from './components/Navigation';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ResumeForm from './pages/ResumeForm';
import Dashboard from './pages/Dashboard';
import Landing from './components/auth/Landing';
import LandingPage from './pages/LandingPage';
import AboutUs from './components/AboutUs';
import CompanyLogos from './components/CompanyLogos';
import JobseekerLogin from './components/JobseekerLogin';
import UserProfile from './components/UserProfile';
import SkillDemandRadar from './components/SkillDemandRadar';
import CareerPlanner from './components/CareerPlanner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <Routes>
              {/* Step 1: Default route goes to Signup */}
              <Route path="/" element={<Navigate to="/signup" replace />} />

              {/* Public Routes */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/companyname" element={<CompanyLogos />} />
              <Route path="/jobseeker" element={<JobseekerLogin />} />
              <Route path="/landing" element={<Landing />} />

              {/* Step 3: LandingPage (after login success, redirect here) */}
              <Route path="/home" element={<LandingPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <ResumeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userprofile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skill-radar"
                element={
                  <ProtectedRoute>
                    <SkillDemandRadar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/career-planner"
                element={
                  <ProtectedRoute>
                    <CareerPlanner />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
