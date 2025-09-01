import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  TrendingUp, 
  Users, 
  ArrowUpRight,
  Quote,
  Calendar,
  DollarSign,
  Award,
  Target
} from "lucide-react";
import { Link } from "wouter";

const successStories = [
  {
    id: "story-1",
    title: "Startup Gets $50K Worth of Services Through Strategic Swaps",
    summary: "TechFlow startup exchanged development services for marketing, design, and legal work, saving $50,000 in the first year.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    category: "Startup Success",
    readTime: "5 min read",
    publishDate: "2024-08-15",
    metrics: {
      valueExchanged: "$50,000",
      timeToComplete: "6 months",
      swapsCompleted: 8,
      satisfaction: "5.0"
    },
    participants: [
      {
        name: "Alex Chen",
        title: "Startup Founder & Full-Stack Developer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        role: "Service Provider",
        contribution: "Full-stack web application development"
      },
      {
        name: "Maria Santos",
        title: "Digital Marketing Specialist",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face",
        role: "Service Recipient",
        contribution: "Complete digital marketing strategy and execution"
      }
    ],
    story: "Alex needed marketing expertise to launch his SaaS platform but had limited cash flow. Through SkillSwap, he found Maria who needed a custom client portal. Over 6 months, they exchanged services worth $50,000 total - Alex built Maria's portal while Maria handled TechFlow's entire go-to-market strategy, resulting in 1,000+ signups in the first quarter.",
    results: [
      "1,000+ user signups in first quarter",
      "Complete brand identity and website redesign", 
      "Full digital marketing strategy implementation",
      "Custom client portal with advanced features",
      "Ongoing professional partnership"
    ]
  },
  {
    id: "story-2", 
    title: "Freelancer Builds Team Through Skill Exchanges",
    summary: "Independent consultant created a full service agency by exchanging skills with specialists across multiple disciplines.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    category: "Agency Building",
    readTime: "4 min read", 
    publishDate: "2024-07-22",
    metrics: {
      valueExchanged: "$75,000",
      timeToComplete: "8 months",
      swapsCompleted: 12,
      satisfaction: "4.9"
    },
    participants: [
      {
        name: "Jennifer Park",
        title: "Business Strategy Consultant",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
        role: "Team Builder",
        contribution: "Strategic consulting and project management"
      },
      {
        name: "Multiple Specialists",
        title: "Designers, Developers, Marketers",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop&crop=faces",
        role: "Team Members",
        contribution: "Specialized services in exchange for consulting"
      }
    ],
    story: "Jennifer started as a solo business consultant but wanted to offer comprehensive services. Using SkillSwap, she built relationships with specialists in design, development, and marketing. By exchanging her strategic consulting for their specialized skills, she now leads a virtual agency serving Fortune 500 clients.",
    results: [
      "Built 8-person virtual agency team",
      "Increased project capacity by 400%",
      "Secured 3 Fortune 500 client contracts",
      "Established ongoing revenue partnerships",
      "Created collaborative workspace ecosystem"
    ]
  },
  {
    id: "story-3",
    title: "Creative Agency Scales Without Capital Investment", 
    summary: "Design agency expanded service offerings and client capacity through strategic skill partnerships, growing 300% in one year.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    category: "Agency Growth",
    readTime: "6 min read",
    publishDate: "2024-06-10",
    metrics: {
      valueExchanged: "$120,000", 
      timeToComplete: "12 months",
      swapsCompleted: 15,
      satisfaction: "4.8"
    },
    participants: [
      {
        name: "Creative Minds Agency",
        title: "Design & Branding Agency",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=80&h=80&fit=crop",
        role: "Service Exchange Hub",
        contribution: "Brand design and creative direction"
      },
      {
        name: "Tech Partners Network",
        title: "Development & Marketing Specialists",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop&crop=faces",
        role: "Service Partners",
        contribution: "Development, SEO, and digital marketing services"
      }
    ],
    story: "Creative Minds needed to expand beyond design to offer full-service solutions but couldn't afford to hire specialists. Through SkillSwap, they partnered with developers and marketers, creating comprehensive service packages that attracted larger clients and tripled their revenue.",
    results: [
      "300% revenue growth in 12 months",
      "Expanded from 3 to 15 service offerings",
      "Secured 5 enterprise-level contracts",
      "Built network of 20+ specialist partners",
      "Established recurring revenue streams"
    ]
  }
];

const impactStats = [
  { label: "Total Value Exchanged", value: "$15.2M", growth: "+145% this year" },
  { label: "Active Partnerships", value: "2,847", growth: "+89% this quarter" },
  { label: "Services Categories", value: "125+", growth: "New categories monthly" },
  { label: "Countries Represented", value: "54", growth: "Global expansion" }
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-green-500/10 text-green-400 border-green-500/20" data-testid="badge-success-stories">
              Real Results from Real Professionals
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how professionals and businesses are transforming their operations through strategic skill exchanges on SkillSwap
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 lg:px-8 bg-card/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`impact-stat-${index}`}>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold mb-1">{stat.label}</div>
                <div className="text-xs text-green-400">{stat.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="space-y-16">
            {successStories.map((story, index) => (
              <Card key={story.id} className="overflow-hidden" data-testid={`card-story-${index}`}>
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-story-${index}`}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        {story.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline">{story.readTime}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(story.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">{story.title}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{story.summary}</p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-lg font-bold text-primary">{story.metrics.valueExchanged}</div>
                        <div className="text-xs text-muted-foreground">Value Exchanged</div>
                      </div>
                      <div className="text-center p-3 bg-green-500/5 rounded-lg">
                        <div className="text-lg font-bold text-green-400">{story.metrics.swapsCompleted}</div>
                        <div className="text-xs text-muted-foreground">Swaps Completed</div>
                      </div>
                    </div>
                    
                    {/* Participants */}
                    <div className="space-y-3 mb-6">
                      {story.participants.map((participant, pIndex) => (
                        <div key={pIndex} className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={participant.image} alt={participant.name} />
                            <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{participant.name}</div>
                            <div className="text-xs text-muted-foreground">{participant.title}</div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {participant.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full" data-testid={`button-read-story-${index}`}>
                      Read Full Story
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who are building better businesses through strategic skill exchanges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile">
                <Button size="lg" className="px-8 py-3" data-testid="button-start-journey">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="outline" size="lg" className="px-8 py-3" data-testid="button-find-opportunities">
                  Find Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}