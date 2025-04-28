
export interface Professor {
  id: string;
  name: string;
  department: string;
  avgRating?: number;
  avgDifficulty?: number;
  reviewCount?: number;
}

export interface Course {
  id: string;
  code: string;
  number: string;
  title: string;
  units: number;
  department: string;
}

export type ReviewTag = 
  | 'Difficult Exams'
  | 'Clear Lectures'
  | 'Inspiring'
  | 'Group Projects'
  | 'Heavy Workload'
  | 'Helpful Office Hours'
  | 'Easy Grader'
  | 'Tough Grader'
  | 'Accessible'
  | 'Engaging'
  | 'Caring'
  | 'Weekly Quizzes';

export interface Review {
  id: string;
  professorId: string;
  courseId: string;
  userId: string;
  ratingOverall: number;
  ratingDifficulty: number;
  ratingEngagement?: number;
  wouldTakeAgain: boolean;
  tags: ReviewTag[];
  comment: string;
  createdAt: string;
  userName?: string;
}

export interface GradeStats {
  id: string;
  professorId: string;
  courseId: string;
  term: string;
  aCount: number;
  bCount: number;
  cCount: number;
  dCount: number;
  fCount: number;
  wCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}
