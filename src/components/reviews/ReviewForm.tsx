
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Professor, Course, ReviewTag } from '@/types';
import { addReview } from '@/services/reviewService';
import TagList from '@/components/common/TagList';
import { getAllTags } from '@/services/reviewService';

interface ReviewFormProps {
  professor: Professor;
  course: Course;
  userId: string;
  onSubmitted?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ professor, course, userId, onSubmitted }) => {
  const { toast } = useToast();
  const [overallRating, setOverallRating] = useState<number>(3);
  const [difficultyRating, setDifficultyRating] = useState<number>(3);
  const [engagementRating, setEngagementRating] = useState<number>(3);
  const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<ReviewTag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const allTags = getAllTags();

  const handleTagClick = (tag: ReviewTag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag) 
        ? prevTags.filter(t => t !== tag) 
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length < 10) {
      toast({
        title: "Comment too short",
        description: "Please provide a comment with at least 10 characters.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addReview({
        professorId: professor.id,
        courseId: course.id,
        userId,
        ratingOverall: overallRating,
        ratingDifficulty: difficultyRating,
        ratingEngagement: engagementRating,
        wouldTakeAgain,
        tags: selectedTags,
        comment,
      });

      toast({
        title: "Review Submitted",
        description: "Thank you for sharing your experience!",
      });

      // Reset form
      setOverallRating(3);
      setDifficultyRating(3);
      setEngagementRating(3);
      setWouldTakeAgain(true);
      setComment('');
      setSelectedTags([]);

      // Notify parent component
      if (onSubmitted) {
        onSubmitted();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRatingLabel = (rating: number): string => {
    const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return labels[Math.min(Math.floor(rating) - 1, 4)];
  };

  const renderDifficultyLabel = (rating: number): string => {
    const labels = ['Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Difficult'];
    return labels[Math.min(Math.floor(rating) - 1, 4)];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Rate {professor.name}</h3>
        <p className="text-muted-foreground mb-4">for {course.code} {course.number}: {course.title}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">
            Overall Rating: <span className="font-medium">{overallRating} - {renderRatingLabel(overallRating)}</span>
          </Label>
          <Slider 
            value={[overallRating]} 
            min={1} 
            max={5} 
            step={1} 
            onValueChange={(value) => setOverallRating(value[0])} 
          />
        </div>

        <div>
          <Label className="mb-2 block">
            Difficulty: <span className="font-medium">{difficultyRating} - {renderDifficultyLabel(difficultyRating)}</span>
          </Label>
          <Slider 
            value={[difficultyRating]} 
            min={1} 
            max={5} 
            step={1} 
            onValueChange={(value) => setDifficultyRating(value[0])} 
          />
        </div>

        <div>
          <Label className="mb-2 block">
            Engagement: <span className="font-medium">{engagementRating} - {renderRatingLabel(engagementRating)}</span>
          </Label>
          <Slider 
            value={[engagementRating]} 
            min={1} 
            max={5} 
            step={1} 
            onValueChange={(value) => setEngagementRating(value[0])} 
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={wouldTakeAgain} 
            onCheckedChange={setWouldTakeAgain} 
            id="would-take-again" 
          />
          <Label htmlFor="would-take-again">I would take this professor again</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="comment" className="mb-2 block">Your Review</Label>
        <Textarea 
          id="comment"
          placeholder="Share your experience with this professor and course..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <div>
        <Label className="mb-2 block">Add Tags (Select all that apply)</Label>
        <TagList 
          tags={allTags} 
          onTagClick={handleTagClick} 
          activeTags={selectedTags} 
          className="mt-2"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Reviews are anonymous unless you include personally identifiable information.
      </p>
    </form>
  );
};

export default ReviewForm;
