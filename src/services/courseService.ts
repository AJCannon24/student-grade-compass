
import { mockCourses, mockReviews, mockGradeStats, mockProfessors } from '../data/mockData';
import { Course } from '../types';

export const getCourses = (): Promise<Course[]> => {
  return Promise.resolve(mockCourses);
};

export const getCourseById = (id: string): Promise<Course | null> => {
  const course = mockCourses.find(c => c.id === id);
  return Promise.resolve(course || null);
};

export const getCourseReviews = (courseId: string) => {
  const reviews = mockReviews.filter(r => r.courseId === courseId);
  return Promise.resolve(reviews);
};

export const getCourseGradeStats = (courseId: string) => {
  const gradeStats = mockGradeStats.filter(g => g.courseId === courseId);
  return Promise.resolve(gradeStats);
};

export const getCourseProfessors = (courseId: string) => {
  // Find all professor IDs who have taught this course (from grade stats)
  const professorIds = Array.from(new Set(
    mockGradeStats
      .filter(g => g.courseId === courseId)
      .map(g => g.professorId)
  ));
  
  // Get professor details for those IDs
  const professors = mockProfessors.filter(p => professorIds.includes(p.id));
  return Promise.resolve(professors);
};

export const searchCourses = (query: string): Promise<Course[]> => {
  const filteredCourses = mockCourses.filter(
    c => c.title.toLowerCase().includes(query.toLowerCase()) || 
         c.code.toLowerCase().includes(query.toLowerCase()) || 
         c.number.toLowerCase().includes(query.toLowerCase()) ||
         `${c.code}${c.number}`.toLowerCase().includes(query.toLowerCase())
  );
  return Promise.resolve(filteredCourses);
};
