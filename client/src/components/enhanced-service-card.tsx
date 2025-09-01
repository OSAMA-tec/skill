import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, DollarSign, ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface EnhancedServiceCardProps {
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
  onContact?: () => void;
  onFavorite?: () => void;
}

export default function EnhancedServiceCard({ service, onContact, onFavorite }: EnhancedServiceCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = service;

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.();
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group"
    >
      <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10" data-testid={`enhanced-card-service-${service.id}`}>
        <CardContent className="p-0">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Badge 
                  variant={service.serviceType === "offer" ? "default" : "secondary"}
                  className={`${
                    service.serviceType === "offer" 
                      ? "bg-green-500/20 text-green-400 border-green-500/30" 
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  } font-medium`}
                >
                  {service.serviceType === "offer" ? "🟢 Offering" : "🔵 Seeking"}
                </Badge>
              </motion.div>
              
              <div className="flex items-center gap-2">
                {service.estimatedValue && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center text-sm font-semibold text-primary"
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    {service.estimatedValue.toLocaleString()}
                  </motion.div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavorite}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  data-testid={`button-favorite-${service.id}`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-400 text-red-400' : ''}`} />
                </Button>
              </div>
            </div>

            <motion.h3 
              className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {service.title}
            </motion.h3>
          </div>

          {/* Main content */}
          <div className="p-6 pt-0">
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
              {service.description}
            </p>

            {service.estimatedDuration && (
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span className="font-medium">{service.estimatedDuration}</span>
              </div>
            )}

            {/* Skills with enhanced styling */}
            <div className="flex flex-wrap gap-2 mb-6">
              {service.skills.slice(0, 3).map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
              {service.skills.length > 3 && (
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                  +{service.skills.length - 3} more
                </Badge>
              )}
            </div>

            {/* User info with enhanced layout */}
            {user && (
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Link href={`/profile/${user.id}`}>
                  <motion.div 
                    className="flex items-center space-x-3 cursor-pointer group/user"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Avatar className="w-10 h-10 ring-2 ring-transparent group-hover/user:ring-primary/20 transition-all">
                      <AvatarImage src={user.profileImage} alt={user.fullName} />
                      <AvatarFallback className="text-xs font-semibold">
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm group-hover/user:text-primary transition-colors">
                        {user.fullName}
                      </div>
                      <div className="text-xs text-muted-foreground">{user.title}</div>
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                          {[...Array(Math.floor(user.rating))].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {user.rating} ({user.reviewCount})
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onContact}
                    className="opacity-0 group-hover:opacity-100 transition-all"
                    data-testid={`button-contact-${service.id}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="sm" 
                      className="relative overflow-hidden"
                      data-testid={`button-view-service-${service.id}`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      View Details
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}