
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users,
  MessageSquare,
  TrendingUp,
  Heart,
  Reply,
  Share,
  Bookmark,
  Search,
  Filter,
  Plus,
  Star,
  Calendar,
  MapPin,
  Trophy,
  UserPlus,
  Bell
} from "lucide-react";
import { useState } from "react";

export default function Community() {
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const forumCategories = [
    { id: "general", name: "General Discussion", posts: 234, icon: "💬" },
    { id: "design", name: "Design Showcase", posts: 189, icon: "🎨" },
    { id: "development", name: "Dev Talk", posts: 156, icon: "💻" },
    { id: "business", name: "Business Tips", posts: 98, icon: "💼" },
    { id: "success", name: "Success Stories", posts: 67, icon: "🏆" }
  ];

  const discussionPosts = [
    {
      id: "1",
      title: "Best practices for pricing design services in skill swaps?",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
        badge: "Design Expert",
        reputation: 1247
      },
      category: "design",
      content: "I'm new to skill swapping and wondering how to fairly price my design services when exchanging with developers. Any tips?",
      timestamp: "2024-01-15T10:30:00Z",
      replies: 24,
      likes: 56,
      tags: ["pricing", "design", "beginners"],
      trending: true
    },
    {
      id: "2", 
      title: "Successfully completed my first swap - React dev for UI design!",
      author: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        badge: "Developer",
        reputation: 892
      },
      category: "success",
      content: "Just finished an amazing collaboration where I built a React app in exchange for a complete UI/UX design. The process was smooth and both parties were super happy!",
      timestamp: "2024-01-14T16:45:00Z",
      replies: 18,
      likes: 43,
      tags: ["success-story", "react", "ui-design"],
      trending: false
    },
    {
      id: "3",
      title: "Tips for effective project communication during swaps",
      author: {
        name: "Emma Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        badge: "Community Moderator",
        reputation: 2156
      },
      category: "general",
      content: "Communication is key to successful skill swaps. Here are some strategies I've learned...",
      timestamp: "2024-01-14T09:15:00Z",
      replies: 31,
      likes: 78,
      tags: ["communication", "tips", "project-management"],
      trending: true
    }
  ];

  const events = [
    {
      id: "1",
      title: "Virtual Networking Mixer",
      date: "2024-01-20",
      time: "7:00 PM EST",
      attendees: 67,
      maxAttendees: 100,
      location: "Online",
      organizer: "SkillSwap Team",
      description: "Meet other professionals and discover collaboration opportunities"
    },
    {
      id: "2",
      title: "Design & Development Meetup",
      date: "2024-01-25",
      time: "6:30 PM EST",
      attendees: 34,
      maxAttendees: 50,
      location: "San Francisco, CA",
      organizer: "SF Design Community",
      description: "In-person meetup for designers and developers"
    }
  ];

  const topContributors = [
    {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      posts: 156,
      reputation: 3421,
      badge: "Expert Contributor"
    },
    {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      posts: 134,
      reputation: 2987,
      badge: "Design Guru"
    },
    {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      posts: 98,
      reputation: 2156,
      badge: "Code Wizard"
    }
  ];

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground mt-2">
              Connect, learn, and grow with fellow professionals
            </p>
          </div>
          
          <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Post title" />
                <Textarea placeholder="What would you like to share with the community?" rows={6} />
                <div className="flex gap-2">
                  <Input placeholder="Add tags (comma separated)" className="flex-1" />
                  <Button variant="outline">Add Image</Button>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setNewPostOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Publish Post</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="mt-6">
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {forumCategories.map((category) => (
                      <Button key={category.id} variant="outline" size="sm">
                        {category.icon} {category.name} ({category.posts})
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {discussionPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold hover:text-blue-600 cursor-pointer">
                                    {post.title}
                                  </h3>
                                  {post.trending && (
                                    <Badge variant="destructive" className="text-xs">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{post.author.name}</span>
                                  <Badge variant="outline" className="text-xs">{post.author.badge}</Badge>
                                  <span>•</span>
                                  <span>{formatTimeAgo(post.timestamp)}</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground">{post.content}</p>

                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <button className="flex items-center gap-1 hover:text-red-500">
                                  <Heart className="w-4 h-4" />
                                  {post.likes}
                                </button>
                                <button className="flex items-center gap-1 hover:text-blue-500">
                                  <MessageSquare className="w-4 h-4" />
                                  {post.replies}
                                </button>
                                <button className="flex items-center gap-1 hover:text-green-500">
                                  <Share className="w-4 h-4" />
                                  Share
                                </button>
                                <button className="flex items-center gap-1 hover:text-yellow-500">
                                  <Bookmark className="w-4 h-4" />
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <div className="space-y-6">
                  {events.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                          <Button size="sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            Join Event
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span>{event.attendees}/{event.maxAttendees} attending</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>Organized by {event.organizer}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="members" className="mt-6">
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topContributors.map((member, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <Avatar className="w-16 h-16 mx-auto mb-4">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <h3 className="font-semibold">{member.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">{member.badge}</Badge>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Posts:</span>
                            <p className="font-medium">{member.posts}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Reputation:</span>
                            <p className="font-medium">{member.reputation.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <UserPlus className="w-4 h-4 mr-1" />
                            Connect
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Forum Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {forumCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{category.name}</p>
                        <p className="text-xs text-muted-foreground">{category.posts} posts</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topContributors.slice(0, 3).map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.reputation.toLocaleString()} reputation</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.slice(0, 2).map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border">
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Learn More
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Members:</span>
                  <span className="font-medium">12,547</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Today:</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posts This Week:</span>
                  <span className="font-medium">456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Successful Swaps:</span>
                  <span className="font-medium">8,921</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
