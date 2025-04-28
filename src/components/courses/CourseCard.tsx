
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold mb-2">
              {course.code} {course.number}
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {course.units} {course.units === 1 ? 'unit' : 'units'}
            </span>
          </div>
          <p className="text-lg mb-2">{course.title}</p>
          <p className="text-muted-foreground">Department: {course.department}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
