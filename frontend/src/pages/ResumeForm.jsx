import React, { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Alert,
  LinearProgress,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CloudUpload,
  Description,
  CheckCircle,
  Error,
  Person,
  Work,
  School,
  Star,
  Close,
  Download,
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { authService } from '../services/AuthService';

const ResumeForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { user } = useContext(AuthContext);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please select a PDF file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const token = authService.getToken();
      const response = await fetch('http://localhost:5000/api/resume/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setAnalysis(result.analysis);
        setSuccess('Resume uploaded and analyzed successfully!');
        setShowAnalysis(true);
        setFile(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload resume');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCloseAnalysis = () => {
    setShowAnalysis(false);
    setAnalysis(null);
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 15, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Please login to upload your resume
        </Typography>
        <Button variant="contained" href="/" sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 15, pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          📄 Smart Resume Upload
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Upload your resume and let AI extract your skills, experience, and career insights
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                🚀 Upload Your Resume
              </Typography>
              
              <Box
                sx={{
                  border: '2px dashed #1976d2',
                  borderRadius: 3,
                  p: 4,
                  textAlign: 'center',
                  mb: 3,
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  }
                }}
                onClick={() => document.getElementById('file-input').click()}
              >
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {file ? file.name : 'Click to select PDF file'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supported format: PDF (Max 5MB)
                </Typography>
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </Box>

              {file && (
                <Box sx={{ mb: 3 }}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Description color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">{file.name}</Typography>
                    </Box>
                    <IconButton onClick={() => setFile(null)} size="small">
                      <Close />
                    </IconButton>
                  </Paper>
                </Box>
              )}

              {uploading && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Processing your resume...
                  </Typography>
                  <LinearProgress variant="indeterminate" />
                </Box>
              )}

              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!file || uploading}
                fullWidth
                size="large"
                sx={{ 
                  py: 2,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  }
                }}
              >
                {uploading ? 'Processing...' : '🤖 Analyze Resume'}
              </Button>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {success}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Features Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                ✨ What We Extract
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Personal Information"
                    secondary="Name, contact details, location"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Work color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Work Experience"
                    secondary="Job titles, companies, responsibilities"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <School color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Education"
                    secondary="Degrees, institutions, graduation years"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Star color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Skills & Technologies"
                    secondary="Technical skills, programming languages"
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                🎯 Benefits
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="Auto-populate Profile" color="primary" size="small" />
                <Chip label="Skill Matching" color="secondary" size="small" />
                <Chip label="Career Insights" color="success" size="small" />
                <Chip label="AI Analysis" color="info" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Analysis Results Dialog */}
      <Dialog open={showAnalysis} onClose={handleCloseAnalysis} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5">
              🤖 Resume Analysis Results
            </Typography>
            <IconButton onClick={handleCloseAnalysis}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {analysis && (
            <Box>
              {/* Personal Info */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    👤 Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Name</Typography>
                      <Typography variant="body1">{analysis.personalInfo?.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{analysis.personalInfo?.email}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">{analysis.personalInfo?.phone}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Location</Typography>
                      <Typography variant="body1">{analysis.personalInfo?.location}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Current Role */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    💼 Current Position
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {analysis.currentRole}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    at {analysis.currentCompany}
                  </Typography>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🛠️ Skills & Technologies
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {analysis.skills?.map((skill, index) => (
                      <Chip key={index} label={skill} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📈 Work Experience
                  </Typography>
                  {analysis.experience?.map((exp, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                      <Typography variant="h6">{exp.title}</Typography>
                      <Typography variant="body1" color="primary">{exp.company}</Typography>
                      <Typography variant="body2" color="text.secondary">{exp.duration}</Typography>
                      <Typography variant="body2">{exp.description}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🎓 Education
                  </Typography>
                  {analysis.education?.map((edu, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                      <Typography variant="h6">{edu.degree}</Typography>
                      <Typography variant="body1" color="primary">{edu.institution}</Typography>
                      <Typography variant="body2" color="text.secondary">{edu.year}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAnalysis} variant="outlined">
            Close
          </Button>
          <Button 
            onClick={handleCloseAnalysis} 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            }}
          >
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResumeForm;