import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import ProfessorCard from '@/components/professors/ProfessorCard';
import CourseCard from '@/components/courses/CourseCard';
import { Professor, Course } from '@/types';
import { getProfessors } from '@/services/professorService';
import { getCourses } from '@/services/courseService';
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [professorData, courseData] = await Promise.all([getProfessors(), getCourses()]);

        // Get top rated professors
        const topProfessors = [...professorData].sort((a, b) => {
          if (!a.avgRating) return 1;
          if (!b.avgRating) return -1;
          return b.avgRating - a.avgRating;
        }).slice(0, 4);
        setProfessors(topProfessors);
        setCourses(courseData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return <Layout>
      <section className="py-12 md:py-20 bg-sky-400">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
            Find the Right Professor for Your Classes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 md:mb-12">
            Student-driven insights on professors and courses at Santa Monica College
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
            <Input type="text" placeholder="Search for professors, courses, or departments..." className="pr-12 py-6 text-lg" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Button type="submit" size="icon" className="absolute right-1 top-1 h-10 w-10 rounded-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" onClick={() => navigate('/professors')}>
              Browse Professors
            </Button>
            <Button variant="outline" onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-6">Top Rated Professors</h2>
          {isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>)}
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {professors.map(professor => <ProfessorCard key={professor.id} professor={professor} />)}
            </div>}
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => navigate('/professors')}>
              View All Professors
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-6">Popular Courses</h2>
          {isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>)}
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {courses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>}
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => navigate('/courses')}>
              View All Courses
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-lg my-8">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">About Grade Compass</h2>
          <p className="text-lg mb-8">
            Grade Compass helps students make informed decisions by providing professor reviews, grade distributions, and course information, all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-3">Professor Reviews</h3>
              <p>Real feedback from students about their experiences with professors.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-3">Grade Distributions</h3>
              <p>See historical grade breakdowns for courses with specific professors.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-3">Course Information</h3>
              <p>Detailed information about courses, including units and departments.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default HomePage;