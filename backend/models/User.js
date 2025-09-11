const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userType: {
    type: String,
    required: true,
    enum: ['jobSeeker', 'recruiter']
  },
  skills: [{
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill'
    },
    proficiencyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner'
    },
    yearsOfExperience: Number
  }],
  careerGoals: {
    currentRole: String,
    targetRole: String,
    targetTimeline: Number, // in months
    careerPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerPath'
    }
  },
  currentCompany: String,
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
