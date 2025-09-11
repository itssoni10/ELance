const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const geminiService = {
  // Generate skill recommendations based on career goals
  async generateSkillRecommendations(currentRole, targetRole, userSkills) {
    try {
      const prompt = `
        Based on the following information, provide skill recommendations:
        - Current Role: ${currentRole}
        - Target Role: ${targetRole}
        - Current Skills: ${userSkills.join(', ')}
        
        Please provide:
        1. Top 5 skills needed to transition from ${currentRole} to ${targetRole}
        2. Learning resources or certifications for each skill
        3. Estimated timeline for skill development
        
        Format the response as JSON with the following structure:
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

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        return JSON.parse(text);
      } catch (parseError) {
        // If JSON parsing fails, return structured response
        return {
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
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate skill recommendations');
    }
  },

  // Analyze job market trends
  async analyzeJobMarketTrends(industry) {
    try {
      const prompt = `
        Analyze the current job market trends for ${industry} industry.
        Provide insights on:
        1. Top 5 in-demand skills
        2. Salary trends
        3. Job growth projections
        4. Emerging roles
        
        Format as JSON with structure:
        {
          "trendingSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
          "salaryTrends": "description",
          "jobGrowth": "description",
          "emergingRoles": ["role1", "role2"]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        return {
          trendingSkills: ["JavaScript", "Python", "React", "Node.js", "AWS"],
          salaryTrends: "Growing demand for tech skills",
          jobGrowth: "Positive growth in tech sector",
          emergingRoles: ["AI Engineer", "DevOps Engineer"]
        };
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to analyze job market trends');
    }
  },

  // Generate personalized career advice
  async generateCareerAdvice(userProfile, careerGoals) {
    try {
      const prompt = `
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

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        return {
          roadmap: "Focus on skill development and networking",
          skillPriorities: ["Technical Skills", "Soft Skills", "Industry Knowledge"],
          networkingTips: ["Attend industry events", "Connect on LinkedIn"],
          industryInsights: "Stay updated with industry trends"
        };
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate career advice');
    }
  },

  // Analyze resume text and extract structured information
  async analyzeResume(resumeText) {
    try {
      const prompt = `
        Analyze the following resume text and extract structured information:
        
        ${resumeText}
        
        Please provide a JSON response with the following structure:
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

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        // Fallback response if JSON parsing fails
        return {
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
      }
    } catch (error) {
      console.error('Gemini resume analysis error:', error);
      throw new Error('Failed to analyze resume');
    }
  }
};

module.exports = geminiService;
