import Navigation from "@/components/navigation";
import ServiceCard from "@/components/service-card";
import ServiceCardSkeleton from "@/components/service-card-skeleton";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/enhanced-animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const categories = [
  "Web Development",
  "Graphic Design", 
  "Digital Marketing",
  "Content Writing",
  "Video Production",
  "Business Consulting"
];

export default function BrowseServices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [serviceType, setServiceType] = useState<"offer" | "need" | "all">("all");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["/api/services", selectedCategory, serviceType === "all" ? undefined : serviceType, searchQuery],
    enabled: true
  });

  const filteredServices = (services as any[]).filter((service: any) => {
    if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !service.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory && selectedCategory !== "all" && service.category !== selectedCategory) {
      return false;
    }
    if (serviceType !== "all" && service.serviceType !== serviceType) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <FadeInUp>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Browse Services</h1>
            <p className="text-xl text-muted-foreground">
              Discover professional services offered by talented individuals
            </p>
          </div>
        </FadeInUp>

        {/* Search and Filters */}
        <FadeInUp delay={0.2}>
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-services"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48" data-testid="select-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full md:w-auto" data-testid="button-filters">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </FadeInUp>

        {/* Service Type Tabs */}
        <FadeInUp delay={0.4}>
          <Tabs value={serviceType} onValueChange={(value) => setServiceType(value as any)} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" data-testid="tab-all-services">All Services</TabsTrigger>
              <TabsTrigger value="offer" data-testid="tab-offers">Services Offered</TabsTrigger>
              <TabsTrigger value="need" data-testid="tab-needs">Services Needed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={serviceType} className="mt-6">
              {isLoading ? (
                <StaggerContainer>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <StaggerItem key={i}>
                        <ServiceCardSkeleton />
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              ) : filteredServices.length === 0 ? (
                <FadeInUp>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No services found matching your criteria.</p>
                    <Button className="mt-4" data-testid="button-clear-filters">
                      Clear Filters
                    </Button>
                  </div>
                </FadeInUp>
              ) : (
                <StaggerContainer>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service: any) => (
                      <StaggerItem key={service.id}>
                        <ServiceCard service={service} />
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              )}
            </TabsContent>
          </Tabs>
        </FadeInUp>

        {/* Load More Button */}
        {filteredServices.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" data-testid="button-load-more">
              Load More Services
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
