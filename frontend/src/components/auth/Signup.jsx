import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Divider, IconButton } from '@mui/material';
import { Google, LinkedIn, Apple } from '@mui/icons-material';
import UserTypeSelector from './UserTypeSelector';
import './Auth.css';

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
      // Send signup request to backend
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          userType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOTP(true);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Signup error:', err);
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
      // Send OTP verification request to backend
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful, redirect to appropriate page
        alert('Signup successful! You can now login.');
        window.location.href = '/';
      } else {
        setError(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      // Send resend OTP request to backend
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('New OTP sent to your email');
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Resend OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Professional Resume Portal
      </Typography>
      
      <UserTypeSelector userType={userType} setUserType={setUserType} />
      
      {!showOTP ? (
        <Box component="form" onSubmit={handleSignupSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ py: 1.5, mb: 2, bgcolor: '#1976d2' }}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleOTPSubmit} sx={{ mt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            OTP sent to {email}
          </Typography>
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
            sx={{ mb: 2 }}
          />
          
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ py: 1.5, mb: 2, bgcolor: '#1976d2' }}
          >
            {loading ? 'Verifying...' : 'Verify & Signup'}
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            onClick={handleResendOTP}
            disabled={loading}
            sx={{ py: 1.5, mb: 2 }}
          >
            Resend OTP
          </Button>
        </Box>
      )}
      
      <Divider sx={{ my: 3 }}>OR</Divider>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton sx={{ p: 2, border: '1px solid #ddd' }}>
          <Google color="error" />
        </IconButton>
        <IconButton sx={{ p: 2, border: '1px solid #ddd' }}>
          <LinkedIn color="primary" />
        </IconButton>
        <IconButton sx={{ p: 2, border: '1px solid #ddd' }}>
          <Apple />
        </IconButton>
      </Box>
      
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account? <Button variant="text" size="small" href="/">Login</Button>
      </Typography>
    </Container>
  );
};

export default Signup;
