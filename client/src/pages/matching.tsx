import Navigation from "@/components/navigation";
import SwapCard from "@/components/swap-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Users, Star, Filter, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const MOCK_USER_ID = "user-1";

const mockMatchingOpportunities = [
  {
    matchingOffer: {
      id: "service-2",
      title: "React frontend development with responsive design",
      category: "Web Development",
      estimatedValue: 1200,
      user: {
        id: "user-2",
        fullName: "Marcus Rodriguez",
        title: "React Developer", 
        rating: 4.8,
        reviewCount: 31,
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
      }
    },
    matchingNeed: {
      id: "service-4",
      title: "Mobile app UI/UX design and prototypes",
      category: "Graphic Design"
    },
    userOffer: {
      id: "service-1",
      title: "Complete mobile app UI design with prototyping",
      category: "Graphic Design"
    },
    userNeed: {
      id: "service-3", 
      title: "Frontend development for React web app",
      category: "Web Development"
    },
    matchScore: 95
  },
  {
    matchingOffer: {
      id: "service-5",
      title: "Professional video editing with motion graphics",
      category: "Video Production",
      estimatedValue: 800,
      user: {
        id: "user-3",
        fullName: "David Kim",
        title: "Video Editor",
        rating: 4.7,
        reviewCount: 42,
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
      }
    },
    matchingNeed: {
      id: "service-7",
      title: "Logo design and brand identity",
      category: "Graphic Design"
    },
    userOffer: {
      id: "service-6",
      title: "Complete brand identity design package",
      category: "Graphic Design"
    },
    userNeed: {
      id: "service-8",
      title: "Video editing for marketing content",
      category: "Video Production"
    },
    matchScore: 88
  },
  {
    matchingOffer: {
      id: "service-9",
      title: "SEO optimization and content strategy",
      category: "Digital Marketing",
      estimatedValue: 1500,
      user: {
        id: "user-4",
        fullName: "Lisa Wang",
        title: "Digital Marketing Specialist",
        rating: 4.9,
        reviewCount: 67,
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
      }
    },
    matchingNeed: {
      id: "service-11",
      title: "Website design and user experience optimization",
      category: "Graphic Design"
    },
    userOffer: {
      id: "service-10",
      title: "Professional website redesign", 
      category: "Graphic Design"
    },
    userNeed: {
      id: "service-12",
      title: "Digital marketing strategy and SEO",
      category: "Digital Marketing"
    },
    matchScore: 82
  }
];

export default function Matching() {
  const [searchQuery, setSearchQuery] = useState("");
  const [minMatchScore, setMinMatchScore] = useState("80");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: opportunities = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/matching-opportunities", { userId: MOCK_USER_ID }],
    enabled: true
  });

  const filteredOpportunities = mockMatchingOpportunities.filter((opp) => {
    if (searchQuery && !opp.matchingOffer.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !opp.matchingOffer.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (opp.matchScore < parseInt(minMatchScore)) {
      return false;
    }
    if (selectedCategory !== "all" && opp.matchingOffer.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const averageMatchScore = filteredOpportunities.length > 0 
    ? Math.round(filteredOpportunities.reduce((sum, opp) => sum + opp.matchScore, 0) / filteredOpportunities.length)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Smart Matching</h1>
          <p className="text-xl text-muted-foreground">
            Discover perfect skill exchange opportunities tailored to your expertise
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1" data-testid="text-total-matches">
                {filteredOpportunities.length}
              </div>
              <div className="text-sm text-muted-foreground">Available Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1" data-testid="text-avg-match-score">
                {averageMatchScore}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Match Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1" data-testid="text-high-quality-matches">
                {filteredOpportunities.filter(opp => opp.matchScore >= 90).length}
              </div>
              <div className="text-sm text-muted-foreground">90%+ Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1" data-testid="text-new-today">
                3
              </div>
              <div className="text-sm text-muted-foreground">New Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by user or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-matches"
                />
              </div>
              
              <Select value={minMatchScore} onValueChange={setMinMatchScore}>
                <SelectTrigger className="w-full md:w-48" data-testid="select-min-score">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="70">70%+ Match</SelectItem>
                  <SelectItem value="80">80%+ Match</SelectItem>
                  <SelectItem value="90">90%+ Match</SelectItem>
                  <SelectItem value="95">95%+ Match</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48" data-testid="select-match-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Video Production">Video Production</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                disabled={isLoading}
                data-testid="button-refresh-matches"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Matching Results */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" data-testid="tab-all-matches">All Matches</TabsTrigger>
            <TabsTrigger value="premium" data-testid="tab-premium-matches">Premium (90%+)</TabsTrigger>
            <TabsTrigger value="recent" data-testid="tab-recent-matches">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredOpportunities.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No matching opportunities found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or create more service listings to find better matches
                  </p>
                  <Button data-testid="button-create-service">
                    Create New Service
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredOpportunities.map((opportunity) => (
                  <SwapCard 
                    key={opportunity.matchingOffer.id} 
                    opportunity={opportunity}
                    onProposeSwap={() => console.log("Proposing swap for", opportunity.matchingOffer.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="premium" className="space-y-6">
            <div className="space-y-6">
              {filteredOpportunities
                .filter(opp => opp.matchScore >= 90)
                .map((opportunity) => (
                  <SwapCard 
                    key={opportunity.matchingOffer.id} 
                    opportunity={opportunity}
                    onProposeSwap={() => console.log("Proposing swap for", opportunity.matchingOffer.id)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="space-y-6">
              {filteredOpportunities.slice(0, 2).map((opportunity) => (
                <SwapCard 
                  key={opportunity.matchingOffer.id} 
                  opportunity={opportunity}
                  onProposeSwap={() => console.log("Proposing swap for", opportunity.matchingOffer.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}