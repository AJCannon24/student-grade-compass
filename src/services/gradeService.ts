
import { supabase } from '../integrations/supabase/client';
import { mockGradeStats } from '../data/mockData';
import { GradeStats } from '../types';
import { mapGradeDistroToGradeStats } from '../utils/dataMappers';
import { GradeDistroRecord } from '../types/supabase';

export const getGradeStats = async (): Promise<GradeStats[]> => {
  try {
    const { data, error } = await supabase
      .from('GradeDistro')
      .select('*');
    
    if (error) {
      console.error('Error fetching grade stats from Supabase:', error);
      return mockGradeStats; // Fallback to mock data
    }

    if (!data || data.length === 0) {
      console.warn('No grade stats found in Supabase, using mock data');
      return mockGradeStats;
    }

    // Map the data to the expected format
    return mapGradeDistroToGradeStats(data as GradeDistroRecord[]);
  } catch (err) {
    console.error('Exception fetching grade stats:', err);
    return mockGradeStats;
  }
};

export const getGradeStatsById = async (id: string): Promise<GradeStats | null> => {
  try {
    const gradeStats = await getGradeStats();
    const stats = gradeStats.find(g => g.id === id);
    return stats || null;
  } catch (err) {
    console.error('Error fetching grade stats by ID:', err);
    const stats = mockGradeStats.find(g => g.id === id);
    return stats || null;
  }
};

export const getGradeStatsByProfessorAndCourse = async (
  professorId: string, 
  courseId: string
): Promise<GradeStats[]> => {
  try {
    const gradeStats = await getGradeStats();
    const stats = gradeStats.filter(
      g => g.professorId === professorId && g.courseId === courseId
    );
    return stats;
  } catch (err) {
    console.error('Error fetching grade stats by professor and course:', err);
    const stats = mockGradeStats.filter(
      g => g.professorId === professorId && g.courseId === courseId
    );
    return stats;
  }
};

export const calculateGPA = (stats: GradeStats): number => {
  // GPA only counts letter grades (A, B, C, D, F)
  // P, NP, IX, RD, EW, and W are not included in GPA calculation
  const totalStudents = stats.aCount + stats.bCount + stats.cCount + stats.dCount + stats.fCount;
  if (totalStudents === 0) return 0;
  
  const totalPoints = 
    stats.aCount * 4 + 
    stats.bCount * 3 + 
    stats.cCount * 2 + 
    stats.dCount * 1;
  
  return parseFloat((totalPoints / totalStudents).toFixed(2));
};

export const getTotalStudents = (stats: GradeStats): number => {
  // Count all students, including those with non-GPA grades
  return stats.aCount + 
         stats.bCount + 
         stats.cCount + 
         stats.dCount + 
         stats.fCount + 
         stats.wCount +
         stats.pCount +
         stats.npCount +
         stats.ixCount +
         stats.rdCount +
         stats.ewCount;
};

export const importGradeStats = (csvData: string): Promise<GradeStats[]> => {
  // This is a placeholder function. In a real implementation, this would:
  // 1. Parse CSV data
  // 2. Convert to GradeStats objects
  // 3. Submit to backend API
  
  console.log('CSV import functionality would be implemented here', csvData);
  return Promise.resolve([]);
};
