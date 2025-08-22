
import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types/database';

interface ReviewCardProps {
  review: Review & {
    reviewer?: {
      first_name: string;
      last_name: string;
      avatar_url?: string;
    };
  };
  showArtisanResponse?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, showArtisanResponse = true }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {review.reviewer?.avatar_url ? (
              <img
                src={review.reviewer.avatar_url}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 font-medium">
                {review.reviewer?.first_name?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-800">
              {review.reviewer?.first_name} {review.reviewer?.last_name}
            </h4>
            <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {renderStars(review.rating)}
        </div>
      </div>

      {review.title && (
        <h5 className="font-medium text-gray-800 mb-2">{review.title}</h5>
      )}

      {review.comment && (
        <p className="text-gray-600 mb-4">{review.comment}</p>
      )}

      {showArtisanResponse && review.response_from_artisan && (
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <h6 className="font-medium text-gray-800 mb-2">Réponse de l'artisan :</h6>
          <p className="text-gray-600">{review.response_from_artisan}</p>
        </div>
      )}

      {review.is_verified && (
        <div className="flex items-center space-x-1 mt-3">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="text-sm text-green-600">Avis vérifié</span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
