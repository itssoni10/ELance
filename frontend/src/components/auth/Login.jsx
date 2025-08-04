import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Divider, IconButton } from '@mui/material';
import { Google, LinkedIn, Apple } from '@mui/icons-material';
import UserTypeSelector from './UserTypeSelector';
import Signup from "./Signup";

const Login = () => {
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [userType, setUserType] = useState('jobseeker');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Send OTP to email logic here
    setShowOTP(true);
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Verify OTP logic here
    console.log('OTP verified');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Professional Resume Portal
      </Typography>
      
      <UserTypeSelector userType={userType} setUserType={setUserType} />
      
      {!showOTP ? (
        <Box component="form" onSubmit={handleEmailSubmit} sx={{ mt: 3 }}>
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
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ py: 1.5, mb: 2, bgcolor: '#1976d2' }}
          >
            Send OTP
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
            onChange={(e) => setOtp(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ py: 1.5, mb: 2, bgcolor: '#1976d2' }}
          >
            Verify & Login
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
        Don't have an account? <Button variant="text" size="small" href="/signup">Signup</Button>
      </Typography>
    </Container>
  );
};

export default Login;