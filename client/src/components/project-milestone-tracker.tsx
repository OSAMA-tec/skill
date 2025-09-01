import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  CheckCircle, 
  Clock, 
  Calendar,
  FileText,
  Edit,
  Trash2
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "pending" | "in_progress" | "completed";
  order: number;
}

interface Deliverable {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  status: "pending" | "submitted" | "approved" | "revision_requested";
  submittedAt?: string;
}

interface ProjectMilestoneTrackerProps {
  projectId: string;
  milestones: Milestone[];
  deliverables: Deliverable[];
  currentUserId: string;
  isEditable?: boolean;
}

export default function ProjectMilestoneTracker({
  projectId,
  milestones,
  deliverables,
  currentUserId,
  isEditable = false
}: ProjectMilestoneTrackerProps) {
  const [newMilestone, setNewMilestone] = useState({ title: "", description: "", dueDate: "" });
  const [newDeliverable, setNewDeliverable] = useState({ title: "", description: "" });
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showAddDeliverable, setShowAddDeliverable] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProjectMutation = useMutation({
    mutationFn: async (updates: any) => {
      return await apiRequest(`/api/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId] });
      toast({
        title: "Project Updated",
        description: "Changes saved successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const addMilestone = () => {
    if (!newMilestone.title.trim()) return;
    
    const updatedMilestones = [...milestones, {
      id: `milestone-${Date.now()}`,
      title: newMilestone.title,
      description: newMilestone.description,
      dueDate: newMilestone.dueDate || undefined,
      status: "pending" as const,
      order: milestones.length
    }];

    updateProjectMutation.mutate({ milestones: updatedMilestones });
    setNewMilestone({ title: "", description: "", dueDate: "" });
    setShowAddMilestone(false);
  };

  const addDeliverable = () => {
    if (!newDeliverable.title.trim()) return;
    
    const updatedDeliverables = [...deliverables, {
      id: `deliverable-${Date.now()}`,
      title: newDeliverable.title,
      description: newDeliverable.description,
      status: "pending" as const
    }];

    updateProjectMutation.mutate({ deliverables: updatedDeliverables });
    setNewDeliverable({ title: "", description: "" });
    setShowAddDeliverable(false);
  };

  const updateMilestoneStatus = (milestoneId: string, status: Milestone["status"]) => {
    const updatedMilestones = milestones.map(m => 
      m.id === milestoneId ? { ...m, status } : m
    );
    updateProjectMutation.mutate({ milestones: updatedMilestones });
  };

  const updateDeliverableStatus = (deliverableId: string, status: Deliverable["status"]) => {
    const updatedDeliverables = deliverables.map(d => 
      d.id === deliverableId ? { ...d, status } : d
    );
    updateProjectMutation.mutate({ deliverables: updatedDeliverables });
  };

  const completedMilestones = milestones.filter(m => m.status === "completed").length;
  const progressPercentage = milestones.length > 0 ? (completedMilestones / milestones.length) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in_progress": return "bg-blue-500";
      case "approved": return "bg-green-500";
      case "submitted": return "bg-yellow-500";
      case "revision_requested": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Project Progress</span>
            <Badge variant="outline">
              {completedMilestones} / {milestones.length} milestones
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Milestones
            </span>
            {isEditable && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddMilestone(true)}
                data-testid="button-add-milestone"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddMilestone && (
            <Card className="border-dashed">
              <CardContent className="p-4 space-y-3">
                <Input
                  placeholder="Milestone title..."
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                  data-testid="input-milestone-title"
                />
                <Textarea
                  placeholder="Description (optional)..."
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
                <Input
                  type="date"
                  value={newMilestone.dueDate}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button onClick={addMilestone} size="sm" data-testid="button-save-milestone">
                    Save Milestone
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddMilestone(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {milestones.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No milestones set yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <Card
                  key={milestone.id}
                  className={`border-l-4 ${getStatusColor(milestone.status)}`}
                  data-testid={`milestone-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {milestone.status.replace("_", " ")}
                          </Badge>
                        </div>
                        {milestone.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {milestone.description}
                          </p>
                        )}
                        {milestone.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            Due: {formatDate(milestone.dueDate)}
                          </div>
                        )}
                      </div>
                      
                      {isEditable && milestone.status !== "completed" && (
                        <div className="flex gap-1">
                          {milestone.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateMilestoneStatus(milestone.id, "in_progress")}
                              data-testid={`button-start-milestone-${index}`}
                            >
                              Start
                            </Button>
                          )}
                          {milestone.status === "in_progress" && (
                            <Button
                              size="sm"
                              onClick={() => updateMilestoneStatus(milestone.id, "completed")}
                              data-testid={`button-complete-milestone-${index}`}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deliverables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Deliverables
            </span>
            {isEditable && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddDeliverable(true)}
                data-testid="button-add-deliverable"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Deliverable
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddDeliverable && (
            <Card className="border-dashed">
              <CardContent className="p-4 space-y-3">
                <Input
                  placeholder="Deliverable title..."
                  value={newDeliverable.title}
                  onChange={(e) => setNewDeliverable(prev => ({ ...prev, title: e.target.value }))}
                  data-testid="input-deliverable-title"
                />
                <Textarea
                  placeholder="Description (optional)..."
                  value={newDeliverable.description}
                  onChange={(e) => setNewDeliverable(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button onClick={addDeliverable} size="sm" data-testid="button-save-deliverable">
                    Save Deliverable
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddDeliverable(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {deliverables.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No deliverables defined yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {deliverables.map((deliverable, index) => (
                <Card
                  key={deliverable.id}
                  className={`border-l-4 ${getStatusColor(deliverable.status)}`}
                  data-testid={`deliverable-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{deliverable.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {deliverable.status.replace("_", " ")}
                          </Badge>
                        </div>
                        {deliverable.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {deliverable.description}
                          </p>
                        )}
                        {deliverable.submittedAt && (
                          <div className="text-xs text-muted-foreground">
                            Submitted: {formatDate(deliverable.submittedAt)}
                          </div>
                        )}
                      </div>
                      
                      {isEditable && (
                        <div className="flex gap-1">
                          {deliverable.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateDeliverableStatus(deliverable.id, "submitted")}
                              data-testid={`button-submit-deliverable-${index}`}
                            >
                              Submit
                            </Button>
                          )}
                          {deliverable.status === "submitted" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateDeliverableStatus(deliverable.id, "approved")}
                                data-testid={`button-approve-deliverable-${index}`}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateDeliverableStatus(deliverable.id, "revision_requested")}
                              >
                                Request Revision
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}