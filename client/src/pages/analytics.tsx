
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Star, 
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Equal
} from "lucide-react";
import { useState } from "react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = {
    totalSwaps: 24,
    completionRate: 92,
    averageRating: 4.8,
    responseTime: 2.3,
    profileViews: 156,
    matchSuccessRate: 78
  };

  const recentProjects = [
    {
      id: "1",
      title: "E-commerce Website Design",
      partner: "Alex Johnson",
      status: "completed",
      rating: 5,
      completedDate: "2024-01-10",
      value: "Website Development"
    },
    {
      id: "2",
      title: "Brand Identity Package",
      partner: "Maria Garcia", 
      status: "in-progress",
      progress: 75,
      dueDate: "2024-01-20",
      value: "Content Writing"
    },
    {
      id: "3",
      title: "Mobile App UI/UX",
      partner: "David Kim",
      status: "completed",
      rating: 4,
      completedDate: "2024-01-05",
      value: "SEO Optimization"
    }
  ];

  const skillDemand = [
    { skill: "Web Development", demand: 95, trend: "up" },
    { skill: "Graphic Design", demand: 87, trend: "up" },
    { skill: "Content Writing", demand: 73, trend: "down" },
    { skill: "SEO", demand: 69, trend: "stable" },
    { skill: "Social Media", demand: 54, trend: "up" }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case "down": return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default: return <Equal className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Insights</h1>
            <p className="text-muted-foreground mt-2">
              Track your performance and discover opportunities
            </p>
          </div>
          
          <div className="flex gap-2">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSwaps}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageRating}</div>
                  <p className="text-xs text-muted-foreground">
                    Based on 23 reviews
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.responseTime}h</div>
                  <p className="text-xs text-muted-foreground">
                    Average response time
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.profileViews}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Match Success</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.matchSuccessRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Matches that led to swaps
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProjects.slice(0, 5).map((project) => (
                      <div key={project.id} className="flex items-center gap-3 p-3 rounded-lg border">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{project.title}</p>
                          <p className="text-xs text-muted-foreground">with {project.partner}</p>
                        </div>
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Demand Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillDemand.map((item) => (
                      <div key={item.skill} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.skill}</span>
                          {getTrendIcon(item.trend)}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${item.demand}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.demand}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="space-y-6">
              {recentProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">Partner: {project.partner}</p>
                      </div>
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Exchanged for:</span>
                        <p className="font-medium">{project.value}</p>
                      </div>
                      {project.status === 'completed' ? (
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < (project.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-muted-foreground">Progress:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{project.progress}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Top Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["UI/UX Design", "Figma", "Prototyping", "User Research"].map((skill, index) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${90 - index * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{90 - index * 10}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills in Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillDemand.map((item) => (
                      <div key={item.skill} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.skill}</span>
                          {getTrendIcon(item.trend)}
                        </div>
                        <span className="text-xs text-muted-foreground">{item.demand}% demand</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-800 dark:text-green-200">Strong Performance</h3>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your completion rate is 15% higher than the platform average. Keep up the excellent work!
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200">Opportunity</h3>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Consider adding "React Development" to your skills - it's in high demand and matches your design background.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Response Time</h3>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Your average response time is great! Maintaining quick responses helps improve match success rates.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
