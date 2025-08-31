import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, ArrowRightLeft, User, Settings, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, children, testId }: { href: string; children: React.ReactNode; testId: string }) => (
    <Link href={href}>
      <span 
        className={`transition-colors cursor-pointer ${
          location === href 
            ? "text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid={testId}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {children}
      </span>
    </Link>
  );

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
            <div className="hidden lg:flex space-x-6">
              <NavLink href="/browse" testId="link-browse-services">Browse</NavLink>
              <NavLink href="/matching" testId="link-matching">Matching</NavLink>
              <NavLink href="/messages" testId="link-messages">Messages</NavLink>
              <NavLink href="/dashboard" testId="link-dashboard">Dashboard</NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex" data-testid="button-notifications">
              <Bell className="w-4 h-4" />
            </Button>
            <Link href="/profile" className="hidden sm:flex">
              <Button variant="ghost" size="sm" data-testid="button-profile">
                <User className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/settings" className="hidden sm:flex">
              <Button variant="ghost" size="sm" data-testid="button-settings">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <Button className="hidden sm:flex" size="sm" data-testid="button-sign-up">
              Sign Up
            </Button>
            <Button variant="outline" className="hidden sm:flex" size="sm" data-testid="button-sign-in">
              Sign In
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="space-y-6 mt-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Navigation</h3>
                    <div className="space-y-3 pl-4">
                      <NavLink href="/browse" testId="mobile-link-browse">Browse Services</NavLink>
                      <NavLink href="/matching" testId="mobile-link-matching">Smart Matching</NavLink>
                      <NavLink href="/messages" testId="mobile-link-messages">Messages</NavLink>
                      <NavLink href="/dashboard" testId="mobile-link-dashboard">Dashboard</NavLink>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-border">
                    <h3 className="font-semibold text-lg">Account</h3>
                    <div className="space-y-3 pl-4">
                      <NavLink href="/profile" testId="mobile-link-profile">My Profile</NavLink>
                      <NavLink href="/settings" testId="mobile-link-settings">Settings</NavLink>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-border">
                    <Button className="w-full" data-testid="mobile-button-sign-up">
                      Sign Up
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="mobile-button-sign-in">
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
