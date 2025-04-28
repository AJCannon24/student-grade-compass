
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import TagList from '@/components/common/TagList';
import { getAllTags, addReview } from '@/services/reviewService';
import { Professor, Course, ReviewTag } from '@/types';

const reviewSchema = z.object({
  ratingOverall: z.number().min(1).max(5),
  ratingDifficulty: z.number().min(1).max(5),
  ratingEngagement: z.number().min(1).max(5).optional(),
  wouldTakeAgain: z.boolean(),
  comment: z.string().min(10, { message: "Review comment must be at least 10 characters" }),
  tags: z.array(z.string()).optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface AddReviewFormProps {
  professorId?: string;
  courseId?: string;
  onSubmitSuccess?: () => void;
  professor?: Professor;
  course?: Course;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
  professorId,
  courseId,
  onSubmitSuccess,
  professor,
  course,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState<ReviewTag[]>([]);
  const allTags = getAllTags();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      ratingOverall: 3,
      ratingDifficulty: 3,
      ratingEngagement: 3,
      wouldTakeAgain: true,
      comment: '',
      tags: [],
    },
  });

  const handleTagClick = (tag: ReviewTag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag) 
        ? prevTags.filter(t => t !== tag) 
        : [...prevTags, tag]
    );
    
    form.setValue('tags', 
      selectedTags.includes(tag) 
        ? selectedTags.filter(t => t !== tag) 
        : [...selectedTags, tag]
    );
  };

  const onSubmit = async (data: ReviewFormValues) => {
    if (!professorId || !courseId) {
      toast({
        title: "Missing Information",
        description: "Professor or course information is missing.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, get the actual userId from auth context
      const userId = 'anonymous-user'; 
      
      await addReview({
        professorId,
        courseId,
        userId,
        ratingOverall: data.ratingOverall,
        ratingDifficulty: data.ratingDifficulty,
        ratingEngagement: data.ratingEngagement,
        wouldTakeAgain: data.wouldTakeAgain,
        tags: selectedTags,
        comment: data.comment,
      });

      toast({
        title: "Review Submitted",
        description: "Thank you for sharing your experience!",
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        // Navigate back to professor page if no callback provided
        navigate(`/professors/${professorId}`);
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

  if (!professor || !course) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
        <p>Missing professor or course information</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Rate {professor.name}</h3>
          <p className="text-muted-foreground mb-4">for {course.code} {course.number}: {course.title}</p>
        </div>

        <FormField
          control={form.control}
          name="ratingOverall"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Overall Rating: <span className="font-medium">{field.value} - {renderRatingLabel(field.value)}</span>
              </FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ratingDifficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Difficulty: <span className="font-medium">{field.value} - {renderDifficultyLabel(field.value)}</span>
              </FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ratingEngagement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Engagement: <span className="font-medium">{field.value} - {renderRatingLabel(field.value)}</span>
              </FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wouldTakeAgain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Would take this professor again</FormLabel>
                <FormDescription>
                  Would you choose to take another course with this professor?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience with this professor and course..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Add Tags (Select all that apply)</FormLabel>
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
    </Form>
  );
};

export default AddReviewForm;
