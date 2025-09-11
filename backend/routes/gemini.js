const express = require('express');
const router = express.Router();
const { 
  generateCareerAdvice, 
  generateSkillRecommendations, 
  analyzeJobMarketTrends 
} = require('../controllers/geminiController');
const auth = require('../middleware/auth');

// Generate AI-powered career advice
router.post('/career-advice', auth, generateCareerAdvice);

// Generate skill recommendations
router.post('/skill-recommendations', auth, generateSkillRecommendations);

// Analyze job market trends
router.get('/market-trends', auth, analyzeJobMarketTrends);

module.exports = router;
