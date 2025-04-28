
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit } from 'lucide-react';
import RatingStars from '@/components/common/RatingStars';
import ReviewCard from '@/components/reviews/ReviewCard';
import GradeDistributionChart from '@/components/grades/GradeDistributionChart';
import CourseCard from '@/components/courses/CourseCard';
import { Professor, Review, Course, GradeStats } from '@/types';
import { getProfessorById, getProfessorReviews, getProfessorGradeStats } from '@/services/professorService';
import { getCourseById } from '@/services/courseService';

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

  if (error || !professor) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-muted-foreground mb-6">{error || 'Professor not found'}</p>
          <Link to="/professors">
            <Button>Back to Professors</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/professors" className="text-blue-600 hover:underline mb-2 inline-block">
            &larr; Back to All Professors
          </Link>
          <h1 className="text-3xl font-bold">{professor.name}</h1>
          <p className="text-xl text-muted-foreground">{professor.department}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

          <div className="lg:col-span-2">
            <Tabs defaultValue="reviews" onValueChange={setSelectedTab}>
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="grades">Grade Distributions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-lg mb-4">No reviews yet.</p>
                    {selectedCourse ? (
                      <Link to={`/review/professor/${professor.id}/course/${selectedCourse.id}`}>
                        <Button>Be the first to leave a review</Button>
                      </Link>
                    ) : (
                      <p>Select a course to leave the first review</p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Student Reviews</h3>
                      {selectedCourse && (
                        <Link to={`/review/professor/${professor.id}/course/${selectedCourse.id}`}>
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
                {gradeStats.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-lg">No grade data available.</p>
                  </div>
                ) : (
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
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Courses Taught by {professor.name}</h2>
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
      </div>
    </Layout>
  );
};

export default ProfessorDetailPage;
