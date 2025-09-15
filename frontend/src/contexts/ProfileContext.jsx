import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '0-2 years',
    currentRole: '',
    currentCompany: '',
    skills: [],
    education: [],
    workExperience: [],
    summary: '',
    resumeFile: null
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(prevProfile => ({
          ...prevProfile,
          ...parsedProfile
        }));
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
      }
    }
  }, []);

  // Save profile to localStorage whenever it changes
  const saveProfile = (updatedProfile) => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
    }
  };

  // Update specific profile fields
  const updateProfile = (updates) => {
    const updatedProfile = { ...profile, ...updates };
    saveProfile(updatedProfile);
  };

  // Integrate resume analysis data
  const integrateResumeData = (analysisData) => {
    if (!analysisData) return;

    const updatedProfile = {
      ...profile,
      // Update personal info if available
      name: analysisData.personalInfo?.name || profile.name,
      email: analysisData.personalInfo?.email || profile.email,
      phone: analysisData.personalInfo?.phone || profile.phone,
      location: analysisData.personalInfo?.location || profile.location,
      
      // Update professional info
      currentRole: analysisData.currentRole || profile.currentRole,
      currentCompany: analysisData.currentCompany || profile.currentCompany,
      
      // Update skills (merge with existing, avoid duplicates)
      skills: analysisData.skills ? 
        [...new Set([...profile.skills, ...analysisData.skills])] : 
        profile.skills,
      
      // Update education (merge with existing)
      education: analysisData.education ? 
        [...profile.education, ...analysisData.education.map(edu => ({
          degree: edu.degree || '',
          institution: edu.institution || '',
          year: edu.year || '',
          field: edu.field || edu.degree || ''
        }))] : 
        profile.education,
      
      // Update work experience
      workExperience: analysisData.experience ? 
        [...(profile.workExperience || []), ...analysisData.experience] : 
        profile.workExperience || []
    };

    saveProfile(updatedProfile);
    
    // Store the analysis data separately for reference
    localStorage.setItem('resumeAnalysis', JSON.stringify(analysisData));
    
    return updatedProfile;
  };

  // Reset profile
  const resetProfile = () => {
    const defaultProfile = {
      name: '',
      email: '',
      phone: '',
      location: '',
      experience: '0-2 years',
      currentRole: '',
      currentCompany: '',
      skills: [],
      education: [],
      workExperience: [],
      summary: '',
      resumeFile: null
    };
    saveProfile(defaultProfile);
  };

  const value = {
    profile,
    updateProfile,
    integrateResumeData,
    resetProfile,
    saveProfile
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};