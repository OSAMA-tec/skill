import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowRightLeft, Calendar, Clock, FileText, MessageSquare, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { useState } from "react";
import { useParams } from "wouter";

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "in_progress" | "completed";
}

interface Deliverable {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  submittedBy: string;
  submittedAt: Date;
  status: "pending" | "submitted" | "approved" | "revision_needed";
}

const mockProject = {
  id: "project-1",
  status: "active",
  progress: 65,
  deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  proposal: {
    proposer: {
      id: "user-1",
      fullName: "Sarah Chen",
      title: "UX/UI Designer",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face"
    },
    recipient: {
      id: "user-2", 
      fullName: "Marcus Rodriguez",
      title: "React Developer",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    proposerService: {
      title: "Complete mobile app UI design with prototyping",
      category: "Graphic Design"
    },
    recipientService: {
      title: "Frontend development for React web app",
      category: "Web Development"
    }
  }
};

const mockMilestones: Milestone[] = [
  {
    id: "m-1",
    title: "Initial wireframes and user flow",
    description: "Create low-fidelity wireframes and define user journey",
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "m-2", 
    title: "High-fidelity mockups",
    description: "Design pixel-perfect screens with interactions",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: "in_progress"
  },
  {
    id: "m-3",
    title: "Interactive prototype",
    description: "Build clickable prototype for user testing",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "pending"
  },
  {
    id: "m-4",
    title: "React component implementation",
    description: "Convert designs to functional React components",
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    status: "pending"
  }
];

const mockDeliverables: Deliverable[] = [
  {
    id: "d-1",
    title: "Wireframe Document",
    description: "Initial wireframes and user flow diagrams",
    fileUrl: "wireframes.pdf",
    submittedBy: "user-1",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "approved"
  },
  {
    id: "d-2",
    title: "Design System",
    description: "Component library and style guide",
    fileUrl: "design-system.figma",
    submittedBy: "user-1", 
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "submitted"
  }
];

export default function ProjectDetail() {
  const { id } = useParams();
  const [newUpdate, setNewUpdate] = useState("");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400 bg-green-400/10";
      case "in_progress": return "text-primary bg-primary/10";
      case "pending": return "text-muted-foreground bg-muted";
      case "approved": return "text-green-400 bg-green-400/10";
      case "submitted": return "text-blue-400 bg-blue-400/10";
      case "revision_needed": return "text-yellow-400 bg-yellow-400/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "in_progress": return <Clock className="w-4 h-4" />;
      case "revision_needed": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2" data-testid="text-project-title">
                    Mobile App Design ↔ React Development
                  </h1>
                  <p className="text-muted-foreground">
                    Project started {mockProject.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getStatusColor(mockProject.status)}>
                  {mockProject.status}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Participants */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={mockProject.proposal.proposer.profileImage} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{mockProject.proposal.proposer.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{mockProject.proposal.proposer.title}</p>
                    <p className="text-xs text-green-400">Offers: {mockProject.proposal.proposerService.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowRightLeft className="text-primary w-4 h-4" />
                  </div>
                  <Avatar>
                    <AvatarImage src={mockProject.proposal.recipient.profileImage} />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{mockProject.proposal.recipient.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{mockProject.proposal.recipient.title}</p>
                    <p className="text-xs text-green-400">Offers: {mockProject.proposal.recipientService.title}</p>
                  </div>
                </div>
              </div>
              
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{mockProject.progress}%</span>
                </div>
                <Progress value={mockProject.progress} className="h-3" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Started {mockProject.createdAt.toLocaleDateString()}</span>
                  <span>Due {mockProject.deadline.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Content */}
        <Tabs defaultValue="milestones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="milestones" data-testid="tab-milestones">Milestones</TabsTrigger>
            <TabsTrigger value="deliverables" data-testid="tab-deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-project-messages">Messages</TabsTrigger>
            <TabsTrigger value="details" data-testid="tab-project-details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="space-y-6">
            <div className="space-y-4">
              {mockMilestones.map((milestone, index) => (
                <Card key={milestone.id} data-testid={`milestone-${milestone.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getStatusColor(milestone.status)}`}>
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.replace('_', ' ')}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Due: {milestone.dueDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deliverables" className="space-y-6">
            <div className="space-y-4">
              {mockDeliverables.map((deliverable) => (
                <Card key={deliverable.id} data-testid={`deliverable-${deliverable.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{deliverable.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{deliverable.description}</p>
                          {deliverable.fileUrl && (
                            <Button variant="outline" size="sm" data-testid={`button-download-${deliverable.id}`}>
                              <Upload className="w-4 h-4 mr-2" />
                              {deliverable.fileUrl}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(deliverable.status)}>
                          {deliverable.status.replace('_', ' ')}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Submitted {deliverable.submittedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {deliverable.status === "submitted" && (
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button size="sm" data-testid={`button-approve-${deliverable.id}`}>
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" data-testid={`button-request-revision-${deliverable.id}`}>
                          Request Revision
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              <Card>
                <CardHeader>
                  <CardTitle>Submit New Deliverable</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Deliverable title..." data-testid="input-deliverable-title" />
                  <Textarea placeholder="Description..." data-testid="textarea-deliverable-description" />
                  <Button data-testid="button-upload-deliverable">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockProject.proposal.proposer.profileImage} />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-sm">{mockProject.proposal.proposer.fullName}</h5>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm">The wireframes are ready for review. I've included user flow diagrams and interaction details.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockProject.proposal.recipient.profileImage} />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-sm">{mockProject.proposal.recipient.fullName}</h5>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="text-sm">Perfect! I love the clean design approach. Starting on the React components now.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Add a project update..."
                    value={newUpdate}
                    onChange={(e) => setNewUpdate(e.target.value)}
                    className="flex-1"
                    data-testid="textarea-project-update"
                  />
                  <Button 
                    onClick={() => setNewUpdate("")}
                    disabled={!newUpdate.trim()}
                    data-testid="button-post-update"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Started:</span>
                        <span>{mockProject.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span>{mockProject.deadline.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Days Remaining:</span>
                        <span className="text-primary">
                          {Math.ceil((mockProject.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Swap Agreement</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-green-400 font-medium">Sarah provides:</span>
                        <p className="text-muted-foreground">{mockProject.proposal.proposerService.title}</p>
                      </div>
                      <div>
                        <span className="text-green-400 font-medium">Marcus provides:</span>
                        <p className="text-muted-foreground">{mockProject.proposal.recipientService.title}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" data-testid="button-send-message">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="button-schedule-call">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="button-upload-file">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                  <Button variant="destructive" className="w-full justify-start" data-testid="button-report-issue">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}