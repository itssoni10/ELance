const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  try {
    // Create transporter (using Gmail as example)
    // In production, use environment variables for credentials
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Your OTP for Professional Resume Portal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0078d4;">Professional Resume Portal</h2>
          <p>Hello,</p>
          <p>Thank you for signing up with Professional Resume Portal. Please use the following OTP to complete your registration:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #0078d4; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP is valid for 5 minutes. If you didn't request this OTP, please ignore this email.</p>
          <p>Best regards,<br>Professional Resume Portal Team</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully to', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = sendOTP;
