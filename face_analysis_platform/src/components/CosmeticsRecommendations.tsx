import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShoppingBag, Star, ExternalLink, Heart, Info } from 'lucide-react';
import { toast } from 'sonner';

interface Recommendation {
  id: string;
  category: string;
  product: string;
  shade: string;
  confidence: number;
  reason: string;
  price: string;
  brand: string;
  image: string;
}

interface CosmeticsRecommendationsProps {
  recommendations: Recommendation[];
}

export default function CosmeticsRecommendations({ recommendations }: CosmeticsRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  const handleAddToWishlist = (product: string) => {
    toast.success(`${product} added to wishlist!`);
  };

  const handleViewProduct = (product: string) => {
    toast.info(`Opening ${product} details...`);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 80) return 'text-blue-600 bg-blue-50';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Foundation': '🧴',
      'Lipstick': '💄',
      'Eyeshadow': '🎨',
      'Blush': '🌸',
      'Concealer': '✨',
      'Mascara': '👁️',
      'Eyeliner': '✏️',
      'Bronzer': '☀️'
    };
    return icons[category] || '💄';
  };

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b">
        <CardTitle className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5 text-pink-600" />
          <span>Personalized Cosmetics Recommendations</span>
          <Badge variant="secondary" className="ml-auto">
            {recommendations.length} Products
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid gap-6">
          {recommendations.map((rec, index) => (
            <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Product Image */}
                <div className="space-y-2">
                  <div className="relative">
                    <img
                      src={rec.image}
                      alt={rec.product}
                      className="w-full h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&q=80`;
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {rec.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rec.brand}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {rec.product}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Shade: <span className="font-medium">{rec.shade}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Match Confidence</span>
                      <span className={`text-sm font-bold px-2 py-1 rounded-full ${getConfidenceColor(rec.confidence)}`}>
                        {rec.confidence}%
                      </span>
                    </div>
                    <Progress value={rec.confidence} className="h-2" />
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{rec.reason}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{rec.price}</p>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.2</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleViewProduct(rec.product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                    <Button
                      onClick={() => handleAddToWishlist(rec.product)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Recommendation Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(recommendations.reduce((acc, rec) => acc + rec.confidence, 0) / recommendations.length)}%
                </p>
                <p className="text-gray-600">Avg. Confidence</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-600">
                  {recommendations.length}
                </p>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {new Set(recommendations.map(r => r.category)).size}
                </p>
                <p className="text-gray-600">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${Math.round(recommendations.reduce((acc, rec) => acc + parseInt(rec.price.replace('$', '')), 0))}
                </p>
                <p className="text-gray-600">Total Value</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}