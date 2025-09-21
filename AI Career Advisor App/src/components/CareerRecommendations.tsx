import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { CareerRecommendation } from '../types/career';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  GraduationCap,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Star,
  Target,
  BookOpen,
  Award,
  Briefcase,
  Network
} from 'lucide-react';

interface CareerRecommendationsProps {
  recommendations: CareerRecommendation[];
  onBack: () => void;
}

export function CareerRecommendations({ recommendations, onBack }: CareerRecommendationsProps) {
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(recommendations[0] || null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set([recommendations[0]?.career.id]));

  const toggleExpanded = (careerId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(careerId)) {
      newExpanded.delete(careerId);
    } else {
      newExpanded.add(careerId);
    }
    setExpandedCards(newExpanded);
  };

  const getGrowthIcon = (outlook: string) => {
    switch (outlook) {
      case 'high-growth':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'growing':
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-yellow-600" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-blue-500';
    if (score >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  if (recommendations.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="text-center py-12">
          <h3>No recommendations found</h3>
          <p className="text-muted-foreground mb-4">
            Please try updating your profile information.
          </p>
          <Button onClick={onBack}>Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Your Career Recommendations</h2>
          <p className="text-muted-foreground">
            Based on your skills, experience, and interests
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Update Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Cards */}
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <Card
              key={rec.career.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedCareer?.career.id === rec.career.id
                  ? 'ring-2 ring-primary'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCareer(rec)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{rec.career.title}</CardTitle>
                      {rec.career.emergingRole && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Emerging
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {rec.career.industry}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getMatchColor(rec.matchScore)}`} />
                      <span className="text-sm">{Math.round(rec.matchScore * 100)}% match</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {getGrowthIcon(rec.career.growthOutlook)}
                      <span className="capitalize">{rec.career.growthOutlook.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <Collapsible
                open={expandedCards.has(rec.career.id)}
                onOpenChange={() => toggleExpanded(rec.career.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-4 pt-0">
                    <span className="text-sm">View Details</span>
                    {expandedCards.has(rec.career.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {rec.career.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span>{formatSalary(rec.career.averageSalary.entry)} - {formatSalary(rec.career.averageSalary.senior)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{rec.timeToReady}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2">Why this matches you:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {rec.reasoning.slice(0, 3).map((reason, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Detailed View */}
        {selectedCareer && (
          <Card className="lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {selectedCareer.career.title}
              </CardTitle>
              <CardDescription>Detailed analysis and recommendations</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="learning">Learning</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="mb-2">Match Score</h4>
                    <Progress
                      value={selectedCareer.matchScore * 100}
                      className="mb-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      {Math.round(selectedCareer.matchScore * 100)}% compatibility
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4" />
                        Salary Range
                      </h5>
                      <div className="text-sm space-y-1">
                        <div>Entry: {formatSalary(selectedCareer.career.averageSalary.entry)}</div>
                        <div>Mid: {formatSalary(selectedCareer.career.averageSalary.mid)}</div>
                        <div>Senior: {formatSalary(selectedCareer.career.averageSalary.senior)}</div>
                      </div>
                    </div>

                    <div>
                      <h5 className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4" />
                        Work Environment
                      </h5>
                      <div className="space-y-1">
                        {selectedCareer.career.workEnvironment.map(env => (
                          <Badge key={env} variant="outline" className="text-xs mr-1 mb-1">
                            {env}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="mb-2">Growth Outlook</h5>
                    <div className="flex items-center gap-2">
                      {getGrowthIcon(selectedCareer.career.growthOutlook)}
                      <span className="capitalize">{selectedCareer.career.growthOutlook.replace('-', ' ')}</span>
                      {selectedCareer.career.emergingRole && (
                        <Badge variant="secondary" className="ml-2">
                          Emerging Role
                        </Badge>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 mb-3 text-green-600">
                      <Star className="w-4 h-4" />
                      Your Strengths ({selectedCareer.skillGap.strengths.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCareer.skillGap.strengths.map(skill => (
                        <Badge key={skill} variant="default" className="bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 mb-3 text-red-600">
                      <Target className="w-4 h-4" />
                      Skills to Develop ({selectedCareer.skillGap.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCareer.skillGap.missing.map(skill => (
                        <Badge key={skill} variant="destructive" className="bg-red-100 text-red-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 mb-3 text-blue-600">
                      <TrendingUp className="w-4 h-4" />
                      Future Skills ({selectedCareer.skillGap.toImprove.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCareer.skillGap.toImprove.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="learning" className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4" />
                      Recommended Courses
                    </h4>
                    <div className="space-y-2">
                      {selectedCareer.recommendedActions.courses.map(course => (
                        <div key={course} className="p-3 border rounded-lg">
                          <p className="text-sm">{course}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4" />
                      Certifications
                    </h4>
                    <div className="space-y-2">
                      {selectedCareer.recommendedActions.certifications.map(cert => (
                        <div key={cert} className="p-3 border rounded-lg">
                          <p className="text-sm">{cert}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-4 h-4" />
                      Project Ideas
                    </h4>
                    <div className="space-y-2">
                      {selectedCareer.recommendedActions.projects.map(project => (
                        <div key={project} className="p-3 border rounded-lg">
                          <p className="text-sm">{project}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <Network className="w-4 h-4" />
                      Networking Opportunities
                    </h4>
                    <div className="space-y-2">
                      {selectedCareer.recommendedActions.networking.map(opportunity => (
                        <div key={opportunity} className="p-3 border rounded-lg">
                          <p className="text-sm">{opportunity}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="mb-2">Time to Ready</h5>
                    <p className="text-sm">{selectedCareer.timeToReady}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}