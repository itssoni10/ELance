# Backend Technical Documentation

## Project Overview
The backend of ELance is a comprehensive AI-powered career development platform built using Node.js with Express.js framework. It provides a robust REST API infrastructure with advanced features including AI integration, real-time skill analysis, resume processing, and intelligent career recommendations.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose 7.0.3
- **Authentication**: JSON Web Tokens (JWT) 9.0.0
- **Password Hashing**: bcryptjs 2.4.3
- **Email Service**: Nodemailer 6.9.1
- **AI Integration**: Google Gemini AI 2.5 Flash
- **File Upload**: Multer for PDF processing
- **Development**: Nodemon for hot reloading

## Project Structure
```
backend/
├── config/
│   └── db.js                    # Database connection configuration
├── controllers/
│   ├── auth.js                  # Authentication controller
│   ├── skills.js                # Skill analysis controller
│   ├── careerPaths.js           # Career planning controller
│   ├── resumeController.js      # Resume processing controller
│   └── geminiController.js      # AI integration controller
├── models/
│   ├── User.js                  # User schema and model
│   ├── Skill.js                 # Skill schema and model
│   ├── Job.js                   # Job posting schema
│   └── CareerPath.js            # Career path schema
├── routes/
│   ├── auth.js                  # Authentication routes
│   ├── skills.js                # Skill analysis routes
│   ├── careerPaths.js           # Career planning routes
│   ├── resume.js                # Resume upload routes
│   └── gemini.js                # AI integration routes
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── utils/
│   ├── sendOTP.js               # Email OTP service
│   └── geminiService.js         # Google Gemini AI service
├── uploads/
│   └── resumes/                 # Resume file storage
├── seedData.js                  # Database seeding script
└── server.js                    # Main server file
```

## Key Components

### 1. Server Configuration
- Express server setup with middleware
- CORS enabled for frontend communication
- Environment variables using dotenv
- MongoDB connection configuration
- File upload handling with Multer

### 2. Authentication System
- JWT-based authentication with secure tokens
- Password hashing with bcryptjs (12 salt rounds)
- OTP verification system via email
- User model with comprehensive schema
- Protected route middleware

### 3. AI Integration (Google Gemini)
- Resume text analysis and extraction
- Skill recommendation generation
- Career path analysis and suggestions
- Natural language processing for insights
- Fallback responses for API failures

### 4. Skill Analysis System
- Real-time trending skills tracking
- User skill comparison with market demand
- Skill gap analysis and recommendations
- Market alignment scoring
- Interactive data visualization support

### 5. Resume Processing
- PDF file upload and storage
- Text extraction and analysis
- Automatic skill identification
- Experience parsing and categorization
- Profile auto-population

### 6. Career Planning Engine
- Current to target role mapping
- Skill gap identification
- Learning resource recommendations
- Timeline estimation for skill acquisition
- Industry trend analysis

### 7. Database Models
- User model with skills and career goals
- Skill model with demand scoring
- Job model for market analysis
- Career path model for recommendations

### 8. API Routes & Middleware
- Authentication routes (signup, login, OTP)
- Skill analysis endpoints
- Career planning endpoints
- Resume upload endpoints
- AI integration endpoints
- JWT authentication middleware

## Security Features
- Password hashing
- JWT token authentication
- CORS protection
- Environment variable protection
- OTP verification

## Development
```bash
npm install     # Install dependencies
npm run dev     # Run development server with Nodemon
npm start       # Run production server
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - User registration with email verification
- `POST /api/auth/login` - User login with JWT token
- `POST /api/auth/verify-otp` - OTP verification for email
- `POST /api/auth/resend-otp` - Resend OTP to user email

### Skill Analysis Routes
- `GET /api/skills/trending` - Get trending skills in market
- `GET /api/skills/compare/:userId` - Compare user skills with market
- `POST /api/skills/analyze-demand` - Analyze skill demand trends

### Career Planning Routes
- `GET /api/career-paths/recommendations` - Get career recommendations
- `POST /api/career-paths/analyze` - Analyze career path options
- `GET /api/career-paths/:userId` - Get user-specific career paths

### Resume Processing Routes
- `POST /api/resume/upload` - Upload and analyze resume (PDF)
- `GET /api/resume/analysis/:userId` - Get resume analysis results

### AI Integration Routes
- `POST /api/gemini/skill-recommendations` - Get AI skill recommendations
- `POST /api/gemini/career-advice` - Get AI career advice
- `POST /api/gemini/resume-analysis` - AI-powered resume analysis

## Database Schema

### User Model
```javascript
{
  username: String,
  email: String (unique),
  password: String (hashed with bcryptjs),
  userType: String, // 'jobSeeker' | 'employer'
  verified: Boolean,
  skills: [{
    skill: ObjectId (ref: 'Skill'),
    proficiencyLevel: String, // 'beginner' | 'intermediate' | 'advanced' | 'expert'
    yearsOfExperience: Number
  }],
  careerGoals: {
    currentRole: String,
    targetRole: String,
    targetSalary: Number,
    timeline: String // '6 months' | '1 year' | '2 years' | '5 years'
  },
  experience: [{
    title: String,
    company: String,
    duration: String,
    description: String
  }],
  currentCompany: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Model
```javascript
{
  name: String (unique),
  category: String, // 'Technical' | 'Soft Skills' | 'Industry Specific'
  demandScore: Number, // 0-100
  trending: Boolean,
  jobCount: Number, // Number of jobs requiring this skill
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Job Model
```javascript
{
  title: String,
  company: String,
  location: String,
  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  requiredSkills: [ObjectId (ref: 'Skill')],
  experienceLevel: String,
  jobType: String, // 'full-time' | 'part-time' | 'contract' | 'remote'
  description: String,
  postedDate: Date,
  applicationDeadline: Date
}
```

### CareerPath Model
```javascript
{
  name: String,
  description: String,
  requiredSkills: [ObjectId (ref: 'Skill')],
  averageSalary: Number,
  growthRate: Number, // Percentage growth
  difficulty: String, // 'easy' | 'medium' | 'hard'
  timeline: String, // Estimated time to achieve
  prerequisites: [String],
  resources: [{
    title: String,
    type: String, // 'course' | 'book' | 'certification' | 'practice'
    url: String,
    cost: String
  }]
}
```

## Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elance_db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
GEMINI_API_KEY=your_gemini_api_key
```

## Error Handling
- Centralized error handling middleware
- Proper HTTP status codes
- Structured error responses

## AI Integration Features

### Google Gemini AI Service
```javascript
// Resume Analysis
const analyzeResume = async (resumeText) => {
  const prompt = `Analyze resume text and extract structured information...`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};

// Skill Recommendations
const generateSkillRecommendations = async (currentRole, targetRole, userSkills) => {
  const prompt = `Generate career transition path and skill recommendations...`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};
```

### File Upload & Processing
```javascript
// Multer configuration for PDF uploads
const storage = multer.diskStorage({
  destination: 'uploads/resumes',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
```

## Performance Optimizations
- Database indexing on frequently queried fields
- Caching for trending skills data
- Efficient aggregation pipelines for skill analysis
- Optimized file upload handling
- Connection pooling for MongoDB

## Security Best Practices
- JWT token expiration and refresh
- Password hashing with bcryptjs (12 salt rounds)
- Input validation and sanitization
- CORS configuration for frontend communication
- Environment variable protection
- File upload validation and size limits
- Rate limiting for API endpoints

## Testing & Quality Assurance
- API endpoint testing with Postman
- Database seeding for development
- Error handling and validation
- Logging and monitoring
- Performance testing and optimization

## Deployment Considerations
- Environment-specific configurations
- Database migration scripts
- File storage management
- SSL/TLS configuration
- Load balancing and scaling
- Monitoring and logging setup

## Best Practices Implemented
- **MVC Architecture**: Clear separation of concerns
- **Modular Code Structure**: Organized controllers, models, and routes
- **Environment Variable Usage**: Secure configuration management
- **Secure Authentication**: JWT with proper token handling
- **Comprehensive Error Handling**: Structured error responses
- **Database Optimization**: Efficient queries and indexing
- **AI Integration**: Robust fallback mechanisms
- **File Processing**: Secure upload and validation
- **API Documentation**: Clear endpoint documentation
- **Code Documentation**: Comprehensive inline comments
