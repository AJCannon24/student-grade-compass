
import { GradeDistroRecord } from "../types/supabase";
import { Professor, Course, GradeStats } from "../types";

export const mapGradeDistroToProfessor = (
  gradeDistroRecords: GradeDistroRecord[]
): Professor[] => {
  const professorMap = new Map<string, Professor>();
  
  gradeDistroRecords.forEach((record) => {
    if (!professorMap.has(record.Instructor)) {
      // Create a unique ID based on instructor name (simplified approach)
      const professorId = `p_${record.Instructor.replace(/\s+/g, '_').toLowerCase()}`;
      
      professorMap.set(record.Instructor, {
        id: professorId,
        name: record.Instructor,
        department: record.Department,
        // Default values for metrics that aren't directly in GradeDistro
        avgRating: 4.0, // Default rating
        avgDifficulty: 3.0, // Default difficulty
        reviewCount: gradeDistroRecords.filter(r => r.Instructor === record.Instructor).length
      });
    }
  });
  
  return Array.from(professorMap.values());
};

export const mapGradeDistroToCourse = (
  gradeDistroRecords: GradeDistroRecord[]
): Course[] => {
  const courseMap = new Map<string, Course>();
  
  gradeDistroRecords.forEach((record) => {
    const courseKey = `${record.Department}_${record.Course}`;
    
    if (!courseMap.has(courseKey)) {
      // Extract course number from the course field
      const courseNumber = record.Course;
      
      // Create a unique ID for the course
      const courseId = `c_${record.Department.toLowerCase()}_${courseNumber}`;
      
      courseMap.set(courseKey, {
        id: courseId,
        code: record.Department,
        number: courseNumber,
        title: `${record.Department} ${courseNumber}`, // Use department and number as title since we don't have actual titles
        units: 3, // Default value since we don't have unit info
        department: record.Department
      });
    }
  });
  
  return Array.from(courseMap.values());
};

export const mapGradeDistroToGradeStats = (
  gradeDistroRecords: GradeDistroRecord[]
): GradeStats[] => {
  return gradeDistroRecords.map((record) => {
    // Create IDs based on instructor and course
    const professorId = `p_${record.Instructor.replace(/\s+/g, '_').toLowerCase()}`;
    const courseId = `c_${record.Department.toLowerCase()}_${record.Course}`;
    
    // Parse grade counts as numbers
    const aCount = parseInt(record.A) || 0;
    const bCount = parseInt(record.B) || 0;
    const cCount = parseInt(record.C) || 0;
    const dCount = parseInt(record.D) || 0;
    const fCount = parseInt(record.F) || 0;
    const wCount = parseInt(record.W) || 0;
    
    // Use the section as term info with a standardized format
    let term = record.Section;
    if (!term.includes("20")) {
      // If no year in the section, add a default year
      term = `${term} 2023`; // Assuming recent data
    }
    
    return {
      id: `g_${record.id}`,
      professorId,
      courseId,
      term,
      aCount,
      bCount,
      cCount,
      dCount,
      fCount,
      wCount
    };
  });
};
