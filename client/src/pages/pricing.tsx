import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Check, 
  X, 
  Star,
  Zap,
  Crown,
  Shield,
  Users,
  TrendingUp,
  Award,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for individuals getting started",
    price: { monthly: 0, yearly: 0 },
    badge: null,
    icon: Users,
    color: "bg-gray-500/10 text-gray-400",
    features: [
      { name: "Unlimited skill swaps", included: true },
      { name: "Basic profile & portfolio", included: true },
      { name: "Standard matching algorithm", included: true },
      { name: "Basic messaging system", included: true },
      { name: "Community support", included: true },
      { name: "Up to 3 active projects", included: true },
      { name: "Basic project management", included: true },
      { name: "Priority matching", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Priority support", included: false },
      { name: "Custom branding", included: false },
      { name: "API access", included: false }
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Professional", 
    description: "For serious freelancers and consultants",
    price: { monthly: 29, yearly: 290 },
    badge: "Most Popular",
    icon: Star,
    color: "bg-blue-500/10 text-blue-400",
    features: [
      { name: "Everything in Free", included: true },
      { name: "Priority matching algorithm", included: true },
      { name: "Advanced project management", included: true },
      { name: "Unlimited active projects", included: true },
      { name: "Video calling integration", included: true },
      { name: "Advanced analytics dashboard", included: true },
      { name: "Priority customer support", included: true },
      { name: "Portfolio premium features", included: true },
      { name: "Custom profile themes", included: true },
      { name: "API access", included: false },
      { name: "Custom branding", included: false },
      { name: "White-label solution", included: false }
    ],
    cta: "Start Professional",
    popular: true
  },
  {
    name: "Enterprise",
    description: "For agencies and larger organizations", 
    price: { monthly: 99, yearly: 990 },
    badge: "Advanced",
    icon: Crown,
    color: "bg-purple-500/10 text-purple-400",
    features: [
      { name: "Everything in Professional", included: true },
      { name: "Team management tools", included: true },
      { name: "Custom branding options", included: true },
      { name: "API access & integrations", included: true },
      { name: "Advanced security features", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Custom matching criteria", included: true },
      { name: "White-label solution", included: true },
      { name: "Priority dispute resolution", included: true },
      { name: "Advanced reporting", included: true },
      { name: "Custom contracts & agreements", included: true },
      { name: "24/7 premium support", included: true }
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const addOns = [
  {
    name: "Verified Pro Badge",
    description: "Enhanced credibility with professional verification",
    price: "$19/month",
    icon: Award
  },
  {
    name: "Premium Analytics",
    description: "Deep insights into your swapping performance",
    price: "$15/month", 
    icon: TrendingUp
  },
  {
    name: "Priority Support",
    description: "Get help faster with priority queue access",
    price: "$9/month",
    icon: Zap
  }
];

const faqs = [
  {
    question: "Is SkillSwap really free?",
    answer: "Yes! Our free plan includes unlimited skill swaps and core features. Premium plans add enhanced tools for professional users."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. Cancel anytime with no fees. Your account returns to our free plan with continued access to basic features."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll provide a full refund."
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your professional needs. Start free and upgrade as you grow.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch 
                checked={isYearly} 
                onCheckedChange={setIsYearly}
                data-testid="switch-billing-period"
              />
              <span className={`font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 lg:px-8 pb-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isYearly ? plan.price.yearly : plan.price.monthly;
              const savings = isYearly && plan.price.monthly > 0 ? (plan.price.monthly * 12 - plan.price.yearly) : 0;
              
              return (
                <Card 
                  key={index} 
                  className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} transition-all hover:shadow-lg`}
                  data-testid={`card-pricing-${index}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-2xl ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">
                          ${price}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-muted-foreground">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      {savings > 0 && (
                        <p className="text-sm text-green-400 mt-1">
                          Save ${savings} per year
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      data-testid={`button-select-plan-${index}`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 lg:px-8 bg-card/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Optional Add-ons</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your SkillSwap experience with these professional add-on features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <Card key={index} className="text-center hover:border-primary/50 transition-colors" data-testid={`card-addon-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{addon.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{addon.description}</p>
                    <div className="text-lg font-bold text-primary mb-4">{addon.price}</div>
                    <Button variant="outline" size="sm" className="w-full" data-testid={`button-addon-${index}`}>
                      Add to Plan
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} data-testid={`card-pricing-faq-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-primary/10 to-background">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Questions About Enterprise Plans?</h2>
            <p className="text-muted-foreground mb-6">
              Need custom features or have a large team? Let's discuss a plan that fits your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-sales">
                  Contact Sales
                </Button>
              </Link>
              <Button variant="outline" size="lg" data-testid="button-schedule-demo">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}