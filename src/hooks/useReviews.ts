
import { useState, useEffect } from 'react';
import { reviewService, Review } from '../services/reviewService';

export const useReviews = (artisanId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<{ average: number; count: number }>({ average: 0, count: 0 });
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    if (!artisanId) return;
    
    setLoading(true);
    try {
      const [reviewsData, ratingData] = await Promise.all([
        reviewService.getArtisanReviews(artisanId),
        reviewService.getArtisanRating(artisanId)
      ]);
      
      setReviews(reviewsData);
      setRating(ratingData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: {
    artisan_id: string;
    reservation_id?: string;
    rating: number;
    title?: string;
    comment?: string;
  }) => {
    try {
      const newReview = await reviewService.createReview(reviewData);
      if (newReview) {
        await fetchReviews(); // Refresh reviews
      }
      return newReview;
    } catch (error) {
      console.error('Error creating review:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [artisanId]);

  return {
    reviews,
    rating,
    loading,
    createReview,
    refetch: fetchReviews
  };
};
