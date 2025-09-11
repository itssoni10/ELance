const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    requiredSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    description: String,
    salaryRange: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'USD'
        }
    },
    location: String,
    postDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Job', jobSchema);
