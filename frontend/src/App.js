import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ResumeForm from './pages/ResumeForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resume" element={<ResumeForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      );
}

export default App;

