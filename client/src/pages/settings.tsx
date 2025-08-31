import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Bell, Shield, User, CreditCard, Globe, Camera, Trash2 } from "lucide-react";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email("Invalid email address"),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  swapProposals: z.boolean(),
  projectUpdates: z.boolean(),
  messages: z.boolean(),
  weeklyDigest: z.boolean(),
});

const privacySchema = z.object({
  profileVisibility: z.enum(["public", "members", "private"]),
  showEmail: z.boolean(),
  showLocation: z.boolean(),
  showLastActive: z.boolean(),
  allowDirectMessages: z.boolean(),
  requireVerification: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type NotificationFormData = z.infer<typeof notificationSchema>;
type PrivacyFormData = z.infer<typeof privacySchema>;

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Sarah Chen",
      title: "Senior UX/UI Designer",
      bio: "Passionate designer with 8+ years of experience creating user-centered digital experiences.",
      email: "sarah@example.com",
      location: "San Francisco, CA",
      website: "https://sarahchen.design",
      linkedin: "sarahchen-design",
      github: "sarahchen"
    }
  });

  const notificationForm = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      swapProposals: true,
      projectUpdates: true,
      messages: true,
      weeklyDigest: true
    }
  });

  const privacyForm = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: "public",
      showEmail: false,
      showLocation: true,
      showLastActive: true,
      allowDirectMessages: true,
      requireVerification: false
    }
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Updating profile:", data);
  };

  const onNotificationSubmit = (data: NotificationFormData) => {
    console.log("Updating notifications:", data);
  };

  const onPrivacySubmit = (data: PrivacyFormData) => {
    console.log("Updating privacy:", data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Account Settings</h1>
          <p className="text-xl text-muted-foreground">
            Manage your profile, preferences, and account security
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                  data-testid="button-profile-tab"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                  data-testid="button-notifications-tab"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "privacy" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("privacy")}
                  data-testid="button-privacy-tab"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </Button>
                <Button
                  variant={activeTab === "billing" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("billing")}
                  data-testid="button-billing-tab"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      {/* Profile Picture */}
                      <div className="space-y-4">
                        <FormLabel>Profile Picture</FormLabel>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" data-testid="button-change-picture">
                              <Camera className="w-4 h-4 mr-2" />
                              Change Picture
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive" data-testid="button-remove-picture">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-full-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Title</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Senior UX Designer"
                                  {...field}
                                  value={field.value || ""}
                                  data-testid="input-title" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormDescription>
                              Your email is used for account security and important notifications
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell others about your experience and expertise..."
                                className="min-h-24"
                                {...field}
                                value={field.value || ""}
                                data-testid="textarea-bio"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="City, Country"
                                  {...field}
                                  value={field.value || ""}
                                  data-testid="input-location" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://yoursite.com"
                                  {...field}
                                  value={field.value || ""}
                                  data-testid="input-website" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button type="submit" data-testid="button-save-profile">
                          Save Changes
                        </Button>
                        <Button type="button" variant="outline" data-testid="button-cancel-profile">
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...notificationForm}>
                    <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Communication</h3>
                        
                        <FormField
                          control={notificationForm.control}
                          name="swapProposals"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Swap Proposals</FormLabel>
                                <FormDescription>Get notified when someone proposes a skill swap</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-swap-proposals"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="projectUpdates"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Project Updates</FormLabel>
                                <FormDescription>Updates on your active projects and milestones</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-project-updates"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="messages"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Messages</FormLabel>
                                <FormDescription>New messages from swap partners</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-messages"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4 pt-6 border-t border-border">
                        <h3 className="font-semibold">Delivery Methods</h3>
                        
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Email Notifications</FormLabel>
                                <FormDescription>Receive notifications via email</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-email-notifications"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={notificationForm.control}
                          name="pushNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Push Notifications</FormLabel>
                                <FormDescription>Browser and mobile push notifications</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-push-notifications"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button type="submit" data-testid="button-save-notifications">
                          Save Preferences
                        </Button>
                        <Button type="button" variant="outline" data-testid="button-reset-notifications">
                          Reset to Default
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...privacyForm}>
                    <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Profile Visibility</h3>
                        
                        <FormField
                          control={privacyForm.control}
                          name="profileVisibility"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Who can see your profile</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-profile-visibility">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="public">Everyone (Public)</SelectItem>
                                  <SelectItem value="members">SkillSwap Members Only</SelectItem>
                                  <SelectItem value="private">Private</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={privacyForm.control}
                          name="showEmail"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Show Email Address</FormLabel>
                                <FormDescription>Display your email on your public profile</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-show-email"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={privacyForm.control}
                          name="showLocation"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Show Location</FormLabel>
                                <FormDescription>Display your location on your profile</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-show-location"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={privacyForm.control}
                          name="allowDirectMessages"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0">
                              <div>
                                <FormLabel>Allow Direct Messages</FormLabel>
                                <FormDescription>Let other users send you direct messages</FormDescription>
                              </div>
                              <FormControl>
                                <Switch 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange}
                                  data-testid="switch-allow-messages"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button type="submit" data-testid="button-save-privacy">
                          Save Settings
                        </Button>
                        <Button type="button" variant="outline" data-testid="button-cancel-privacy">
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Free Plan</h3>
                          <p className="text-sm text-muted-foreground">
                            Basic skill swapping with limited features
                          </p>
                        </div>
                        <Badge>Current Plan</Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly swaps:</span>
                          <span>3 active projects</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Message history:</span>
                          <span>30 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Portfolio uploads:</span>
                          <span>5 files max</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Upgrade Options</h3>
                      
                      <Card className="border-primary/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold">Pro Plan</h4>
                              <p className="text-sm text-muted-foreground">
                                Enhanced features for active professionals
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">$19</div>
                              <div className="text-sm text-muted-foreground">/month</div>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-sm mb-4">
                            <div>✓ Unlimited active projects</div>
                            <div>✓ Full message history</div>
                            <div>✓ Priority matching</div>
                            <div>✓ Advanced analytics</div>
                            <div>✓ Unlimited portfolio uploads</div>
                          </div>
                          
                          <Button className="w-full" data-testid="button-upgrade-pro">
                            Upgrade to Pro
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}