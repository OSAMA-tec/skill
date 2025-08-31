import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRightLeft, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    status: string;
    progress: number;
    deadline?: string;
    proposal?: {
      proposer?: {
        fullName: string;
        profileImage?: string;
      };
      recipient?: {
        fullName: string;
        profileImage?: string;
      };
      proposerService?: {
        title: string;
      };
      recipientService?: {
        title: string;
      };
    };
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { proposal } = project;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary";
      case "completed":
        return "bg-green-500/10 text-green-400";
      case "cancelled":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card data-testid={`card-project-${project.id}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={proposal?.proposer?.profileImage || "https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face"}
              alt={proposal?.proposer?.fullName || "Partner"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h5 className="font-medium text-sm">{proposal?.proposer?.fullName || "Partner"}</h5>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="truncate max-w-20">{proposal?.proposerService?.title}</span>
                <ArrowRightLeft className="w-3 h-3 mx-1" />
                <span className="truncate max-w-20">{proposal?.recipientService?.title}</span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between text-xs">
          {project.deadline && (
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              Due: {new Date(project.deadline).toLocaleDateString()}
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80 h-auto p-0 text-xs"
            data-testid={`button-view-project-${project.id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
