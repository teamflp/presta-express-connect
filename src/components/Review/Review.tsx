
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewProps {
  author: string;
  date: string;
  rating: number;
  comment: string;
  helpful?: number;
}

const Review: React.FC<ReviewProps> = ({ author, date, rating, comment, helpful = 0 }) => {
  const stars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      size={16} 
      fill={i < rating ? "#ffc107" : "none"} 
      stroke={i < rating ? "#ffc107" : "#ccc"} 
      className="me-1"
    />
  ));

  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-2">
          <div>
            <h6 className="mb-1">{author}</h6>
            <div className="d-flex align-items-center mb-2">
              {stars}
              <span className="ms-2 text-muted small">{date}</span>
            </div>
          </div>
        </div>
        <p className="mb-2">{comment}</p>
        <div className="d-flex align-items-center text-muted small">
          <button className="btn btn-sm btn-outline-secondary me-2">
            <i className="bi bi-hand-thumbs-up me-1"></i>
            Utile ({helpful})
          </button>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-flag me-1"></i>
            Signaler
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
