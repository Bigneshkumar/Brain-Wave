import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Brain, Eye, Palette, Heart, Sparkles } from 'lucide-react';

interface AnalysisProgressProps {
  progress: number;
}

export default function AnalysisProgress({ progress }: AnalysisProgressProps) {
  const getStageInfo = (progress: number) => {
    if (progress <= 20) {
      return {
        stage: 'Face Detection',
        description: 'Detecting face and extracting landmarks...',
        icon: Eye,
        color: 'text-blue-600'
      };
    } else if (progress <= 40) {
      return {
        stage: 'Feature Analysis',
        description: 'Analyzing facial features with CNN models...',
        icon: Brain,
        color: 'text-purple-600'
      };
    } else if (progress <= 60) {
      return {
        stage: 'Skin Analysis',
        description: 'Processing skin tone and texture...',
        icon: Sparkles,
        color: 'text-pink-600'
      };
    } else if (progress <= 80) {
      return {
        stage: 'Recommendations',
        description: 'Generating personalized recommendations...',
        icon: Palette,
        color: 'text-green-600'
      };
    } else {
      return {
        stage: 'Health Insights',
        description: 'Analyzing health indicators...',
        icon: Heart,
        color: 'text-red-600'
      };
    }
  };

  const stageInfo = getStageInfo(progress);
  const IconComponent = stageInfo.icon;

  return (
    <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-white rounded-full ${stageInfo.color}`}>
            <IconComponent className="h-5 w-5 animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{stageInfo.stage}</h3>
            <p className="text-sm text-gray-600">{stageInfo.description}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-purple-600">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {progress === 100 && (
          <div className="flex items-center space-x-2 text-green-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Analysis Complete!</span>
          </div>
        )}
      </div>
    </Card>
  );
}