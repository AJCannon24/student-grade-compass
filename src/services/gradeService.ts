
import { mockGradeStats } from '../data/mockData';
import { GradeStats } from '../types';

export const getGradeStats = (): Promise<GradeStats[]> => {
  return Promise.resolve(mockGradeStats);
};

export const getGradeStatsById = (id: string): Promise<GradeStats | null> => {
  const stats = mockGradeStats.find(g => g.id === id);
  return Promise.resolve(stats || null);
};

export const getGradeStatsByProfessorAndCourse = (
  professorId: string, 
  courseId: string
): Promise<GradeStats[]> => {
  const stats = mockGradeStats.filter(
    g => g.professorId === professorId && g.courseId === courseId
  );
  return Promise.resolve(stats);
};

export const calculateGPA = (stats: GradeStats): number => {
  const totalStudents = stats.aCount + stats.bCount + stats.cCount + stats.dCount + stats.fCount;
  if (totalStudents === 0) return 0;
  
  const totalPoints = 
    stats.aCount * 4 + 
    stats.bCount * 3 + 
    stats.cCount * 2 + 
    stats.dCount * 1;
  
  return parseFloat((totalPoints / totalStudents).toFixed(2));
};

export const importGradeStats = (csvData: string): Promise<GradeStats[]> => {
  // This is a placeholder function. In a real implementation, this would:
  // 1. Parse CSV data
  // 2. Convert to GradeStats objects
  // 3. Submit to backend API
  
  console.log('CSV import functionality would be implemented here', csvData);
  return Promise.resolve([]);
};
