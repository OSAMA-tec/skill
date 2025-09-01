import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Navigation from "@/components/navigation";
import { FadeInUp, ScaleIn } from "@/components/enhanced-animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Star, Clock, MessageSquare, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

const MOCK_USER_ID = "user-1"; // In a real app, this would come from authentication

export default function SwapProposal() {
  const [, params] = useRoute("/swap-proposal/:serviceId");
  const [message, setMessage] = useState("");
  const [selectedUserService, setSelectedUserService] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: targetService, isLoading: serviceLoading } = useQuery({
    queryKey: ["/api/services", params?.serviceId],
    enabled: !!params?.serviceId
  });

  const { data: userServices = [], isLoading: userServicesLoading } = useQuery({
    queryKey: ["/api/services", { userId: MOCK_USER_ID }],
    enabled: true
  });

  const proposalMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest(`/api/swap-proposals`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Proposal Sent!",
        description: "Your swap proposal has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/swap-proposals"] });
      setMessage("");
      setSelectedUserService("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send proposal",
        variant: "destructive",
      });
    },
  });

  const handleSubmitProposal = () => {
    if (!selectedUserService) {
      toast({
        title: "Error",
        description: "Please select a service to offer in exchange",
        variant: "destructive",
      });
      return;
    }

    proposalMutation.mutate({
      proposerId: MOCK_USER_ID,
      recipientId: targetService?.userId,
      proposerServiceId: selectedUserService,
      recipientServiceId: params?.serviceId,
      message: message || null,
    });
  };

  const compatibleServices = userServices.filter((service: any) => 
    service.serviceType === "offer" && 
    service.isActive &&
    service.category !== targetService?.category // Different category for better value exchange
  );

  if (serviceLoading || userServicesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-muted rounded"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!targetService) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">Service not found</h1>
          <Link href="/browse">
            <Button className="mt-4">Back to Browse</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <FadeInUp>
          <div className="mb-6">
            <Link href="/browse">
              <Button variant="ghost" className="mb-4" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Propose a Swap</h1>
            <p className="text-muted-foreground">
              Send a swap proposal to exchange services with another professional
            </p>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Target Service */}
          <ScaleIn>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-green-500">What you'll receive</span>
                  <Badge variant="secondary">{targetService.serviceType}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={targetService.user?.profileImage} />
                    <AvatarFallback>
                      {targetService.user?.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold" data-testid="text-service-owner">
                      {targetService.user?.fullName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">
                        {targetService.user?.rating || 0} ({targetService.user?.reviewCount || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2" data-testid="text-service-title">
                    {targetService.title}
                  </h4>
                  <p className="text-muted-foreground mb-3" data-testid="text-service-description">
                    {targetService.description}
                  </p>
                  <Badge variant="outline">{targetService.category}</Badge>
                </div>

                {targetService.estimatedValue && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Estimated Value:</span>
                    <Badge variant="secondary">${targetService.estimatedValue}</Badge>
                  </div>
                )}

                {targetService.estimatedDuration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{targetService.estimatedDuration}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {targetService.skills?.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScaleIn>

          {/* Your Service Offer */}
          <ScaleIn delay={0.2}>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-blue-500">What you'll offer</span>
                  <ArrowRight className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {compatibleServices.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">You don't have any active services to offer</p>
                    <Link href="/service/new">
                      <Button data-testid="button-create-service">Create a Service</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select a service to offer in exchange:
                    </p>
                    <div className="space-y-3">
                      {compatibleServices.map((service: any) => (
                        <Card 
                          key={service.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedUserService === service.id 
                              ? "ring-2 ring-primary bg-primary/5" 
                              : "hover:shadow-md"
                          }`}
                          onClick={() => setSelectedUserService(service.id)}
                          data-testid={`card-service-${service.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{service.title}</h4>
                              {selectedUserService === service.id && (
                                <CheckCircle className="w-4 h-4 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {service.category}
                              </Badge>
                              {service.estimatedValue && (
                                <Badge variant="secondary" className="text-xs">
                                  ${service.estimatedValue}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ScaleIn>
        </div>

        {/* Proposal Message */}
        {compatibleServices.length > 0 && (
          <FadeInUp delay={0.4}>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Add a Message (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Introduce yourself and explain why this would be a great swap..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  data-testid="textarea-proposal-message"
                />
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedUserService ? "Ready to send proposal" : "Select a service to continue"}
                  </p>
                  <Button
                    onClick={handleSubmitProposal}
                    disabled={!selectedUserService || proposalMutation.isPending}
                    data-testid="button-send-proposal"
                  >
                    {proposalMutation.isPending ? "Sending..." : "Send Proposal"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeInUp>
        )}
      </div>
    </div>
  );
}