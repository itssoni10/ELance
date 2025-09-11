const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Signup route
router.post('/signup', authController.signup);

// OTP verification route
router.post('/verify-otp', authController.verifyOTP);

// Login route
router.post('/login', authController.login);

// Resend OTP route
router.post('/resend-otp', authController.resendOTP);

module.exports = router;
