const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOTP = require('../utils/sendOTP');

// Temporary storage for OTPs (in production, use Redis or database)
const otpStore = {};

// Signup controller
const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, userType } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword || !userType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    
    // Store OTP temporarily
    otpStore[email] = {
      otp,
      userData: { username, email, password, userType },
      createdAt: Date.now()
    };

    console.log('Attempting to send OTP...');
    try {
      // Send OTP to email
      await sendOTP(email, otp);
      console.log('OTP sent successfully');

      res.status(200).json({ 
        message: 'OTP sent to your email', 
        email 
      });
    } catch (error) {
      console.error('Error in sending OTP:', error);
      res.status(500).json({ 
        message: 'Error sending OTP', 
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// OTP verification controller
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if OTP exists
    if (!otpStore[email]) {
      return res.status(400).json({ message: 'OTP not found for this email' });
    }

    const storedOTP = otpStore[email];
    
    // Check if OTP is expired (5 minutes)
    if (Date.now() - storedOTP.createdAt > 5 * 60 * 1000) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Create user
    const { username, password, userType } = storedOTP.userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, userType: newUser.userType },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    // Remove OTP from store
    delete otpStore[email];

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        userType: newUser.userType
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Resend OTP controller
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user data exists
    if (!otpStore[email]) {
      return res.status(400).json({ message: 'No signup request found for this email' });
    }

    const storedData = otpStore[email];
    
    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Update OTP
    otpStore[email] = {
      otp: newOtp,
      userData: storedData.userData,
      createdAt: Date.now()
    };

    // Send new OTP to email
    await sendOTP(email, newOtp);

    res.status(200).json({ 
      message: 'New OTP sent to your email', 
      email 
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Server error during OTP resend' });
  }
};

module.exports = {
  signup,
  verifyOTP,
  login,
  resendOTP
};
