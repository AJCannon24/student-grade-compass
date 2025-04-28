
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/courses/CourseCard';
import { Course } from '@/types';
import { getCourses, searchCourses } from '@/services/courseService';

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        let data: Course[];
        
        if (initialQuery) {
          data = await searchCourses(initialQuery);
        } else {
          data = await getCourses();
        }
        
        setCourses(data);
        setFilteredCourses(data);
        
        // Extract unique departments
        const uniqueDepartments = Array.from(new Set(data.map(c => c.department))).sort();
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL query parameter
    setSearchParams({ q: searchQuery });
    
    // Filter courses
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${course.code}${course.number}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  const handleDepartmentFilter = (department: string) => {
    setSelectedDepartment(department);
    
    if (department === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => course.department === department);
      setFilteredCourses(filtered);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Courses</h1>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-10 w-10"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            
            <div className="space-y-2">
              <h3 className="font-medium">Departments</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedDepartment === '' ? 'default' : 'ghost'}
                  className="justify-start w-full"
                  onClick={() => handleDepartmentFilter('')}
                >
                  All Departments
                </Button>
                {departments.map(dept => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? 'default' : 'ghost'}
                    className="justify-start w-full"
                    onClick={() => handleDepartmentFilter(dept)}
                  >
                    {dept}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No courses found matching your search criteria.</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-muted-foreground">
                  Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                  {selectedDepartment && ` in ${selectedDepartment}`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;
