
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Professor, Review, Course, GradeStats } from '@/types';
import { getProfessorById, getProfessorReviews, getProfessorGradeStats } from '@/services/professorService';
import { getCourseById } from '@/services/courseService';

import ProfessorHeader from '@/components/professors/ProfessorHeader';
import ProfessorStats from '@/components/professors/ProfessorStats';
import ReviewsTab from '@/components/professors/ReviewsTab';
import GradesTab from '@/components/professors/GradesTab';
import CoursesList from '@/components/professors/CoursesList';
import ProfessorLoadingSkeleton from '@/components/professors/ProfessorLoadingSkeleton';

const ProfessorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gradeStats, setGradeStats] = useState<GradeStats[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTab, setSelectedTab] = useState('reviews');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch professor data
        const professorData = await getProfessorById(id);
        if (!professorData) {
          setError('Professor not found');
          return;
        }
        setProfessor(professorData);
        
        // Fetch professor reviews
        const reviewsData = await getProfessorReviews(id);
        setReviews(reviewsData);
        
        // Fetch grade stats
        const gradeStatsData = await getProfessorGradeStats(id);
        setGradeStats(gradeStatsData);
        
        // Fetch course data for each grade stat
        const coursePromises = gradeStatsData.map(stat => 
          getCourseById(stat.courseId)
        );
        
        const courseResults = await Promise.all(coursePromises);
        const validCourses = courseResults.filter((course): course is Course => 
          course !== null
        );
        
        // Remove duplicates
        const uniqueCourses = Array.from(
          new Map(validCourses.map(course => [course.id, course])).values()
        );
        
        setCourses(uniqueCourses);
        
        // Set default selected course if available
        if (uniqueCourses.length > 0) {
          setSelectedCourse(uniqueCourses[0]);
        }
        
      } catch (err) {
        console.error("Error fetching professor data:", err);
        setError('Failed to load professor data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <ProfessorLoadingSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <ProfessorHeader professor={professor} error={error} />

        {!error && professor && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <ProfessorStats 
                professor={professor} 
                courses={courses} 
                selectedCourse={selectedCourse} 
                setSelectedCourse={setSelectedCourse} 
              />

              <div className="lg:col-span-2">
                <Tabs defaultValue="reviews" onValueChange={setSelectedTab}>
                  <TabsList className="w-full grid grid-cols-2 mb-6">
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="grades">Grade Distributions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reviews" className="space-y-4">
                    <ReviewsTab 
                      reviews={reviews} 
                      professorId={professor.id}
                      selectedCourse={selectedCourse} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="grades">
                    <GradesTab gradeStats={gradeStats} courses={courses} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <CoursesList courses={courses} professorName={professor.name} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfessorDetailPage;
