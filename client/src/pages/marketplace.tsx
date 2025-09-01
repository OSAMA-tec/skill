
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  Heart,
  Share,
  Eye,
  MessageSquare,
  Briefcase,
  Award,
  Verified,
  Calendar,
  DollarSign
} from "lucide-react";
import { useState } from "react";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  const serviceCategories = [
    { id: "all", name: "All Services", count: 1247 },
    { id: "design", name: "Design & Creative", count: 389 },
    { id: "development", name: "Development", count: 445 },
    { id: "marketing", name: "Marketing", count: 234 },
    { id: "writing", name: "Writing & Content", count: 179 },
    { id: "business", name: "Business & Strategy", count: 156 },
    { id: "consulting", name: "Consulting", count: 89 }
  ];

  const featuredServices = [
    {
      id: "1",
      title: "Complete E-commerce Website Development",
      description: "Full-stack development of modern e-commerce platform with React, Node.js, and PostgreSQL. Includes admin panel, payment integration, and mobile optimization.",
      provider: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        rating: 4.9,
        reviewCount: 67,
        completedProjects: 45,
        responseTime: "2 hours",
        isVerified: true,
        location: "San Francisco, CA",
        memberSince: "2023"
      },
      serviceType: "offer",
      category: "development",
      skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS"],
      estimatedTime: "2-3 weeks",
      complexity: "Advanced",
      exchangeValue: "High",
      lookingFor: ["UI/UX Design", "Digital Marketing", "Content Creation"],
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=120&fit=crop"
      ],
      featured: true,
      trending: true,
      likes: 156,
      views: 2341,
      lastActive: "1 hour ago"
    },
    {
      id: "2",
      title: "Brand Identity & Logo Design Package",
      description: "Complete brand identity including logo design, color palette, typography, business cards, and brand guidelines. Perfect for startups and small businesses.",
      provider: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        rating: 4.8,
        reviewCount: 52,
        completedProjects: 38,
        responseTime: "1 hour",
        isVerified: true,
        location: "New York, NY",
        memberSince: "2022"
      },
      serviceType: "offer",
      category: "design",
      skills: ["Adobe Illustrator", "Figma", "Brand Strategy", "Typography"],
      estimatedTime: "1-2 weeks",
      complexity: "Intermediate",
      exchangeValue: "Medium",
      lookingFor: ["Web Development", "SEO Services", "Social Media Management"],
      portfolio: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=120&fit=crop"
      ],
      featured: false,
      trending: false,
      likes: 89,
      views: 1456,
      lastActive: "3 hours ago"
    },
    {
      id: "3",
      title: "SEO & Content Marketing Strategy",
      description: "Comprehensive SEO audit, keyword research, content strategy, and 3-month implementation plan to boost your organic traffic and search rankings.",
      provider: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        rating: 5.0,
        reviewCount: 34,
        completedProjects: 28,
        responseTime: "30 minutes",
        isVerified: true,
        location: "Austin, TX",
        memberSince: "2023"
      },
      serviceType: "offer",
      category: "marketing",
      skills: ["SEO", "Content Strategy", "Google Analytics", "Keyword Research"],
      estimatedTime: "2-4 weeks",
      complexity: "Advanced",
      exchangeValue: "High",
      lookingFor: ["Graphic Design", "Video Editing", "App Development"],
      portfolio: [
        "https://images.unsplash.com/photo-1553613634-f78c2cf4f55e?w=200&h=120&fit=crop",
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=200&h=120&fit=crop"
      ],
      featured: true,
      trending: false,
      likes: 203,
      views: 3102,
      lastActive: "Online now"
    }
  ];

  const skillOptions = [
    "React", "Node.js", "Python", "UI/UX Design", "Figma", "Adobe Creative Suite",
    "SEO", "Content Writing", "Digital Marketing", "WordPress", "Shopify", "Photography"
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner": return "bg-green-500/10 text-green-400";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-400";
      case "Advanced": return "bg-red-500/10 text-red-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getExchangeValueColor = (value: string) => {
    switch (value) {
      case "High": return "bg-purple-500/10 text-purple-400";
      case "Medium": return "bg-blue-500/10 text-blue-400";
      case "Low": return "bg-gray-500/10 text-gray-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Service Marketplace</h1>
            <p className="text-muted-foreground mt-2">
              Discover professional services and find your perfect skill exchange partner
            </p>
          </div>
          
          <Button>
            <Briefcase className="w-4 h-4 mr-2" />
            Post Service
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Skills Required</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox 
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSkills([...selectedSkills, skill]);
                            } else {
                              setSelectedSkills(selectedSkills.filter(s => s !== skill));
                            }
                          }}
                        />
                        <label htmlFor={skill} className="text-sm cursor-pointer">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Exchange Value Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low ({priceRange[0]}%)</span>
                    <span>High ({priceRange[1]}%)</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="response-time">Fastest Response</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" variant="outline">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search services, skills, or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Found {featuredServices.length} services matching your criteria
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    More Filters
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {featuredServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img 
                            src={service.portfolio[0]} 
                            alt={service.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          {service.featured && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {service.trending && (
                            <Badge className="absolute top-3 right-3 bg-red-500">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          <div className="absolute bottom-3 right-3 flex gap-2">
                            <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg leading-tight mb-2">{service.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {service.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={service.provider.avatar} />
                              <AvatarFallback>{service.provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <p className="font-medium text-sm truncate">{service.provider.name}</p>
                                {service.provider.isVerified && (
                                  <Verified className="w-4 h-4 text-blue-500" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  {service.provider.rating}
                                </div>
                                <span>•</span>
                                <span>{service.provider.reviewCount} reviews</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {service.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {service.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{service.skills.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-muted-foreground">Timeline:</span>
                              <p className="font-medium">{service.estimatedTime}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Complexity:</span>
                              <Badge variant="outline" className={`${getComplexityColor(service.complexity)} text-xs`}>
                                {service.complexity}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <span className="text-xs text-muted-foreground">Looking for:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {service.lookingFor.slice(0, 2).map((need) => (
                                <Badge key={need} variant="outline" className="text-xs">
                                  {need}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {service.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {service.likes}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="space-y-6">
                  {featuredServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <img 
                            src={service.portfolio[0]} 
                            alt={service.title}
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-semibold">{service.title}</h3>
                                  {service.featured && (
                                    <Badge variant="default" className="bg-yellow-500 text-black text-xs">
                                      Featured
                                    </Badge>
                                  )}
                                  {service.trending && (
                                    <Badge variant="destructive" className="text-xs">
                                      Trending
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={service.provider.avatar} />
                                <AvatarFallback>{service.provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{service.provider.name}</p>
                                  {service.provider.isVerified && (
                                    <Verified className="w-4 h-4 text-blue-500" />
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    {service.provider.rating} ({service.provider.reviewCount})
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {service.provider.location}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {service.provider.responseTime} response
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {service.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Timeline: </span>
                                  <span className="font-medium">{service.estimatedTime}</span>
                                </div>
                                <Badge className={getComplexityColor(service.complexity)}>
                                  {service.complexity}
                                </Badge>
                                <Badge className={getExchangeValueColor(service.exchangeValue)}>
                                  {service.exchangeValue} Value
                                </Badge>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                                <Button size="sm">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Contact Provider
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
