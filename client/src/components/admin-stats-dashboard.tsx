import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Briefcase, 
  ArrowUpDown, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Star,
  AlertTriangle
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalServices: number;
  totalProposals: number;
  totalProjects: number;
  activeUsers: number;
  pendingProposals: number;
  activeProjects: number;
  completedProjects: number;
  averageRating: number;
  recentSignups: number;
}

export default function AdminStatsDashboard() {
  const { data: stats, isLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    enabled: true
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <p className="text-muted-foreground">Unable to load statistics</p>
        </CardContent>
      </Card>
    );
  }

  const projectCompletionRate = stats.totalProjects > 0 
    ? Math.round((stats.completedProjects / stats.totalProjects) * 100)
    : 0;

  const userActivationRate = stats.totalUsers > 0
    ? Math.round((stats.activeUsers / stats.totalUsers) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                +{stats.recentSignups} this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-green-500" />
              Active Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Services listed on platform
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-purple-500" />
              Swap Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProposals.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {stats.pendingProposals} pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Project Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Rate</span>
                <span className="font-medium">{projectCompletionRate}%</span>
              </div>
              <Progress value={projectCompletionRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Completed</div>
                <div className="font-semibold text-green-600">
                  {stats.completedProjects}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">In Progress</div>
                <div className="font-semibold text-blue-600">
                  {stats.activeProjects}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Platform Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>User Activation</span>
                <span className="font-medium">{userActivationRate}%</span>
              </div>
              <Progress value={userActivationRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Avg Rating</div>
                <div className="font-semibold text-yellow-600 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {stats.averageRating.toFixed(1)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Active Users</div>
                <div className="font-semibold text-green-600">
                  {stats.activeUsers}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Platform Activity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((stats.totalProposals / stats.totalUsers) * 100) / 100}
                  </div>
                  <div className="text-xs text-muted-foreground">Proposals per User</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((stats.totalServices / stats.activeUsers) * 100) / 100}
                  </div>
                  <div className="text-xs text-muted-foreground">Services per Active User</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {projectCompletionRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {userActivationRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">User Activation</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="growth" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Growth analytics coming soon</p>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Trend analysis coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}