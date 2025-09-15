const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const skillRoutes = require('./routes/skills');
const careerPathRoutes = require('./routes/careerPaths');
const geminiRoutes = require('./routes/gemini');
const resumeRoutes = require('./routes/resume');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test routes in development
if (process.env.NODE_ENV === 'development') {
  const testRoutes = require('./routes/test');
  app.use('/api/test', testRoutes);
}

// Enhanced error logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      status: 'success'
    });
  }
  next();
});

app.use(express.json());

// Connect to database
console.log('Initializing server...');
connectDB().then(() => {
  console.log('Database connection successful');
}).catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/career-paths', careerPathRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/resume', resumeRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Professional Auth Backend API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('MongoDB URI:', process.env.MONGODB_URI);
  // console.log('Email configuration loaded:', !!process.env.EMAIL_USER)
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP Server is ready:", success);
  }
});
