import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Focus, Volume2, Trophy } from 'lucide-react';

export default function FocusMode() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [selectedDuration, setSelectedDuration] = useState('25');
  const [completedSessions, setCompletedSessions] = useState(0);

  const durations = {
    '15': 15 * 60,
    '25': 25 * 60,
    '45': 45 * 60,
    '60': 60 * 60
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (sessionType === 'focus') {
        setCompletedSessions(prev => prev + 1);
        // Auto-switch to break
        setSessionType('break');
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        setSessionType('focus');
        setTimeLeft(durations[selectedDuration as keyof typeof durations]);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, sessionType, selectedDuration]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessionType === 'focus' ? durations[selectedDuration as keyof typeof durations] : 5 * 60);
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    if (!isActive) {
      setTimeLeft(durations[value as keyof typeof durations]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = sessionType === 'focus' ? durations[selectedDuration as keyof typeof durations] : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const ambientSounds = [
    'Rain Sounds',
    'Forest Ambience',
    'Ocean Waves',
    'White Noise',
    'Cafe Atmosphere'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Focus Mode
          </h1>
          <p className="text-lg text-gray-600">
            Enhance your concentration with guided focus sessions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Focus className="h-6 w-6 text-blue-600" />
                  <span className="text-2xl">
                    {sessionType === 'focus' ? 'Focus Session' : 'Break Time'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-8">
                <div className="relative">
                  <div className="text-8xl font-mono font-bold text-gray-800 mb-4">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress 
                    value={progress} 
                    className="w-full h-3"
                  />
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={toggleTimer}
                    size="lg"
                    className={`px-8 py-3 text-lg ${
                      sessionType === 'focus' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                    }`}
                  >
                    {isActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {isActive ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    onClick={resetTimer}
                    size="lg"
                    variant="outline"
                    className="px-8 py-3 text-lg border-gray-300"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {sessionType === 'focus' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Focus Duration
                    </label>
                    <Select value={selectedDuration} onValueChange={handleDurationChange} disabled={isActive}>
                      <SelectTrigger className="w-48 mx-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="25">25 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Today's Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{completedSessions}</div>
                  <div className="text-sm text-gray-600">Sessions Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{completedSessions * parseInt(selectedDuration)}</div>
                  <div className="text-sm text-gray-600">Minutes Focused</div>
                </div>
              </CardContent>
            </Card>

            {/* Ambient Sounds */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-purple-600" />
                  <span>Ambient Sounds</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ambientSounds.map((sound) => (
                  <Button
                    key={sound}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-purple-50"
                  >
                    {sound}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}