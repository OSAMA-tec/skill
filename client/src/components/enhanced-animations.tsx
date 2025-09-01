import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Enhanced fade-in animation component
export const FadeInUp = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered container for animating lists
export const StaggerContainer = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Individual stagger item
export const StaggerItem = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Enhanced button with hover animations
export const AnimatedButton = ({ 
  children, 
  className = "", 
  ...props 
}: React.ComponentProps<typeof Button>) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Button className={cn("relative overflow-hidden", className)} {...props}>
      {children}
    </Button>
  </motion.div>
);

// Enhanced card with hover effects
export const AnimatedCard = ({ 
  children, 
  className = "", 
  ...props 
}: React.ComponentProps<typeof Card>) => (
  <motion.div
    whileHover={{ 
      y: -4,
      transition: { duration: 0.2 } 
    }}
    className="group"
  >
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30", 
        className
      )} 
      {...props}
    >
      {children}
    </Card>
  </motion.div>
);

// Floating action with pulse animation
export const FloatingElement = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale in animation for stats/counters
export const ScaleIn = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ 
      duration: 0.5, 
      delay,
      type: "spring",
      stiffness: 260,
      damping: 20 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from left animation
export const SlideInLeft = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from right animation
export const SlideInRight = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Loading dots animation
export const LoadingDots = ({ className = "" }: { className?: string }) => (
  <div className={cn("flex space-x-1", className)}>
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="w-2 h-2 bg-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: index * 0.2,
        }}
      />
    ))}
  </div>
);