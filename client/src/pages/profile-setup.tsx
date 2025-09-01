import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import { FadeInUp, ScaleIn } from "@/components/enhanced-animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, User, Briefcase, Target } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const profileSchema = z.object({
  title: z.string().min(1, "Professional title is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  skills: z.array(z.string()).min(3, "Please add at least 3 skills"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const COMMON_SKILLS = [
  "Web Development", "Graphic Design", "Content Writing", "Digital Marketing",
  "Photography", "Video Editing", "UI/UX Design", "SEO", "Social Media",
  "Copywriting", "Logo Design", "WordPress", "React", "JavaScript",
  "Python", "Mobile App Development", "Data Analysis", "Translation",
  "Virtual Assistant", "Project Management"
];

const MOCK_USER_ID = "user-1"; // In a real app, this would come from authentication

export default function ProfileSetup() {
  const [, setLocation] = useLocation();
  const [skillInput, setSkillInput] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      title: "",
      bio: "",
      skills: [],
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      return await apiRequest(`/api/users/${MOCK_USER_ID}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated!",
        description: "Your professional profile has been set up successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const addSkill = (skill: string) => {
    const currentSkills = form.getValues("skills");
    if (skill && !currentSkills.includes(skill)) {
      form.setValue("skills", [...currentSkills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", currentSkills.filter(s => s !== skill));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      addSkill(skillInput.trim());
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const skills = form.watch("skills");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <FadeInUp>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              Help others understand your expertise and what you're looking for
            </p>
          </div>
        </FadeInUp>

        <ScaleIn>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Professional Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Full Stack Developer, Graphic Designer"
                            {...field}
                            data-testid="input-title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Professional Bio
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell others about your experience, specialties, and what makes you unique..."
                            rows={4}
                            {...field}
                            data-testid="textarea-bio"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                      <FormItem>
                        <FormLabel>Skills & Expertise</FormLabel>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a skill..."
                              value={skillInput}
                              onChange={(e) => setSkillInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddSkill();
                                }
                              }}
                              data-testid="input-skill"
                            />
                            <Button
                              type="button"
                              onClick={handleAddSkill}
                              data-testid="button-add-skill"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          {skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {skill}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSkill(skill)}
                                    className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                                    data-testid={`button-remove-skill-${index}`}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Popular skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {COMMON_SKILLS.filter(skill => !skills.includes(skill)).slice(0, 10).map((skill) => (
                                <Button
                                  key={skill}
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addSkill(skill)}
                                  data-testid={`button-add-common-skill-${skill.replace(/\s+/g, '-').toLowerCase()}`}
                                >
                                  {skill}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setLocation("/dashboard")}
                      className="flex-1"
                      data-testid="button-skip"
                    >
                      Skip for Now
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateProfileMutation.isPending}
                      className="flex-1"
                      data-testid="button-save-profile"
                    >
                      {updateProfileMutation.isPending ? "Saving..." : "Complete Profile"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </ScaleIn>
      </div>
    </div>
  );
}