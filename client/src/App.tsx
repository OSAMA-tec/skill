import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import BrowseServices from "@/pages/browse-services";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import ServiceForm from "@/pages/service-form";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse" component={BrowseServices} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile/:id?" component={Profile} />
      <Route path="/service/new" component={ServiceForm} />
      <Route path="/service/edit/:id" component={ServiceForm} />
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
