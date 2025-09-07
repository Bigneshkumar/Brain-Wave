import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Droplets, Sun, Moon, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface HealthInsightsProps {
  insights: {
    skinHealth?: {
      hydrationLevel: number;
      elasticity: number;
      evenness: number;
    };
    suggestions?: string[];
    wellnessTips?: string[];
  };
}

export default function HealthInsights({ insights }: HealthInsightsProps) {
  if (!insights || Object.keys(insights).length === 0) return null;

  const { skinHealth, suggestions = [], wellnessTips = [] } = insights;

  const getHealthScore = () => {
    if (!skinHealth) return 0;
    return Math.round((skinHealth.hydrationLevel + skinHealth.elasticity + skinHealth.evenness) / 3);
  };

  const getHealthStatus = (score: number) => {
    if (score >= 80) return { status: 'Excellent', color: 'text-green-600 bg-green-50', icon: CheckCircle };
    if (score >= 60) return { status: 'Good', color: 'text-blue-600 bg-blue-50', icon: Heart };
    if (score >= 40) return { status: 'Fair', color: 'text-yellow-600 bg-yellow-50', icon: AlertTriangle };
    return { status: 'Needs Attention', color: 'text-red-600 bg-red-50', icon: AlertTriangle };
  };

  const healthScore = getHealthScore();
  const healthStatus = getHealthStatus(healthScore);
  const StatusIcon = healthStatus.icon;

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-red-500" />
          <span>Health Insights</span>
          <Badge variant="secondary" className="ml-auto">
            AI Analysis
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Overall Health Score */}
        {skinHealth && (
          <div className="text-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{healthScore}</p>
                  <p className="text-xs text-gray-600">Score</p>
                </div>
              </div>
            </div>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${healthStatus.color}`}>
              <StatusIcon className="h-4 w-4" />
              <span className="font-medium">{healthStatus.status}</span>
            </div>
          </div>
        )}

        {/* Detailed Health Metrics */}
        {skinHealth && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>Skin Health Metrics</span>
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Hydration Level</span>
                  <span className="text-sm font-bold text-blue-600">
                    {skinHealth.hydrationLevel}%
                  </span>
                </div>
                <Progress value={skinHealth.hydrationLevel} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Skin Elasticity</span>
                  <span className="text-sm font-bold text-green-600">
                    {skinHealth.elasticity}%
                  </span>
                </div>
                <Progress value={skinHealth.elasticity} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Skin Evenness</span>
                  <span className="text-sm font-bold text-purple-600">
                    {skinHealth.evenness}%
                  </span>
                </div>
                <Progress value={skinHealth.evenness} className="h-2" />
              </div>
            </div>
          </div>
        )}

        {/* Health Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>Health Analysis</span>
            </h3>
            
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Alert key={index} className="border-l-4 border-l-yellow-400">
                  <AlertDescription className="text-sm">
                    {suggestion}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Wellness Tips */}
        {wellnessTips.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-green-500" />
              <span>Wellness Tips</span>
            </h3>
            
            <div className="space-y-2">
              {wellnessTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-green-600">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Care Routine */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
            <Sun className="h-4 w-4 text-orange-500" />
            <span>Recommended Daily Routine</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-gray-700">Morning</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 ml-6">
                <li>• Gentle cleanser</li>
                <li>• Vitamin C serum</li>
                <li>• Moisturizer</li>
                <li>• SPF 30+ sunscreen</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-gray-700">Evening</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 ml-6">
                <li>• Makeup remover</li>
                <li>• Gentle cleanser</li>
                <li>• Hydrating serum</li>
                <li>• Night moisturizer</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <strong>Disclaimer:</strong> These insights are generated by AI analysis and are for informational purposes only. 
            Consult with a dermatologist or healthcare professional for personalized medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}