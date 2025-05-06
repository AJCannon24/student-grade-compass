
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GradeDistributionChart from '@/components/grades/GradeDistributionChart';
import { getGradeStats } from '@/services/gradeService';
import { getCourses } from '@/services/courseService';
import { getProfessorById } from '@/services/professorService';
import { GradeStats, Course, Professor } from '@/types';

const GradeDistributionSection: React.FC = () => {
  const [gradeStats, setGradeStats] = useState<GradeStats[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [professors, setProfessors] = useState<Record<string, Professor>>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [gradeStatsData, coursesData] = await Promise.all([
          getGradeStats(),
          getCourses()
        ]);
        
        // Get the 3 most recent grade distributions
        const recentStats = gradeStatsData
          .sort((a, b) => a.term > b.term ? -1 : 1)
          .slice(0, 3);
          
        setGradeStats(recentStats);
        setCourses(coursesData);
        
        // Fetch professors for each grade stat
        const professorIds = new Set(recentStats.map(stat => stat.professorId));
        const professorsData: Record<string, Professor> = {};
        
        for (const id of professorIds) {
          const professor = await getProfessorById(id);
          if (professor) {
            professorsData[id] = professor;
          }
        }
        
        setProfessors(professorsData);
      } catch (error) {
        console.error("Error fetching grade distribution data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <section className="py-10">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-6">Recent Grade Distributions</h2>
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse"></Card>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (gradeStats.length === 0) {
    return null;
  }
  
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Grade Distributions</h2>
          <Button variant="outline" onClick={() => navigate('/professors')}>
            View All Grade Data
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {gradeStats.map(stat => {
            const course = courses.find(c => c.id === stat.courseId);
            const professor = professors[stat.professorId];
            
            if (!course || !professor) return null;
            
            return (
              <Card key={stat.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                      {course.code} {course.number}: {course.title}
                    </div>
                    <div className="text-base font-normal text-muted-foreground">
                      Prof. {professor.name}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GradeDistributionChart gradeStats={stat} height={240} />
                  <div className="flex justify-center mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/professors/${professor.id}`)}
                    >
                      View Professor Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GradeDistributionSection;
