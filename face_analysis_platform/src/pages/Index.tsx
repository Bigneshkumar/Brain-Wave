import { useState } from 'react';
import Navigation from '@/components/Navigation';
import AIChatCompanion from '@/components/AIChatCompanion';
import FocusMode from '@/components/FocusMode';
import StudyAssistant from '@/components/StudyAssistant';
import MoodTracker from '@/components/MoodTracker';
import ResourceLibrary from '@/components/ResourceLibrary';
import PeerStories from '@/components/PeerStories';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Brain, Focus, BookOpen, BarChart3, Users, ArrowRight } from 'lucide-react';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const features = [
    {
      id: 'chat',
      title: 'AI Companion',
      description: 'Chat with an empathetic AI companion for emotional support and guidance',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'focus',
      title: 'Focus Mode',
      description: 'Enhance concentration with guided focus sessions and ambient sounds',
      icon: Focus,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'study',
      title: 'Study Assistant',
      description: 'Organize your studies with AI-powered planning and productivity tools',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'mood',
      title: 'Mood Tracker',
      description: 'Track your emotional wellbeing and discover patterns over time',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'resources',
      title: 'Resource Library',
      description: 'Access curated mental wellness resources and educational content',
      icon: BookOpen,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'stories',
      title: 'Peer Stories',
      description: 'Read inspiring stories from other young people on their wellness journey',
      icon: Users,
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'chat':
        return <AIChatCompanion />;
      case 'focus':
        return <FocusMode />;
      case 'study':
        return <StudyAssistant />;
      case 'mood':
        return <MoodTracker />;
      case 'resources':
        return <ResourceLibrary />;
      case 'stories':
        return <PeerStories />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                      <Heart className="relative h-20 w-20 text-purple-600" />
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                    MindfulAI
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Empowering youth with AI-driven mental wellness support. Your journey to better mental health starts here.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => setActiveSection('chat')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
                    >
                      Start Chatting
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setActiveSection('mood')}
                      className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
                    >
                      Track Your Mood
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Your Mental Wellness Toolkit
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover powerful tools designed specifically for young people to support mental health and wellbeing
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={feature.id}
                      className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/60 backdrop-blur-sm"
                      onClick={() => setActiveSection(feature.id)}
                    >
                      <CardContent className="p-8">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                          Try it now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
              <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Start Your Wellness Journey?
                </h2>
                <p className="text-xl text-purple-100 mb-8">
                  Join thousands of young people who are taking control of their mental health with AI support
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setActiveSection('chat')}
                  className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-3 text-lg"
                >
                  Get Started Today
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderActiveSection()}
    </div>
  );
}