import config from '../config';
const { API_URL } = config;

export const authService = {
    // Check server status
    async checkServerStatus() {
        try {
            const response = await fetch(`${API_URL}/`);
            return await response.json();
        } catch (error) {
            console.error('Server status check error:', error);
            throw new Error('Cannot connect to server. Please ensure the backend is running on port 5000.');
        }
    },

    async signup(userData) {
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to signup');
            }
            
            return data;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    },

    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }
            
            // Store authentication data
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },



    async verifyOTP(email, otp) {
        try {
            console.log('Verifying OTP for:', email);
            const response = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    otp
                })
            });

            const data = await response.json();
            console.log('OTP verification response:', data);
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to verify OTP');
            }
            
            // Store authentication data after successful OTP verification
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            return data;
        } catch (error) {
            console.error('OTP verification error:', error);
            throw error;
        }
    },


    async resendOTP(email) {
        try {
            const response = await fetch(`${API_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend OTP');
            }
            
            return data;
        } catch (error) {
            console.error('Resend OTP error:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};
