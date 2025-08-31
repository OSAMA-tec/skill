import { Button } from "@/components/ui/button";
import { Bell, ArrowRightLeft } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer" data-testid="link-home">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ArrowRightLeft className="text-primary-foreground text-sm" />
                </div>
                <span className="text-xl font-bold text-foreground">SkillSwap</span>
              </div>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/browse">
                <a 
                  className={`transition-colors ${
                    location === "/browse" 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="link-browse-services"
                >
                  Browse Services
                </a>
              </Link>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-how-it-works"
              >
                How It Works
              </a>
              <Link href="/dashboard">
                <a 
                  className={`transition-colors ${
                    location === "/dashboard" 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="link-dashboard"
                >
                  Dashboard
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" data-testid="button-notifications">
              <Bell className="text-lg" />
            </Button>
            <Link href="/profile">
              <Button data-testid="button-sign-up">
                Sign Up
              </Button>
            </Link>
            <Button variant="outline" data-testid="button-sign-in">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
