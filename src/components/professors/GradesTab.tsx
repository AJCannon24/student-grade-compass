
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import GradeDistributionChart from '@/components/grades/GradeDistributionChart';
import { GradeStats, Course } from '@/types';
import { getTotalStudents } from '@/services/gradeService';

interface GradesTabProps {
  gradeStats: GradeStats[];
  courses: Course[];
}

const GradesTab: React.FC<GradesTabProps> = ({ gradeStats, courses }) => {
  if (gradeStats.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-lg">No grade data available.</p>
      </div>
    );
  }

  // Sort by course code and number
  const sortedGradeStats = [...gradeStats].sort((a, b) => {
    const courseA = courses.find(c => c.id === a.courseId);
    const courseB = courses.find(c => c.id === b.courseId);
    
    if (!courseA || !courseB) return 0;
    
    if (courseA.code !== courseB.code) {
      return courseA.code.localeCompare(courseB.code);
    }
    return courseA.number.localeCompare(courseB.number);
  });

  return (
    <div className="space-y-8">
      {sortedGradeStats.map((stat) => {
        const course = courses.find(c => c.id === stat.courseId);
        const totalStudents = getTotalStudents(stat);
        
        return course ? (
          <Card key={stat.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {course.code} {course.number}: {course.title}
                </h3>
                <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                  Total Enrollment: {totalStudents} students
                </div>
              </div>
              
              <GradeDistributionChart gradeStats={stat} />
            </CardContent>
          </Card>
        ) : null;
      })}
    </div>
  );
};

export default GradesTab;
