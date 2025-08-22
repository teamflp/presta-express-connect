
import { useState, useEffect } from 'react';
import { reviewService } from '../services/reviewService';
import { Review } from '../types/database';

export const useReviews = (artisanId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<{ average: number; count: number }>({ average: 0, count: 0 });
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    if (!artisanId) return;
    
    setLoading(true);
    const [reviewsData, ratingData] = await Promise.all([
      reviewService.getArtisanReviews(artisanId),
      reviewService.getArtisanRating(artisanId)
    ]);
    
    setReviews(reviewsData);
    setRating(ratingData);
    setLoading(false);
  };

  const createReview = async (reviewData: {
    artisan_id: string;
    reservation_id?: string;
    rating: number;
    title?: string;
    comment?: string;
  }) => {
    const newReview = await reviewService.createReview(reviewData);
    if (newReview) {
      await fetchReviews(); // Refresh reviews
    }
    return newReview;
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
