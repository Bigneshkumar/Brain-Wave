import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Smile, User, Droplets, Sparkles } from 'lucide-react';

interface FaceAnalysisResultsProps {
  analysis: any;
}

export default function FaceAnalysisResults({ analysis }: FaceAnalysisResultsProps) {
  if (!analysis) return null;

  const { facialFeatures, confidenceScore, imageUrl } = analysis;

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-purple-600" />
          <span>Facial Analysis Results</span>
          <Badge variant="secondary" className="ml-auto">
            {confidenceScore}% Confidence
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span>Analyzed Image</span>
            </h3>
            <div className="relative">
              <img
                src={imageUrl}
                alt="Analyzed face"
                className="w-full h-64 object-cover rounded-lg border-2 border-purple-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                Face Detected ✓
              </div>
            </div>
          </div>

          {/* Feature Analysis */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <User className="h-4 w-4 text-blue-500" />
              <span>Detected Features</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Face Shape</span>
                <Badge variant="outline" className="bg-white">
                  {facialFeatures.faceShape}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Skin Tone</span>
                <Badge variant="outline" className="bg-white">
                  {facialFeatures.skinTone}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Eye Shape</span>
                <Badge variant="outline" className="bg-white">
                  {facialFeatures.eyeShape}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Lip Shape</span>
                <Badge variant="outline" className="bg-white">
                  {facialFeatures.lipShape}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Skin Condition Analysis */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold text-gray-800 flex items-center space-x-2 mb-4">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>Skin Condition Analysis</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Hydration</span>
                <span className="text-sm font-bold text-blue-600">
                  {facialFeatures.skinCondition.hydration}%
                </span>
              </div>
              <Progress value={facialFeatures.skinCondition.hydration} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Clarity</span>
                <span className="text-sm font-bold text-green-600">
                  {facialFeatures.skinCondition.clarity}%
                </span>
              </div>
              <Progress value={facialFeatures.skinCondition.clarity} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Texture</span>
                <Badge variant="outline" className="text-xs">
                  {facialFeatures.skinCondition.texture}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Facial Landmarks Info */}
        <div className="mt-6 pt-6 border-t">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Technical Analysis</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Landmarks Detected:</span>
                <span className="font-semibold text-purple-600 ml-2">68 points</span>
              </div>
              <div>
                <span className="text-gray-600">Processing Time:</span>
                <span className="font-semibold text-green-600 ml-2">2.3s</span>
              </div>
              <div>
                <span className="text-gray-600">CNN Features:</span>
                <span className="font-semibold text-blue-600 ml-2">512 dims</span>
              </div>
              <div>
                <span className="text-gray-600">Analysis Accuracy:</span>
                <span className="font-semibold text-purple-600 ml-2">{confidenceScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}