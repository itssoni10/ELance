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
} from '@mui/material';
import { Google, LinkedIn, Apple } from '@mui/icons-material';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('elancejobsportal@gmail.com');
  const [password, setPassword] = useState('elancejobsportal');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Attempting to login with:', email);

      // ✅ Use AuthContext.login (it handles API + navigation)
      await login(email, password);

      setMessage('✅ Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || 'Failed to login');
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
              Unlock your potential with AI-powered career insights
            </Typography>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
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
              {loading ? 'Logging in...' : '🚀 Login to ELance'}
            </Button>
          </Box>

          {message && (
            <Alert 
              severity={message.includes('✅') ? 'success' : 'error'} 
              sx={{ mb: 3, borderRadius: 2 }}
            >
              {message}
            </Alert>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <IconButton><Google /></IconButton>
            <IconButton><LinkedIn /></IconButton>
            <IconButton><Apple /></IconButton>
          </Box>

          <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Don&apos;t have an account?{' '}
            <Button variant="text" size="small" href="/signup">
              Create Account
            </Button>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
