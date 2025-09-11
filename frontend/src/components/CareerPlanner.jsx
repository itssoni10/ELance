import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Slide
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  School,
  Work,
  TrendingUp,
  Star,
  CheckCircle,
  Warning,
  Info,
  Psychology,
  Timeline as TimelineIcon,
  Assessment,
  EmojiEvents,
  AutoAwesome,
  Rocket,
  GpsFixed,
  Speed,
  Analytics,
  Refresh,
  ArrowForward,
  PlayArrow,
  Bookmark,
  Share,
  Upload
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { authService } from '../services/AuthService';

const CareerPlanner = () => {
    const [currentRole, setCurrentRole] = useState('');
    const [targetRole, setTargetRole] = useState('');
  const [careerPaths, setCareerPaths] = useState([]);
    const [skillGaps, setSkillGaps] = useState(null);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPathDialog, setShowPathDialog] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [geminiAdvice, setGeminiAdvice] = useState(null);
  const { user } = useContext(AuthContext);

  const handleFindPath = async () => {
    if (!currentRole || !targetRole) {
      setError('Please enter both current and target roles');
      return;
    }

    try {
        setLoading(true);
      setError('');
      
      const token = authService.getToken();
      const response = await fetch(
        `http://localhost:5000/api/career-paths/recommendations?currentRole=${encodeURIComponent(currentRole)}&targetRole=${encodeURIComponent(targetRole)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCareerPaths(data);
        
        // If no predefined paths found, generate with Gemini
        if (data.length === 0) {
          await generateGeminiAdvice();
        }
      } else {
        setError('Failed to find career paths');
      }
    } catch (err) {
      setError('Failed to find career paths');
      console.error('Error finding career paths:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateGeminiAdvice = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/career-paths/gemini-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify({
          currentRole,
          targetRole,
          userSkills: user?.skills?.map(s => s.skill?.name).filter(Boolean) || []
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGeminiAdvice(data);
      }
    } catch (err) {
      console.error('Error generating Gemini advice:', err);
    }
  };

  const analyzeSkillGaps = async (careerPathId) => {
    try {
      setLoading(true);
      const token = authService.getToken();
      const response = await fetch(
        `http://localhost:5000/api/career-paths/skill-gaps/${user.id}/${careerPathId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSkillGaps(data);
        setShowPathDialog(true);
      }
    } catch (err) {
      setError('Failed to analyze skill gaps');
      console.error('Error analyzing skill gaps:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCareerGoals = async (careerPathId) => {
    try {
      const token = authService.getToken();
      const response = await fetch(
        `http://localhost:5000/api/career-paths/goals/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            currentRole,
            targetRole,
            targetTimeline: 12, // 12 months default
            careerPathId
          })
        }
      );

      if (response.ok) {
        alert('Career goals updated successfully!');
      }
    } catch (err) {
      setError('Failed to update career goals');
      console.error('Error updating career goals:', err);
    }
  };

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
              Please login to access career planning features
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
      position: 'relative',
      overflow: 'hidden'
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
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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
              🗺️ Career Planner
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              AI-powered career path mapping and skill development planning
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 3 }}>
              <Chip 
                icon={<Psychology />} 
                label="AI-Powered Insights" 
                color="primary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                icon={<TimelineIcon />} 
                label="Personalized Paths" 
                color="secondary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                icon={<Assessment />} 
                label="Skill Gap Analysis" 
                color="success" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
        </Fade>

        {error && (
          <Slide in={true} direction="down">
            <Alert 
              severity="error" 
              sx={{ 
                mb: 4, 
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              {error}
            </Alert>
          </Slide>
        )}

        {/* Career Goals Input */}
        <Fade in={true} timeout={1200}>
          <Card
            sx={{
              mb: 4,
              background: 'rgba(26, 35, 50, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              p: 3,
              color: 'white'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                  <GpsFixed />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  🎯 Define Your Career Goals
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Tell us about your current role and where you want to be
              </Typography>
            </Box>
            
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Current Role"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g., Software Developer, Marketing Assistant"
                    helperText="What's your current job title?"
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
                    label="Target Role"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g., Senior Software Engineer, Marketing Manager"
                    helperText="What's your dream job?"
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
                    onClick={handleFindPath}
                    disabled={loading}
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} /> : <Rocket />}
                    sx={{ 
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? 'Analyzing Career Path...' : '🚀 Find My Career Path'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Career Paths */}
        {careerPaths.length > 0 && (
          <Fade in={true} timeout={1400}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'white', 
                  mb: 3, 
                  fontWeight: 700,
                  textAlign: 'center'
                }}
              >
                🛤️ Your Career Paths
              </Typography>
              <Grid container spacing={4}>
                {careerPaths.map((path, index) => (
                  <Grid item xs={12} lg={6} key={index}>
                    <Zoom in={true} timeout={1600 + index * 200}>
                      <Card
                        sx={{
                          height: '100%',
                          background: 'rgba(26, 35, 50, 0.8)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 4,
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Box sx={{ 
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          p: 3,
                          color: 'white'
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {path.title}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {path.description}
                          </Typography>
                        </Box>
                        
                        <CardContent sx={{ p: 3 }}>
                          <Timeline position="left">
                            {path.steps.map((step, stepIndex) => (
                              <TimelineItem key={stepIndex}>
                                <TimelineOppositeContent>
                                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                    Step {step.timelinePosition}
                                  </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                  <TimelineDot 
                                    sx={{ 
                                      bgcolor: stepIndex === 0 ? '#4facfe' : '#00f2fe',
                                      color: 'white'
                                    }}
                                  >
                                    {stepIndex === 0 ? <School /> : <Work />}
                                  </TimelineDot>
                                  {stepIndex < path.steps.length - 1 && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent>
                                  <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                                    {step.role}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    {step.description}
                                  </Typography>
                                </TimelineContent>
                              </TimelineItem>
                            ))}
                          </Timeline>

                          <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                              variant="outlined"
                              onClick={() => analyzeSkillGaps(path._id)}
                              startIcon={<Assessment />}
                              sx={{
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                '&:hover': {
                                  borderColor: '#42a5f5',
                                  backgroundColor: 'rgba(66, 165, 245, 0.1)'
                                }
                              }}
                            >
                              Analyze Skills
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => updateCareerGoals(path._id)}
                              startIcon={<Bookmark />}
                              sx={{
                                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                                }
                              }}
                            >
                              Set as Goal
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Gemini AI Advice */}
        {geminiAdvice && (
          <Fade in={true} timeout={1800}>
            <Card
              sx={{
                mb: 4,
                background: 'rgba(26, 35, 50, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                p: 3,
                color: 'white'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                    <AutoAwesome />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    🤖 AI-Powered Career Advice
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Personalized recommendations based on your profile and goals
                </Typography>
              </Box>
              
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                  🎯 Recommended Skills:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                  {geminiAdvice.recommendedSkills?.map((skill, index) => (
                    <Chip
                      key={index}
                      label={`${skill.skill} (${skill.priority})`}
                      sx={{
                        background: skill.priority === 'high' 
                          ? 'linear-gradient(45deg, #f5576c 30%, #f093fb 90%)'
                          : skill.priority === 'medium' 
                          ? 'linear-gradient(45deg, #ffa726 30%, #ffb74d 90%)'
                          : 'linear-gradient(45deg, #66bb6a 30%, #81c784 90%)',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                  🛤️ Transition Path:
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
                  {geminiAdvice.transitionPath}
                </Typography>

                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                  📚 Learning Resources:
                </Typography>
                <List>
                  {geminiAdvice.recommendedSkills?.map((skill, index) => (
                    <ListItem 
                      key={index}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        mb: 1,
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <ListItemIcon>
                        <Star sx={{ color: '#42a5f5' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ color: 'white', fontWeight: 600 }}>
                            {skill.skill}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Resources: {skill.resources?.join(', ')} | Timeline: {skill.timeline}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* Action Buttons */}
        <Fade in={true} timeout={2000}>
          <Box sx={{ 
            textAlign: 'center', 
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
              🚀 Ready to Start Your Journey?
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              maxWidth: '800px',
              width: '100%'
            }}>
              <Button 
                variant="contained" 
                href="/skill-radar"
                size="large"
                startIcon={<Assessment />}
                sx={{ 
                  py: 2,
                  px: 4,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                📊 Skill Radar
              </Button>
              <Button 
                variant="outlined" 
                href="/resume"
                size="large"
                startIcon={<Upload />}
                sx={{ 
                  py: 2,
                  px: 4,
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: '#42a5f5',
                    backgroundColor: 'rgba(66, 165, 245, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                📄 Upload Resume
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Skill Gaps Dialog */}
      <Dialog 
        open={showPathDialog} 
        onClose={() => setShowPathDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(15, 20, 25, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 700
        }}>
          📊 Skill Gap Analysis
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {skillGaps && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                Current Skills vs Required Skills
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    background: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#4caf50', mb: 2, fontWeight: 600 }}>
                        ✅ Your Skills ({skillGaps.currentSkills.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {skillGaps.currentSkills.map((skill, index) => (
                          <Chip 
                            key={index} 
                            label={skill} 
                            sx={{ 
                              background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                              color: 'white',
                              fontWeight: 600
                            }} 
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    background: 'rgba(33, 150, 243, 0.1)',
                    border: '1px solid rgba(33, 150, 243, 0.3)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#2196f3', mb: 2, fontWeight: 600 }}>
                        🎯 Required Skills ({skillGaps.requiredSkills.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {skillGaps.requiredSkills.map((skill, index) => (
                          <Chip 
                            key={index} 
                            label={skill} 
                            sx={{ 
                              background: 'linear-gradient(45deg, #2196f3 30%, #42a5f5 90%)',
                              color: 'white',
                              fontWeight: 600
                            }} 
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

              <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
                🚀 Skills to Learn ({skillGaps.skillGaps.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {skillGaps.skillGaps.map((skill, index) => (
                  <Chip 
                    key={index} 
                    label={skill} 
                    sx={{ 
                      background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                ))}
              </Box>

              <Alert 
                severity="info" 
                sx={{ 
                  mt: 3,
                  background: 'rgba(33, 150, 243, 0.1)',
                  border: '1px solid rgba(33, 150, 243, 0.3)',
                  color: 'white',
                  '& .MuiAlert-icon': {
                    color: '#2196f3'
                  }
                }}
              >
                You need to learn {skillGaps.skillGaps.length} more skills to reach your target role.
                Gap percentage: {Math.round(skillGaps.gapPercentage)}%
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setShowPathDialog(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setShowPathDialog(false)}
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              }
            }}
          >
            Start Learning
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    );
};

export default CareerPlanner;