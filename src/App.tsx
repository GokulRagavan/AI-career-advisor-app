import React, { useState } from 'react';
import { SkillsAssessmentForm } from './components/SkillsAssessmentForm';
import { CareerRecommendations } from './components/CareerRecommendations';
import { UserProfile, CareerRecommendation } from './types/career';
import { CareerMatcher } from './utils/careerMatcher';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Sparkles, Target, TrendingUp, Users } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'recommendations'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    
    // Generate career recommendations
    const matcher = new CareerMatcher();
    const careerRecommendations = matcher.findCareerMatches(profile);
    setRecommendations(careerRecommendations);
    
    setCurrentView('recommendations');
  };

  const handleBackToAssessment = () => {
    setCurrentView('assessment');
  };

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  if (currentView === 'assessment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <SkillsAssessmentForm onComplete={handleProfileComplete} />
        </div>
      </div>
    );
  }

  if (currentView === 'recommendations') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-7xl mx-auto py-8">
          <CareerRecommendations 
            recommendations={recommendations} 
            onBack={handleBackToAssessment}
          />
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl mb-6">
              AI Career Advisor
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover your ideal career path with personalized AI-powered recommendations. 
              Get matched to roles that align with your skills, interests, and aspirations.
            </p>
            
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 rounded-xl"
              onClick={handleStartAssessment}
            >
              Start Your Career Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered system analyzes your profile to provide personalized career recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <CardTitle>Share Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tell us about your skills, education, experience, and career interests through our comprehensive assessment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our advanced matching algorithm analyzes your profile against hundreds of career paths and market trends.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <CardTitle>Get Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Receive personalized career recommendations with skill gap analysis and actionable learning paths.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AI Career Advisor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Future-Ready</h3>
              <p className="text-sm text-gray-600">
                Stay ahead with insights on emerging roles and in-demand skills
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized</h3>
              <p className="text-sm text-gray-600">
                Recommendations tailored to your unique profile and goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">
                Advanced algorithms for accurate career matching
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Actionable</h3>
              <p className="text-sm text-gray-600">
                Clear learning paths and actionable next steps
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Discover Your Perfect Career?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals who have found their ideal career path
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-4 rounded-xl"
            onClick={handleStartAssessment}
          >
            Start Assessment Now
          </Button>
        </div>
      </div>
    </div>
  );
}