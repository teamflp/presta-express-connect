
import React from 'react';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from 'react-bootstrap';

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

  // Formater la note avec une décimale
  const formattedRating = artisan.rating.toFixed(1);
  
  // Déterminer la couleur du badge de note
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-success';
    if (rating >= 4.0) return 'bg-primary';
    if (rating >= 3.5) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="artisan-card-horizontal rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className="row g-0">
        <div className="col-md-3">
          <img 
            src={artisan.image} 
            className="artisan-image h-full object-cover" 
            alt={artisan.name}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 className="card-title mb-1 font-bold">{artisan.name}</h5>
                <p className="card-subtitle text-muted mb-2 d-flex align-items-center">
                  <span className="artisan-badge me-2">{artisan.job}</span>
                  <MapPin size={14} className="me-1" />
                  <small>{artisan.city}</small>
                </p>
              </div>
              <div className={`artisan-rating ${getRatingColor(artisan.rating)} py-1 px-2 rounded-pill d-flex align-items-center`}>
                <Star size={14} fill="white" stroke="white" className="me-1" />
                <span className="fw-bold">{formattedRating}</span>
                <small className="ms-1 text-white">({artisan.reviews})</small>
              </div>
            </div>
            
            {artisan.description && (
              <p className="card-text line-clamp-2 mb-3">{artisan.description}</p>
            )}
            
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-light text-dark d-flex align-items-center">
                <Clock size={12} className="me-1" /> Disponible sous 24h
              </span>
              <span className="badge bg-light text-dark d-flex align-items-center">
                <Star size={12} className="me-1 text-warning" /> Service certifié
              </span>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="d-flex align-items-center">
                <Phone size={16} className="text-primary me-2" />
                <span className="text-primary font-weight-bold">Contact direct</span>
              </div>
              <div>
                <Button 
                  variant="outline-secondary" 
                  className="me-2"
                  onClick={() => window.location.href = `/artisan/${artisan.id}`}
                >
                  Voir le profil
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleContactClick}
                  className="artisan-contact-btn"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
