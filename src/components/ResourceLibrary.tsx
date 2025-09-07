import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, ExternalLink, Heart, Brain, Zap } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'video' | 'podcast' | 'tool';
  url: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Anxiety in Young Adults',
    description: 'A comprehensive guide to recognizing and managing anxiety symptoms in your daily life.',
    category: 'Mental Health',
    type: 'article',
    url: '#',
    tags: ['anxiety', 'coping', 'mental health']
  },
  {
    id: '2',
    title: 'Mindfulness Meditation for Beginners',
    description: 'Learn basic mindfulness techniques to reduce stress and improve emotional wellbeing.',
    category: 'Mindfulness',
    type: 'video',
    url: '#',
    tags: ['meditation', 'mindfulness', 'stress relief']
  },
  {
    id: '3',
    title: 'Building Healthy Study Habits',
    description: 'Evidence-based strategies for effective studying while maintaining mental wellness.',
    category: 'Academic Wellness',
    type: 'article',
    url: '#',
    tags: ['study tips', 'productivity', 'balance']
  },
  {
    id: '4',
    title: 'The Science of Sleep and Mental Health',
    description: 'Understanding how sleep affects your mood, cognition, and overall mental wellbeing.',
    category: 'Sleep & Wellness',
    type: 'podcast',
    url: '#',
    tags: ['sleep', 'mental health', 'science']
  },
  {
    id: '5',
    title: 'Breathing Exercises for Instant Calm',
    description: 'Quick and effective breathing techniques you can use anywhere to manage stress.',
    category: 'Coping Skills',
    type: 'tool',
    url: '#',
    tags: ['breathing', 'stress relief', 'techniques']
  },
  {
    id: '6',
    title: 'Social Media and Mental Health',
    description: 'How to maintain a healthy relationship with social media and protect your mental wellbeing.',
    category: 'Digital Wellness',
    type: 'article',
    url: '#',
    tags: ['social media', 'digital wellness', 'boundaries']
  }
];

const categories = ['All', 'Mental Health', 'Mindfulness', 'Academic Wellness', 'Sleep & Wellness', 'Coping Skills', 'Digital Wellness'];

export default function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Zap;
      case 'podcast': return Brain;
      case 'tool': return Heart;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'podcast': return 'bg-green-100 text-green-800';
      case 'tool': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Resource Library
          </h1>
          <p className="text-lg text-gray-600">
            Curated mental wellness resources and educational content
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources..."
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-purple-600">
                      {resource.category}
                    </span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Need Professional Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-pink-100">
                Remember, these resources are helpful but not a replacement for professional mental health care.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">Crisis Resources:</p>
                <p className="text-sm">National Suicide Prevention Lifeline: 988</p>
                <p className="text-sm">Crisis Text Line: Text HOME to 741741</p>
              </div>
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-50">
                Find Professional Help
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}