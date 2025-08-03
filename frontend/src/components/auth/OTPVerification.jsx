import React, { useState } from 'react';
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
      // In a real app, you would verify OTP with backend
      console.log(`Verifying OTP ${otp} for ${email}`);
      onVerify(true); // Assuming OTP is valid for demo
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error('OTP verification failed:', err);
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