
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Calendar, Star, Clock, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expanded, setExpanded] = useState(false);
  
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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} className="fill-current text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className="text-warning" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="card mb-4 artisan-card-horizontal animate-fadeIn">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-3 col-lg-2 mb-3 mb-md-0">
            <div className="position-relative">
              <img 
                src={artisan.image || "https://randomuser.me/api/portraits/men/32.jpg"} 
                alt={artisan.name}
                className="rounded-circle img-fluid mx-auto d-block"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <div className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow-sm">
                <div className="d-flex align-items-center">
                  <span className="artisan-rating">
                    {artisan.rating} <Star size={14} className="ms-1 fill-current" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-9 col-lg-10">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h5 className="card-title mb-0 fw-bold">{artisan.name}</h5>
                <p className="text-muted mb-1">
                  <span className="fw-medium">{artisan.profession}</span>
                </p>
              </div>
              <div className={`${getAvailabilityColor(artisan.availability)} d-flex align-items-center`}>
                {artisan.availability === 'Aujourd\'hui' && <Clock size={16} className="me-1" />}
                {artisan.availability}
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-2 text-muted">
              <MapPin size={16} className="me-1" />
              <span>{artisan.location} • {artisan.distance} km</span>
            </div>
            
            <p className={`card-text mb-3 ${expanded ? '' : 'line-clamp-2'}`}>
              {artisan.description}
            </p>
            
            <div className="d-flex justify-content-between align-items-center">
              <button 
                className="btn btn-link text-muted p-0"
                onClick={toggleExpand}
              >
                {expanded ? (
                  <span className="d-flex align-items-center">
                    Moins de détails <ChevronUp size={16} className="ms-1" />
                  </span>
                ) : (
                  <span className="d-flex align-items-center">
                    Plus de détails <ChevronDown size={16} className="ms-1" />
                  </span>
                )}
              </button>
              <button 
                className="artisan-contact-btn d-flex align-items-center"
                onClick={handleContact}
                aria-label={`Contacter ${artisan.name}`}
              >
                <Phone size={16} className="me-2" />
                Contacter
              </button>
            </div>
            
            {expanded && (
              <div className="mt-3 animate-fadeIn">
                <div className="card bg-light border-0">
                  <div className="card-body py-3">
                    <h6 className="fw-bold mb-2">Services proposés</h6>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {artisan.services.map((service, index) => (
                        <span key={index} className="artisan-badge">
                          {service}
                        </span>
                      ))}
                    </div>
                    
                    <h6 className="fw-bold mb-2">Avis clients</h6>
                    <div className="d-flex align-items-center mb-1">
                      <div className="me-2">
                        {renderStars(artisan.rating)}
                      </div>
                      <span className="text-muted">{artisan.rating} sur 5</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigate(`/professional/${artisan.id}`)}
                      >
                        Voir le profil complet
                      </button>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary">
                          <Calendar size={16} className="me-1" />
                          Prendre RDV
                        </button>
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={handleContact}
                        >
                          <Phone size={16} className="me-1" />
                          Appeler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
