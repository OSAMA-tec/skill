
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Plus,
  Calendar,
  Clock,
  User,
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  Star,
  Upload,
  Download,
  Eye
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("active");
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  const mockProjects = [
    {
      id: "1",
      title: "E-commerce Website Redesign",
      description: "Complete redesign of online store with modern UI/UX",
      partner: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        rating: 4.9
      },
      status: "in-progress",
      progress: 65,
      dueDate: "2024-02-15",
      createdDate: "2024-01-10",
      myService: "UI/UX Design Package",
      partnerService: "Full-Stack Development",
      milestones: [
        { id: "1", title: "Wireframes", completed: true, dueDate: "2024-01-15" },
        { id: "2", title: "Visual Design", completed: true, dueDate: "2024-01-25" },
        { id: "3", title: "Prototype", completed: false, dueDate: "2024-02-05" },
        { id: "4", title: "Final Delivery", completed: false, dueDate: "2024-02-15" }
      ],
      messages: 12,
      files: 8,
      lastActivity: "2024-01-14T10:30:00Z"
    },
    {
      id: "2",
      title: "Brand Identity Package",
      description: "Logo design, brand guidelines, and marketing materials",
      partner: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        rating: 4.7
      },
      status: "pending-approval",
      progress: 90,
      dueDate: "2024-01-20",
      createdDate: "2024-01-05",
      myService: "Brand Design",
      partnerService: "Content Writing",
      milestones: [
        { id: "1", title: "Logo Concepts", completed: true, dueDate: "2024-01-08" },
        { id: "2", title: "Brand Guidelines", completed: true, dueDate: "2024-01-12" },
        { id: "3", title: "Marketing Materials", completed: true, dueDate: "2024-01-18" },
        { id: "4", title: "Final Review", completed: false, dueDate: "2024-01-20" }
      ],
      messages: 8,
      files: 15,
      lastActivity: "2024-01-13T15:45:00Z"
    },
    {
      id: "3",
      title: "Mobile App UI Design",
      description: "iOS and Android app interface design",
      partner: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        rating: 5.0
      },
      status: "completed",
      progress: 100,
      dueDate: "2024-01-10",
      createdDate: "2023-12-20",
      myService: "Mobile UI Design",
      partnerService: "Backend Development",
      milestones: [
        { id: "1", title: "User Flow", completed: true, dueDate: "2023-12-25" },
        { id: "2", title: "Wireframes", completed: true, dueDate: "2024-01-02" },
        { id: "3", title: "Visual Design", completed: true, dueDate: "2024-01-08" },
        { id: "4", title: "Handoff", completed: true, dueDate: "2024-01-10" }
      ],
      messages: 23,
      files: 12,
      lastActivity: "2024-01-10T18:20:00Z",
      rating: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-400";
      case "in-progress": return "bg-blue-500/10 text-blue-400";
      case "pending-approval": return "bg-yellow-500/10 text-yellow-400";
      case "paused": return "bg-gray-500/10 text-gray-400";
      default: return "bg-gray-500/10 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "in-progress": return PlayCircle;
      case "pending-approval": return AlertCircle;
      case "paused": return PauseCircle;
      default: return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const activeProjects = mockProjects.filter(p => p.status === "in-progress" || p.status === "pending-approval");
  const completedProjects = mockProjects.filter(p => p.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your skill swap projects
            </p>
          </div>
          
          <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Project title" />
                <Textarea placeholder="Project description" />
                <Input placeholder="Partner email or username" />
                <Button className="w-full">Create Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">
              Active ({activeProjects.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedProjects.length})
            </TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid gap-6">
              {activeProjects.map((project) => {
                const StatusIcon = getStatusIcon(project.status);
                return (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${getStatusColor(project.status)} flex items-center justify-center`}>
                            <StatusIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={project.partner.avatar} 
                              alt={project.partner.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">{project.partner.name}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-muted-foreground">{project.partner.rating}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Your Service:</span>
                              <p className="font-medium">{project.myService}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Partner Service:</span>
                              <p className="font-medium">{project.partnerService}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Due Date:</span>
                              <p className="font-medium">{formatDate(project.dueDate)}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Started:</span>
                              <p className="font-medium">{formatDate(project.createdDate)}</p>
                            </div>
                          </div>

                          <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4 text-muted-foreground" />
                              <span>{project.messages} messages</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span>{project.files} files</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Upload className="w-4 h-4 mr-1" />
                              Files
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Milestones</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {project.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-lg border">
                              <CheckCircle className={`w-5 h-5 ${milestone.completed ? 'text-green-500' : 'text-gray-300'}`} />
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                  {milestone.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Due: {formatDate(milestone.dueDate)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid gap-6">
              {completedProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="bg-green-500/10 text-green-400">
                          Completed
                        </Badge>
                        {project.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < project.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Partner:</span>
                        <p className="font-medium">{project.partner.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <p className="font-medium">{formatDate(project.dueDate)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Services Exchanged:</span>
                        <p className="font-medium">{project.myService} ↔ {project.partnerService}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download Files
                      </Button>
                      <Button size="sm" variant="outline">
                        <Star className="w-4 h-4 mr-1" />
                        Leave Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Website Development Swap",
                  description: "Template for exchanging web development services",
                  icon: "🌐",
                  milestones: ["Planning", "Development", "Testing", "Launch"]
                },
                {
                  name: "Design for Marketing Swap",
                  description: "Exchange design work for marketing services",
                  icon: "🎨",
                  milestones: ["Brief", "Concepts", "Revisions", "Final Assets"]
                },
                {
                  name: "Content Creation Swap",
                  description: "Template for content and writing exchanges",
                  icon: "✍️",
                  milestones: ["Strategy", "Drafts", "Reviews", "Publication"]
                }
              ].map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{template.icon}</div>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <div className="space-y-2 mb-4">
                      {template.milestones.map((milestone, i) => (
                        <div key={i} className="text-xs text-muted-foreground">
                          {i + 1}. {milestone}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjects.filter(p => p.status !== 'completed').map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-4 rounded-lg border">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Due {formatDate(project.dueDate)} • {project.partner.name}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {Math.ceil((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
