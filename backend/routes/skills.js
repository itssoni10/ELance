const express = require('express');
const router = express.Router();
const { getTrendingSkills, analyzeSkillDemand, compareUserSkills } = require('../controllers/skills');
const auth = require('../middleware/auth');

// Get trending skills
router.get('/trending', getTrendingSkills);

// Analyze skill demand
router.post('/analyze-demand', auth, analyzeSkillDemand);

// Compare user skills with trending skills
router.get('/compare/:userId', auth, compareUserSkills);

module.exports = router;
