
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import ProfessorCard from '@/components/professors/ProfessorCard';
import CourseCard from '@/components/courses/CourseCard';
import { Professor, Course } from '@/types';
import { searchProfessors } from '@/services/professorService';
import { searchCourses } from '@/services/courseService';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const [professorsData, coursesData] = await Promise.all([
          searchProfessors(query),
          searchCourses(query)
        ]);
        
        setProfessors(professorsData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);

  const totalResults = professors.length + courses.length;

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-6">
          {isLoading 
            ? 'Searching...' 
            : `Found ${totalResults} ${totalResults === 1 ? 'result' : 'results'} for "${query}"`}
        </p>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
            <TabsTrigger value="professors">Professors ({professors.length})</TabsTrigger>
            <TabsTrigger value="courses">Courses ({courses.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg mb-4">No results found for "{query}"</p>
                <Link to="/" className="text-blue-600 hover:underline">Return to Homepage</Link>
              </div>
            ) : (
              <div className="space-y-8">
                {professors.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Professors</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {professors.map(professor => (
                        <ProfessorCard key={professor.id} professor={professor} />
                      ))}
                    </div>
                  </div>
                )}
                
                {courses.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Courses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="professors">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            ) : professors.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">No professors found for "{query}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {professors.map(professor => (
                  <ProfessorCard key={professor.id} professor={professor} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="courses">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">No courses found for "{query}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SearchPage;
