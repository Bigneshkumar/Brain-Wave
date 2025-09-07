import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Users, MessageCircle, Share2, ChevronDown, ChevronUp } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  date: string;
  featured: boolean;
}

const stories: Story[] = [
  {
    id: '1',
    title: 'Finding My Voice Through Anxiety',
    author: 'Sarah M.',
    content: `I used to think anxiety was my enemy, but I've learned it's actually trying to protect me. Last year, I was so overwhelmed with college applications that I couldn't sleep or eat properly. I felt like I was drowning.

The turning point came when I started using mindfulness techniques and talking to a counselor. I learned that my anxiety wasn't something to fight against, but something to understand and work with.

Now, I still get anxious, but I have tools to manage it. I practice deep breathing, keep a journal, and remind myself that it's okay to feel overwhelmed sometimes. I'm not "cured," but I'm learning to live with anxiety in a healthier way.

To anyone struggling: you're not alone, and it's okay to ask for help. Your feelings are valid, and you deserve support.`,
    tags: ['anxiety', 'college stress', 'mindfulness', 'therapy'],
    likes: 127,
    comments: 23,
    date: '2025-08-15',
    featured: true
  },
  {
    id: '2',
    title: 'Breaking the Perfectionism Cycle',
    author: 'Alex K.',
    content: `Perfectionism nearly broke me in high school. I thought if I wasn't perfect, I was worthless. Every grade, every project, every social interaction had to be flawless.

It took a mental health crisis for me to realize this wasn't sustainable. I was exhausted, isolated, and constantly disappointed in myself.

Recovery has been about learning to embrace "good enough." I started setting realistic goals, celebrating small wins, and accepting that mistakes are part of learning.

The hardest part was changing my inner dialogue. Instead of "I'm such a failure," I learned to say "I'm learning and growing." It's still a work in progress, but I'm so much happier now.`,
    tags: ['perfectionism', 'self-compassion', 'high school', 'recovery'],
    likes: 89,
    comments: 15,
    date: '2025-08-10',
    featured: false
  },
  {
    id: '3',
    title: 'Social Media Detox Changed My Life',
    author: 'Jordan T.',
    content: `I didn't realize how much social media was affecting my mental health until I took a break. I was constantly comparing myself to others, feeling inadequate, and spending hours scrolling mindlessly.

The first week without Instagram and TikTok was hard. I felt disconnected and bored. But gradually, I started noticing things I'd been missing - sunsets, conversations with friends, my own thoughts.

When I came back to social media after a month, I had a completely different relationship with it. I unfollowed accounts that made me feel bad, limited my screen time, and started following mental health advocates instead.

Now I use social media intentionally, not compulsively. It's a tool, not a crutch.`,
    tags: ['social media', 'digital wellness', 'self-care', 'boundaries'],
    likes: 156,
    comments: 31,
    date: '2025-08-05',
    featured: true
  },
  {
    id: '4',
    title: 'Learning to Say No',
    author: 'Maya P.',
    content: `I used to say yes to everything. Every club, every favor, every social event. I thought being busy meant being successful and liked.

But I was burning out. My grades suffered, my friendships became superficial, and I lost touch with what I actually enjoyed.

Learning to say no was terrifying at first. I worried people would think I was selfish or lazy. But the opposite happened - people respected my boundaries, and the relationships that remained became deeper and more meaningful.

Now I prioritize my time and energy. I choose activities that align with my values and goals. It's not selfish to protect your mental health.`,
    tags: ['boundaries', 'burnout', 'self-care', 'priorities'],
    likes: 94,
    comments: 18,
    date: '2025-07-28',
    featured: false
  }
];

export default function PeerStories() {
  const [expandedStories, setExpandedStories] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const toggleExpanded = (storyId: string) => {
    setExpandedStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  const filteredStories = filter === 'featured' 
    ? stories.filter(story => story.featured)
    : stories;

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Peer Stories
          </h1>
          <p className="text-lg text-gray-600">
            Real stories from young people on their mental wellness journey
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>All Stories</span>
          </Button>
          <Button
            variant={filter === 'featured' ? 'default' : 'outline'}
            onClick={() => setFilter('featured')}
            className="flex items-center space-x-2"
          >
            <Heart className="h-4 w-4" />
            <span>Featured</span>
          </Button>
        </div>

        {/* Stories */}
        <div className="space-y-6">
          {filteredStories.map((story) => {
            const isExpanded = expandedStories.includes(story.id);
            const shouldTruncate = story.content.length > 200;
            
            return (
              <Card key={story.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                          {story.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <p className="text-sm text-gray-600">
                          by {story.author} • {new Date(story.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {story.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {isExpanded || !shouldTruncate 
                        ? story.content 
                        : truncateContent(story.content)
                      }
                    </p>
                    
                    {shouldTruncate && (
                      <Button
                        variant="ghost"
                        onClick={() => toggleExpanded(story.id)}
                        className="text-purple-600 hover:text-purple-700 p-0 h-auto"
                      >
                        {isExpanded ? (
                          <>
                            Show less <ChevronUp className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Read more <ChevronDown className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                        <Heart className="h-4 w-4 mr-1" />
                        {story.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {story.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
            <p className="text-gray-500">
              Check back later for more inspiring stories from the community.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
              <p className="text-violet-100 mb-6">
                Your experience could help someone else on their mental wellness journey. 
                Every story matters and can make a difference.
              </p>
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-50">
                Submit Your Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}