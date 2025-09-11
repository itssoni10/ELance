const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    steps: [{
        role: {
            type: String,
            required: true
        },
        requiredSkills: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }],
        timelinePosition: {
            type: Number,
            required: true
        },
        averageSalary: Number,
        description: String
    }],
    domain: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CareerPath', careerPathSchema);
