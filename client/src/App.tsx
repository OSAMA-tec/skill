import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import BrowseServices from "@/pages/browse-services";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import ServiceForm from "@/pages/service-form";
import ProfileSetup from "@/pages/profile-setup";
import Messages from "@/pages/messages";
import ProjectDetail from "@/pages/project-detail";
import ProposalDetail from "@/pages/proposal-detail";
import SwapProposal from "@/pages/swap-proposal";
import Matching from "@/pages/matching";
import Settings from "@/pages/settings";
import Help from "@/pages/help";
import Contact from "@/pages/contact";
import SuccessStories from "@/pages/success-stories";
import Pricing from "@/pages/pricing";
import NotFound from "@/pages/not-found";
import Signin from "@/pages/signin";
import Signup from "@/pages/signup";
import Admin from "@/pages/admin";
import Notifications from "@/pages/notifications";
import Analytics from "@/pages/analytics";
import Projects from "@/pages/projects";
import Learning from "@/pages/learning";
import Community from "@/pages/community";
import Marketplace from "@/pages/marketplace";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/admin" component={Admin} />
      <Route path="/about" component={About} />
      <Route path="/browse" component={BrowseServices} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile/:id?" component={Profile} />
      <Route path="/profile-setup" component={ProfileSetup} />
      <Route path="/service/new" component={ServiceForm} />
      <Route path="/service/edit/:id" component={ServiceForm} />
      <Route path="/messages" component={Messages} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/proposal/:id" component={ProposalDetail} />
      <Route path="/swap-proposal/:serviceId" component={SwapProposal} />
      <Route path="/matching" component={Matching} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={Help} />
      <Route path="/contact" component={Contact} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/projects" component={Projects} />
      <Route path="/learning" component={Learning} />
      <Route path="/community" component={Community} />
      <Route path="/marketplace" component={Marketplace} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;