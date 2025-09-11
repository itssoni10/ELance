import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Fade,
  Zoom,
  Slide,
  Chip,
  Paper,
  Avatar,
  Divider
} from '@mui/material';
import {
  Business,
  People,
  LocationOn,
  TrendingUp,
  School,
  Work,
  Psychology,
  Speed,
  Assessment,
  Timeline,
  Analytics,
  AutoAwesome
} from '@mui/icons-material';

const AboutUs = () => {
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
                background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              About ELance
            </Typography>
            <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 600, mx: 'auto' }}>
              Connecting India's finest talent with the nation's most innovative companies
            </Typography>
          </Box>
        </Fade>

        {/* Who We Are Section */}
        <Fade in={true} timeout={1200}>
          <Card
            sx={{
              mb: 6,
              background: 'rgba(26, 35, 50, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 3,
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                  }}
                >
                  <Business sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                  Who We Are
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, mb: 3 }}>
                Welcome to <strong style={{ color: '#42a5f5' }}>ELance</strong>, a modern career platform dedicated to connecting India's finest talent with the nation's most innovative companies. Based in the heart of Kota, Rajasthan, we are a team of technology and human resource experts passionate about making the recruitment process simpler, smarter, and more human.
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                Our core mission is to empower both individuals and businesses. We help professionals build fulfilling careers they love and assist companies in finding the exceptional talent they need to grow and succeed.
              </Typography>
            </CardContent>
          </Card>
        </Fade>

        {/* Our Story Section */}
        <Fade in={true} timeout={1400}>
          <Card
            sx={{
              mb: 6,
              background: 'rgba(26, 35, 50, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 3,
                    background: 'linear-gradient(45deg, #dc004e 30%, #ff5983 90%)'
                  }}
                >
                  <LocationOn sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                  Our Story
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8, mb: 3 }}>
                Our journey began right here in Kota, a city renowned for its ambition and dedication to excellence. We observed a significant gap in the job market: talented individuals were struggling to connect with the right opportunities, and employers were spending countless hours sifting through mismatched applications. The process was inefficient and often impersonal.
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                <strong style={{ color: '#42a5f5' }}>ELance</strong> was founded in 2024 to solve this problem. We set out to build a platform that uses smart technology not just to list jobs, but to create meaningful connections between the right people and the right roles.
              </Typography>
            </CardContent>
          </Card>
        </Fade>

        {/* What We Do Differently Section */}
        <Fade in={true} timeout={1600}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 4, 
                textAlign: 'center',
                background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              What We Do Differently
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4, textAlign: 'center' }}>
              We have built our platform with the specific needs of our users in mind, ensuring a seamless experience for both job seekers and recruiters.
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Zoom in={true} timeout={1800}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 4
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                      }}
                    />
                    <CardContent sx={{ position: 'relative', zIndex: 1, p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <People sx={{ fontSize: 40, mr: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          For Job Seekers
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
                        We provide an intuitive and powerful platform to discover your next career move. Create a standout profile, upload your CV, and apply for jobs with a single click. Our intelligent matching system helps you get noticed by suggesting roles that align perfectly with your skills, experience, and career goals.
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Zoom in={true} timeout={2000}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 4
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                      }}
                    />
                    <CardContent sx={{ position: 'relative', zIndex: 1, p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Business sx={{ fontSize: 40, mr: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          For Employers
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
                        We offer a suite of powerful, easy-to-use tools to streamline your hiring process. Post job openings in minutes, manage all your applicants from a central dashboard, and use our advanced search filters to quickly identify the most qualified candidates from our extensive talent pool.
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* Our Features Section */}
        <Fade in={true} timeout={2200}>
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 4, 
                textAlign: 'center',
                background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Our AI-Powered Features
            </Typography>
            
            <Grid container spacing={3}>
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
                  <Slide in={true} direction="up" timeout={2400 + index * 200}>
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
          </Box>
        </Fade>

        {/* Our Commitment Section */}
        <Fade in={true} timeout={2600}>
          <Card
            sx={{
              background: 'rgba(26, 35, 50, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 3,
                    background: 'linear-gradient(45deg, #43e97b 30%, #38f9d7 90%)'
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                  Our Commitment
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                As we operate from Kota and serve the entire nation, our commitment is to build a platform founded on trust, transparency, and results. Your professional growth and your company's success are the metrics by which we measure our own. We are constantly innovating to ensure that <strong style={{ color: '#42a5f5' }}>ELance</strong> remains the most effective and reliable place to manage your career and build your team.
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default AboutUs;
