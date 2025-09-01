import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, ArrowRightLeft, User, Settings, Menu, ChevronDown, Info, HelpCircle, Trophy, DollarSign, Mail } from "lucide-react";
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
            <div className="hidden lg:flex items-center space-x-6">
              <NavLink href="/browse" testId="link-browse-services">Browse</NavLink>
              <NavLink href="/matching" testId="link-matching">Matching</NavLink>
              <NavLink href="/messages" testId="link-messages">Messages</NavLink>
              <NavLink href="/dashboard" testId="link-dashboard">Dashboard</NavLink>
              
              {/* More Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1" data-testid="button-more-menu">
                    More
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/about" className="flex items-center gap-2 w-full" data-testid="dropdown-about">
                      <Info className="w-4 h-4" />
                      About SkillSwap
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/success-stories" className="flex items-center gap-2 w-full" data-testid="dropdown-success-stories">
                      <Trophy className="w-4 h-4" />
                      Success Stories
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pricing" className="flex items-center gap-2 w-full" data-testid="dropdown-pricing">
                      <DollarSign className="w-4 h-4" />
                      Pricing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/help" className="flex items-center gap-2 w-full" data-testid="dropdown-help">
                      <HelpCircle className="w-4 h-4" />
                      Help Center
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/contact" className="flex items-center gap-2 w-full" data-testid="dropdown-contact">
                      <Mail className="w-4 h-4" />
                      Contact Us
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <Link href="/signup">
              <Button className="hidden sm:flex" size="sm" data-testid="button-sign-up">
                Sign Up
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" className="hidden sm:flex" size="sm" data-testid="button-sign-in">
                Sign In
              </Button>
            </Link>
            
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
                    <h3 className="font-semibold text-lg">Platform</h3>
                    <div className="space-y-3 pl-4">
                      <NavLink href="/about" testId="mobile-link-about">About</NavLink>
                      <NavLink href="/success-stories" testId="mobile-link-success-stories">Success Stories</NavLink>
                      <NavLink href="/pricing" testId="mobile-link-pricing">Pricing</NavLink>
                      <NavLink href="/help" testId="mobile-link-help">Help Center</NavLink>
                      <NavLink href="/contact" testId="mobile-link-contact">Contact</NavLink>
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
                    <Link href="/signup">
                      <Button className="w-full" data-testid="mobile-button-sign-up">
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/signin">
                      <Button variant="outline" className="w-full" data-testid="mobile-button-sign-in">
                        Sign In
                      </Button>
                    </Link>
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
