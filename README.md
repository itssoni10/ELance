# 🚀 ELance - Setup Guide for Windows

This guide will help you set up the ELance project on Windows, including database configuration and all necessary dependencies.

## ⚡ Quick Start

**Want to get up and running quickly? Follow these steps:**

1. **Prerequisites**: Install Node.js, MongoDB, and Git
2. **Clone & Install**: 
   ```bash
   git clone <repository-url>
   cd ELance-master
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Configure**: Set up `.env` files (see Environment Configuration)
4. **Run**: 
   ```bash
   # Terminal 1: Backend
   cd backend && npm start
   
   # Terminal 2: Frontend
   cd frontend && npm start
   ```
5. **Access**: Open `http://localhost:3000` in your browser

**That's it!** 🎉

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Installation](#project-installation)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [API Testing](#api-testing)
7. [Troubleshooting](#troubleshooting)
8. [Project Structure](#project-structure)

---

## 🔧 Prerequisites

Before starting, ensure you have the following installed on your Windows system:

### Required Software

1. **Node.js (v16 or higher)**
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - Choose Windows x64 version
   - Follow the installation wizard
   - **Important**: During installation, check "Install MongoDB as a Service" and "Install MongoDB Compass"

3. **Git**
   - Download from: https://git-scm.com/download/win
   - Use default installation settings

4. **Visual Studio Code (Recommended)**
   - Download from: https://code.visualstudio.com/
   - Install useful extensions:
     - ES7+ React/Redux/React-Native snippets
     - Prettier - Code formatter
     - Auto Rename Tag
     - Bracket Pair Colorizer

---

## 📦 Project Installation

### Step 1: Clone the Repository

```bash
# Open Command Prompt or PowerShell
# Navigate to your desired directory
cd C:\Users\YourUsername\Desktop

# Clone the repository
git clone https://github.com/your-username/ELance-master.git

# Navigate to the project directory
cd ELance-master
```

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

---

## 🗄️ Database Setup

### Step 1: Start MongoDB Service

#### Option A: Using Windows Services
1. Press `Win + R`, type `services.msc`, and press Enter
2. Find "MongoDB" in the services list
3. Right-click and select "Start" (if not already running)
4. Set startup type to "Automatic" for future use

#### Option B: Using Command Line
```bash
# Open Command Prompt as Administrator
net start MongoDB
```

### Step 2: Verify MongoDB Installation

```bash
# Open Command Prompt
mongo --version

# Connect to MongoDB shell
mongo
```

If the above doesn't work, try:
```bash
mongosh
```

### Step 3: Create Database and User

```bash
# Connect to MongoDB
mongo

# Switch to admin database
use admin

# Create admin user (optional but recommended)
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

# Switch to elance database
use elance_db

# Create application user
db.createUser({
  user: "elance_user",
  pwd: "elance_password",
  roles: ["readWrite"]
})

# Exit MongoDB shell
exit
```

### Step 4: Test Database Connection

```bash
# Test connection with authentication
mongo -u elance_user -p elance_password --authenticationDatabase elance_db

# Or without authentication (if you skipped user creation)
mongo elance_db
```

---

## ⚙️ Environment Configuration

### Step 1: Create Backend Environment File

```bash
# Navigate to backend directory
cd backend

# Create .env file
echo. > .env
```

### Step 2: Configure Backend Environment Variables

Open `backend/.env` in your text editor and add the following:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/elance_db
# If you created a user, use:
# MONGODB_URI=mongodb://elance_user:elance_password@localhost:27017/elance_db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# Email Configuration (for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### Step 3: Configure Frontend Environment (Optional)

```bash
# Navigate to frontend directory
cd frontend

# Create .env file
echo. > .env
```

Add to `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Running the Application

### Quick Start Commands

#### Option 1: Run Both Backend and Frontend (Recommended)

```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend (in a new terminal)
cd frontend
npm start
```

#### Option 2: Development Mode with Auto-restart

```bash
# Terminal 1: Start Backend with nodemon
cd backend
npm run dev

# Terminal 2: Start Frontend (in a new terminal)
cd frontend
npm start
```

### Detailed Setup Steps

### Step 1: Start MongoDB (if not already running)

```bash
# Check if MongoDB is running
net start MongoDB

# Alternative: Start MongoDB manually
mongod --dbpath "C:\data\db"
```

### Step 2: Start Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB connected successfully
Routes loaded successfully
```

### Step 3: Start Frontend Development Server

```bash
# Open a new terminal/command prompt
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Start the development server
npm start
```

**Expected Output:**
```
Compiled successfully!
Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

The frontend will automatically open in your browser at `http://localhost:3000`

### Step 4: Verify Application is Running

1. **Backend API**: Visit `http://localhost:5000/api/health`
2. **Frontend**: Visit `http://localhost:3000`
3. **Database**: Check MongoDB connection in backend logs

---

## 🧪 API Testing

### Test Backend API Endpoints

#### 1. Test Server Health
```bash
curl http://localhost:5000/api/health
```

#### 2. Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"testuser\",
    \"email\": \"test@example.com\",
    \"password\": \"password123\",
    \"confirmPassword\": \"password123\",
    \"userType\": \"jobSeeker\"
  }"
```

#### 3. Test User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"test@example.com\",
    \"password\": \"password123\"
  }"
```

#### 4. Test Trending Skills (Public Endpoint)
```bash
curl http://localhost:5000/api/skills/trending
```

### Test Frontend

1. Open browser and navigate to `http://localhost:3000`
2. Try registering a new account
3. Test login functionality
4. Explore the dashboard and other features

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Issues

**Problem**: `MongoDB connection failed`
```bash
# Check if MongoDB service is running
net start MongoDB

# Check MongoDB logs
# Navigate to: C:\Program Files\MongoDB\Server\6.0\log\mongod.log
```

**Solution**: 
- Ensure MongoDB service is running
- Check if port 27017 is not blocked by firewall
- Verify connection string in `.env` file

#### 2. Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port in .env
PORT=5001
```

#### 3. Node Modules Issues

**Problem**: `Module not found` errors

**Solution**:
```bash
# Delete node_modules and package-lock.json
rmdir /s node_modules
del package-lock.json

# Reinstall dependencies
npm install
```

#### 4. Frontend Build Issues

**Problem**: `npm start` fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rmdir /s node_modules
del package-lock.json

# Reinstall
npm install

# Try starting again
npm start
```

#### 5. Environment Variables Not Loading

**Problem**: Environment variables not recognized

**Solution**:
- Ensure `.env` file is in the correct directory (`backend/.env`)
- Check for typos in variable names
- Restart the server after making changes
- Ensure no spaces around `=` in `.env` file

#### 6. CORS Issues

**Problem**: Frontend can't connect to backend

**Solution**:
- Verify `FRONTEND_URL` in backend `.env` file
- Check if backend is running on correct port
- Ensure CORS middleware is properly configured

### Getting Help

If you encounter issues not covered here:

1. Check the console logs for detailed error messages
2. Verify all prerequisites are installed correctly
3. Ensure all environment variables are set properly
4. Check MongoDB connection and database setup
5. Review the project's GitHub issues page

---

## 📁 Project Structure

```
ELance-master/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Main server file
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   ├── theme/           # Material-UI theme
│   │   └── App.js           # Main App component
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Frontend environment variables
├── setup.md                 # This setup guide
└── README.md                # Project overview
```

---

## 🎯 Next Steps

After successful setup:

1. **Explore the Application**: Navigate through all features
2. **Test User Registration**: Create test accounts
3. **Upload Resume**: Test the resume upload functionality
4. **Explore Skill Radar**: Check the skill analysis features
5. **Career Planning**: Test the career path recommendations
6. **Database Seeding**: Run seed scripts to populate sample data

### Essential Commands

#### 🚀 **Start the Application**
```bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)
cd frontend
npm start
```

#### 🔧 **Development Commands**
```bash
# Backend development
cd backend
npm run dev          # Start with auto-restart (nodemon)
npm test            # Run tests
npm run seed        # Seed database with sample data

# Frontend development
cd frontend
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
```

#### 🗄️ **Database Commands**
```bash
# Connect to MongoDB
mongo elance_db     # Connect to database
mongosh elance_db   # Alternative connection method

# View data
db.users.find()     # View all users
db.skills.find()    # View all skills
db.jobs.find()      # View all jobs
```

#### 🛠️ **Troubleshooting Commands**
```bash
# Check if ports are in use
netstat -ano | findstr :5000  # Check backend port
netstat -ano | findstr :3000  # Check frontend port

# Kill processes on ports
taskkill /PID <PID> /F        # Kill process by PID

# Restart MongoDB service
net start MongoDB             # Start MongoDB
net stop MongoDB              # Stop MongoDB
```

#### 📦 **Installation Commands**
```bash
# Fresh installation
cd backend && npm install
cd ../frontend && npm install

# Clean installation (if having issues)
rmdir /s node_modules
del package-lock.json
npm install
```

---

## 📞 Support

For additional help or questions:

- Check the project documentation
- Review the GitHub repository issues
- Contact the development team

**Happy coding! 🚀**
