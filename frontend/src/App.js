import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ResumeForm from './pages/ResumeForm';
import Dashboard from './pages/Dashboard';
import Landing from './components/auth/Landing';
import AboutUs from './components/AboutUs';
import CompanyLogos from './components/CompanyLogos';
import JobseekerLogin from './components/JobseekerLogin';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Routes>
          <Route path="/aboutus" element={<UserProfile/>} />
          <Route path="companyname" element={<CompanyLogos/>} />
          <Route path="/jobseeker" element={<JobseekerLogin/>} />
          <Route path="/userprofile" element={<AboutUs/>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resume" element={<ResumeForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
      );
}

export default App;

