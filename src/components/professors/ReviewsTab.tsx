
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReviewCard from '@/components/reviews/ReviewCard';
import { Review } from '@/types';

interface ReviewsTabProps {
  reviews: Review[];
  professorId: string;
  selectedCourse: { id: string } | null;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews, professorId, selectedCourse }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-lg mb-4">No reviews yet.</p>
        {selectedCourse ? (
          <Link to={`/review/professor/${professorId}/course/${selectedCourse.id}`}>
            <Button>Be the first to leave a review</Button>
          </Link>
        ) : (
          <p>Select a course to leave the first review</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Student Reviews</h3>
        {selectedCourse && (
          <Link to={`/review/professor/${professorId}/course/${selectedCourse.id}`}>
            <Button variant="outline" size="sm" className="flex gap-2 items-center">
              <Edit size={16} /> Add Your Review
            </Button>
          </Link>
        )}
      </div>
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </>
  );
};

export default ReviewsTab;
