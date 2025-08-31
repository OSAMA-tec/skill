import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Calendar, MessageSquare, DollarSign, Clock, User } from "lucide-react";
import { useState } from "react";
import { useParams } from "wouter";

const mockProposal = {
  id: "proposal-1",
  status: "pending",
  message: "Hi! I saw your React development service and think we'd be a perfect match. I can design a complete mobile app UI in exchange for frontend development work on my web application. Let me know if you're interested!",
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  proposer: {
    id: "user-1",
    fullName: "Sarah Chen",
    title: "UX/UI Designer",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 23,
    completedSwaps: 12,
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"]
  },
  recipient: {
    id: "user-2",
    fullName: "Marcus Rodriguez", 
    title: "React Developer",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 31,
    completedSwaps: 18,
    skills: ["React", "TypeScript", "Node.js", "MongoDB"]
  },
  proposerService: {
    id: "service-1",
    title: "Complete mobile app UI design with prototyping",
    description: "I'll create a comprehensive mobile app design including user research, wireframes, high-fidelity mockups, and interactive prototypes. The design will be optimized for both iOS and Android platforms.",
    category: "Graphic Design",
    estimatedValue: 1200,
    estimatedDuration: "2-3 weeks",
    skills: ["UI/UX Design", "Figma", "Prototyping"],
    portfolioFiles: ["portfolio1.pdf", "portfolio2.png"]
  },
  recipientService: {
    id: "service-2", 
    title: "Frontend development for React web app",
    description: "I'll build a responsive React web application with modern practices including TypeScript, state management, and optimized performance. Includes deployment setup and documentation.",
    category: "Web Development",
    estimatedValue: 1200,
    estimatedDuration: "3-4 weeks", 
    skills: ["React", "TypeScript", "Tailwind CSS"],
    portfolioFiles: ["github-portfolio.md"]
  }
};

export default function ProposalDetail() {
  const { id } = useParams();
  const [responseMessage, setResponseMessage] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  
  const isRecipient = true; // In real app, check if current user is recipient
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-400/10 text-yellow-400";
      case "accepted": return "bg-green-400/10 text-green-400";
      case "rejected": return "bg-red-400/10 text-red-400";
      case "completed": return "bg-blue-400/10 text-blue-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAccept = () => {
    console.log("Accepting proposal");
    // In real app, make API call to accept proposal
  };

  const handleReject = () => {
    console.log("Rejecting proposal");
    // In real app, make API call to reject proposal
  };

  const handleSendResponse = () => {
    if (responseMessage.trim()) {
      console.log("Sending response:", responseMessage);
      setResponseMessage("");
      setIsResponding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Swap Proposal</h1>
            <p className="text-xl text-muted-foreground">
              Review and respond to this skill exchange proposal
            </p>
          </div>

          {/* Proposal Status */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Proposal Status</h2>
                <Badge className={getStatusColor(mockProposal.status)} data-testid="badge-proposal-status">
                  {mockProposal.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Received {mockProposal.createdAt.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  From {mockProposal.proposer.fullName}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swap Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Proposed Skill Exchange</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Proposer Side */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mockProposal.proposer.profileImage} />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold" data-testid="text-proposer-name">
                        {mockProposal.proposer.fullName}
                      </h3>
                      <p className="text-muted-foreground">{mockProposal.proposer.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">★</span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {mockProposal.proposer.rating} ({mockProposal.proposer.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Offers to provide:</h4>
                    <Card>
                      <CardContent className="p-4">
                        <h5 className="font-semibold mb-2">{mockProposal.proposerService.title}</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          {mockProposal.proposerService.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4" />
                            <span>Estimated value: ${mockProposal.proposerService.estimatedValue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Duration: {mockProposal.proposerService.estimatedDuration}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {mockProposal.proposerService.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Swap Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowRightLeft className="text-primary w-6 h-6" />
                  </div>
                </div>

                {/* Recipient Side (Your Service) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mockProposal.recipient.profileImage} />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold" data-testid="text-recipient-name">
                        {mockProposal.recipient.fullName}
                      </h3>
                      <p className="text-muted-foreground">{mockProposal.recipient.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">★</span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {mockProposal.recipient.rating} ({mockProposal.recipient.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Requesting in exchange:</h4>
                    <Card>
                      <CardContent className="p-4">
                        <h5 className="font-semibold mb-2">{mockProposal.recipientService.title}</h5>
                        <p className="text-sm text-muted-foreground mb-3">
                          {mockProposal.recipientService.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4" />
                            <span>Estimated value: ${mockProposal.recipientService.estimatedValue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Duration: {mockProposal.recipientService.estimatedDuration}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {mockProposal.recipientService.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposal Message */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Proposal Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                <Avatar>
                  <AvatarImage src={mockProposal.proposer.profileImage} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{mockProposal.proposer.fullName}</h4>
                    <span className="text-sm text-muted-foreground">
                      {mockProposal.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground" data-testid="text-proposal-message">
                    {mockProposal.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {mockProposal.status === "pending" && isRecipient && (
            <Card>
              <CardHeader>
                <CardTitle>Respond to Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isResponding ? (
                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1"
                      onClick={handleAccept}
                      data-testid="button-accept-proposal"
                    >
                      Accept Proposal
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={handleReject}
                      data-testid="button-reject-proposal"
                    >
                      Decline
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      onClick={() => setIsResponding(true)}
                      data-testid="button-send-counter"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Send a message to discuss the proposal..."
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="min-h-24"
                      data-testid="textarea-response-message"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSendResponse}
                        disabled={!responseMessage.trim()}
                        data-testid="button-send-response"
                      >
                        Send Message
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setIsResponding(false)}
                        data-testid="button-cancel-response"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Proposal Accepted */}
          {mockProposal.status === "accepted" && (
            <Card className="border-green-400/50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Proposal Accepted! 🎉
                </h3>
                <p className="text-muted-foreground mb-4">
                  A new project has been created. You can now start collaborating on your skill exchange.
                </p>
                <Button data-testid="button-view-project">
                  View Project
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Match Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Skill Compatibility</span>
                    <span className="text-sm font-semibold text-green-400">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Value Balance</span>
                    <span className="text-sm font-semibold text-green-400">Perfect Match</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Timeline Alignment</span>
                    <span className="text-sm font-semibold text-primary">Good</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Ratings</span>
                    <span className="text-sm font-semibold text-green-400">Both 4.8+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Always communicate through the SkillSwap platform</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Clearly define project scope and deliverables upfront</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Set realistic timelines and milestones</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Report any issues to our support team</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}