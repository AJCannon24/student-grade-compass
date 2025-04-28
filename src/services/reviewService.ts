
import { mockReviews } from '../data/mockData';
import { Review, ReviewTag } from '../types';

export const getReviews = (): Promise<Review[]> => {
  return Promise.resolve(mockReviews);
};

export const getReviewById = (id: string): Promise<Review | null> => {
  const review = mockReviews.find(r => r.id === id);
  return Promise.resolve(review || null);
};

export const addReview = (review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
  // In a real implementation, this would send a POST request to your API
  const newReview = {
    ...review,
    id: `r${mockReviews.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  
  console.log('New review would be submitted to API:', newReview);
  
  // Return the review with generated ID and timestamp
  return Promise.resolve(newReview as Review);
};

export const getAllTags = (): ReviewTag[] => {
  return [
    'Difficult Exams',
    'Clear Lectures',
    'Inspiring',
    'Group Projects',
    'Heavy Workload',
    'Helpful Office Hours',
    'Easy Grader',
    'Tough Grader',
    'Accessible',
    'Engaging',
    'Caring',
    'Weekly Quizzes'
  ];
};
