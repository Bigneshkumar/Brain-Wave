import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import UploadZone from '@/components/UploadZone';
import AnalysisProgress from '@/components/AnalysisProgress';
import { Bot, User, Send, Camera, Video, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isAnalysis?: boolean;
}

interface AIAnalysisChatProps {
  onAnalysisComplete: (analysis: any) => void;
}

export default function AIAnalysisChat({ onAnalysisComplete }: AIAnalysisChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI beauty analyst. Upload a photo or video of yourself, and I'll provide personalized cosmetics recommendations and health insights based on advanced facial analysis. What would you like to analyze today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const addMessage = (type: 'user' | 'bot', content: string, isAnalysis = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isAnalysis,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addMessage('user', inputMessage);
    
    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Please upload a photo or video so I can analyze your facial features.",
        "Great question! Upload an image and I'll provide detailed analysis and recommendations.",
        "To give you the best recommendations, I'll need to see a clear photo of your face. Please use the upload area below.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage('bot', randomResponse);
    }, 1000);

    setInputMessage('');
  };

  const simulateFaceAnalysis = (file: File): Promise<any> => {
    return new Promise((resolve) => {
      setIsAnalyzing(true);
      setAnalysisProgress(0);

      // Simulate analysis steps with progress updates
      const steps = [
        { progress: 20, message: "Detecting face and extracting landmarks..." },
        { progress: 40, message: "Analyzing facial features with CNN models..." },
        { progress: 60, message: "Processing skin tone and texture..." },
        { progress: 80, message: "Generating personalized recommendations..." },
        { progress: 100, message: "Analysis complete!" },
      ];

      steps.forEach((step, index) => {
        setTimeout(() => {
          setAnalysisProgress(step.progress);
          if (index === steps.length - 1) {
            // Generate mock analysis results
            const mockAnalysis = {
              faceDetected: true,
              landmarks: Array.from({ length: 68 }, (_, i) => ({ x: Math.random() * 400, y: Math.random() * 400 })),
              facialFeatures: {
                faceShape: ['Oval', 'Round', 'Square', 'Heart', 'Diamond'][Math.floor(Math.random() * 5)],
                skinTone: ['Fair', 'Light', 'Medium', 'Tan', 'Deep'][Math.floor(Math.random() * 5)],
                eyeShape: ['Almond', 'Round', 'Hooded', 'Monolid', 'Upturned'][Math.floor(Math.random() * 5)],
                lipShape: ['Full', 'Thin', 'Heart-shaped', 'Wide', 'Bow-shaped'][Math.floor(Math.random() * 5)],
                skinCondition: {
                  texture: ['Smooth', 'Slightly textured', 'Textured'][Math.floor(Math.random() * 3)],
                  hydration: Math.floor(Math.random() * 100),
                  clarity: Math.floor(Math.random() * 100),
                }
              },
              recommendations: [
                {
                  id: '1',
                  category: 'Foundation',
                  product: 'Fenty Beauty Pro Filt\'r Soft Matte Foundation',
                  shade: 'Shade 240',
                  confidence: 94,
                  reason: 'Perfect match for your warm medium skin tone',
                  price: '$39',
                  brand: 'Fenty Beauty',
                  image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop'
                },
                {
                  id: '2',
                  category: 'Lipstick',
                  product: 'Charlotte Tilbury Matte Revolution',
                  shade: 'Pillow Talk',
                  confidence: 89,
                  reason: 'Complements your lip shape and skin undertones',
                  price: '$37',
                  brand: 'Charlotte Tilbury',
                  image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop'
                },
                {
                  id: '3',
                  category: 'Eyeshadow',
                  product: 'Urban Decay Naked3 Palette',
                  shade: 'Rose Gold Tones',
                  confidence: 87,
                  reason: 'Enhances your eye shape and complements skin tone',
                  price: '$54',
                  brand: 'Urban Decay',
                  image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop'
                },
                {
                  id: '4',
                  category: 'Blush',
                  product: 'Glossier Cloud Paint',
                  shade: 'Puff',
                  confidence: 85,
                  reason: 'Natural flush that suits your face shape',
                  price: '$20',
                  brand: 'Glossier',
                  image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop'
                }
              ],
              healthInsights: {
                skinHealth: {
                  hydrationLevel: Math.floor(Math.random() * 100),
                  elasticity: Math.floor(Math.random() * 100),
                  evenness: Math.floor(Math.random() * 100),
                },
                suggestions: [
                  'Your skin shows good hydration levels. Continue with your current moisturizing routine.',
                  'Consider adding a vitamin C serum to enhance skin brightness.',
                  'Your skin texture suggests good collagen production. Maintain with regular sunscreen use.',
                  'Slight signs of fatigue detected. Ensure adequate sleep and hydration.',
                ],
                wellnessTips: [
                  'Drink at least 8 glasses of water daily for optimal skin hydration',
                  'Use SPF 30+ sunscreen daily to prevent premature aging',
                  'Consider a gentle exfoliation routine 2-3 times per week',
                  'Maintain a consistent sleep schedule for skin repair',
                ]
              },
              confidenceScore: 92,
              imageUrl: URL.createObjectURL(file),
            };

            setIsAnalyzing(false);
            resolve(mockAnalysis);
          }
        }, (index + 1) * 1500);
      });
    });
  };

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const isVideo = file.type.startsWith('video/');
    
    addMessage('user', `📎 Uploaded ${isVideo ? 'video' : 'photo'}: ${file.name}`);
    
    addMessage('bot', `Perfect! I can see your ${isVideo ? 'video' : 'photo'}. Let me analyze your facial features and provide personalized recommendations. This will take a few moments...`, true);

    try {
      const analysis = await simulateFaceAnalysis(file);
      
      const resultMessage = `✨ Analysis Complete! 

**Facial Features Detected:**
• Face Shape: ${analysis.facialFeatures.faceShape}
• Skin Tone: ${analysis.facialFeatures.skinTone}
• Eye Shape: ${analysis.facialFeatures.eyeShape}
• Lip Shape: ${analysis.facialFeatures.lipShape}

**Top Recommendations:**
• ${analysis.recommendations[0].product} (${analysis.recommendations[0].confidence}% match)
• ${analysis.recommendations[1].product} (${analysis.recommendations[1].confidence}% match)

**Health Insights:**
• Skin hydration: ${analysis.healthInsights.skinHealth.hydrationLevel}%
• Overall skin health: Excellent

Click "View Detailed Results" to see complete analysis, product recommendations, and health suggestions!`;

      addMessage('bot', resultMessage);
      
      toast.success('Analysis completed successfully!');
      onAnalysisComplete(analysis);
      
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
      addMessage('bot', 'I encountered an issue analyzing your image. Please try uploading again or contact support if the problem persists.');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-purple-600" />
          <span>AI Beauty Analyst</span>
          <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-3 gap-0">
          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-96">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isAnalyzing && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-purple-100">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs lg:max-w-md">
                      <AnalysisProgress progress={analysisProgress} />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about beauty analysis..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isAnalyzing}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!inputMessage.trim() || isAnalyzing}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Upload Area */}
          <div className="border-l bg-gray-50/50 p-4">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">Upload for Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a photo or video for AI-powered beauty analysis
                </p>
              </div>
              
              <UploadZone onFilesSelected={handleFileUpload} disabled={isAnalyzing} />
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <Camera className="h-3 w-3" />
                  <span>Photos: JPG, PNG, WebP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="h-3 w-3" />
                  <span>Videos: MP4, AVI, MOV</span>
                </div>
                <p>Max size: 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}