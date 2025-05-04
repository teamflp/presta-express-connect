
import React from 'react';
import { Star } from 'lucide-react';

// Define the Artisan type
export interface Artisan {
  id: number;
  name: string;
  job: string;
  city: string;
  rating: number;
  reviews: number;
  image: string;
  description?: string;
}

// Define the props interface
export interface ArtisanProps {
  artisan: Artisan;
  onContact?: (artisan: Artisan) => void;
}

const ArtisanCard: React.FC<ArtisanProps> = ({ artisan, onContact }) => {
  const handleContactClick = () => {
    if (onContact) {
      onContact(artisan);
    }
  };

  return (
    <div className="card shadow-sm mb-4 hover-card">
      <div className="row g-0">
        <div className="col-md-4">
          <img 
            src={artisan.image} 
            className="img-fluid rounded-start" 
            alt={artisan.name}
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="card-title mb-1">{artisan.name}</h5>
              <div className="d-flex align-items-center">
                <Star size={16} fill="#ffc107" stroke="#ffc107" className="me-1" />
                <span className="fw-bold">{artisan.rating}</span>
                <span className="text-muted ms-1">({artisan.reviews})</span>
              </div>
            </div>
            <p className="card-subtitle mb-2 text-muted">{artisan.job} · {artisan.city}</p>
            {artisan.description && (
              <p className="card-text">{artisan.description}</p>
            )}
            <button 
              onClick={handleContactClick}
              className="btn btn-primary"
            >
              Contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
