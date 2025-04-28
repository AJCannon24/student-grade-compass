
import React from 'react';
import { Link } from 'react-router-dom';
import { Professor } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import RatingStars from '@/components/common/RatingStars';

interface ProfessorCardProps {
  professor: Professor;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor }) => {
  return (
    <Link to={`/professors/${professor.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{professor.name}</h3>
          <p className="text-muted-foreground mb-3">{professor.department}</p>
          
          {professor.avgRating !== undefined && (
            <div className="flex items-center mt-3">
              <RatingStars rating={professor.avgRating} />
              <span className="ml-2 text-sm font-medium">{professor.avgRating.toFixed(1)}</span>
              {professor.reviewCount && (
                <span className="ml-1 text-sm text-muted-foreground">
                  ({professor.reviewCount} {professor.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </div>
          )}
          
          {professor.avgDifficulty !== undefined && (
            <div className="mt-2">
              <span className="text-sm">
                Difficulty: <span className="font-medium">{professor.avgDifficulty.toFixed(1)}/5</span>
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProfessorCard;
