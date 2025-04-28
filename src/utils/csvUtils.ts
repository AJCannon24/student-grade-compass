
import { Professor, Course, GradeStats } from '@/types';

// Helper function to parse CSV text into JSON objects
export const parseCSV = (csvText: string): Record<string, string>[] => {
  try {
    // Split the CSV content into lines
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) throw new Error('CSV file must have headers and at least one data row');
    
    // Extract headers from the first line
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Parse data rows
    const records = lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',').map(value => value.trim());
        const record: Record<string, string> = {};
        
        // Map each value to its corresponding header
        headers.forEach((header, index) => {
          record[header] = values[index] || '';
        });
        
        return record;
      });
      
    return records;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw new Error('Failed to parse CSV file. Please check the format.');
  }
};

// Process professors CSV data
export const processProfessorsCSV = (data: Record<string, string>[]): Partial<Professor>[] => {
  return data.map(row => ({
    name: row.name || '',
    department: row.department || '',
  }));
};

// Process courses CSV data
export const processCoursesCSV = (data: Record<string, string>[]): Partial<Course>[] => {
  return data.map(row => ({
    code: row.code || '',
    number: row.number || '',
    title: row.title || '',
    units: parseInt(row.units) || 0,
    department: row.department || '',
  }));
};

// Process grade stats CSV data
export const processGradeStatsCSV = (data: Record<string, string>[]): Partial<GradeStats>[] => {
  return data.map(row => ({
    professorId: row.professorId || '',
    courseId: row.courseId || '',
    term: row.term || 'Fall 2024', // Default term
    aCount: parseInt(row.aCount) || 0,
    bCount: parseInt(row.bCount) || 0,
    cCount: parseInt(row.cCount) || 0,
    dCount: parseInt(row.dCount) || 0,
    fCount: parseInt(row.fCount) || 0,
    wCount: parseInt(row.wCount) || 0,
  }));
};

// Process the sample grade distribution format
// This converts from the sample format to our application's data structure
export const processSampleGradeDistribution = (
  data: Record<string, string>[], 
  professorMap: Record<string, string>,
  courseMap: Record<string, string>
): Partial<GradeStats>[] => {
  return data.map(row => {
    // Map professor name to ID using the provided mapping
    const professorId = professorMap[row.ProfessorName] || '';
    
    // Map course code to ID using the provided mapping
    const courseId = courseMap[row.CourseCode] || '';
    
    return {
      professorId,
      courseId,
      term: row.Term || 'Fall 2024', // Default term if not provided
      aCount: parseInt(row.ACount) || 0,
      bCount: parseInt(row.BCount) || 0,
      cCount: parseInt(row.CCount) || 0,
      dCount: parseInt(row.DCount) || 0,
      fCount: parseInt(row.FCount) || 0,
      wCount: parseInt(row.WCount) || 0,
    };
  });
};

// Helper function to link professors and courses based on sample grade distribution data
export const createProfessorCourseRelationships = (
  sampleData: Record<string, string>[]
): { professors: Set<string>, courses: Set<string>, relationships: Array<{professor: string, course: string}> } => {
  const professors = new Set<string>();
  const courses = new Set<string>();
  const relationships: Array<{professor: string, course: string}> = [];
  
  // Extract unique professors and courses, and create relationships
  sampleData.forEach(row => {
    const professor = row.ProfessorName;
    const course = row.CourseCode;
    
    if (professor && course) {
      professors.add(professor);
      courses.add(course);
      relationships.push({
        professor,
        course
      });
    }
  });
  
  return { professors, courses, relationships };
};
