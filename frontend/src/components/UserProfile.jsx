import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Avatar,
  Chip,
  Grid,
  Paper,
  Divider,
  IconButton,
  Fade,
  Zoom,
  Slide,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  Person,
  Work,
  School,
  Email,
  Phone,
  LocationOn,
  Edit,
  Save,
  Upload,
  Delete,
  Add,
  Business,
  TrendingUp,
  Assessment,
  Timeline
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState({
    name: user?.username || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+91 98765 43210',
    location: 'Kota, Rajasthan',
    experience: '3-5 years',
    currentRole: 'Software Developer',
    currentCompany: 'Tech Corp',
    skills: ['Java', 'React', 'Spring Boot', 'Node.js', 'MongoDB'],
    education: [
      {
        degree: 'Bachelor of Technology',
        institution: 'Rajasthan Technical University',
        year: '2020',
        field: 'Computer Science'
      }
    ],
    summary: 'Passionate software developer with 3+ years of experience in full-stack development. Skilled in modern web technologies and always eager to learn new technologies.'
  });
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [saveStatus, setSaveStatus] = useState(null);
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    field: ''
  });

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year && newEducation.field) {
      setProfile(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation }]
      }));
      setNewEducation({
        degree: '',
        institution: '',
        year: '',
        field: ''
      });
    }
  };

  const removeEducation = (index) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({ ...prev, [name]: value }));
  };
  React.useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);
  const handleSave = () => {
     try {
    // Save profile locally (you already update state as user types)
    // Here we just confirm the save action
    setSaveStatus("success");

    // Optional: persist to localStorage or backend
    localStorage.setItem("userProfile", JSON.stringify(profile));

    // Exit editing mode
    setIsEditing(false);

    // Auto-hide success message
    setTimeout(() => setSaveStatus(null), 3000);
  } catch (error) {
    setSaveStatus("error");
    console.error("Failed to save profile:", error);
  }
    // setSaveStatus('success');
    // setIsEditing(false);
    // setTimeout(() => setSaveStatus(null), 3000);
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2d3748 100%)',
        }}
      >
        <Fade in={true}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
              🔒 Access Required
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
              Please login to view your profile
            </Typography>
            <Button 
              variant="contained" 
              href="/login" 
              size="large"
              sx={{ 
                py: 2,
                px: 4,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                }
              }}
            >
              Go to Login
            </Button>
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2d3748 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(66, 165, 245, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(220, 0, 78, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg" sx={{ pt: 15, pb: 4, width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
            My Profile
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Manage your professional profile and career information
            </Typography>
          </Box>
        </Fade>

        {/* Success Alert */}
        {saveStatus === 'success' && (
          <Fade in={true}>
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              Profile updated successfully!
            </Alert>
          </Fade>
        )}

        {/* Main Profile Card */}
        <Card
          sx={{
            background: 'rgba(26, 35, 50, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4
          }}
        >
          {/* Profile Header */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 4,
            color: 'white'
          }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    border: '4px solid rgba(255, 255, 255, 0.3)',
                    fontSize: '2.5rem'
                  }}
                >
                  {profile.name?.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {profile.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                  {profile.currentRole} at {profile.currentCompany}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  {profile.experience} experience • {profile.location}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  <Edit />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-selected': {
                    color: '#42a5f5'
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#42a5f5'
                }
              }}
            >
              <Tab icon={<Person />} label="Profile" />
              <Tab icon={<Work />} label="Experience" />
              <Tab icon={<School />} label="Education" />
              <Tab icon={<Upload />} label="Resume" />
            </Tabs>
          </Box>

          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            {/* Profile Tab */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                    Professional Summary
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Summary"
                    name="summary"
                    value={profile.summary}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                    }}
                  />
                  <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {profile.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        onDelete={isEditing ? () => removeSkill(index) : undefined}
                        sx={{
                          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                          color: 'white',
                          '& .MuiChip-deleteIcon': {
                                color: 'white'
                              }
                        }}
                      />
                    ))}
                  </Box>
                  {isEditing && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        placeholder="Add skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#42a5f5',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-focused': {
                              color: '#42a5f5',
                            },
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255, 255, 255, 0.5)',
                            opacity: 1,
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={addSkill}
                        startIcon={<Add />}
                        size="small"
                      >
                        Add
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
              </Box>
            </TabPanel>

            {/* Experience Tab */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                Work Experience
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Current Role"
                    name="currentRole"
                    value={profile.currentRole}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Current Company"
                    name="currentCompany"
                    value={profile.currentCompany}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Experience Level"
                    name="experience"
                    value={profile.experience}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    SelectProps={{
                      native: true,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#42a5f5',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                          color: '#42a5f5',
                        },
                      },
                      '& .MuiSelect-select': {
                        color: 'white',
                      },
                    }}
                  >
                    <option value="0-2 years">0-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </TextField>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Education Tab */}
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                Education
              </Typography>
              
              {/* Existing Education */}
              {profile.education.map((edu, index) => (
                <Card
                      key={index}
                  sx={{
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative'
                  }}
                >
                  <CardContent>
                    {isEditing && (
                      <IconButton
                        onClick={() => removeEducation(index)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            color: '#f44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)'
                          }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      {edu.degree}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {edu.field} • {edu.year}
                    </Typography>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Education Form */}
              {isEditing && (
                <Card
                  sx={{
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px dashed rgba(255, 255, 255, 0.3)',
                    borderRadius: 2
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                      Add New Education
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Degree"
                          name="degree"
                          value={newEducation.degree}
                          onChange={handleEducationChange}
                          placeholder="e.g., Bachelor of Technology"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#42a5f5',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                              '&.Mui-focused': {
                                color: '#42a5f5',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Institution"
                          name="institution"
                          value={newEducation.institution}
                          onChange={handleEducationChange}
                          placeholder="e.g., University Name"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#42a5f5',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                              '&.Mui-focused': {
                                color: '#42a5f5',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Field of Study"
                          name="field"
                          value={newEducation.field}
                          onChange={handleEducationChange}
                          placeholder="e.g., Computer Science"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#42a5f5',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                              '&.Mui-focused': {
                                color: '#42a5f5',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Graduation Year"
                          name="year"
                          value={newEducation.year}
                          onChange={handleEducationChange}
                          placeholder="e.g., 2020"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#42a5f5',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                              '&.Mui-focused': {
                                color: '#42a5f5',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          onClick={addEducation}
                          startIcon={<Add />}
                          disabled={!newEducation.degree || !newEducation.institution || !newEducation.year || !newEducation.field}
                          sx={{
                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                            },
                            '&:disabled': {
                              background: 'rgba(255, 255, 255, 0.1)',
                              color: 'rgba(255, 255, 255, 0.3)'
                            }
                          }}
                        >
                          Add Education
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </TabPanel>

            {/* Resume Tab */}
            <TabPanel value={activeTab} index={3}>
              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                Resume Upload
              </Typography>
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  border: '2px dashed rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  mb: 2
                }}
              >
              {resume ? (
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    {resume.name}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                    onClick={() => setResume(null)}
                      startIcon={<Delete />}
                  >
                    Remove
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Upload sx={{ fontSize: 48, color: 'rgba(255, 255, 255, 0.5)', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                      Upload Your Resume
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                    Drag & drop your resume here or click to browse
                    </Typography>
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="resume-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<Upload />}
                        sx={{
                          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                          }
                        }}
                  >
                    Select File
                      </Button>
                  </label>
                  </Box>
                )}
              </Paper>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </Typography>
            </TabPanel>
          </CardContent>

          {/* Action Buttons */}
          <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              {isEditing && (
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="contained"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                startIcon={isEditing ? <Save /> : <Edit />}
                sx={{
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  }
                }}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default UserProfile;