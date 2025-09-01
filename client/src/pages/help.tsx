import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Shield, 
  Users, 
  ArrowRightLeft,
  Clock,
  Star,
  Mail,
  Phone
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const faqCategories = [
  {
    title: "Getting Started",
    icon: Users,
    color: "bg-blue-500/10 text-blue-400",
    questions: [
      {
        question: "How do I create my first service listing?",
        answer: "Go to your Dashboard and click 'New Service Listing'. Fill in your service details, set your requirements, and publish. Our team reviews all listings within 24 hours to ensure quality."
      },
      {
        question: "What makes a good profile on SkillSwap?",
        answer: "A great profile includes: a professional photo, detailed bio highlighting your expertise, portfolio samples, verified skills, and clear descriptions of what services you offer and need."
      },
      {
        question: "How long does profile verification take?",
        answer: "Profile verification typically takes 1-2 business days. We verify your professional credentials, portfolio samples, and contact information to maintain platform quality."
      },
      {
        question: "Is SkillSwap really free to use?",
        answer: "Yes! Creating an account, browsing services, and making swaps is completely free. We don't charge transaction fees or monthly subscriptions. Our revenue comes from premium features for enterprise users."
      }
    ]
  },
  {
    title: "Skill Exchanges",
    icon: ArrowRightLeft,
    color: "bg-green-500/10 text-green-400",
    questions: [
      {
        question: "How are skill exchanges valued fairly?",
        answer: "Our algorithm considers project complexity, time investment, market rates, and professional experience to suggest fair exchange values. Both parties can negotiate to reach a mutually beneficial agreement."
      },
      {
        question: "What happens if someone doesn't deliver as promised?",
        answer: "We have a comprehensive dispute resolution system. If work doesn't meet agreed standards, our mediation team reviews the project and can facilitate resolution or provide alternative matches."
      },
      {
        question: "Can I exchange services with multiple people at once?",
        answer: "Yes! You can work on multiple swaps simultaneously. Our project management tools help you track progress across all your active collaborations."
      },
      {
        question: "How do I know if someone is qualified for my project?",
        answer: "Every profile shows verified credentials, past project ratings, portfolio samples, and detailed reviews from previous swap partners. You can also request a consultation call before committing."
      }
    ]
  },
  {
    title: "Safety & Security",
    icon: Shield,
    color: "bg-purple-500/10 text-purple-400",
    questions: [
      {
        question: "How do you verify professional credentials?",
        answer: "We verify identity documents, professional licenses, portfolio authenticity, and past work history. Verified members receive a badge and have higher visibility in search results."
      },
      {
        question: "What intellectual property protections are in place?",
        answer: "All swaps include standard IP agreements. We provide templates for work-for-hire, licensing, and collaborative ownership arrangements. Legal support is available for complex projects."
      },
      {
        question: "Is my personal information safe?",
        answer: "We use enterprise-grade security with encrypted data storage, secure communication channels, and strict privacy controls. You control what information is visible on your profile."
      },
      {
        question: "What if I need to cancel a swap in progress?",
        answer: "Both parties can request cancellation through our platform. We provide mediation services to ensure fair resolution and help find alternative arrangements when possible."
      }
    ]
  },
  {
    title: "Platform Features",
    icon: Star,
    color: "bg-yellow-500/10 text-yellow-400",
    questions: [
      {
        question: "How does the matching algorithm work?",
        answer: "Our AI analyzes your skills, project requirements, work history, availability, and preferences to suggest the most compatible swap partners. Match scores help you prioritize the best opportunities."
      },
      {
        question: "Can I track project progress and deadlines?",
        answer: "Yes! Each swap includes built-in project management with milestone tracking, file sharing, communication logs, and deadline management. Both parties can monitor progress in real-time."
      },
      {
        question: "What communication tools are available?",
        answer: "SkillSwap includes secure messaging, video calls, file sharing, and project collaboration boards. All communication is logged for reference and dispute resolution if needed."
      },
      {
        question: "How do ratings and reviews work?",
        answer: "After each completed swap, both parties rate each other on quality, communication, and timeliness. Reviews are verified and help build reputation scores that improve matching opportunities."
      }
    ]
  }
];

const quickLinks = [
  { title: "Account Issues", description: "Login, password, and profile problems", icon: Users },
  { title: "Payment & Billing", description: "Questions about premium features", icon: MessageCircle },
  { title: "Technical Support", description: "Bug reports and technical issues", icon: HelpCircle },
  { title: "Safety Concerns", description: "Report inappropriate behavior", icon: Shield }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCategories = faqCategories.filter(category => {
    if (selectedCategory !== "all" && category.title.toLowerCase() !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      return category.questions.some(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions and get the support you need to succeed on SkillSwap
            </p>
            
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg"
                data-testid="input-search-faq"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Need immediate help?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Card key={index} className="hover:border-primary/50 transition-colors cursor-pointer group" data-testid={`card-quick-link-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <Button 
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                data-testid="button-category-all"
              >
                All Topics
              </Button>
              {faqCategories.map((category, index) => (
                <Button
                  key={index}
                  variant={selectedCategory === category.title.toLowerCase() ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.title.toLowerCase())}
                  data-testid={`button-category-${index}`}
                >
                  {category.title}
                </Button>
              ))}
            </div>

            <div className="space-y-8">
              {filteredCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <Card key={categoryIndex} data-testid={`card-faq-category-${categoryIndex}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {category.title}
                        <Badge variant="secondary" className="ml-auto">
                          {category.questions.length} questions
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left" data-testid={`accordion-question-${categoryIndex}-${faqIndex}`}>
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant help from our support team
                  </p>
                  <Button className="w-full" data-testid="button-live-chat">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us a detailed message about your issue
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full" data-testid="button-email-support">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Response Time:</strong> We typically respond to support requests within 2-4 hours during business hours (9 AM - 6 PM PST, Monday - Friday)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}