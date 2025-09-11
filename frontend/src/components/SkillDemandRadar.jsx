import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  Button,
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Badge,
  Fade,
  Zoom,
  Slide
} from '@mui/material';
import { Radar, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement
} from 'chart.js';
import {
  TrendingUp,
  TrendingDown,
  Star,
  School,
  Work,
  Psychology,
  Speed,
  Assessment,
  Refresh,
  ArrowForward,
  CheckCircle,
  Warning,
  Info,
  EmojiEvents,
  Timeline,
  Analytics
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { authService } from '../services/AuthService';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement
);

const SkillDemandRadar = () => {
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [skillMatch, setSkillMatch] = useState(null);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

    useEffect(() => {
    fetchSkillData();
  }, []);

        const fetchSkillData = async () => {
            try {
      setLoading(true);
      
      // Fetch trending skills
      const trendingResponse = await fetch('http://localhost:5000/api/skills/trending');
      const trendingData = await trendingResponse.json();
      setTrendingSkills(trendingData);

      // If user is logged in, fetch skill comparison
      if (user) {
        const token = authService.getToken();
        const compareResponse = await fetch(`http://localhost:5000/api/skills/compare/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const compareData = await compareResponse.json();
        setSkillMatch(compareData);
      }
    } catch (err) {
      setError('Failed to fetch skill data');
      console.error('Error fetching skill data:', err);
    } finally {
                setLoading(false);
            }
        };

  const analyzeSkillDemand = async () => {
    try {
      setLoading(true);
      const token = authService.getToken();
      const response = await fetch('http://localhost:5000/api/skills/analyze-demand', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        await fetchSkillData(); // Refresh data
      }
    } catch (err) {
      setError('Failed to analyze skill demand');
      console.error('Error analyzing skill demand:', err);
    } finally {
      setLoading(false);
    }
  };

  // Prepare radar chart data
  const radarData = {
    labels: trendingSkills.slice(0, 8).map(skill => skill.name),
    datasets: [
      {
        label: 'Demand Score',
        data: trendingSkills.slice(0, 8).map(skill => skill.demandScore),
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        borderColor: 'rgba(25, 118, 210, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(25, 118, 210, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(25, 118, 210, 1)'
      }
    ]
  };

  // Prepare bar chart data
  const barData = {
    labels: trendingSkills.slice(0, 10).map(skill => skill.name),
    datasets: [
      {
        label: 'Job Demand',
        data: trendingSkills.slice(0, 10).map(skill => skill.demandScore),
        backgroundColor: 'rgba(25, 118, 210, 0.8)',
        borderColor: 'rgba(25, 118, 210, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#333'
        }
      },
      title: {
        display: false
      }
    },
                            scales: {
                                r: {
                                    beginAtZero: true,
        max: Math.max(...trendingSkills.map(s => s.demandScore)) + 2,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        },
        angleLines: {
          color: 'rgba(0,0,0,0.1)'
        },
        pointLabels: {
          font: {
            size: 11,
            weight: 'bold'
          },
          color: '#333'
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3
      },
      point: {
        radius: 6,
        hoverRadius: 8
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#333'
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10,
            weight: 'bold'
          },
          color: '#333'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        },
        ticks: {
          font: {
            size: 10,
            weight: 'bold'
          },
          color: '#333'
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      }
    }
  };

  if (loading) {
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
            <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
            <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
              🎯 Analyzing Skill Market...
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Gathering real-time insights for you
            </Typography>
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
              🎯 Skill Demand Radar
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
              Real-time insights into trending skills and your market alignment
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                icon={<TrendingUp />} 
                label="Live Market Data" 
                color="primary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                icon={<Analytics />} 
                label="AI-Powered Insights" 
                color="secondary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                icon={<Speed />} 
                label="Real-time Updates" 
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

        {/* Key Metrics Row */}
        <Grid container spacing={4} sx={{ mb: 4, justifyContent: 'center' }}>
          {/* Market Overview */}
          <Grid item xs={12} md={3}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                      <TrendingUp />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Market Overview
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {trendingSkills.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Trending Skills Tracked
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Your Match Score */}
          {skillMatch && (
            <Grid item xs={12} md={3}>
              <Zoom in={true} timeout={1000}>
                <Card 
                  sx={{ 
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
                      top: -30,
                      right: -30,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />
                  <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                        <Assessment />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Your Match
                      </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {Math.round(skillMatch.matchPercentage)}%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Market Alignment Score
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={skillMatch.matchPercentage} 
                      sx={{ 
                        mt: 2, 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'white'
                            }
                        }}
                    />
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          )}

          {/* Skills to Learn */}
          {skillMatch && skillMatch.skillsToLearn.length > 0 && (
            <Grid item xs={12} md={3}>
              <Zoom in={true} timeout={1200}>
                <Card 
                  sx={{ 
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
                      top: -40,
                      right: -40,
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />
                  <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                        <School />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Skills to Learn
                      </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {skillMatch.skillsToLearn.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Opportunities Identified
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          )}

          {/* Your Skills */}
          {skillMatch && skillMatch.matchingSkills.length > 0 && (
            <Grid item xs={12} md={3}>
              <Zoom in={true} timeout={1400}>
                <Card 
                  sx={{ 
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
                      top: -35,
                      right: -35,
                      width: 85,
                      height: 85,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />
                  <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                        <CheckCircle />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Your Skills
                      </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {skillMatch.matchingSkills.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Market-Ready Skills
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          )}
        </Grid>

        {/* Detailed Skills Analysis */}
        <Grid container spacing={4} sx={{ mb: 4, justifyContent: 'center' }}>
          {/* Skills to Learn */}
          {skillMatch && skillMatch.skillsToLearn.length > 0 && (
            <Grid item xs={12} md={6}>
              <Slide in={true} direction="right" timeout={1000}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)', mr: 2 }}>
                        <School />
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#8B4513' }}>
                        🚀 Skills to Learn
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Focus on these trending skills to boost your market value
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {skillMatch.skillsToLearn.slice(0, 8).map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          sx={{ 
                            background: 'rgba(255,255,255,0.8)',
                            color: '#8B4513',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'rgba(255,255,255,1)',
                              transform: 'scale(1.05)'
                            }
                          }}
                          icon={<TrendingUp />}
                        />
                      ))}
                    </Box>
                    {skillMatch.skillsToLearn.length > 8 && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        +{skillMatch.skillsToLearn.length - 8} more opportunities
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          )}

          {/* Your Matching Skills */}
          {skillMatch && skillMatch.matchingSkills.length > 0 && (
            <Grid item xs={12} md={6}>
              <Slide in={true} direction="left" timeout={1200}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)', mr: 2 }}>
                        <CheckCircle />
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                        ✅ Your Market Skills
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      These skills are currently in high demand
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {skillMatch.matchingSkills.slice(0, 8).map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          sx={{ 
                            background: 'rgba(255,255,255,0.8)',
                            color: '#2E7D32',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'rgba(255,255,255,1)',
                              transform: 'scale(1.05)'
                            }
                          }}
                          icon={<EmojiEvents />}
                        />
                      ))}
                    </Box>
                    {skillMatch.matchingSkills.length > 8 && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        +{skillMatch.matchingSkills.length - 8} more skills
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          )}
        </Grid>

        {/* Refresh Button Section */}
        <Fade in={true} timeout={1400}>
          <Box sx={{ 
            textAlign: 'center', 
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}>
            <Button 
              variant="contained" 
              onClick={fetchSkillData}
              disabled={loading}
              size="large"
              startIcon={<Refresh />}
              sx={{ 
                py: 2,
                px: 4,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)'
                },
                transition: 'all 0.3s ease',
                borderRadius: 3,
                fontWeight: 600
              }}
            >
              🔄 Refresh Data
            </Button>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Get the latest skill market insights
            </Typography>
          </Box>
        </Fade>

        {/* Charts Section */}
        <Grid container spacing={4} sx={{ mb: 4, justifyContent: 'center' }}>
          {/* Radar Chart */}
          <Grid item xs={12} xl={6}>
            <Fade in={true} timeout={1500}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <Assessment />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      📈 Skill Demand Radar
                    </Typography>
                  </Box>
                  {trendingSkills.length > 0 ? (
                    <Box sx={{ height: 500 }}>
                      <Radar data={radarData} options={chartOptions} />
                    </Box>
                  ) : (
                    <Box sx={{ 
                      height: 500, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        📊 No Data Available
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Trending skills data will appear here
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} xl={6}>
            <Fade in={true} timeout={1800}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      <Analytics />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      📊 Top Skills by Demand
                    </Typography>
                  </Box>
                  {trendingSkills.length > 0 ? (
                    <Box sx={{ height: 500 }}>
                      <Bar data={barData} options={barOptions} />
                    </Box>
                  ) : (
                    <Box sx={{ 
                      height: 500, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        📊 No Data Available
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Skill demand data will appear here
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>

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
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              🚀 Ready to Take Action?
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
                onClick={analyzeSkillDemand}
                disabled={loading}
                size="large"
                startIcon={<Refresh />}
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
                🔄 Refresh Analysis
              </Button>
              <Button 
                variant="outlined" 
                href="/career-planner"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ 
                  py: 2,
                  px: 4,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                🗺️ Career Planner
              </Button>
              <Button 
                variant="outlined" 
                href="/resume"
                size="large"
                startIcon={<Work />}
                sx={{ 
                  py: 2,
                  px: 4,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
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
    </Box>
    );
};

export default SkillDemandRadar;