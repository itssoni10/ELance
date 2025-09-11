const multer = require('multer');
const path = require('path');
const fs = require('fs');
const geminiService = require('../utils/geminiService');
const User = require('../models/User');
const Skill = require('../models/Skill');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/resumes';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Upload resume and extract text using Gemini
const uploadResume = async (req, res) => {
  try {
    const userId = req.user._id;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    console.log('Resume uploaded:', filePath);

    // For now, we'll simulate PDF text extraction
    // In a real implementation, you would use a PDF parsing library
    const extractedText = await extractTextFromPDF(filePath);
    
    // Use Gemini to analyze the resume
    const resumeAnalysis = await geminiService.analyzeResume(extractedText);
    
    // Update user profile with extracted information
    await updateUserProfile(userId, resumeAnalysis);
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    res.json({
      message: 'Resume processed successfully',
      analysis: resumeAnalysis
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: 'Failed to process resume' });
  }
};

// Extract text from PDF (simplified version)
async function extractTextFromPDF(filePath) {
  // In a real implementation, you would use a library like pdf-parse
  // For now, we'll return a sample resume text
  return `
    John Doe
    Software Engineer
    john.doe@email.com
    (555) 123-4567
    
    EXPERIENCE
    Senior Software Engineer - Tech Corp (2020-2023)
    - Developed web applications using React, Node.js, and MongoDB
    - Led a team of 5 developers
    - Implemented CI/CD pipelines using Docker and AWS
    
    Software Engineer - StartupXYZ (2018-2020)
    - Built full-stack applications
    - Worked with JavaScript, Python, and SQL
    
    EDUCATION
    Bachelor of Science in Computer Science
    University of Technology (2014-2018)
    
    SKILLS
    JavaScript, React, Node.js, Python, MongoDB, AWS, Docker, Git
  `;
}

// Update user profile with resume data
async function updateUserProfile(userId, resumeAnalysis) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Extract skills from resume analysis
    const extractedSkills = resumeAnalysis.skills || [];
    const skillIds = [];

    for (const skillName of extractedSkills) {
      let skill = await Skill.findOne({ name: skillName });
      if (!skill) {
        skill = new Skill({
          name: skillName,
          category: 'General',
          demandScore: 0,
          trending: false
        });
        await skill.save();
      }
      skillIds.push(skill._id);
    }

    // Update user with extracted information
    const updateData = {
      skills: skillIds.map(skillId => ({
        skill: skillId,
        proficiencyLevel: 'intermediate',
        yearsOfExperience: 2
      })),
      experience: resumeAnalysis.experience || [],
      currentCompany: resumeAnalysis.currentCompany || '',
      careerGoals: {
        ...user.careerGoals,
        currentRole: resumeAnalysis.currentRole || user.careerGoals?.currentRole
      }
    };

    await User.findByIdAndUpdate(userId, updateData);
    console.log('User profile updated with resume data');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

module.exports = { uploadResume, upload };
