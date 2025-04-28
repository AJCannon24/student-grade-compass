
import React from 'react';
import { format } from 'date-fns';
import { Review } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import RatingStars from '@/components/common/RatingStars';
import TagList from '@/components/common/TagList';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center">
              <RatingStars rating={review.ratingOverall} />
              <span className="ml-2 font-medium">{review.ratingOverall.toFixed(1)}/5.0</span>
            </div>
            <p className="text-sm mt-1">
              <strong>Difficulty:</strong> {review.ratingDifficulty}/5
              {review.ratingEngagement !== undefined && (
                <span className="ml-3"><strong>Engagement:</strong> {review.ratingEngagement}/5</span>
              )}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              {review.wouldTakeAgain ? 'Would take again' : 'Would not take again'}
            </span>
          </div>
        </div>
        
        <p className="mb-4">{review.comment}</p>
        
        <TagList tags={review.tags} />
      </CardContent>
      <CardFooter className="px-6 py-4 border-t text-sm text-muted-foreground">
        <div className="flex justify-between w-full">
          <span>{review.userName || 'Anonymous'}</span>
          <time dateTime={review.createdAt}>
            {format(new Date(review.createdAt), 'MMM d, yyyy')}
          </time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
