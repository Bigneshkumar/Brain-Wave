import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { BarChart3, Smile, Meh, Frown, Heart, TrendingUp } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  note: string;
  tags: string[];
}

const moodEmojis = {
  1: { emoji: '😢', label: 'Very Sad', color: 'bg-red-500' },
  2: { emoji: '😕', label: 'Sad', color: 'bg-orange-500' },
  3: { emoji: '😐', label: 'Neutral', color: 'bg-yellow-500' },
  4: { emoji: '😊', label: 'Happy', color: 'bg-green-500' },
  5: { emoji: '😄', label: 'Very Happy', color: 'bg-blue-500' }
};

const commonTags = ['stressed', 'anxious', 'excited', 'tired', 'motivated', 'grateful', 'overwhelmed', 'peaceful'];

export default function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      setMoodEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const saveMoodEntry = () => {
    if (selectedMood && selectedDate) {
      const entry: MoodEntry = {
        id: Date.now().toString(),
        date: selectedDate.toISOString().split('T')[0],
        mood: selectedMood,
        note,
        tags: selectedTags
      };

      // Remove existing entry for the same date
      const filteredEntries = moodEntries.filter(e => e.date !== entry.date);
      setMoodEntries([...filteredEntries, entry]);

      // Reset form
      setSelectedMood(null);
      setNote('');
      setSelectedTags([]);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / moodEntries.length).toFixed(1);
  };

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return 'neutral';
    const recent = moodEntries.slice(-7); // Last 7 entries
    const older = moodEntries.slice(-14, -7); // Previous 7 entries
    
    const recentAvg = recent.reduce((acc, entry) => acc + entry.mood, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((acc, entry) => acc + entry.mood, 0) / older.length : recentAvg;
    
    if (recentAvg > olderAvg + 0.3) return 'improving';
    if (recentAvg < olderAvg - 0.3) return 'declining';
    return 'stable';
  };

  const getTodaysEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return moodEntries.find(entry => entry.date === today);
  };

  const recentEntries = moodEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  const todaysEntry = getTodaysEntry();
  const trend = getMoodTrend();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Mood Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Track your emotional wellbeing and discover patterns over time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Entry */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-pink-600" />
                  <span>How are you feeling today?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {todaysEntry ? (
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-6xl mb-2">{moodEmojis[todaysEntry.mood].emoji}</div>
                    <p className="text-lg font-semibold text-green-700">
                      You've already logged your mood today!
                    </p>
                    <p className="text-green-600">{moodEmojis[todaysEntry.mood].label}</p>
                  </div>
                ) : (
                  <>
                    {/* Mood Selection */}
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Select your mood
                      </label>
                      <div className="flex justify-center space-x-4">
                        {(Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>).map((mood) => (
                          <button
                            key={mood}
                            onClick={() => setSelectedMood(mood)}
                            className={`p-4 rounded-full text-4xl transition-all duration-200 ${
                              selectedMood === mood
                                ? 'scale-125 bg-blue-100 shadow-lg'
                                : 'hover:scale-110 hover:bg-gray-50'
                            }`}
                          >
                            {moodEmojis[mood].emoji}
                          </button>
                        ))}
                      </div>
                      {selectedMood && (
                        <p className="text-center text-lg font-medium text-gray-700">
                          {moodEmojis[selectedMood].label}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        How would you describe your feelings? (optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {commonTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Add a note (optional)
                      </label>
                      <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="What's on your mind today?"
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button
                      onClick={saveMoodEntry}
                      disabled={!selectedMood}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      Save Mood Entry
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  <span>Recent Entries</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentEntries.length > 0 ? (
                  <div className="space-y-4">
                    {recentEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{moodEmojis[entry.mood].emoji}</div>
                          <div>
                            <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">{moodEmojis[entry.mood].label}</p>
                            {entry.note && (
                              <p className="text-sm text-gray-500 mt-1">{entry.note}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No mood entries yet. Start tracking your mood today!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Mood Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{getAverageMood()}</div>
                  <div className="text-sm text-gray-600">Average Mood</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{moodEntries.length}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${
                    trend === 'improving' ? 'text-green-600' : 
                    trend === 'declining' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {trend === 'improving' ? '↗️ Improving' : 
                     trend === 'declining' ? '↘️ Declining' : '➡️ Stable'}
                  </div>
                  <div className="text-sm text-gray-600">Recent Trend</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Wellness Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Track your mood daily for better insights</p>
                <p>• Notice patterns between activities and feelings</p>
                <p>• Practice gratitude when feeling down</p>
                <p>• Reach out for support when needed</p>
                <p>• Celebrate your emotional awareness journey</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}