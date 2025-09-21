import { UserProfile, CareerPath, CareerRecommendation, CourseRecommendation } from '../types/career';
import { careerPaths } from '../data/careers';

export class CareerMatcher {
  
  // Calculate skill overlap between user and career requirements
  private calculateSkillMatch(userSkills: string[], requiredSkills: string[]): number {
    if (requiredSkills.length === 0) return 1;
    
    const matchingSkills = requiredSkills.filter(skill =>
      userSkills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    return matchingSkills.length / requiredSkills.length;
  }

  // Calculate education match
  private calculateEducationMatch(userEducation: UserProfile['education'], careerEducation: string[]): number {
    const educationLevels = {
      'high-school': 1,
      'bootcamp': 2,
      'self-taught': 2,
      'bachelor': 3,
      'master': 4,
      'phd': 5
    };

    const userLevel = educationLevels[userEducation.level];
    
    // Simple matching - if career requires bachelor and user has bachelor+, it's a match
    if (careerEducation.some(req => req.toLowerCase().includes('bachelor')) && userLevel >= 3) return 1;
    if (careerEducation.some(req => req.toLowerCase().includes('master')) && userLevel >= 4) return 1;
    if (careerEducation.some(req => req.toLowerCase().includes('bootcamp')) && userLevel >= 2) return 1;
    
    return 0.7; // Partial match for other cases
  }

  // Calculate experience match
  private calculateExperienceMatch(userExperience: UserProfile['experience'], careerLevel: string): number {
    const userYears = userExperience.years;
    
    switch (careerLevel) {
      case 'entry':
        return userYears <= 3 ? 1 : Math.max(0.7, 1 - (userYears - 3) * 0.1);
      case 'mid':
        return userYears >= 2 && userYears <= 7 ? 1 : Math.max(0.5, 1 - Math.abs(userYears - 4.5) * 0.1);
      case 'senior':
        return userYears >= 5 ? 1 : Math.max(0.3, userYears / 5);
      default:
        return 0.8;
    }
  }

  // Calculate interest alignment
  private calculateInterestMatch(userInterests: UserProfile['interests'], career: CareerPath): number {
    let matches = 0;
    let total = 0;

    // Industry interest
    if (userInterests.industries.includes(career.industry)) matches++;
    total++;

    // Work environment
    const envMatches = career.workEnvironment.filter(env =>
      userInterests.workEnvironment.includes(env)
    );
    matches += envMatches.length / Math.max(career.workEnvironment.length, 1);
    total++;

    return matches / total;
  }

  // Calculate growth outlook bonus
  private calculateGrowthBonus(career: CareerPath, userGoals: UserProfile['goals']): number {
    const growthScores = {
      'declining': 0.5,
      'stable': 0.7,
      'growing': 0.9,
      'high-growth': 1.0
    };

    let bonus = growthScores[career.growthOutlook];
    
    // Bonus for emerging roles if user values innovation
    if (career.emergingRole && userGoals.priorities.includes('growth')) {
      bonus += 0.1;
    }

    return bonus;
  }

  // Generate skill gap analysis
  private analyzeSkillGap(userProfile: UserProfile, career: CareerPath) {
    const userTechnicalSkills = userProfile.skills.technical.map(s => s.toLowerCase());
    const userSoftSkills = userProfile.skills.soft.map(s => s.toLowerCase());
    
    const missingTechnical = career.requiredSkills.technical.filter(skill =>
      !userTechnicalSkills.some(userSkill =>
        userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
      )
    );

    const missingSoft = career.requiredSkills.soft.filter(skill =>
      !userSoftSkills.some(userSkill =>
        userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
      )
    );

    const strengths = [
      ...career.requiredSkills.technical.filter(skill =>
        userTechnicalSkills.some(userSkill =>
          userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
        )
      ),
      ...career.requiredSkills.soft.filter(skill =>
        userSoftSkills.some(userSkill =>
          userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
        )
      )
    ];

    const toImprove = career.futureSkills.filter(skill =>
      !userTechnicalSkills.some(userSkill =>
        userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
      )
    );

    return {
      missing: [...missingTechnical, ...missingSoft],
      toImprove,
      strengths
    };
  }

  // Generate course recommendations based on skill gaps
  private generateCourseRecommendations(skillGap: any): CourseRecommendation[] {
    const courseDatabase: CourseRecommendation[] = [
      { title: 'Machine Learning Specialization', provider: 'Coursera', duration: '3 months', difficulty: 'intermediate', skills: ['Machine Learning', 'Python', 'TensorFlow'] },
      { title: 'Complete React Developer Course', provider: 'Udemy', duration: '6 weeks', difficulty: 'beginner', skills: ['React', 'JavaScript', 'HTML', 'CSS'] },
      { title: 'Python for Data Science', provider: 'edX', duration: '4 weeks', difficulty: 'beginner', skills: ['Python', 'Data Science', 'Statistics'] },
      { title: 'AWS Certified Solutions Architect', provider: 'AWS', duration: '8 weeks', difficulty: 'intermediate', skills: ['AWS', 'Cloud Computing', 'DevOps'] },
      { title: 'Google UX Design Certificate', provider: 'Coursera', duration: '6 months', difficulty: 'beginner', skills: ['UX Design', 'Figma', 'User Research'] },
      { title: 'Cybersecurity Fundamentals', provider: 'Cybrary', duration: '4 weeks', difficulty: 'beginner', skills: ['Network Security', 'Incident Response', 'Risk Assessment'] },
      { title: 'Digital Marketing Mastery', provider: 'Udemy', duration: '5 weeks', difficulty: 'intermediate', skills: ['SEO', 'Social Media Management', 'Google Analytics'] }
    ];

    return courseDatabase.filter(course =>
      course.skills.some(skill =>
        skillGap.missing.some((missing: string) =>
          missing.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(missing.toLowerCase())
        )
      )
    ).slice(0, 3);
  }

  // Main matching algorithm
  public findCareerMatches(userProfile: UserProfile): CareerRecommendation[] {
    const recommendations: CareerRecommendation[] = [];

    for (const career of careerPaths) {
      // Calculate individual scores
      const technicalSkillScore = this.calculateSkillMatch(userProfile.skills.technical, career.requiredSkills.technical);
      const softSkillScore = this.calculateSkillMatch(userProfile.skills.soft, career.requiredSkills.soft);
      const educationScore = this.calculateEducationMatch(userProfile.education, career.educationRequirements);
      const experienceScore = this.calculateExperienceMatch(userProfile.experience, career.experienceLevel);
      const interestScore = this.calculateInterestMatch(userProfile.interests, career);
      const growthBonus = this.calculateGrowthBonus(career, userProfile.goals);

      // Weighted total score
      const matchScore = (
        technicalSkillScore * 0.25 +
        softSkillScore * 0.15 +
        educationScore * 0.20 +
        experienceScore * 0.15 +
        interestScore * 0.15 +
        growthBonus * 0.10
      );

      // Generate skill gap analysis
      const skillGap = this.analyzeSkillGap(userProfile, career);
      
      // Generate recommendations
      const courses = this.generateCourseRecommendations(skillGap);
      
      const timeToReady = skillGap.missing.length === 0 ? 'Ready now' :
                         skillGap.missing.length <= 3 ? '3-6 months' :
                         skillGap.missing.length <= 6 ? '6-12 months' : '1-2 years';

      const reasoning = [
        `${Math.round(technicalSkillScore * 100)}% technical skill match`,
        `${Math.round(educationScore * 100)}% education alignment`,
        `${Math.round(interestScore * 100)}% interest alignment`,
        `${career.growthOutlook} growth outlook`,
        career.emergingRole ? 'Emerging role with high future demand' : 'Established career path'
      ];

      recommendations.push({
        career,
        matchScore,
        skillGap,
        recommendedActions: {
          courses: courses.map(c => c.title),
          certifications: this.getCertificationRecommendations(career),
          projects: this.getProjectRecommendations(career),
          networking: this.getNetworkingRecommendations(career)
        },
        timeToReady,
        reasoning
      });
    }

    // Sort by match score and return top recommendations
    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }

  private getCertificationRecommendations(career: CareerPath): string[] {
    const certMap: Record<string, string[]> = {
      'ai-engineer': ['TensorFlow Developer Certificate', 'AWS Machine Learning Specialty'],
      'full-stack-developer': ['AWS Developer Associate', 'Google Cloud Professional Developer'],
      'data-scientist': ['Google Data Analytics Certificate', 'Microsoft Azure Data Scientist'],
      'ux-designer': ['Google UX Design Certificate', 'Adobe Certified Expert'],
      'cybersecurity-analyst': ['CompTIA Security+', 'CISSP'],
      'product-manager': ['Google Product Management Certificate', 'Certified Scrum Product Owner'],
      'digital-marketing-specialist': ['Google Ads Certification', 'HubSpot Content Marketing'],
      'sustainability-consultant': ['LEED Green Associate', 'GRI Sustainability Reporting']
    };
    
    return certMap[career.id] || ['Industry-specific certifications recommended'];
  }

  private getProjectRecommendations(career: CareerPath): string[] {
    const projectMap: Record<string, string[]> = {
      'ai-engineer': ['Build a machine learning model for real-world problem', 'Contribute to open-source ML project'],
      'full-stack-developer': ['Create a full-stack web application', 'Build and deploy a REST API'],
      'data-scientist': ['Complete end-to-end data analysis project', 'Participate in Kaggle competition'],
      'ux-designer': ['Design a mobile app prototype', 'Conduct user research study'],
      'cybersecurity-analyst': ['Set up home lab for security testing', 'Complete vulnerability assessment'],
      'product-manager': ['Launch a side project', 'Create detailed product requirements document'],
      'digital-marketing-specialist': ['Run social media campaign', 'Optimize website for SEO'],
      'sustainability-consultant': ['Conduct sustainability audit', 'Create ESG report for local business']
    };
    
    return projectMap[career.id] || ['Industry-relevant project portfolio'];
  }

  private getNetworkingRecommendations(career: CareerPath): string[] {
    const networkMap: Record<string, string[]> = {
      'ai-engineer': ['Join local AI/ML meetups', 'Attend tech conferences like NeurIPS'],
      'full-stack-developer': ['Participate in hackathons', 'Join developer communities on Discord'],
      'data-scientist': ['Attend data science conferences', 'Join Kaggle community'],
      'ux-designer': ['Join UX design communities', 'Attend design conferences'],
      'cybersecurity-analyst': ['Join cybersecurity forums', 'Attend BSides conferences'],
      'product-manager': ['Join Product Manager communities', 'Attend product conferences'],
      'digital-marketing-specialist': ['Join marketing associations', 'Attend digital marketing events'],
      'sustainability-consultant': ['Join sustainability networks', 'Attend environmental conferences']
    };
    
    return networkMap[career.id] || ['Industry professional associations'];
  }
}