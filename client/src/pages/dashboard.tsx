import Navigation from "@/components/navigation";
import ProjectCard from "@/components/project-card";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/enhanced-animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Clock, Star, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const MOCK_USER_ID = "user-1"; // In a real app, this would come from authentication

export default function Dashboard() {
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["/api/projects", { userId: MOCK_USER_ID }],
    enabled: true
  });

  const { data: proposals = [], isLoading: proposalsLoading } = useQuery({
    queryKey: ["/api/swap-proposals", { userId: MOCK_USER_ID }],
    enabled: true
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ["/api/services", { userId: MOCK_USER_ID }],
    enabled: true
  });

  const activeProjects = (projects as any[]).filter((p: any) => p.status === "active");
  const completedProjects = (projects as any[]).filter((p: any) => p.status === "completed");
  const pendingProposals = (proposals as any[]).filter((p: any) => p.status === "pending");

  const stats = {
    activeSwaps: activeProjects.length,
    completedSwaps: completedProjects.length,
    rating: 4.9,
    proposals: pendingProposals.length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Dashboard Header */}
        <FadeInUp>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold">My Dashboard</h1>
              <Link href="/service/new">
                <Button data-testid="button-new-service">
                  <Plus className="w-4 h-4 mr-2" />
                  New Service Listing
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <ScaleIn delay={0.1}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1" data-testid="text-active-swaps">
                      {stats.activeSwaps}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Active Swaps</div>
                  </CardContent>
                </Card>
              </ScaleIn>
              <ScaleIn delay={0.2}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-400 mb-1" data-testid="text-completed-swaps">
                      {stats.completedSwaps}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Completed</div>
                  </CardContent>
                </Card>
              </ScaleIn>
              <ScaleIn delay={0.3}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1" data-testid="text-user-rating">
                      {stats.rating}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Your Rating</div>
                  </CardContent>
                </Card>
              </ScaleIn>
              <ScaleIn delay={0.4}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1" data-testid="text-pending-proposals">
                      {stats.proposals}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Pending Proposals</div>
                  </CardContent>
                </Card>
              </ScaleIn>
            </div>
          </div>
        </FadeInUp>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="projects" data-testid="tab-projects" className="text-xs sm:text-sm">Projects</TabsTrigger>
            <TabsTrigger value="proposals" data-testid="tab-proposals" className="text-xs sm:text-sm">Proposals</TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services" className="text-xs sm:text-sm">Services</TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-messages" className="text-xs sm:text-sm">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Active Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projectsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : activeProjects.length === 0 ? (
                    <p className="text-muted-foreground">No active projects</p>
                  ) : (
                    <div className="space-y-4">
                      {activeProjects.slice(0, 3).map((project: any) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/20 transition-colors cursor-pointer">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-sm">David Kim</h5>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          Uploaded video draft for review...
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/20 transition-colors cursor-pointer">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face"
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-sm">Sarah Chen</h5>
                          <span className="text-xs text-muted-foreground">1d ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          Mobile design looks great! Starting React components...
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/20 transition-colors cursor-pointer">
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-sm">Emma Thompson</h5>
                          <span className="text-xs text-muted-foreground">2d ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          Thanks for the content strategy document...
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4" data-testid="button-view-all-messages">
                    View All Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="grid gap-6">
              {proposalsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-card rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (proposals as any[]).length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No swap proposals yet</p>
                    <Link href="/browse">
                      <Button className="mt-4" data-testid="button-browse-opportunities">
                        Browse Opportunities
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                (proposals as any[]).map((proposal: any) => (
                  <Card key={proposal.id} data-testid={`card-proposal-${proposal.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold">Swap Proposal</h3>
                        <Badge 
                          variant={proposal.status === "pending" ? "secondary" : 
                                 proposal.status === "accepted" ? "default" : "destructive"}
                        >
                          {proposal.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-green-400 mb-1">You Offer:</p>
                          <p className="text-sm text-muted-foreground">{proposal.proposerService?.title}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">You Need:</p>
                          <p className="text-sm text-muted-foreground">{proposal.recipientService?.title}</p>
                        </div>
                      </div>
                      
                      {proposal.message && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <p className="text-sm">{proposal.message}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" data-testid={`button-accept-proposal-${proposal.id}`}>
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" data-testid={`button-decline-proposal-${proposal.id}`}>
                          Decline
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-message-${proposal.id}`}>
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">My Services</h2>
              <Link href="/service/new">
                <Button data-testid="button-add-service">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesLoading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-card rounded-lg animate-pulse" />
                ))
              ) : (services as any[]).length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground mb-4">No services listed yet</p>
                    <Link href="/service/new">
                      <Button data-testid="button-create-first-service">
                        Create Your First Service
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                (services as any[]).map((service: any) => (
                  <Card key={service.id} data-testid={`card-my-service-${service.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge 
                          variant={service.serviceType === "offer" ? "default" : "secondary"}
                          className={service.serviceType === "offer" ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"}
                        >
                          {service.serviceType === "offer" ? "Offering" : "Seeking"}
                        </Badge>
                        <Badge variant={service.isActive ? "default" : "secondary"}>
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      
                      <div className="flex gap-2">
                        <Link href={`/service/edit/${service.id}`}>
                          <Button variant="outline" size="sm" data-testid={`button-edit-service-${service.id}`}>
                            Edit
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" data-testid={`button-toggle-service-${service.id}`}>
                          {service.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Message system coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
