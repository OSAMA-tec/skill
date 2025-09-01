import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceCardSkeleton() {
  return (
    <Card className="animate-pulse" data-testid="skeleton-service-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>

        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-18" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}