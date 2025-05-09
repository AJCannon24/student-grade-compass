
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit } from 'lucide-react';
import ProfessorCard from '@/components/professors/ProfessorCard';
import ReviewCard from '@/components/reviews/ReviewCard';
import GradeDistributionChart from '@/components/grades/GradeDistributionChart';
import { Course, Professor, Review, GradeStats } from '@/types';
import { getCourseById, getCourseReviews, getCourseGradeStats, getCourseProfessors } from '@/services/courseService';

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gradeStats, setGradeStats] = useState<GradeStats[]>([]);
  const [selectedTab, setSelectedTab] = useState('professors');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch course data
        const courseData = await getCourseById(id);
        if (!courseData) {
          setError('Course not found');
          return;
        }
        setCourse(courseData);
        
        // Fetch professors who taught this course
        const professorsData = await getCourseProfessors(id);
        setProfessors(professorsData);
        
        // Set default selected professor if available
        if (professorsData.length > 0) {
          setSelectedProfessor(professorsData[0]);
        }
        
        // Fetch course reviews
        const reviewsData = await getCourseReviews(id);
        setReviews(reviewsData);
        
        // Fetch grade stats
        const gradeStatsData = await getCourseGradeStats(id);
        setGradeStats(gradeStatsData);
        
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError('Failed to load course data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-muted-foreground mb-6">{error || 'Course not found'}</p>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/courses" className="text-blue-600 hover:underline mb-2 inline-block">
            &larr; Back to All Courses
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {course.code} {course.number}: {course.title}
              </h1>
              <p className="text-xl text-muted-foreground">{course.department}</p>
            </div>
            <div className="text-right">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {course.units} {course.units === 1 ? 'unit' : 'units'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Add course review button */}
        {selectedProfessor && (
          <div className="mb-6">
            <Link to={`/review/professor/${selectedProfessor.id}/course/${course.id}`}>
              <Button className="flex items-center gap-2">
                <Edit size={16} />
                Add Review for {course.code} {course.number}
              </Button>
            </Link>
          </div>
        )}

        <Tabs defaultValue="professors" onValueChange={setSelectedTab}>
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="professors">Professors</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="professors" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">
              Professors Teaching {course.code} {course.number}
            </h2>
            
            {professors.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">No professor data available for this course.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {professors.map(professor => (
                  <div key={professor.id}>
                    <ProfessorCard professor={professor} />
                    <div className="mt-2 text-center">
                      <Link to={`/review/professor/${professor.id}/course/${course.id}`}>
                        <Button size="sm" variant="outline">Rate This Professor</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {professors.length > 0 && (
              <div className="mt-4">
                <label htmlFor="professor-select" className="block text-sm font-medium mb-2">
                  Select a professor to write a review:
                </label>
                <select
                  id="professor-select"
                  className="w-full sm:w-auto p-2 border rounded dark:bg-gray-800"
                  value={selectedProfessor?.id || ''}
                  onChange={(e) => {
                    const professor = professors.find(p => p.id === e.target.value);
                    setSelectedProfessor(professor || null);
                  }}
                >
                  <option value="" disabled>Select a professor</option>
                  {professors.map(professor => (
                    <option key={professor.id} value={professor.id}>{professor.name}</option>
                  ))}
                </select>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg mb-4">No reviews yet for this course.</p>
                {selectedProfessor ? (
                  <Link to={`/review/professor/${selectedProfessor.id}/course/${course.id}`}>
                    <Button>Write a Review</Button>
                  </Link>
                ) : (
                  <p>Select a professor to leave a review</p>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">
                    Reviews for {course.code} {course.number}
                  </h2>
                  {selectedProfessor && (
                    <Link to={`/review/professor/${selectedProfessor.id}/course/${course.id}`}>
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
            )}
          </TabsContent>
          
          <TabsContent value="grades">
            <h2 className="text-2xl font-semibold mb-4">
              Grade Distribution for {course.code} {course.number}
            </h2>
            
            {gradeStats.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">No grade data available for this course.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {gradeStats.map((stat) => {
                  const professor = professors.find(p => p.id === stat.professorId);
                  return (
                    <Card key={stat.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">
                          {professor ? (
                            <Link 
                              to={`/professors/${professor.id}`} 
                              className="hover:text-blue-600 hover:underline"
                            >
                              Professor: {professor.name}
                            </Link>
                          ) : (
                            'Unknown Professor'
                          )}
                        </h3>
                        <GradeDistributionChart gradeStats={stat} />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CourseDetailPage;
