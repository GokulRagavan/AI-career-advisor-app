import { CareerPath } from '../types/career';

export const careerPaths: CareerPath[] = [
  {
    id: 'ai-engineer',
    title: 'AI/ML Engineer',
    description: 'Design, develop, and deploy artificial intelligence and machine learning systems to solve complex business problems.',
    industry: 'Technology',
    averageSalary: { entry: 95000, mid: 140000, senior: 200000 },
    requiredSkills: {
      technical: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Data Science', 'Statistics', 'SQL'],
      soft: ['Problem Solving', 'Analytical Thinking', 'Communication', 'Collaboration']
    },
    educationRequirements: ['Bachelor in Computer Science, Mathematics, or related field', 'Strong foundation in statistics'],
    experienceLevel: 'mid',
    growthOutlook: 'high-growth',
    workEnvironment: ['Remote-friendly', 'Collaborative', 'Research-oriented'],
    emergingRole: true,
    futureSkills: ['Generative AI', 'MLOps', 'Edge AI', 'Quantum Computing']
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Build complete web applications handling both frontend user interfaces and backend server logic.',
    industry: 'Technology',
    averageSalary: { entry: 75000, mid: 110000, senior: 160000 },
    requiredSkills: {
      technical: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Databases', 'Git', 'APIs'],
      soft: ['Problem Solving', 'Attention to Detail', 'Time Management', 'Learning Agility']
    },
    educationRequirements: ['Bachelor in Computer Science or equivalent experience', 'Coding bootcamp acceptable'],
    experienceLevel: 'entry',
    growthOutlook: 'growing',
    workEnvironment: ['Remote-friendly', 'Fast-paced', 'Collaborative'],
    emergingRole: false,
    futureSkills: ['WebAssembly', 'Serverless Architecture', 'GraphQL', 'Micro-frontends']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Extract insights from complex datasets to drive business decisions using statistical analysis and machine learning.',
    industry: 'Technology',
    averageSalary: { entry: 90000, mid: 130000, senior: 180000 },
    requiredSkills: {
      technical: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Excel', 'Tableau'],
      soft: ['Critical Thinking', 'Communication', 'Business Acumen', 'Curiosity']
    },
    educationRequirements: ['Bachelor in Statistics, Mathematics, Computer Science, or related field', 'Strong analytical background'],
    experienceLevel: 'mid',
    growthOutlook: 'growing',
    workEnvironment: ['Analytical', 'Cross-functional', 'Data-driven'],
    emergingRole: false,
    futureSkills: ['AutoML', 'Real-time Analytics', 'Federated Learning', 'Data Ethics']
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Research user needs and design intuitive, user-centered digital experiences and interfaces.',
    industry: 'Design',
    averageSalary: { entry: 65000, mid: 95000, senior: 140000 },
    requiredSkills: {
      technical: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing', 'HTML/CSS', 'Design Systems'],
      soft: ['Empathy', 'Communication', 'Creative Thinking', 'Collaboration', 'Problem Solving']
    },
    educationRequirements: ['Bachelor in Design, HCI, Psychology, or related field', 'Strong portfolio required'],
    experienceLevel: 'entry',
    growthOutlook: 'growing',
    workEnvironment: ['Collaborative', 'Creative', 'User-focused'],
    emergingRole: false,
    futureSkills: ['Voice UI Design', 'AR/VR Design', 'AI-assisted Design', 'Inclusive Design']
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats by monitoring, detecting, and responding to security incidents.',
    industry: 'Security',
    averageSalary: { entry: 70000, mid: 105000, senior: 150000 },
    requiredSkills: {
      technical: ['Network Security', 'SIEM Tools', 'Incident Response', 'Risk Assessment', 'Compliance', 'Linux', 'Python'],
      soft: ['Attention to Detail', 'Critical Thinking', 'Communication', 'Stress Management']
    },
    educationRequirements: ['Bachelor in Cybersecurity, Computer Science, or related field', 'Security certifications preferred'],
    experienceLevel: 'entry',
    growthOutlook: 'high-growth',
    workEnvironment: ['Security-focused', 'High-pressure', 'Continuous Learning'],
    emergingRole: false,
    futureSkills: ['AI Security', 'Cloud Security', 'Zero Trust Architecture', 'Threat Intelligence']
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Drive product strategy and development by bridging business needs, user requirements, and technical capabilities.',
    industry: 'Technology',
    averageSalary: { entry: 80000, mid: 125000, senior: 180000 },
    requiredSkills: {
      technical: ['Product Analytics', 'A/B Testing', 'SQL', 'Project Management Tools', 'Basic Technical Understanding'],
      soft: ['Strategic Thinking', 'Communication', 'Leadership', 'Negotiation', 'Decision Making']
    },
    educationRequirements: ['Bachelor in Business, Engineering, or related field', 'MBA preferred for senior roles'],
    experienceLevel: 'mid',
    growthOutlook: 'growing',
    workEnvironment: ['Cross-functional', 'Strategic', 'Customer-focused'],
    emergingRole: false,
    futureSkills: ['AI Product Management', 'Data-driven Decision Making', 'Growth Product Management', 'Platform Strategy']
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    description: 'Create and execute online marketing campaigns to drive brand awareness, engagement, and conversions.',
    industry: 'Marketing',
    averageSalary: { entry: 45000, mid: 70000, senior: 100000 },
    requiredSkills: {
      technical: ['Google Analytics', 'Social Media Management', 'SEO/SEM', 'Email Marketing', 'Content Management Systems', 'Adobe Creative Suite'],
      soft: ['Creativity', 'Communication', 'Analytical Thinking', 'Adaptability']
    },
    educationRequirements: ['Bachelor in Marketing, Communications, or related field', 'Digital marketing certifications'],
    experienceLevel: 'entry',
    growthOutlook: 'growing',
    workEnvironment: ['Creative', 'Fast-paced', 'Data-driven'],
    emergingRole: false,
    futureSkills: ['AI-powered Marketing', 'Influencer Marketing', 'Privacy-first Marketing', 'Video Marketing']
  },
  {
    id: 'sustainability-consultant',
    title: 'Sustainability Consultant',
    description: 'Help organizations implement environmentally responsible practices and achieve sustainability goals.',
    industry: 'Consulting',
    averageSalary: { entry: 55000, mid: 85000, senior: 130000 },
    requiredSkills: {
      technical: ['Life Cycle Assessment', 'Environmental Regulations', 'Data Analysis', 'Sustainability Reporting', 'Project Management'],
      soft: ['Problem Solving', 'Communication', 'Systems Thinking', 'Influence', 'Passion for Environment']
    },
    educationRequirements: ['Bachelor in Environmental Science, Business, or related field', 'Sustainability certifications preferred'],
    experienceLevel: 'entry',
    growthOutlook: 'high-growth',
    workEnvironment: ['Purpose-driven', 'Consulting', 'Travel required'],
    emergingRole: true,
    futureSkills: ['Carbon Accounting', 'ESG Reporting', 'Circular Economy', 'Climate Risk Assessment']
  }
];

export const skillCategories = {
  technical: [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Machine Learning', 'Data Science',
    'HTML', 'CSS', 'Git', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch',
    'Java', 'C++', 'Go', 'Rust', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST APIs', 'Microservices', 'DevOps', 'CI/CD', 'Linux', 'Bash',
    'Figma', 'Adobe Creative Suite', 'Sketch', 'Photoshop', 'Illustrator',
    'Google Analytics', 'SEO', 'SEM', 'Social Media Management', 'Content Marketing'
  ],
  soft: [
    'Communication', 'Leadership', 'Problem Solving', 'Critical Thinking', 'Creativity',
    'Teamwork', 'Adaptability', 'Time Management', 'Project Management', 'Strategic Thinking',
    'Emotional Intelligence', 'Negotiation', 'Public Speaking', 'Writing', 'Research',
    'Analytical Thinking', 'Decision Making', 'Mentoring', 'Conflict Resolution',
    'Customer Service', 'Sales', 'Marketing', 'Business Development'
  ]
};

export const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing',
  'Consulting', 'Marketing', 'Design', 'Non-profit', 'Government', 'Entertainment',
  'Real Estate', 'Transportation', 'Energy', 'Agriculture', 'Telecommunications'
];

export const workEnvironments = [
  'Remote-friendly', 'Office-based', 'Hybrid', 'Travel required', 'Field work',
  'Collaborative', 'Independent', 'Fast-paced', 'Structured', 'Creative',
  'Research-oriented', 'Customer-facing', 'Team-based', 'Leadership role'
];

export const values = [
  'Work-life balance', 'High compensation', 'Career growth', 'Job security',
  'Making an impact', 'Creativity', 'Innovation', 'Helping others',
  'Intellectual challenge', 'Autonomy', 'Recognition', 'Flexibility'
];