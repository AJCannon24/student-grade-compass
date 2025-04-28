
import { mockProfessors, mockReviews, mockGradeStats } from '../data/mockData';
import { Professor } from '../types';

export const getProfessors = (): Promise<Professor[]> => {
  return Promise.resolve(mockProfessors);
};

export const getProfessorById = (id: string): Promise<Professor | null> => {
  const professor = mockProfessors.find(p => p.id === id);
  return Promise.resolve(professor || null);
};

export const getProfessorReviews = (professorId: string) => {
  const reviews = mockReviews.filter(r => r.professorId === professorId);
  return Promise.resolve(reviews);
};

export const getProfessorGradeStats = (professorId: string) => {
  const gradeStats = mockGradeStats.filter(g => g.professorId === professorId);
  return Promise.resolve(gradeStats);
};

export const searchProfessors = (query: string): Promise<Professor[]> => {
  const filteredProfessors = mockProfessors.filter(
    p => p.name.toLowerCase().includes(query.toLowerCase()) || 
         p.department.toLowerCase().includes(query.toLowerCase())
  );
  return Promise.resolve(filteredProfessors);
};
