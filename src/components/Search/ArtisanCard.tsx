
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
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-full">
          <img 
            src={artisan.image} 
            className="w-full h-full md:h-64 object-cover" 
            alt={artisan.name}
          />
        </div>
        <div className="w-full md:w-3/4 p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h5 className="text-xl font-bold mb-1">{artisan.name}</h5>
              <div className="flex items-center text-gray-600 mb-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-2">{artisan.job}</span>
                <MapPin size={14} className="mr-1" />
                <span className="text-sm">{artisan.city}</span>
              </div>
            </div>
            <div className={`${getRatingColor(artisan.rating)} text-white py-1 px-2 rounded-full flex items-center`}>
              <Star size={14} fill="white" stroke="white" className="mr-1" />
              <span className="font-bold">{formattedRating}</span>
              <small className="ml-1">({artisan.reviews})</small>
            </div>
          </div>
          
          {artisan.description && (
            <p className="text-gray-600 line-clamp-2 mb-4">{artisan.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
              <Clock size={12} className="mr-1" /> Disponible sous 24h
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
              <Star size={12} className="mr-1 text-yellow-500" /> Service certifié
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <div className="flex items-center">
              <Phone size={16} className="text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">Contact direct</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline-secondary" 
                className="px-3 py-2"
                onClick={() => window.location.href = `/artisan/${artisan.id}`}
              >
                Voir le profil
              </Button>
              <Button 
                variant="danger"
                onClick={handleContactClick}
                className="px-3 py-2 bg-[#C63E46] border-[#C63E46]"
              >
                Demander un devis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
