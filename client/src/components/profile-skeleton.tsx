import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6" data-testid="skeleton-profile">
      {/* Profile Header Skeleton */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-6 w-40" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <Skeleton className="h-8 w-12 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex space-x-1">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}