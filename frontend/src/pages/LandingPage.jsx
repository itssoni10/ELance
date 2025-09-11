import React, { useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Fade,
  Zoom,
  Slide,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import {
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
  Analytics,
  Business,
  People,
  Security,
  CloudDone,
  AutoAwesome
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  const handleStartJourney = () => {
    if (user) {
      // User is logged in, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // User is not logged in, redirect to login
      window.location.href = '/login';
    }
  };

  const handleKnowMore = () => {
    if (user) {
      // User is logged in, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // User is not logged in, redirect to login
      window.location.href = '/login';
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2d3748 100%)',
      color: 'white'
    }}>

      {/* Hero Section */}
      <Box sx={{ pt: 15, pb: 8, position: 'relative', overflow: 'hidden' }}>
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

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Chip
                    label="FEATURED IN TOP AI CAREER PLATFORMS 2025"
                    sx={{
                      background: 'linear-gradient(45deg, #dc004e 30%, #ff5983 90%)',
                      color: 'white',
                      fontWeight: 700,
                      mb: 3,
                      px: 2,
                      py: 1,
                      fontSize: '0.9rem'
                    }}
                  />
                  
                  <Typography 
                    variant="h2" 
                    component="h1"
                    sx={{ 
                      fontWeight: 800,
                      mb: 3,
                      lineHeight: 1.2,
                      background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    ELance a Top AI-Powered Career Platform for 2025. Achieves 95% User Success Rate, Ranks among the Top 5% of Most Trusted Career Platforms.
                  </Typography>

                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 4, 
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.6,
                      maxWidth: 500
                    }}
                  >
                    Transform your career with AI-driven insights, skill analysis, and personalized career planning. Join thousands of professionals who've accelerated their growth.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleKnowMore}
                      sx={{
                        py: 2,
                        px: 4,
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      KNOW MORE
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleStartJourney}
                      sx={{
                        py: 2,
                        px: 4,
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.6)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      GET STARTED
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom in={true} timeout={1200}>
                <Box sx={{ position: 'relative' }}>
                  <Paper
                    sx={{
                      p: 4,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
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
                        background: 'rgba(255, 255, 255, 0.1)',
                      }}
                    />
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                        🚀 AI-Powered Career Growth
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <CheckCircle sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                          <Typography>95% Success Rate</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <CheckCircle sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                          <Typography>AI Skill Analysis</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <CheckCircle sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                          <Typography>Personalized Career Paths</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <CheckCircle sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                          <Typography>Real-time Market Insights</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, background: 'rgba(255, 255, 255, 0.02)' }}>
        <Container maxWidth="lg">
          <Fade in={true} timeout={1500}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Why Choose ELance?
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 600, mx: 'auto' }}>
                Empowering careers with cutting-edge AI technology and personalized insights
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {[
              {
                icon: <Assessment sx={{ fontSize: 40 }} />,
                title: "Skill Demand Radar",
                description: "Real-time market analysis and skill demand insights powered by AI",
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              },
              {
                icon: <Timeline sx={{ fontSize: 40 }} />,
                title: "Career Path Planning",
                description: "AI-driven career recommendations and personalized growth plans",
                gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              },
              {
                icon: <Psychology sx={{ fontSize: 40 }} />,
                title: "AI Resume Analysis",
                description: "Smart resume optimization with Gemini AI integration",
                gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
              },
              {
                icon: <Analytics sx={{ fontSize: 40 }} />,
                title: "Market Intelligence",
                description: "Comprehensive job market trends and salary insights",
                gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Slide in={true} direction="up" timeout={1800 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      background: feature.gradient,
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 3,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                      },
                      transition: 'all 0.3s ease'
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
                        background: 'rgba(255, 255, 255, 0.1)',
                      }}
                    />
                    <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {[
              { number: "10K+", label: "Active Users", icon: <People sx={{ fontSize: 40 }} /> },
              { number: "95%", label: "Success Rate", icon: <TrendingUp sx={{ fontSize: 40 }} /> },
              { number: "500+", label: "Companies", icon: <Business sx={{ fontSize: 40 }} /> },
              { number: "24/7", label: "AI Support", icon: <AutoAwesome sx={{ fontSize: 40 }} /> }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Zoom in={true} timeout={2000 + index * 200}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, background: 'rgba(255, 255, 255, 0.02)' }}>
        <Container maxWidth="md">
          <Fade in={true} timeout={2500}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Ready to Transform Your Career?
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
                Join thousands of professionals who've accelerated their career growth with ELance
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleStartJourney}
                endIcon={<ArrowForward />}
                sx={{
                  py: 3,
                  px: 6,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  borderRadius: 3,
                  fontSize: '1.2rem',
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
                Start Your Journey Today
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ELance
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 1 }}>
                Empowering careers with AI-driven insights and personalized growth plans.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 3 }}>
                <Button color="inherit" size="small">Privacy Policy</Button>
                <Button color="inherit" size="small">Terms of Service</Button>
                <Button color="inherit" size="small">Contact Us</Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
