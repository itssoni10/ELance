import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import AboutUs from './pages/AboutUs';
import CompanyLogos from './components/CompanyLogos';
import JobseekerLogin from './components/JobseekerLogin';
import UserProfile from './components/UserProfile';
import SkillDemandRadar from './components/SkillDemandRadar';
import CareerPlanner from './components/CareerPlanner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/aboutus" element={<AboutUs/>} />
              <Route path="companyname" element={<CompanyLogos/>} />
              <Route path="/jobseeker" element={<JobseekerLogin/>} />
              <Route path="/userprofile" element={<UserProfile/>} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/resume" element={<ResumeForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skill-radar" element={<SkillDemandRadar />} />
              <Route path="/career-planner" element={<CareerPlanner />} />
            </Routes>
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

