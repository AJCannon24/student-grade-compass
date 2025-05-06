
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import GradeDistributionChart from '@/components/grades/GradeDistributionChart';
import { GradeStats, Course } from '@/types';

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

  return (
    <div className="space-y-8">
      {gradeStats.map((stat) => {
        const course = courses.find(c => c.id === stat.courseId);
        return course ? (
          <Card key={stat.id} className="overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {course.code} {course.number}: {course.title}
              </h3>
              <GradeDistributionChart gradeStats={stat} />
            </CardContent>
          </Card>
        ) : null;
      })}
    </div>
  );
};

export default GradesTab;
