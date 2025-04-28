
import { Professor, Course, Review, GradeStats } from '../types';

export const mockProfessors: Professor[] = [
  {
    id: "p1",
    name: "Dr. Jennifer Smith",
    department: "Computer Science",
    avgRating: 4.7,
    avgDifficulty: 3.2,
    reviewCount: 42
  },
  {
    id: "p2",
    name: "Prof. Robert Johnson",
    department: "Mathematics",
    avgRating: 3.9,
    avgDifficulty: 4.1,
    reviewCount: 28
  },
  {
    id: "p3",
    name: "Dr. Michael Davis",
    department: "Business",
    avgRating: 4.2,
    avgDifficulty: 2.8,
    reviewCount: 35
  },
  {
    id: "p4",
    name: "Prof. Amanda Williams",
    department: "English",
    avgRating: 4.8,
    avgDifficulty: 2.5,
    reviewCount: 31
  },
  {
    id: "p5",
    name: "Dr. David Lee",
    department: "Psychology",
    avgRating: 3.5,
    avgDifficulty: 3.8,
    reviewCount: 24
  }
];

export const mockCourses: Course[] = [
  {
    id: "c1",
    code: "CS",
    number: "101",
    title: "Introduction to Computer Science",
    units: 3,
    department: "Computer Science"
  },
  {
    id: "c2",
    code: "MATH",
    number: "220",
    title: "Calculus I",
    units: 4,
    department: "Mathematics"
  },
  {
    id: "c3",
    code: "BUS",
    number: "150",
    title: "Business Administration",
    units: 3,
    department: "Business"
  },
  {
    id: "c4",
    code: "ENG",
    number: "110",
    title: "College Composition",
    units: 3,
    department: "English"
  },
  {
    id: "c5",
    code: "PSYCH",
    number: "101",
    title: "Introduction to Psychology",
    units: 3,
    department: "Psychology"
  }
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    professorId: "p1",
    courseId: "c1",
    userId: "u1",
    ratingOverall: 5,
    ratingDifficulty: 3,
    ratingEngagement: 5,
    wouldTakeAgain: true,
    tags: ["Clear Lectures", "Engaging", "Helpful Office Hours"],
    comment: "Dr. Smith is amazing! Her lectures are super clear and she makes difficult concepts easy to understand. Always available during office hours for extra help.",
    createdAt: "2024-02-15T12:00:00Z",
    userName: "Student2023"
  },
  {
    id: "r2",
    professorId: "p2",
    courseId: "c2",
    userId: "u2",
    ratingOverall: 4,
    ratingDifficulty: 4,
    ratingEngagement: 3,
    wouldTakeAgain: true,
    tags: ["Difficult Exams", "Heavy Workload", "Tough Grader"],
    comment: "Prof. Johnson's class is challenging but fair. Be prepared to work hard but you'll learn a lot. His exams are quite difficult.",
    createdAt: "2024-01-20T14:30:00Z",
    userName: "MathFan"
  },
  {
    id: "r3",
    professorId: "p3",
    courseId: "c3",
    userId: "u3",
    ratingOverall: 4,
    ratingDifficulty: 3,
    ratingEngagement: 4,
    wouldTakeAgain: true,
    tags: ["Group Projects", "Engaging", "Clear Lectures"],
    comment: "Dr. Davis makes business concepts interesting and relevant. Lots of group projects which help prepare for real-world scenarios.",
    createdAt: "2024-03-05T09:15:00Z",
    userName: "BusinessMajor"
  },
  {
    id: "r4",
    professorId: "p4",
    courseId: "c4",
    userId: "u4",
    ratingOverall: 5,
    ratingDifficulty: 2,
    ratingEngagement: 5,
    wouldTakeAgain: true,
    tags: ["Inspiring", "Caring", "Accessible"],
    comment: "Prof. Williams is the best teacher I've ever had. She genuinely cares about her students and makes English literature fascinating.",
    createdAt: "2024-02-28T16:45:00Z",
    userName: "LitLover"
  },
  {
    id: "r5",
    professorId: "p5",
    courseId: "c5",
    userId: "u5",
    ratingOverall: 3,
    ratingDifficulty: 4,
    ratingEngagement: 2,
    wouldTakeAgain: false,
    tags: ["Weekly Quizzes", "Heavy Workload", "Tough Grader"],
    comment: "Dr. Lee knows the material well but his teaching style didn't work for me. Too many pop quizzes and the workload is excessive.",
    createdAt: "2024-01-10T11:20:00Z",
    userName: "PsychStudent"
  }
];

export const mockGradeStats: GradeStats[] = [
  {
    id: "g1",
    professorId: "p1",
    courseId: "c1",
    term: "Spring 2024",
    aCount: 15,
    bCount: 8,
    cCount: 4,
    dCount: 1,
    fCount: 0,
    wCount: 2
  },
  {
    id: "g2",
    professorId: "p2",
    courseId: "c2",
    term: "Spring 2024",
    aCount: 6,
    bCount: 12,
    cCount: 7,
    dCount: 2,
    fCount: 1,
    wCount: 3
  },
  {
    id: "g3",
    professorId: "p3",
    courseId: "c3",
    term: "Spring 2024",
    aCount: 10,
    bCount: 11,
    cCount: 5,
    dCount: 0,
    fCount: 0,
    wCount: 1
  },
  {
    id: "g4",
    professorId: "p4",
    courseId: "c4",
    term: "Spring 2024",
    aCount: 18,
    bCount: 7,
    cCount: 3,
    dCount: 0,
    fCount: 0,
    wCount: 0
  },
  {
    id: "g5",
    professorId: "p5",
    courseId: "c5",
    term: "Spring 2024",
    aCount: 7,
    bCount: 9,
    cCount: 8,
    dCount: 4,
    fCount: 2,
    wCount: 5
  }
];
