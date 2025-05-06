
import { supabase } from '../integrations/supabase/client';
import { mockProfessors, mockReviews, mockGradeStats } from '../data/mockData';
import { Professor } from '../types';
import { mapGradeDistroToProfessor, mapGradeDistroToGradeStats } from '../utils/dataMappers';
import { GradeDistroRecord } from '../types/supabase';

export const getProfessors = async (): Promise<Professor[]> => {
  try {
    const { data, error } = await supabase
      .from('GradeDistro')
      .select('*');

    if (error) {
      console.error('Error fetching professors from Supabase:', error);
      return mockProfessors; // Fallback to mock data on error
    }

    if (!data || data.length === 0) {
      console.warn('No professor data found in Supabase, using mock data');
      return mockProfessors;
    }

    // Type assertion to fix incompatible types
    return mapGradeDistroToProfessor(data as unknown as GradeDistroRecord[]);
  } catch (err) {
    console.error('Exception fetching professors:', err);
    return mockProfessors; // Fallback to mock data
  }
};

export const getProfessorById = async (id: string): Promise<Professor | null> => {
  try {
    const professors = await getProfessors();
    const professor = professors.find(p => p.id === id);
    return professor || null;
  } catch (err) {
    console.error('Error fetching professor by ID:', err);
    const professor = mockProfessors.find(p => p.id === id);
    return professor || null;
  }
};

export const getProfessorReviews = (professorId: string) => {
  // For now, we'll stick with mock reviews since we haven't integrated reviews from Supabase yet
  const reviews = mockReviews.filter(r => r.professorId === professorId);
  return Promise.resolve(reviews);
};

export const getProfessorGradeStats = async (professorId: string) => {
  try {
    const { data, error } = await supabase
      .from('GradeDistro')
      .select('*');

    if (error) {
      console.error('Error fetching grade stats from Supabase:', error);
      return mockGradeStats.filter(g => g.professorId === professorId);
    }

    if (!data || data.length === 0) {
      console.warn('No grade stats found in Supabase, using mock data');
      return mockGradeStats.filter(g => g.professorId === professorId);
    }

    // Type assertion to fix incompatible types
    const allGradeStats = mapGradeDistroToGradeStats(data as unknown as GradeDistroRecord[]);
    return allGradeStats.filter(g => g.professorId === professorId);
  } catch (err) {
    console.error('Exception fetching grade stats:', err);
    return mockGradeStats.filter(g => g.professorId === professorId);
  }
};

export const searchProfessors = async (query: string): Promise<Professor[]> => {
  try {
    const professors = await getProfessors();
    const filteredProfessors = professors.filter(
      p => p.name.toLowerCase().includes(query.toLowerCase()) || 
           p.department.toLowerCase().includes(query.toLowerCase())
    );
    return filteredProfessors;
  } catch (err) {
    console.error('Error searching professors:', err);
    const filteredProfessors = mockProfessors.filter(
      p => p.name.toLowerCase().includes(query.toLowerCase()) || 
           p.department.toLowerCase().includes(query.toLowerCase())
    );
    return filteredProfessors;
  }
};
