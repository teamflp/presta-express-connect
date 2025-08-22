
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { toast } from 'react-hot-toast';

interface ReviewFormProps {
  artisanId: string;
  reservationId?: string;
  onReviewSubmitted?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  artisanId, 
  reservationId, 
  onReviewSubmitted 
}) => {
  const { createReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Veuillez sélectionner une note');
      return;
    }

    setIsSubmitting(true);
    
    const reviewData = {
      artisan_id: artisanId,
      reservation_id: reservationId,
      rating,
      title: title.trim() || undefined,
      comment: comment.trim() || undefined,
    };

    const success = await createReview(reviewData);
    
    if (success) {
      setRating(0);
      setTitle('');
      setComment('');
      onReviewSubmitted?.();
    }
    
    setIsSubmitting(false);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        onMouseEnter={() => setHoveredRating(index + 1)}
        onMouseLeave={() => setHoveredRating(0)}
        className="p-1 hover:scale-110 transition-transform"
      >
        <Star
          size={24}
          className={`${
            index < (hoveredRating || rating)
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Laisser un avis</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note *
          </label>
          <div className="flex items-center space-x-1">
            {renderStars()}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 && `${rating}/5`}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre (optionnel)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Résumez votre expérience"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commentaire (optionnel)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Partagez votre expérience en détail"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Publication...' : 'Publier l\'avis'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
