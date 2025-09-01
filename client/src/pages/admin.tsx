import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, ArrowUpDown, BarChart3, UserCheck, AlertCircle } from 'lucide-react';

export default function Admin() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/admin/users'],
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/admin/services'],
  });

  const { data: proposals, isLoading: proposalsLoading } = useQuery({
    queryKey: ['/api/admin/proposals'],
  });

  if (statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and manage the entire SkillSwap platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-total-users">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-users">
                {stats?.totalUsers || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.activeUsers || 0} verified users
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-services">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-services">
                {stats?.totalServices || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Active listings
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-proposals">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Swap Proposals</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-proposals">
                {stats?.totalProposals || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                All proposals
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-projects">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-projects">
                {stats?.totalProjects || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                In progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Views */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services">Services</TabsTrigger>
            <TabsTrigger value="proposals" data-testid="tab-proposals">Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  All registered users on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading users...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users?.map((user: any) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                        data-testid={`user-item-${user.id}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-300 font-semibold">
                              {user.fullName?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user.fullName}
                            </p>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.role === 'super_admin' ? 'destructive' : user.role === 'admin' ? 'secondary' : 'outline'}>
                            {user.role}
                          </Badge>
                          {user.isVerified && (
                            <Badge variant="outline" className="text-green-600">
                              <UserCheck className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>
                  All services offered and needed on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {servicesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading services...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services?.map((service: any) => (
                      <div
                        key={service.id}
                        className="p-4 border rounded-lg"
                        data-testid={`service-item-${service.id}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              by {service.user?.fullName}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={service.serviceType === 'offer' ? 'default' : 'secondary'}>
                              {service.serviceType}
                            </Badge>
                            <Badge variant="outline">{service.category}</Badge>
                            {!service.isActive && (
                              <Badge variant="destructive">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Inactive
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {service.description}
                        </p>
                        {service.estimatedValue && (
                          <p className="text-sm font-medium text-green-600">
                            Estimated Value: ${service.estimatedValue}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Swap Proposals</CardTitle>
                <CardDescription>
                  All swap proposals and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {proposalsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading proposals...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {proposals?.map((proposal: any) => (
                      <div
                        key={proposal.id}
                        className="p-4 border rounded-lg"
                        data-testid={`proposal-item-${proposal.id}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Swap Proposal
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Created: {new Date(proposal.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              proposal.status === 'accepted' ? 'default' :
                              proposal.status === 'pending' ? 'secondary' :
                              proposal.status === 'completed' ? 'outline' : 'destructive'
                            }
                          >
                            {proposal.status}
                          </Badge>
                        </div>
                        {proposal.message && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            "{proposal.message}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}