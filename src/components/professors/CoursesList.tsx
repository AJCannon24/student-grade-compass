
import React from 'react';
import CourseCard from '@/components/courses/CourseCard';
import { Course } from '@/types';

interface CoursesListProps {
  courses: Course[];
  professorName: string;
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, professorName }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Courses Taught by {professorName}</h2>
      {courses.length === 0 ? (
        <p className="text-muted-foreground">No course data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesList;
