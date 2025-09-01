import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  ArrowRightLeft, 
  CheckCircle, 
  Shield,
  Clock,
  Star,
  Award,
  Target,
  Heart,
  Zap
} from "lucide-react";
import { Link } from "wouter";

const processSteps = [
  {
    step: "01",
    title: "Create Your Professional Profile",
    description: "Set up a comprehensive profile showcasing your skills, experience, and portfolio. Add the services you offer and what you're looking for in exchange.",
    features: ["Skill verification", "Portfolio showcase", "Professional ratings", "Detailed work history"],
    icon: Users,
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    step: "02", 
    title: "Browse & Connect with Professionals",
    description: "Explore thousands of verified professionals offering services that match your needs. Use our advanced filters to find the perfect skill exchange partner.",
    features: ["Smart matching algorithm", "Advanced filtering", "Verified profiles", "Real-time availability"],
    icon: TrendingUp,
    color: "bg-green-500/10 text-green-400"
  },
  {
    step: "03",
    title: "Propose Fair Skill Exchanges",
    description: "Send detailed swap proposals outlining project scope, deliverables, timelines, and expectations. Negotiate terms that work for both parties.",
    features: ["Project scope definition", "Timeline management", "Milestone tracking", "Fair value estimation"],
    icon: ArrowRightLeft,
    color: "bg-purple-500/10 text-purple-400"
  },
  {
    step: "04",
    title: "Collaborate & Deliver Results",
    description: "Work together using our integrated project management tools. Track progress, communicate effectively, and deliver exceptional results.",
    features: ["Built-in messaging", "File sharing", "Progress tracking", "Quality assurance"],
    icon: CheckCircle,
    color: "bg-orange-500/10 text-orange-400"
  }
];

const benefits = [
  {
    title: "Zero Cash Required",
    description: "Get professional services without spending money. Your skills are your currency.",
    icon: Heart,
    color: "text-red-400"
  },
  {
    title: "Verified Professionals",
    description: "All members are verified professionals with proven track records and ratings.",
    icon: Shield,
    color: "text-blue-400"
  },
  {
    title: "Quality Guarantee",
    description: "Our rating system and dispute resolution ensure high-quality work delivery.",
    icon: Star,
    color: "text-yellow-400"
  },
  {
    title: "Time Efficient",
    description: "Smart matching algorithms find perfect partners faster than traditional hiring.",
    icon: Zap,
    color: "text-green-400"
  },
  {
    title: "Build Relationships",
    description: "Create lasting professional networks and partnerships beyond single projects.",
    icon: Users,
    color: "text-purple-400"
  },
  {
    title: "Skill Development",
    description: "Learn new skills through collaboration while contributing your expertise.",
    icon: Target,
    color: "text-indigo-400"
  }
];

const stats = [
  { number: "10,000+", label: "Active Professionals", sublabel: "Across 50+ countries" },
  { number: "25,000+", label: "Successful Swaps", sublabel: "Worth over $15M in value" },
  { number: "4.9/5", label: "Average Rating", sublabel: "Based on 8,500+ reviews" },
  { number: "95%", label: "Success Rate", sublabel: "Projects completed successfully" }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" data-testid="badge-about-hero">
              Professional Skill Exchange Platform
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Revolutionizing Professional Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              SkillSwap transforms how professionals collaborate by enabling direct skill exchanges. 
              Get the services you need by offering what you do best - no money required, just mutual value creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile">
                <Button size="lg" className="px-8 py-4 text-lg" data-testid="button-join-platform">
                  Join the Platform
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg" data-testid="button-explore-services">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How SkillSwap Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform simplifies professional collaboration through a structured, secure, and rewarding skill exchange process
            </p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isReverse = index % 2 === 1;
              
              return (
                <div key={index} className={`flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">Step {step.step}</Badge>
                        <h3 className="text-2xl lg:text-3xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-2">
                      <CardContent className="space-y-4 p-0">
                        <div className="text-6xl font-bold text-primary/20 text-center">
                          {step.step}
                        </div>
                        <div className="text-center space-y-2">
                          <div className="text-lg font-semibold">Interactive Demo</div>
                          <div className="text-muted-foreground text-sm">
                            Try out this step in our guided demo environment
                          </div>
                          <Button variant="outline" size="sm" data-testid={`button-demo-${index}`}>
                            Try Demo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 lg:px-8 bg-card/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose SkillSwap?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of professionals who are transforming their businesses through strategic skill exchanges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg" data-testid={`card-benefit-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className={`w-8 h-8 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-r from-primary/10 via-background to-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of verified professionals and start exchanging skills today. 
              Your expertise is more valuable than you think.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/profile">
                <Button size="lg" className="px-8 py-4 text-lg" data-testid="button-get-started">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/matching">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg" data-testid="button-find-matches">
                  Find Your First Match
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <CheckCircle className="text-green-400 w-5 h-5" />
                <span>Free to join forever</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <CheckCircle className="text-green-400 w-5 h-5" />
                <span>No transaction fees</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <CheckCircle className="text-green-400 w-5 h-5" />
                <span>24/7 support included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}