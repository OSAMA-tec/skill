import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    category: string;
    serviceType: "offer" | "need";
    estimatedValue?: number;
    estimatedDuration?: string;
    skills: string[];
    user?: {
      id: string;
      fullName: string;
      title?: string;
      rating: number;
      reviewCount: number;
      profileImage?: string;
    };
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { user } = service;

  return (
    <Card className="hover:border-primary/50 transition-colors group h-full" data-testid={`card-service-${service.id}`}>
      <CardContent className="p-4 sm:p-6 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
          <Badge 
            variant={service.serviceType === "offer" ? "default" : "secondary"}
            className={service.serviceType === "offer" ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"}
          >
            {service.serviceType === "offer" ? "Offering" : "Seeking"}
          </Badge>
          {service.estimatedValue && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4 mr-1" />
              ${service.estimatedValue}
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        {service.estimatedDuration && (
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Clock className="w-4 h-4 mr-2" />
            {service.estimatedDuration}
          </div>
        )}

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {service.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {service.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{service.skills.length - 3} more
            </Badge>
          )}
        </div>

        {user && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <img
                src={user.profileImage || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover"
                data-testid={`img-user-${user.id}`}
              />
              <div>
                <h4 className="font-medium text-sm">{user.fullName}</h4>
                {user.title && (
                  <p className="text-xs text-muted-foreground">{user.title}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{user.rating}</span>
              <span className="text-xs text-muted-foreground">({user.reviewCount})</span>
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <Link href={`/profile/${user?.id}`}>
            <Button variant="outline" size="sm" className="flex-1" data-testid={`button-view-profile-${service.id}`}>
              View Profile
            </Button>
          </Link>
          <Link href={`/swap-proposal/${service.id}`}>
            <Button size="sm" className="flex-1" data-testid={`button-propose-swap-${service.id}`}>
              {service.serviceType === "offer" ? "Request Service" : "Offer Help"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
