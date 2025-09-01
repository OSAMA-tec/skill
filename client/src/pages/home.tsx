import Navigation from "@/components/navigation";
import { FadeInUp, StaggerContainer, StaggerItem, SlideInLeft, SlideInRight, AnimatedCard } from "@/components/enhanced-animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp, Award, CheckCircle, ArrowRightLeft } from "lucide-react";
import { Link } from "wouter";

const serviceCategories = [
  {
    name: "Web Development",
    count: "342 professionals",
    description: "Full-stack development, frontend, backend, and mobile app development services",
    icon: "fas fa-code",
    skills: ["React", "Node.js", "Python"]
  },
  {
    name: "Graphic Design",
    count: "289 professionals", 
    description: "Logo design, branding, print design, and digital graphics creation",
    icon: "fas fa-palette",
    skills: ["Photoshop", "Illustrator", "Figma"]
  },
  {
    name: "Digital Marketing",
    count: "201 professionals",
    description: "SEO, social media management, content marketing, and PPC campaigns",
    icon: "fas fa-bullhorn", 
    skills: ["SEO", "Google Ads", "Analytics"]
  },
  {
    name: "Content Writing",
    count: "156 professionals",
    description: "Blog posts, copywriting, technical documentation, and creative content",
    icon: "fas fa-pen",
    skills: ["Blogging", "SEO Writing", "Copywriting"]
  },
  {
    name: "Video Production",
    count: "134 professionals",
    description: "Video editing, motion graphics, animation, and production services", 
    icon: "fas fa-video",
    skills: ["After Effects", "Premiere", "Animation"]
  },
  {
    name: "Business Consulting",
    count: "98 professionals",
    description: "Strategy consulting, business planning, financial analysis, and operations",
    icon: "fas fa-chart-line",
    skills: ["Strategy", "Finance", "Operations"]
  }
];

const featuredSwaps = [
  {
    personA: {
      name: "Sarah Chen",
      title: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face",
      rating: "4.9 (23 reviews)",
      offers: "Complete mobile app UI design with prototyping",
      needs: "Frontend development for React web app"
    },
    personB: {
      name: "Marcus Rodriguez", 
      title: "React Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      rating: "4.8 (31 reviews)",
      offers: "React frontend development with responsive design",
      needs: "Mobile app UI/UX design and prototypes"
    },
    value: "$1,200 each",
    match: "85% Match"
  },
  {
    personA: {
      name: "Emma Thompson",
      title: "Content Strategist", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      rating: "5.0 (18 reviews)",
      offers: "3-month content strategy + 10 blog posts",
      needs: "Video editing for 10 marketing videos"
    },
    personB: {
      name: "David Kim",
      title: "Video Editor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      rating: "4.7 (42 reviews)",
      offers: "Professional video editing with motion graphics", 
      needs: "Content strategy and blog writing services"
    },
    value: "$2,500 each",
    match: "92% Match"
  }
];

const testimonials = [
  {
    quote: "SkillSwap completely changed how I approach my freelance business. I've gotten $10k worth of services just by offering my design skills in return.",
    name: "Jessica Martinez",
    title: "Freelance Designer",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&crop=face"
  },
  {
    quote: "The quality of professionals on SkillSwap is incredible. I've built lasting partnerships and significantly reduced my business expenses.",
    name: "Robert Chen", 
    title: "Marketing Consultant",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=48&h=48&fit=crop&crop=face"
  },
  {
    quote: "As a startup founder, SkillSwap has been a game-changer. We've gotten professional services without touching our cash runway.",
    name: "Amanda Foster",
    title: "Startup Founder", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&crop=face"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Trade Skills, Not Cash
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get professional services by offering your professional services. No payment required, just skill bartering between talented professionals.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/profile">
                  <Button size="lg" className="px-8 py-3" data-testid="button-start-swapping">
                    Start Swapping
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" size="lg" className="px-8 py-3" data-testid="button-browse-services">
                    Browse Services
                  </Button>
                </Link>
              </div>
            </FadeInUp>
            
            {/* Stats */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2" data-testid="text-active-users">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2" data-testid="text-completed-swaps">856</div>
                  <div className="text-sm text-muted-foreground">Completed Swaps</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2" data-testid="text-avg-rating">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2" data-testid="text-service-categories">25+</div>
                  <div className="text-sm text-muted-foreground">Service Categories</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How SkillSwap Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simple, transparent skill exchange in four easy steps
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StaggerItem>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Users className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
                <p className="text-muted-foreground">Set up your profile with skills you offer and services you need</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
                <p className="text-muted-foreground">Browse professionals who need your skills and offer what you need</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <ArrowRightLeft className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Propose Swap</h3>
                <p className="text-muted-foreground">Send swap proposals and agree on project scope and deliverables</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <CheckCircle className="text-2xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete & Rate</h3>
                <p className="text-muted-foreground">Deliver work, confirm completion, and rate each other's performance</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Popular Service Categories</h2>
              <p className="text-xl text-muted-foreground">
                Discover the most in-demand professional services on our platform
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => (
              <StaggerItem key={index}>
                <AnimatedCard className="hover:border-primary/50 transition-colors cursor-pointer group" data-testid={`card-category-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <i className={`${category.icon} text-xl text-primary`}></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-accent/20 text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Swaps */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Swap Opportunities</h2>
            <p className="text-xl text-muted-foreground">
              Ready-to-match professionals looking for skill exchanges
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredSwaps.map((swap, index) => (
              <Card key={index} data-testid={`card-swap-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-primary">Perfect Match Available</h3>
                    <Badge className="bg-primary/10 text-primary">{swap.match}</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Person A */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={swap.personA.image} 
                          alt={swap.personA.name} 
                          className="w-12 h-12 rounded-full object-cover"
                          data-testid={`img-person-a-${index}`}
                        />
                        <div>
                          <h4 className="font-semibold">{swap.personA.name}</h4>
                          <p className="text-sm text-muted-foreground">{swap.personA.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{swap.personA.rating}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-400 mb-1">Offers:</p>
                        <p className="text-sm text-muted-foreground">{swap.personA.offers}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary mb-1">Needs:</p>
                        <p className="text-sm text-muted-foreground">{swap.personA.needs}</p>
                      </div>
                    </div>

                    {/* Swap Arrow */}
                    <div className="hidden md:flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <ArrowRightLeft className="text-primary" />
                      </div>
                    </div>

                    {/* Person B */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={swap.personB.image} 
                          alt={swap.personB.name} 
                          className="w-12 h-12 rounded-full object-cover"
                          data-testid={`img-person-b-${index}`}
                        />
                        <div>
                          <h4 className="font-semibold">{swap.personB.name}</h4>
                          <p className="text-sm text-muted-foreground">{swap.personB.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                          <Star className="w-3 h-3 text-yellow-400" />
                        </div>
                        <span className="text-sm text-muted-foreground">{swap.personB.rating}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-400 mb-1">Offers:</p>
                        <p className="text-sm text-muted-foreground">{swap.personB.offers}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary mb-1">Needs:</p>
                        <p className="text-sm text-muted-foreground">{swap.personB.needs}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Estimated Value:</span> {swap.value}
                      </div>
                      <Button size="sm" data-testid={`button-propose-swap-${index}`}>
                        Propose Swap
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/browse">
              <Button variant="outline" size="lg" data-testid="button-view-all-opportunities">
                View All Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Hear from professionals who've transformed their businesses through skill swapping
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} data-testid={`card-testimonial-${index}`}>
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover"
                      data-testid={`img-testimonial-${index}`}
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are getting premium services without spending cash. Your skills are more valuable than you think.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/profile">
                <Button size="lg" className="px-8 py-4 text-lg" data-testid="button-join-skillswap">
                  Join SkillSwap Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg" data-testid="button-watch-demo">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400 w-4 h-4" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400 w-4 h-4" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400 w-4 h-4" />
                <span>Verified professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ArrowRightLeft className="text-primary-foreground text-sm" />
                </div>
                <span className="text-xl font-bold">SkillSwap</span>
              </div>
              <p className="text-muted-foreground mb-4">
                The professional skill exchange platform that connects talented individuals for mutual benefit.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-twitter">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-linkedin">
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-github">
                  <i className="fab fa-github text-lg"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/browse" className="hover:text-foreground transition-colors">Browse Services</Link></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link href="/success-stories" className="hover:text-foreground transition-colors">Success Stories</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Dispute Resolution</a></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © 2024 SkillSwap. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <select className="bg-input border border-border rounded-md px-3 py-1 text-sm text-foreground">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
