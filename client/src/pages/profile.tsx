import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Calendar, Award, ExternalLink } from "lucide-react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { id } = useParams();
  const isOwnProfile = !id; // If no ID provided, it's the user's own profile

  // Mock user data for now
  const user = {
    id: "user-1",
    fullName: "Sarah Chen",
    title: "Senior UX/UI Designer",
    bio: "Passionate designer with 8+ years of experience creating user-centered digital experiences. I specialize in mobile app design, design systems, and user research.",
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
    rating: 4.9,
    reviewCount: 23,
    completedSwaps: 12,
    skills: ["UI/UX Design", "Figma", "Sketch", "Prototyping", "User Research", "Design Systems"],
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=120&h=120&fit=crop&crop=face",
    isVerified: true
  };

  const { data: services = [] } = useQuery({
    queryKey: ["/api/services", { userId: user.id }],
    enabled: true
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["/api/reviews", { userId: user.id }],
    enabled: true
  });

  const offeredServices = services.filter((s: any) => s.serviceType === "offer");
  const neededServices = services.filter((s: any) => s.serviceType === "need");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.profileImage} alt={user.fullName} />
                    <AvatarFallback>{user.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold" data-testid="text-user-name">{user.fullName}</h1>
                      {user.isVerified && (
                        <Badge className="bg-blue-500/10 text-blue-400">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-xl text-muted-foreground mb-2">{user.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1"></div>
                
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary" data-testid="text-rating">{user.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400" data-testid="text-completed-swaps">{user.completedSwaps}</div>
                      <div className="text-xs text-muted-foreground">Completed Swaps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400" data-testid="text-reviews">{user.reviewCount}</div>
                      <div className="text-xs text-muted-foreground">Reviews</div>
                    </div>
                  </div>
                  
                  {!isOwnProfile && (
                    <div className="flex gap-2">
                      <Button data-testid="button-message-user">Message</Button>
                      <Button variant="outline" data-testid="button-propose-swap">Propose Swap</Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-muted-foreground mb-4">{user.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" data-testid={`badge-skill-${index}`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services" data-testid="tab-services">Services</TabsTrigger>
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about" data-testid="tab-about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-400">Services I Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  {offeredServices.length === 0 ? (
                    <p className="text-muted-foreground">No services offered yet</p>
                  ) : (
                    <div className="space-y-4">
                      {offeredServices.map((service: any) => (
                        <div key={service.id} className="border border-border rounded-lg p-4" data-testid={`card-offer-${service.id}`}>
                          <h3 className="font-semibold mb-2">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge>{service.category}</Badge>
                            {service.estimatedValue && (
                              <span className="text-sm text-muted-foreground">${service.estimatedValue}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Services I Need</CardTitle>
                </CardHeader>
                <CardContent>
                  {neededServices.length === 0 ? (
                    <p className="text-muted-foreground">No services needed</p>
                  ) : (
                    <div className="space-y-4">
                      {neededServices.map((service: any) => (
                        <div key={service.id} className="border border-border rounded-lg p-4" data-testid={`card-need-${service.id}`}>
                          <h3 className="font-semibold mb-2">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{service.category}</Badge>
                            {service.estimatedValue && (
                              <span className="text-sm text-muted-foreground">${service.estimatedValue}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Mock portfolio items */}
                  <div className="group cursor-pointer" data-testid="portfolio-item-1">
                    <div className="aspect-video bg-muted rounded-lg mb-3 group-hover:bg-muted/80 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">Mobile Banking App</h3>
                    <p className="text-sm text-muted-foreground">Complete UI/UX design for a fintech startup</p>
                  </div>
                  
                  <div className="group cursor-pointer" data-testid="portfolio-item-2">
                    <div className="aspect-video bg-muted rounded-lg mb-3 group-hover:bg-muted/80 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">E-commerce Platform</h3>
                    <p className="text-sm text-muted-foreground">Redesign of online marketplace interface</p>
                  </div>
                  
                  <div className="group cursor-pointer" data-testid="portfolio-item-3">
                    <div className="aspect-video bg-muted rounded-lg mb-3 group-hover:bg-muted/80 transition-colors flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">Design System</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive design system for SaaS product</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Mock reviews */}
                  <div className="border-b border-border pb-6" data-testid="review-1">
                    <div className="flex items-start gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">Marcus Rodriguez</h4>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-muted-foreground">
                          "Sarah delivered exceptional mobile app designs that exceeded our expectations. Her attention to detail and user-centered approach made our app stand out in the market."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-border pb-6" data-testid="review-2">
                    <div className="flex items-start gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">Emma Thompson</h4>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">1 month ago</span>
                        </div>
                        <p className="text-muted-foreground">
                          "Professional, responsive, and creative. Sarah's design work helped us secure our first round of funding. Highly recommend for any design projects."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div data-testid="review-3">
                    <div className="flex items-start gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">David Kim</h4>
                          <div className="flex text-yellow-400">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                            <Star className="w-4 h-4 text-yellow-400" />
                          </div>
                          <span className="text-sm text-muted-foreground">2 months ago</span>
                        </div>
                        <p className="text-muted-foreground">
                          "Great collaboration on the e-commerce redesign. Sarah was easy to work with and delivered on time. The designs were well-received by our users."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {user.fullName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Background</h3>
                  <p className="text-muted-foreground">
                    {user.bio} I've worked with startups and Fortune 500 companies, helping them create digital products that users love. My approach combines data-driven insights with creative problem-solving to deliver designs that not only look great but also drive business results.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Expertise</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Design Skills</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• User Interface Design</li>
                        <li>• User Experience Design</li>
                        <li>• Prototyping & Wireframing</li>
                        <li>• Design Systems</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Tools & Technologies</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Figma & Sketch</li>
                        <li>• Adobe Creative Suite</li>
                        <li>• Principle & Framer</li>
                        <li>• HTML/CSS basics</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Available for Swaps</h3>
                  <p className="text-muted-foreground">
                    I'm looking to exchange design services for development work, marketing expertise, and business consulting. I'm particularly interested in working with professionals who can help with frontend development and digital marketing strategies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
