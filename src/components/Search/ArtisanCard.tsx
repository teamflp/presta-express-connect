
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ArtisanProps {
  artisan: {
    id: number;
    name: string;
    profession: string;
    location: string;
    distance: number;
    description: string;
    rating: number;
    services: string[];
    availability: string;
    image?: string;
  };
  onContact: (id: number) => void;
}

const ArtisanCard: React.FC<ArtisanProps> = ({ artisan, onContact }) => {
  const navigate = useNavigate();
  
  const getAvailabilityColor = (availability: string) => {
    switch(availability) {
      case 'Aujourd\'hui':
        return 'text-success';
      case 'Cette semaine':
        return 'text-primary';
      default:
        return 'text-muted';
    }
  };

  const handleContact = () => {
    // Appeler la fonction onContact avec l'ID de l'artisan
    onContact(artisan.id);
    
    // Naviguer vers la page de contact avec l'ID de l'artisan
    navigate(`/contact-professional/${artisan.id}`, {
      state: { 
        professional: {
          id: artisan.id,
          name: artisan.name,
          speciality: artisan.profession,
          location: artisan.location,
          address: "123 Rue des Artisans", // Donnée fictive pour démo
          phone: "06 12 34 56 78", // Donnée fictive pour démo
          experience: Math.floor(Math.random() * 15) + 5, // Entre 5 et 20 ans d'expérience (aléatoire)
          rating: artisan.rating,
          profileImage: artisan.image || "https://randomuser.me/api/portraits/men/32.jpg" // Image par défaut si pas d'image
        }
      }
    });
  };

  return (
    <div className="card mb-4 artisan-card-horizontal animate-fadeIn">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title mb-0 fw-bold">{artisan.name}</h5>
              <span className="artisan-rating">
                {artisan.rating} <i className="bi bi-star-fill ms-1"></i>
              </span>
            </div>
            <p className="card-text text-muted mb-2">
              {artisan.profession} • {artisan.location} • {artisan.distance} km
            </p>
            <p className="card-text mb-3 line-clamp-2">
              {artisan.description}
            </p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {artisan.services.map((service, index) => (
                <span key={index} className="artisan-badge">
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-between align-items-end">
            <span className={getAvailabilityColor(artisan.availability)}>
              {artisan.availability === 'Aujourd\'hui' && <i className="bi bi-clock-fill me-1"></i>}
              {artisan.availability}
            </span>
            <button 
              className="artisan-contact-btn mt-3 w-100"
              onClick={handleContact}
              aria-label={`Contacter ${artisan.name}`}
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
