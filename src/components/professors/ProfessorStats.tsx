
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RatingStars from '@/components/common/RatingStars';
import { Professor, Course } from '@/types';

interface ProfessorStatsProps {
  professor: Professor;
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
}

const ProfessorStats: React.FC<ProfessorStatsProps> = ({ 
  professor, 
  courses, 
  selectedCourse, 
  setSelectedCourse 
}) => {
  return (
    <Card className="lg:col-span-1">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Overall Rating</p>
            <div className="flex items-center mt-1">
              <RatingStars rating={professor.avgRating || 0} size={20} />
              <span className="ml-2 font-bold text-xl">
                {professor.avgRating ? professor.avgRating.toFixed(1) : 'N/A'}
              </span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Difficulty</p>
            <p className="font-bold text-xl">
              {professor.avgDifficulty ? professor.avgDifficulty.toFixed(1) : 'N/A'}/5
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <p className="font-bold text-xl">{professor.reviewCount || 0}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Courses Taught</p>
            <p className="font-bold text-xl">{courses.length}</p>
          </div>
          
          {selectedCourse && (
            <Link to={`/review/professor/${professor.id}/course/${selectedCourse.id}`}>
              <Button className="w-full flex gap-2 items-center">
                <Edit size={16} />
                Rate Professor {professor.name.split(' ')[0]}
              </Button>
            </Link>
          )}
          
          {!selectedCourse && courses.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm">Select a course to leave a review:</p>
              <select 
                className="w-full p-2 border rounded dark:bg-gray-800"
                value=""
                onChange={(e) => {
                  const course = courses.find(c => c.id === e.target.value);
                  setSelectedCourse(course || null);
                }}
              >
                <option value="" disabled>Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} {course.number}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessorStats;
