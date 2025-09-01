import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, ThumbsUp, Flag, Clock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: {
    id: string;
    fullName: string;
    profileImage?: string;
    title?: string;
  };
  reviewee?: {
    id: string;
    fullName: string;
    profileImage?: string;
    title?: string;
  };
}

interface ReviewRatingSystemProps {
  projectId: string;
  currentUserId: string;
  targetUserId: string;
  targetUserName: string;
  canLeaveReview?: boolean;
  showAllReviews?: boolean;
}

export default function ReviewRatingSystem({
  projectId,
  currentUserId,
  targetUserId,
  targetUserName,
  canLeaveReview = false,
  showAllReviews = false
}: ReviewRatingSystemProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projectReviews = [], isLoading: projectReviewsLoading } = useQuery({
    queryKey: ["/api/reviews", { projectId }],
    enabled: !!projectId
  });

  const { data: userReviews = [], isLoading: userReviewsLoading } = useQuery({
    queryKey: ["/api/reviews", { userId: targetUserId }],
    enabled: showAllReviews && !!targetUserId
  });

  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      return await apiRequest("/api/reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
      });
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      setRating(0);
      setComment("");
      setShowReviewForm(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    },
  });

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    submitReviewMutation.mutate({
      projectId,
      reviewerId: currentUserId,
      revieweeId: targetUserId,
      rating,
      comment: comment.trim() || undefined,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderStars = (currentRating: number, interactive = false, size = "w-5 h-5") => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      const filled = starValue <= (interactive ? (hoveredRating || rating) : currentRating);
      
      return (
        <Star
          key={index}
          className={`${size} cursor-pointer transition-colors ${
            filled ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          data-testid={interactive ? `star-rating-${starValue}` : `star-display-${starValue}`}
        />
      );
    });
  };

  const averageRating = userReviews.length > 0 
    ? userReviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / userReviews.length
    : 0;

  const reviewsToDisplay = showAllReviews ? userReviews : projectReviews;

  // Check if current user has already reviewed this user for this project
  const existingReview = projectReviews.find(
    (review: Review) => review.reviewerId === currentUserId && review.revieweeId === targetUserId
  );

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      {showAllReviews && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Reviews for {targetUserName}</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(averageRating)}
                </div>
                <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">({userReviews.length})</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 text-sm">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = userReviews.filter((review: Review) => review.rating === stars).length;
                const percentage = userReviews.length > 0 ? (count / userReviews.length) * 100 : 0;
                
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {stars}
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded">
                      <div
                        className="h-full bg-yellow-400 rounded"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Form */}
      {canLeaveReview && !existingReview && (
        <Card>
          <CardHeader>
            <CardTitle>Leave a Review</CardTitle>
          </CardHeader>
          <CardContent>
            {showReviewForm ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rate your experience with {targetUserName}
                  </label>
                  <div className="flex items-center gap-1">
                    {renderStars(rating, true)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Comment (optional)
                  </label>
                  <Textarea
                    placeholder="Share your experience working with this professional..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    data-testid="textarea-review-comment"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitReview}
                    disabled={rating === 0 || submitReviewMutation.isPending}
                    data-testid="button-submit-review"
                  >
                    {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowReviewForm(false);
                      setRating(0);
                      setComment("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowReviewForm(true)} data-testid="button-write-review">
                Write a Review
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Existing Review */}
      {existingReview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Your Review</span>
              <Badge variant="outline">Submitted</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {renderStars(existingReview.rating)}
              </div>
              {existingReview.comment && (
                <p className="text-muted-foreground">{existingReview.comment}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Submitted {formatDate(existingReview.createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {showAllReviews ? "All Reviews" : "Project Reviews"}
            {reviewsToDisplay.length > 0 && (
              <span className="text-muted-foreground font-normal ml-2">
                ({reviewsToDisplay.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(projectReviewsLoading || userReviewsLoading) ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviewsToDisplay.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reviews yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviewsToDisplay.map((review: Review, index: number) => (
                <div key={review.id} className="flex gap-3" data-testid={`review-${index}`}>
                  <Avatar>
                    <AvatarImage src={review.reviewer?.profileImage} />
                    <AvatarFallback>
                      {review.reviewer?.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{review.reviewer?.fullName}</h4>
                        {review.reviewer?.title && (
                          <p className="text-sm text-muted-foreground">
                            {review.reviewer.title}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating, false, "w-4 h-4")}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(review.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    {review.comment && (
                      <p className="text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}