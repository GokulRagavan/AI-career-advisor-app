import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { UserProfile } from '../types/career';
import { skillCategories, industries, workEnvironments, values } from '../data/careers';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

interface SkillsAssessmentFormProps {
  onComplete: (profile: UserProfile) => void;
}

const steps = [
  { id: 'personal', title: 'Personal Info', description: 'Tell us about yourself' },
  { id: 'education', title: 'Education', description: 'Your educational background' },
  { id: 'skills', title: 'Skills', description: 'Your technical and soft skills' },
  { id: 'experience', title: 'Experience', description: 'Your work experience' },
  { id: 'interests', title: 'Interests', description: 'What motivates you' },
  { id: 'goals', title: 'Goals', description: 'Your career aspirations' }
];

export function SkillsAssessmentForm({ onComplete }: SkillsAssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    personalInfo: { name: '', age: undefined, location: '' },
    education: { level: 'bachelor', field: '', graduationYear: undefined },
    skills: { technical: [], soft: [], proficiencyLevels: {} },
    experience: { years: 0, industries: [], roles: [], achievements: [] },
    interests: { workEnvironment: [], industries: [], activities: [], values: [] },
    goals: { timeframe: '1-year', priorities: [] }
  });

  const updateProfile = (section: keyof UserProfile, data: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const addSkill = (category: 'technical' | 'soft', skill: string) => {
    if (!skill.trim()) return;
    
    updateProfile('skills', {
      ...profile.skills,
      [category]: [...(profile.skills?.[category] || []), skill.trim()]
    });
  };

  const removeSkill = (category: 'technical' | 'soft', index: number) => {
    const skills = profile.skills?.[category] || [];
    updateProfile('skills', {
      ...profile.skills,
      [category]: skills.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    if (profile.personalInfo && profile.education && profile.skills && 
        profile.experience && profile.interests && profile.goals) {
      onComplete(profile as UserProfile);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={profile.personalInfo?.name || ''}
                onChange={(e) => updateProfile('personalInfo', { name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.personalInfo?.age || ''}
                  onChange={(e) => updateProfile('personalInfo', { age: parseInt(e.target.value) || undefined })}
                  placeholder="25"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.personalInfo?.location || ''}
                  onChange={(e) => updateProfile('personalInfo', { location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Education
        return (
          <div className="space-y-4">
            <div>
              <Label>Education Level *</Label>
              <Select
                value={profile.education?.level}
                onValueChange={(value) => updateProfile('education', { level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="bootcamp">Bootcamp</SelectItem>
                  <SelectItem value="self-taught">Self-taught</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="field">Field of Study</Label>
              <Input
                id="field"
                value={profile.education?.field || ''}
                onChange={(e) => updateProfile('education', { field: e.target.value })}
                placeholder="Computer Science, Business, etc."
              />
            </div>
            <div>
              <Label htmlFor="graduation">Graduation Year</Label>
              <Input
                id="graduation"
                type="number"
                value={profile.education?.graduationYear || ''}
                onChange={(e) => updateProfile('education', { graduationYear: parseInt(e.target.value) || undefined })}
                placeholder="2020"
              />
            </div>
          </div>
        );

      case 2: // Skills
        return (
          <div className="space-y-6">
            <div>
              <Label>Technical Skills</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Add your technical skills (programming languages, tools, frameworks)
              </p>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., Python, React, SQL"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill('technical', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                    if (input) {
                      addSkill('technical', input.value);
                      input.value = '';
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {profile.skills?.technical?.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeSkill('technical', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Soft Skills</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Add your soft skills (communication, leadership, etc.)
              </p>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., Communication, Leadership"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill('soft', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                    if (input) {
                      addSkill('soft', input.value);
                      input.value = '';
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {profile.skills?.soft?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeSkill('soft', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Experience
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="years">Years of Experience</Label>
              <Input
                id="years"
                type="number"
                value={profile.experience?.years || 0}
                onChange={(e) => updateProfile('experience', { years: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Industries you've worked in</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {industries.slice(0, 10).map(industry => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={profile.experience?.industries?.includes(industry)}
                      onCheckedChange={(checked) => {
                        const current = profile.experience?.industries || [];
                        updateProfile('experience', {
                          industries: checked
                            ? [...current, industry]
                            : current.filter(i => i !== industry)
                        });
                      }}
                    />
                    <Label htmlFor={industry} className="text-sm">{industry}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="roles">Previous Roles</Label>
              <Textarea
                id="roles"
                value={profile.experience?.roles?.join(', ') || ''}
                onChange={(e) => updateProfile('experience', { 
                  roles: e.target.value.split(',').map(r => r.trim()).filter(Boolean)
                })}
                placeholder="Software Developer, Marketing Assistant, etc."
              />
            </div>
          </div>
        );

      case 4: // Interests
        return (
          <div className="space-y-4">
            <div>
              <Label>Preferred Work Environment</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {workEnvironments.slice(0, 8).map(env => (
                  <div key={env} className="flex items-center space-x-2">
                    <Checkbox
                      id={env}
                      checked={profile.interests?.workEnvironment?.includes(env)}
                      onCheckedChange={(checked) => {
                        const current = profile.interests?.workEnvironment || [];
                        updateProfile('interests', {
                          workEnvironment: checked
                            ? [...current, env]
                            : current.filter(e => e !== env)
                        });
                      }}
                    />
                    <Label htmlFor={env} className="text-sm">{env}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Industries of Interest</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {industries.slice(0, 8).map(industry => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={`interest-${industry}`}
                      checked={profile.interests?.industries?.includes(industry)}
                      onCheckedChange={(checked) => {
                        const current = profile.interests?.industries || [];
                        updateProfile('interests', {
                          industries: checked
                            ? [...current, industry]
                            : current.filter(i => i !== industry)
                        });
                      }}
                    />
                    <Label htmlFor={`interest-${industry}`} className="text-sm">{industry}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5: // Goals
        return (
          <div className="space-y-4">
            <div>
              <Label>Career Timeframe</Label>
              <Select
                value={profile.goals?.timeframe}
                onValueChange={(value) => updateProfile('goals', { timeframe: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-months">Next 6 months</SelectItem>
                  <SelectItem value="1-year">Next year</SelectItem>
                  <SelectItem value="2-years">Next 2 years</SelectItem>
                  <SelectItem value="5-years">Next 5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Career Priorities</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['salary', 'growth', 'work-life-balance', 'impact', 'creativity', 'stability'].map(priority => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox
                      id={priority}
                      checked={profile.goals?.priorities?.includes(priority as any)}
                      onCheckedChange={(checked) => {
                        const current = profile.goals?.priorities || [];
                        updateProfile('goals', {
                          priorities: checked
                            ? [...current, priority as any]
                            : current.filter(p => p !== priority)
                        });
                      }}
                    />
                    <Label htmlFor={priority} className="text-sm capitalize">{priority.replace('-', ' ')}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return profile.personalInfo?.name?.trim();
      case 1:
        return profile.education?.level;
      case 2:
        return (profile.skills?.technical?.length || 0) > 0 || (profile.skills?.soft?.length || 0) > 0;
      default:
        return true;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </div>
        </div>
        <Progress value={(currentStep + 1) / steps.length * 100} className="mt-4" />
      </CardHeader>
      <CardContent>
        <div className="min-h-[400px]">
          {renderStep()}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
          >
            {currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}