import React, { useState } from 'react';
import { authService } from '../../services/AuthService';
import './Auth.js';

const OTPVerification = ({ email, onVerify }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    
    try {
      console.log(`Attempting to verify OTP for ${email}`);
      const response = await authService.verifyOTP(email, otp);
      console.log('OTP verification response:', response);
      onVerify(true);
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError(error.message || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Verify OTP</h2>
          <p>We've sent a 6-digit code to {email}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError('');
              }}
              placeholder="6-digit code"
              maxLength={6}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          
          <button type="submit" className="auth-button">
            Verify OTP
          </button>
        </form>
        
        <div className="auth-footer">
          <button 
            type="button" 
            className="auth-toggle"
            onClick={() => onVerify(false)}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;