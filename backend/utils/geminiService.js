const { GoogleGenerativeAI } = require('@google/generative-ai');
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Utility: safely parse JSON from Gemini output
 */
async function safeJSONParse(text, fallback) {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return fallback;
  }
}

/**
 * Unified Gemini Service
 * @param {string} type - The type of analysis ("analyzeResume", "generateSkillRecommendations", "analyzeJobMarketTrends", "generateCareerAdvice")
 * @param {object} payload - Input data depending on type
 */
async function geminiService(type, payload) {
  try {
    let prompt = "";
    let fallback = {};

    switch (type) {
      case "generateSkillRecommendations": {
        const { currentRole, targetRole, userSkills } = payload;
        prompt = `
          Based on the following information, provide skill recommendations:
          - Current Role: ${currentRole}
          - Target Role: ${targetRole}
          - Current Skills: ${userSkills.join(', ')}

          Please provide:
          1. Top 5 skills needed to transition from ${currentRole} to ${targetRole}
          2. Learning resources or certifications for each skill
          3. Estimated timeline for skill development

          Format the response as JSON with structure:
          {
            "recommendedSkills": [
              {
                "skill": "skill name",
                "priority": "high/medium/low",
                "resources": ["resource1", "resource2"],
                "timeline": "X months"
              }
            ],
            "transitionPath": "brief description of the transition path"
          }
        `;
        fallback = {
          recommendedSkills: [
            {
              skill: "Communication",
              priority: "high",
              resources: ["LinkedIn Learning", "Toastmasters"],
              timeline: "3 months"
            }
          ],
          transitionPath: "Focus on developing communication and leadership skills"
        };
        break;
      }

      case "analyzeJobMarketTrends": {
        const { industry } = payload;
        prompt = `
          Analyze the current job market trends for ${industry} industry.
          Provide insights on:
          1. Top 5 in-demand skills
          2. Salary trends
          3. Job growth projections
          4. Emerging roles

          Format as JSON:
          {
            "trendingSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
            "salaryTrends": "description",
            "jobGrowth": "description",
            "emergingRoles": ["role1", "role2"]
          }
        `;
        fallback = {
          trendingSkills: ["JavaScript", "Python", "React", "Node.js", "AWS"],
          salaryTrends: "Growing demand for tech skills",
          jobGrowth: "Positive growth in tech sector",
          emergingRoles: ["AI Engineer", "DevOps Engineer"]
        };
        break;
      }

      case "generateCareerAdvice": {
        const { userProfile, careerGoals } = payload;
        prompt = `
          Based on this user profile and career goals, provide personalized career advice:

          User Profile:
          - Current Role: ${userProfile.currentRole || 'Not specified'}
          - Skills: ${userProfile.skills?.join(', ') || 'Not specified'}
          - Experience: ${userProfile.experience || 'Not specified'}

          Career Goals:
          - Target Role: ${careerGoals.targetRole || 'Not specified'}
          - Timeline: ${careerGoals.timeline || 'Not specified'}

          Provide:
          1. Personalized career roadmap
          2. Skill development priorities
          3. Networking recommendations
          4. Industry insights

          Format as JSON:
          {
            "roadmap": "step-by-step career roadmap",
            "skillPriorities": ["priority1", "priority2", "priority3"],
            "networkingTips": ["tip1", "tip2"],
            "industryInsights": "relevant industry insights"
          }
        `;
        fallback = {
          roadmap: "Focus on skill development and networking",
          skillPriorities: ["Technical Skills", "Soft Skills", "Industry Knowledge"],
          networkingTips: ["Attend industry events", "Connect on LinkedIn"],
          industryInsights: "Stay updated with industry trends"
        };
        break;
      }

      case "analyzeResume": {
        const { resumeText } = payload;
        prompt = `
          Analyze the following resume text and extract structured information:

          ${resumeText}

          Please provide a JSON response with structure:
          {
            "personalInfo": {
              "name": "extracted name",
              "email": "extracted email",
              "phone": "extracted phone",
              "location": "extracted location"
            },
            "currentRole": "current job title",
            "currentCompany": "current company name",
            "skills": ["skill1", "skill2", "skill3"],
            "experience": [
              {
                "title": "job title",
                "company": "company name",
                "duration": "duration",
                "description": "job description"
              }
            ],
            "education": [
              {
                "degree": "degree name",
                "institution": "institution name",
                "year": "graduation year"
              }
            ],
            "summary": "brief professional summary"
          }
        `;
        fallback = {
          personalInfo: {
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "(555) 123-4567",
            location: "San Francisco, CA"
          },
          currentRole: "Software Engineer",
          currentCompany: "Tech Corp",
          skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "AWS"],
          experience: [
            {
              title: "Software Engineer",
              company: "Tech Corp",
              duration: "2020-2023",
              description: "Developed web applications and led development teams"
            }
          ],
          education: [
            {
              degree: "Bachelor of Science in Computer Science",
              institution: "University of Technology",
              year: "2018"
            }
          ],
          summary: "Experienced software engineer with expertise in full-stack development"
        };
        break;
      }

      default:
        throw new Error(`Unsupported operation type: ${type}`);
    }

    // Call Gemini
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return safeJSONParse(text, fallback);

  } catch (error) {
    console.error(`Gemini Service error (${type}):`, error.message);
    throw new Error(`Failed to process Gemini request: ${type}`);
  }
}

module.exports = geminiService;
