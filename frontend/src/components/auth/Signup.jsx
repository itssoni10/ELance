import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Divider,
  IconButton,
  Alert,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { Google, LinkedIn, Apple, Person, Business } from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';
import { authService } from '../../services/AuthService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [userType, setUserType] = useState('jobSeeker');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to sign up with:', { username, email, password, userType });
      const data = await authService.signup({
        username,
        email,
        password,
        confirmPassword,
        userType
      });
      
      console.log('Signup response:', data);
      setShowOTP(true);
    } catch (err) {
      console.error('Signup error details:', {
        error: err,
        message: err.message,
        stack: err.stack
      });
      
      if (!navigator.onLine) {
        setError('No internet connection. Please check your network.');
      } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please check if the backend is running.');
      } else {
        setError('Server error while sending OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      // Send OTP verification request through AuthService
      const data = await authService.verifyOTP(email, otp);
      
      // Update auth context with user data
      login(data.user);
      
      // Signup successful, redirect to appropriate page
      alert('Signup successful! Welcome to ELance!');
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      // Send resend OTP request through AuthService
      const data = await authService.resendOTP(email);
      alert('New OTP sent to your email');
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Resend OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2d3748 100%)',
        pt: 15,
        pb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
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
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            background: 'rgba(26, 35, 50, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              🚀 ELance
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
              Professional Career Portal
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Join thousands of professionals accelerating their careers
            </Typography>
          </Box>

          {/* User Type Selector */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              I am a:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Chip
                icon={<Person />}
                label="Job Seeker"
                clickable
                onClick={() => setUserType('jobSeeker')}
                sx={{
                  background: userType === 'jobSeeker' 
                    ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(66, 165, 245, 0.2)'
                  }
                }}
              />
              <Chip
                icon={<Business />}
                label="Employer"
                clickable
                onClick={() => setUserType('employer')}
                sx={{
                  background: userType === 'employer' 
                    ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(66, 165, 245, 0.2)'
                  }
                }}
              />
            </Box>
          </Box>
          
          {!showOTP ? (
            <Box component="form" onSubmit={handleSignupSubmit}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
              
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                size="large"
                sx={{ 
                  py: 2, 
                  mb: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  }
                }}
              >
                {loading ? 'Sending OTP...' : '🚀 Send OTP & Create Account'}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleOTPSubmit}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 1 }}>
                  📧 Verification Code Sent
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  We've sent a 6-digit code to <strong>{email}</strong>
                </Typography>
              </Box>
              
              <TextField
                fullWidth
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                required
                placeholder="000000"
                inputProps={{ 
                  maxLength: 6,
                  style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }
                }}
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
              
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                size="large"
                sx={{ 
                  py: 2, 
                  mb: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  }
                }}
              >
                {loading ? 'Verifying...' : '✅ Verify & Complete Signup'}
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                onClick={handleResendOTP}
                disabled={loading}
                size="large"
                sx={{ 
                  py: 2, 
                  mb: 3,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#42a5f5',
                    backgroundColor: 'rgba(66, 165, 245, 0.1)'
                  }
                }}
              >
                🔄 Resend OTP
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              OR
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <IconButton 
              sx={{ 
                p: 2, 
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 3,
                color: 'white',
                '&:hover': {
                  borderColor: '#42a5f5',
                  backgroundColor: 'rgba(66, 165, 245, 0.1)'
                }
              }}
            >
              <Google />
            </IconButton>
            <IconButton 
              sx={{ 
                p: 2, 
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 3,
                color: 'white',
                '&:hover': {
                  borderColor: '#42a5f5',
                  backgroundColor: 'rgba(66, 165, 245, 0.1)'
                }
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton 
              sx={{ 
                p: 2, 
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 3,
                color: 'white',
                '&:hover': {
                  borderColor: '#42a5f5',
                  backgroundColor: 'rgba(66, 165, 245, 0.1)'
                }
              }}
            >
              <Apple />
            </IconButton>
          </Box>

          <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Already have an account?{' '}
            <Button 
              variant="text" 
              size="small" 
              href="/login"
              sx={{ 
                fontWeight: 600,
                color: '#42a5f5',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#1976d2'
                }
              }}
            >
              Login Here
            </Button>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Signup;
