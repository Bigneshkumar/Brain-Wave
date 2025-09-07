import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, BookOpen, Target, Plus, Trash2, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
}

export default function StudyAssistant() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review math chapter 5', completed: false, priority: 'high' },
    { id: '2', title: 'Complete history essay', completed: true, priority: 'medium' },
    { id: '3', title: 'Practice Spanish vocabulary', completed: false, priority: 'low' }
  ]);

  const [goals, setGoals] = useState<StudyGoal[]>([
    {
      id: '1',
      title: 'Master Calculus',
      description: 'Complete all calculus assignments and prepare for final exam',
      deadline: '2025-12-15',
      progress: 65
    },
    {
      id: '2',
      title: 'Improve Writing Skills',
      description: 'Write 3 essays per week and get feedback',
      deadline: '2025-11-30',
      progress: 40
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [newGoal, setNewGoal] = useState({ title: '', description: '', deadline: '' });

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addGoal = () => {
    if (newGoal.title.trim()) {
      const goal: StudyGoal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        deadline: newGoal.deadline,
        progress: 0
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '', deadline: '' });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Study Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Organize your studies and track your academic progress
          </p>
        </div>

        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Add Task */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="h-5 w-5 text-green-600" />
                      <span>Add New Task</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter a new task..."
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        className="flex-1"
                      />
                      <Button onClick={addTask} className="bg-green-600 hover:bg-green-700">
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Task List */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Your Tasks</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} flex items-center justify-between`}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                          />
                          <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                            {task.title}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {tasks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No tasks yet. Add your first task above!
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Progress Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{completionRate}%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{completedTasks}/{tasks.length}</div>
                      <div className="text-sm text-gray-600">Tasks Completed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Study Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-600">
                    <p>• Break large tasks into smaller, manageable chunks</p>
                    <p>• Use the Pomodoro technique for better focus</p>
                    <p>• Review your progress regularly</p>
                    <p>• Take breaks to avoid burnout</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Add Goal */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span>Set New Goal</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      placeholder="Goal title..."
                    />
                    <Textarea
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      placeholder="Goal description..."
                    />
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                    <Button onClick={addGoal} className="w-full bg-green-600 hover:bg-green-700">
                      Add Goal
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Goals List */}
                {goals.map((goal) => (
                  <Card key={goal.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{goal.description}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Progress: {goal.progress}%</span>
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>Study Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Schedule Feature Coming Soon</h3>
                <p className="text-gray-500">
                  We're working on an intelligent study scheduler to help you plan your learning sessions.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}