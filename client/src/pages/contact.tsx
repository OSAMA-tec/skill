import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  HelpCircle,
  Shield,
  Users
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.enum(["general", "technical", "billing", "partnership", "safety"]),
  message: z.string().min(20, "Message must be at least 20 characters"),
  priority: z.enum(["low", "medium", "high", "urgent"])
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactMethods = [
  {
    title: "Email Support",
    description: "Get help via email with detailed responses",
    icon: Mail,
    contact: "support@skillswap.com",
    response: "2-4 hours",
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    title: "Live Chat",
    description: "Instant support during business hours",
    icon: MessageCircle,
    contact: "Available 9 AM - 6 PM PST",
    response: "< 5 minutes",
    color: "bg-green-500/10 text-green-400"
  },
  {
    title: "Phone Support",
    description: "Speak directly with our support team",
    icon: Phone,
    contact: "+1 (555) 123-4567",
    response: "Immediate",
    color: "bg-purple-500/10 text-purple-400"
  }
];

const officeLocations = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 456",
    timezone: "PST (UTC-8)",
    type: "Headquarters"
  },
  {
    city: "New York",
    address: "789 Broadway, Floor 12",
    timezone: "EST (UTC-5)",
    type: "East Coast Office"
  },
  {
    city: "London",
    address: "456 Oxford Street, Level 3",
    timezone: "GMT (UTC+0)",
    type: "European Office"
  }
];

export default function Contact() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "general",
      message: "",
      priority: "medium"
    }
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    // Here we would normally send the form data to the backend
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions? Need support? Want to partner with us? We're here to help you succeed on SkillSwap.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-contact-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} data-testid="input-contact-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-category">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Question</SelectItem>
                                <SelectItem value="technical">Technical Support</SelectItem>
                                <SelectItem value="billing">Billing & Account</SelectItem>
                                <SelectItem value="partnership">Business Partnership</SelectItem>
                                <SelectItem value="safety">Safety & Security</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-contact-priority">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of your inquiry" {...field} data-testid="input-contact-subject" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your question or issue..."
                              className="min-h-32"
                              {...field}
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full" data-testid="button-send-message">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="flex items-start gap-3" data-testid={`contact-method-${index}`}>
                      <div className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{method.title}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{method.description}</p>
                        <p className="text-sm font-medium">{method.contact}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {method.response} response
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Our Offices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {officeLocations.map((office, index) => (
                  <div key={index} className="space-y-2" data-testid={`office-${index}`}>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{office.city}</h4>
                      <Badge variant="secondary" className="text-xs">{office.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                    <p className="text-xs text-muted-foreground">{office.timezone}</p>
                    {index < officeLocations.length - 1 && <hr className="border-border" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                  <hr className="border-border" />
                  <p className="text-xs text-muted-foreground">
                    Emergency support available 24/7 for critical platform issues
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}