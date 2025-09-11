const Skill = require('../models/Skill');
const Job = require('../models/Job');
const User = require('../models/User');

// Get trending skills
exports.getTrendingSkills = async (req, res) => {
    try {
        const trendingSkills = await Skill.find({ trending: true })
            .sort({ demandScore: -1 })
            .limit(10);
        res.json(trendingSkills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Analyze skill demand from job listings
exports.analyzeSkillDemand = async (req, res) => {
    try {
        const activeJobs = await Job.find({ active: true })
            .populate('requiredSkills');
        
        // Create a map to store skill frequency
        const skillFrequency = new Map();
        
        // Count skill occurrences in job listings
        activeJobs.forEach(job => {
            job.requiredSkills.forEach(skill => {
                const count = skillFrequency.get(skill.id) || 0;
                skillFrequency.set(skill.id, count + 1);
            });
        });
        
        // Update demand scores for skills
        for (const [skillId, frequency] of skillFrequency) {
            await Skill.findByIdAndUpdate(skillId, {
                demandScore: frequency,
                trending: frequency > 5 // Mark as trending if appears in more than 5 jobs
            });
        }
        
        res.json({ message: 'Skill demand analysis completed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Compare user skills with trending skills
exports.compareUserSkills = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('skills.skill');
        const trendingSkills = await Skill.find({ trending: true });
        
        const userSkillSet = new Set(user.skills.map(s => s.skill.name));
        const trendingSkillSet = new Set(trendingSkills.map(s => s.name));
        
        // Calculate match percentage
        const matchingSkills = [...trendingSkillSet].filter(skill => userSkillSet.has(skill));
        const matchPercentage = (matchingSkills.length / trendingSkillSet.size) * 100;
        
        // Find skills to learn
        const skillsToLearn = [...trendingSkillSet].filter(skill => !userSkillSet.has(skill));
        
        res.json({
            matchPercentage,
            matchingSkills,
            skillsToLearn
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
