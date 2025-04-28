
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AddReviewForm from '@/components/reviews/AddReviewForm';
import { Professor, Course } from '@/types';
import { getProfessorById } from '@/services/professorService';
import { getCourseById } from '@/services/courseService';

const AddReviewPage = () => {
  const { professorId, courseId } = useParams<{ professorId: string, courseId: string }>();
  const navigate = useNavigate();
  
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!professorId || !courseId) {
        setError('Missing professor or course ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch professor and course data in parallel
        const [professorData, courseData] = await Promise.all([
          getProfessorById(professorId),
          getCourseById(courseId)
        ]);
        
        if (!professorData) {
          setError('Professor not found');
          return;
        }
        
        if (!courseData) {
          setError('Course not found');
          return;
        }
        
        setProfessor(professorData);
        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [professorId, courseId]);

  const handleReviewSubmitted = () => {
    // Navigate back to the professor page after successful submission
    navigate(`/professors/${professorId}`);
  };

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

  if (error || !professor || !course) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-muted-foreground mb-6">{error || 'Failed to load data'}</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Link to={`/professors/${professor.id}`} className="text-blue-600 hover:underline mb-2 inline-block">
            &larr; Back to {professor.name}
          </Link>
          <h1 className="text-3xl font-bold mb-1">Write a Review</h1>
          <p className="text-muted-foreground">
            Share your experience with {professor.name} in {course.code} {course.number}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <AddReviewForm
                professorId={professor.id}
                courseId={course.id}
                onSubmitSuccess={handleReviewSubmitted}
                professor={professor}
                course={course}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddReviewPage;
