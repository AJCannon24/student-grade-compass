
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  className = '',
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star 
        key={`star-${i}`} 
        className={`rating-star ${className}`} 
        fill="currentColor" 
        size={size} 
      />
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <StarHalf 
        key="half-star" 
        className={`rating-star ${className}`} 
        fill="currentColor" 
        size={size} 
      />
    );
  }

  // Add empty stars
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star 
        key={`empty-star-${i}`} 
        className={`rating-star-empty ${className}`} 
        size={size} 
      />
    );
  }

  return <div className="flex">{stars}</div>;
};

export default RatingStars;
