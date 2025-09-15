import React, { useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Fade,
  Zoom,
  Paper,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  const handleStartJourney = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#000',
        color: 'white',
        display: 'flex',
        flexDirection: 'column', // ✅ allows nav + content stacking
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ✅ Navigation pinned at top */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <Navigation />
      </Box>

      {/* Main Hero Section */}
      <Container maxWidth="xl" sx={{ flexGrow: 1, pt: 10 }}>
        <Grid container alignItems="center" spacing={6}>
          {/* Left Text Section */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1200}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  Champions Evolve.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}
                >
                  DIGITAL-FIRST | CLOUD-FIRST | AI-FIRST
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartJourney}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 0,
                      background: '#fff',
                      color: '#000',
                      fontWeight: 700,
                      '&:hover': {
                        background: '#f2f2f2',
                      },
                    }}
                  >
                    KNOW MORE
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleStartJourney}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderColor: 'white',
                      color: 'white',
                      borderRadius: 0,
                      fontWeight: 700,
                      '&:hover': {
                        borderColor: '#bbb',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                    endIcon={<ArrowForward />}
                  >
                    GET STARTED
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Right Image / Visual */}
          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={1400}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Paper
                  sx={{
                    width: '100%',
                    height: '500px',
                    background:
                      'url("https://www.infosys.com/content/dam/infosys-web/en/home/infosys-sport.jpg") center/cover no-repeat',
                    borderRadius: 2,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  }}
                />
              </Box>
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
