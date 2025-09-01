
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Check, 
  Clock, 
  MessageSquare, 
  UserPlus, 
  Star,
  AlertCircle,
  Calendar,
  DollarSign,
  Settings
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] = useState({
    newMatches: true,
    projectUpdates: true,
    messages: true,
    reviews: false,
    marketing: false
  });

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: true
  });

  const mockNotifications = [
    {
      id: "1",
      type: "match",
      title: "New Skill Match Found!",
      message: "John Doe's web development skills match your UI/UX design needs.",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      icon: UserPlus,
      color: "bg-blue-500/10 text-blue-400"
    },
    {
      id: "2",
      type: "message",
      title: "New Message from Sarah",
      message: "I'm interested in your graphic design services for my startup project.",
      timestamp: "2024-01-15T09:15:00Z",
      read: false,
      icon: MessageSquare,
      color: "bg-green-500/10 text-green-400"
    },
    {
      id: "3",
      type: "project",
      title: "Project Milestone Completed",
      message: "Website wireframes have been approved. Ready for next phase.",
      timestamp: "2024-01-14T16:45:00Z",
      read: true,
      icon: Check,
      color: "bg-purple-500/10 text-purple-400"
    },
    {
      id: "4",
      type: "review",
      title: "New Review Received",
      message: "Mike Johnson left you a 5-star review for the logo design project.",
      timestamp: "2024-01-14T14:20:00Z",
      read: true,
      icon: Star,
      color: "bg-yellow-500/10 text-yellow-400"
    },
    {
      id: "5",
      type: "system",
      title: "Profile Verification Complete",
      message: "Your professional credentials have been verified successfully.",
      timestamp: "2024-01-13T11:00:00Z",
      read: true,
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-400"
    }
  ];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const markAllAsRead = () => {
    // Implementation for marking all as read
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-2">
              Stay updated with your latest activities and matches
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              Mark all as read
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  All ({mockNotifications.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {mockNotifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg ${notification.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{notification.title}</h3>
                                {!notification.read && (
                                  <Badge variant="secondary" className="text-xs">New</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTime(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="mt-6">
                <div className="space-y-4">
                  {mockNotifications.filter(n => !n.read).map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <Card key={notification.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg ${notification.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{notification.title}</h3>
                              <p className="text-muted-foreground text-sm">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="matches" className="mt-6">
                <div className="space-y-4">
                  {mockNotifications.filter(n => n.type === 'match').map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <Card key={notification.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg ${notification.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{notification.title}</h3>
                              <p className="text-muted-foreground text-sm">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <div className="space-y-4">
                  {mockNotifications.filter(n => n.type === 'project').map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <Card key={notification.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg ${notification.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{notification.title}</h3>
                              <p className="text-muted-foreground text-sm">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">New Matches</label>
                      <p className="text-xs text-muted-foreground">Get notified about potential skill matches</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.newMatches}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, newMatches: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Project Updates</label>
                      <p className="text-xs text-muted-foreground">Updates on your active projects</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.projectUpdates}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, projectUpdates: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Messages</label>
                      <p className="text-xs text-muted-foreground">New messages from other users</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.messages}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, messages: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Reviews</label>
                      <p className="text-xs text-muted-foreground">Reviews and ratings notifications</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.reviews}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, reviews: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Marketing</label>
                      <p className="text-xs text-muted-foreground">Platform updates and tips</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.marketing}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, marketing: checked }))
                      }
                    />
                  </div>
                </div>

                <Button className="w-full">Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
