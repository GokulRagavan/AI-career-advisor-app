export interface UserProfile {
  id?: string;
  personalInfo: {
    name: string;
    age?: number;
    location?: string;
  };
  education: {
    level: 'high-school' | 'bachelor' | 'master' | 'phd' | 'bootcamp' | 'self-taught';
    field: string;
    graduationYear?: number;
  };
  skills: {
    technical: string[];
    soft: string[];
    proficiencyLevels: Record<string, 1 | 2 | 3 | 4 | 5>; // 1-5 scale
  };
  experience: {
    years: number;
    industries: string[];
    roles: string[];
    achievements?: string[];
  };
  interests: {
    workEnvironment: string[];
    industries: string[];
    activities: string[];
    values: string[];
  };
  goals: {
    timeframe: '6-months' | '1-year' | '2-years' | '5-years';
    priorities: ('salary' | 'growth' | 'work-life-balance' | 'impact' | 'creativity' | 'stability')[];
  };
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  industry: string;
  averageSalary: {
    entry: number;
    mid: number;
    senior: number;
  };
  requiredSkills: {
    technical: string[];
    soft: string[];
  };
  educationRequirements: string[];
  experienceLevel: 'entry' | 'mid' | 'senior';
  growthOutlook: 'declining' | 'stable' | 'growing' | 'high-growth';
  workEnvironment: string[];
  emergingRole: boolean;
  futureSkills: string[];
}

export interface CareerRecommendation {
  career: CareerPath;
  matchScore: number;
  skillGap: {
    missing: string[];
    toImprove: string[];
    strengths: string[];
  };
  recommendedActions: {
    courses: string[];
    certifications: string[];
    projects: string[];
    networking: string[];
  };
  timeToReady: string;
  reasoning: string[];
}

export interface CourseRecommendation {
  title: string;
  provider: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  url?: string;
}