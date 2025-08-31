import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRightLeft, DollarSign } from "lucide-react";

interface SwapCardProps {
  opportunity: {
    matchingOffer: {
      id: string;
      title: string;
      category: string;
      estimatedValue?: number;
      user?: {
        id: string;
        fullName: string;
        title?: string;
        rating: number;
        reviewCount: number;
        profileImage?: string;
      };
    };
    matchingNeed: {
      id: string;
      title: string;
      category: string;
    };
    userOffer: {
      id: string;
      title: string;
      category: string;
    };
    userNeed: {
      id: string;
      title: string;
      category: string;
    };
    matchScore: number;
  };
  onProposeSwap?: () => void;
}

export default function SwapCard({ opportunity, onProposeSwap }: SwapCardProps) {
  const { matchingOffer, matchingNeed, userOffer, userNeed, matchScore } = opportunity;
  const { user } = matchingOffer;

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-yellow-400";
    return "text-muted-foreground";
  };

  return (
    <Card className="hover:border-primary/50 transition-colors" data-testid={`card-swap-opportunity-${matchingOffer.id}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Perfect Match Available</h3>
          <Badge className={`${getMatchScoreColor(matchScore)} bg-current/10`}>
            {matchScore}% Match
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Partner Side */}
          <div className="space-y-4">
            {user && (
              <div className="flex items-center space-x-3">
                <img 
                  src={user.profileImage || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face`}
                  alt={user.fullName} 
                  className="w-12 h-12 rounded-full object-cover"
                  data-testid={`img-partner-${user.id}`}
                />
                <div>
                  <h4 className="font-semibold">{user.fullName}</h4>
                  {user.title && (
                    <p className="text-sm text-muted-foreground">{user.title}</p>
                  )}
                </div>
              </div>
            )}
            
            {user && (
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(user.rating) ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {user.rating} ({user.reviewCount} reviews)
                </span>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium text-green-400 mb-1">They Offer:</p>
              <p className="text-sm text-muted-foreground">{matchingOffer.title}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {matchingOffer.category}
              </Badge>
            </div>
            
            <div>
              <p className="text-sm font-medium text-primary mb-1">They Need:</p>
              <p className="text-sm text-muted-foreground">{matchingNeed.title}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {matchingNeed.category}
              </Badge>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <ArrowRightLeft className="text-primary w-4 h-4" />
            </div>
          </div>

          {/* Your Side */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face"
                alt="You" 
                className="w-12 h-12 rounded-full object-cover"
                data-testid="img-current-user"
              />
              <div>
                <h4 className="font-semibold">You</h4>
                <p className="text-sm text-muted-foreground">Your Profile</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9 (12 reviews)</span>
            </div>
            
            <div>
              <p className="text-sm font-medium text-green-400 mb-1">You Offer:</p>
              <p className="text-sm text-muted-foreground">{userOffer.title}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {userOffer.category}
              </Badge>
            </div>
            
            <div>
              <p className="text-sm font-medium text-primary mb-1">You Need:</p>
              <p className="text-sm text-muted-foreground">{userNeed.title}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {userNeed.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {matchingOffer.estimatedValue && (
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="font-medium">Estimated Value:</span>
                  <span className="ml-1">${matchingOffer.estimatedValue} each</span>
                </div>
              )}
              {!matchingOffer.estimatedValue && (
                <span className="font-medium">High-value skill exchange opportunity</span>
              )}
            </div>
            <Button 
              size="sm" 
              onClick={onProposeSwap}
              data-testid={`button-propose-swap-${matchingOffer.id}`}
            >
              Propose Swap
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
