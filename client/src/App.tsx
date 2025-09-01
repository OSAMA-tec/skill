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
import Messages from "@/pages/messages";
import ProjectDetail from "@/pages/project-detail";
import ProposalDetail from "@/pages/proposal-detail";
import Matching from "@/pages/matching";
import Settings from "@/pages/settings";
import Help from "@/pages/help";
import Contact from "@/pages/contact";
import SuccessStories from "@/pages/success-stories";
import Pricing from "@/pages/pricing";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/browse" component={BrowseServices} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile/:id?" component={Profile} />
      <Route path="/service/new" component={ServiceForm} />
      <Route path="/service/edit/:id" component={ServiceForm} />
      <Route path="/messages" component={Messages} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/proposal/:id" component={ProposalDetail} />
      <Route path="/matching" component={Matching} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={Help} />
      <Route path="/contact" component={Contact} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/pricing" component={Pricing} />
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
