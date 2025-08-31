import Navigation from "@/components/navigation";
import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertServiceSchema } from "@shared/schema";
import { z } from "zod";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useParams, useLocation } from "wouter";
import { X, Plus } from "lucide-react";

const categories = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing", 
  "Content Writing",
  "Video Production",
  "Business Consulting",
  "Mobile Development",
  "Photography",
  "Copywriting",
  "SEO",
  "Social Media",
  "Data Analysis"
];

const serviceFormSchema = insertServiceSchema.extend({
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  portfolioFiles: z.array(z.string()).optional()
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

const MOCK_USER_ID = "user-1"; // In a real app, this would come from authentication

export default function ServiceForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  
  const [skillInput, setSkillInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Fetch existing service if editing
  const { data: existingService, isLoading } = useQuery({
    queryKey: ["/api/services", id],
    enabled: isEditing
  });

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      userId: MOCK_USER_ID,
      title: "",
      description: "",
      category: "",
      serviceType: "offer",
      estimatedValue: undefined,
      estimatedDuration: "",
      skills: [],
      portfolioFiles: []
    }
  });

  // Update form when existing service loads
  if (existingService && !form.getValues().title) {
    form.reset({
      ...existingService,
      estimatedValue: existingService.estimatedValue || undefined
    });
    setUploadedFiles(existingService.portfolioFiles || []);
  }

  const createMutation = useMutation({
    mutationFn: (data: ServiceFormData) => apiRequest("POST", "/api/services", data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Service created successfully!"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create service",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<ServiceFormData>) => apiRequest("PUT", `/api/services/${id}`, data),
    onSuccess: () => {
      toast({
        title: "Success", 
        description: "Service updated successfully!"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update service",
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: ServiceFormData) => {
    const formData = {
      ...data,
      portfolioFiles: uploadedFiles,
      estimatedValue: data.estimatedValue ? parseInt(data.estimatedValue.toString()) : undefined
    };

    if (isEditing) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !form.getValues().skills.includes(skillInput.trim())) {
      const currentSkills = form.getValues().skills;
      form.setValue("skills", [...currentSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues().skills;
    form.setValue("skills", currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  if (isEditing && isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 bg-card rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              {isEditing ? "Edit Service" : "Create New Service"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isEditing ? "Update your service details" : "List a service you offer or need"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Service Type */}
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service-type">
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="offer">I'm offering this service</SelectItem>
                            <SelectItem value="need">I need this service</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose whether you're offering or seeking this service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Complete mobile app UI design"
                            {...field}
                            data-testid="input-service-title"
                          />
                        </FormControl>
                        <FormDescription>
                          A clear, concise title that describes your service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your service in detail..."
                            className="min-h-32"
                            {...field}
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormDescription>
                          Provide detailed information about what you offer or need
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Skills */}
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills & Technologies</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add a skill..."
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                data-testid="input-skill"
                              />
                              <Button
                                type="button"
                                onClick={addSkill}
                                variant="outline"
                                size="sm"
                                data-testid="button-add-skill"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            {field.value.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {field.value.map((skill, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="secondary" 
                                    className="flex items-center gap-1"
                                    data-testid={`badge-skill-${index}`}
                                  >
                                    {skill}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-auto p-0 hover:bg-transparent"
                                      onClick={() => removeSkill(skill)}
                                      data-testid={`button-remove-skill-${index}`}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Add relevant skills and technologies (press Enter to add)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Estimated Value */}
                  <FormField
                    control={form.control}
                    name="estimatedValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Value (USD)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="1500"
                            {...field}
                            value={field.value || ""}
                            data-testid="input-estimated-value"
                          />
                        </FormControl>
                        <FormDescription>
                          Optional: Estimated value in USD for this service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Estimated Duration */}
                  <FormField
                    control={form.control}
                    name="estimatedDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Duration</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 2-3 weeks"
                            {...field}
                            data-testid="input-estimated-duration"
                          />
                        </FormControl>
                        <FormDescription>
                          Optional: How long will this service take to complete?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Portfolio Files */}
                  <div className="space-y-3">
                    <FormLabel>Portfolio Files</FormLabel>
                    <FileUpload
                      onFilesUploaded={setUploadedFiles}
                      existingFiles={uploadedFiles}
                      accept="image/*,.pdf,.doc,.docx"
                      maxFiles={5}
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload portfolio samples, examples, or relevant documents (max 5 files)
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      className="flex-1"
                      data-testid="button-submit-service"
                    >
                      {createMutation.isPending || updateMutation.isPending
                        ? "Saving..."
                        : isEditing
                        ? "Update Service"
                        : "Create Service"
                      }
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/dashboard")}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
