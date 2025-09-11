import React, { useContext } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  Chip,
  Fade,
  Zoom,
  Slide,
  Paper,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  School,
  Work,
  Psychology,
  Speed,
  Assessment,
  ArrowForward,
  CheckCircle,
  Star,
  Timeline,
  Analytics
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Fade in={true}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
              🔒 Access Required
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
              Please login to access your dashboard
            </Typography>
            <Button 
              variant="contained" 
              href="/" 
              size="large"
              sx={{ 
                py: 2,
                px: 4,
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.3)',
                  border: '2px solid rgba(255,255,255,0.5)'
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
        {/* Hero Section */}
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Welcome back, {user.username}! 👋
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
              Ready to accelerate your career? Let's explore your opportunities.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                icon={<TrendingUp />} 
                label="Career Growth" 
                color="primary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                icon={<Analytics />} 
                label="AI Insights" 
                color="secondary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                icon={<Speed />} 
                label="Smart Tools" 
                color="success" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
        </Fade>

        {/* User Profile & Stats Section */}
        <Grid container spacing={4} sx={{ mb: 4, justifyContent: 'center' }}>
          {/* User Profile Card */}
          <Grid item xs={12} md={4}>
            <Zoom in={true} timeout={800}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                  }}
                />
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mr: 3,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        fontSize: '2rem',
                        border: '3px solid rgba(255,255,255,0.3)'
                      }}
                    >
                      {user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {user.username}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9, mb: 1 }}>
                        {user.userType}
                      </Typography>
                      <Chip 
                        label="Active Member" 
                        sx={{ 
                          background: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 600
                        }}
                        icon={<CheckCircle />}
                      />
                    </Box>
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    📧 {user.email}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    🚀 Career Development Platform
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Zoom in={true} timeout={1000}>
                  <Card 
                    sx={{ 
                      textAlign: 'center', 
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                      <Assessment sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Skill Radar
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Market Analysis
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Zoom in={true} timeout={1200}>
                  <Card 
                    sx={{ 
                      textAlign: 'center', 
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                      <Timeline sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Career Path
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        AI Planning
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Zoom in={true} timeout={1400}>
                  <Card 
                    sx={{ 
                      textAlign: 'center', 
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                      <Work sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        Resume
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Smart Upload
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Zoom in={true} timeout={1600}>
                  <Card 
                    sx={{ 
                      textAlign: 'center', 
                      p: 3,
                      height: '100%',
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                      }}
                    />
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                      <Psychology sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        AI Insights
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Gemini Powered
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Quick Actions Section */}
        <Fade in={true} timeout={1800}>
          <Box sx={{ 
            textAlign: 'center', 
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              🚀 Quick Actions
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
              Choose your next step to accelerate your career growth
            </Typography>
            <Grid container spacing={3} sx={{ maxWidth: 1000, justifyContent: 'center' }}>
              <Grid item xs={12} sm={6} md={3}>
                <Slide in={true} direction="up" timeout={2000}>
                  <Button 
                    variant="contained" 
                    href="/skill-radar"
                    fullWidth
                    size="large"
                    startIcon={<Assessment />}
                    sx={{ 
                      py: 3,
                      px: 2,
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🎯 Skill Radar
                  </Button>
                </Slide>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Slide in={true} direction="up" timeout={2200}>
                  <Button 
                    variant="contained" 
                    href="/career-planner"
                    fullWidth
                    size="large"
                    startIcon={<Timeline />}
                    sx={{ 
                      py: 3,
                      px: 2,
                      background: 'linear-gradient(45deg, #dc004e 30%, #ff5983 90%)',
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 8px 25px rgba(220, 0, 78, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #9a0036 30%, #dc004e 90%)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 35px rgba(220, 0, 78, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🗺️ Career Planner
                  </Button>
                </Slide>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Slide in={true} direction="up" timeout={2400}>
                  <Button 
                    variant="outlined" 
                    href="/resume"
                    fullWidth
                    size="large"
                    startIcon={<Work />}
                    sx={{ 
                      py: 3,
                      px: 2,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: '#1565c0',
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 35px rgba(25, 118, 210, 0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📄 Upload Resume
                  </Button>
                </Slide>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Slide in={true} direction="up" timeout={2600}>
                  <Button 
                    variant="outlined" 
                    href="/userprofile"
                    fullWidth
                    size="large"
                    startIcon={<DashboardIcon />}
                    sx={{ 
                      py: 3,
                      px: 2,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      borderColor: '#dc004e',
                      color: '#dc004e',
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: '#9a0036',
                        backgroundColor: 'rgba(220, 0, 78, 0.04)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 35px rgba(220, 0, 78, 0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    👤 View Profile
                  </Button>
                </Slide>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;