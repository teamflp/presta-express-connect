
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MapPin, Compass } from 'lucide-react';

interface LocationBarProps {
  initialLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationBar: React.FC<LocationBarProps> = ({ initialLocation, onLocationChange }) => {
  const [location, setLocation] = useState(initialLocation || '');
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [placeholder, setPlaceholder] = useState('Rechercher par ville, adresse ou code postal');
  
  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationChange(location);
  };
  
  const handleGeolocation = () => {
    setIsGeolocating(true);
    setPlaceholder('Récupération de votre position...');

    if (!navigator.geolocation) {
      toast.error('La géolocalisation n\'est pas prise en charge par votre navigateur');
      setIsGeolocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Utilisation de l'API de géocodage inverse pour obtenir l'adresse
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          
          // Formatage de l'adresse récupérée
          const city = data.address.city || data.address.town || data.address.village || '';
          const postcode = data.address.postcode || '';
          
          // Mise à jour du champ de recherche et notification
          const locationStr = city ? `${city}${postcode ? ', ' + postcode : ''}` : 'Position actuelle';
          setLocation(locationStr);
          onLocationChange(locationStr);
          
          toast.success('Position récupérée avec succès');
        } catch (err) {
          console.error('Erreur lors de la géolocalisation inverse:', err);
          toast.error('Impossible de déterminer votre adresse');
          setLocation('Position actuelle');
          onLocationChange('Position actuelle');
        } finally {
          setPlaceholder('Rechercher par ville, adresse ou code postal');
          setIsGeolocating(false);
        }
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
        let errorMessage = 'Erreur lors de la récupération de votre position';
        
        if (error.code === 1) {
          errorMessage = 'Accès à la localisation refusé. Veuillez autoriser l\'accès à votre position.';
        } else if (error.code === 2) {
          errorMessage = 'Position indisponible. Veuillez réessayer plus tard.';
        } else if (error.code === 3) {
          errorMessage = 'Délai d\'attente dépassé. Veuillez réessayer.';
        }
        
        toast.error(errorMessage);
        setIsGeolocating(false);
        setPlaceholder('Rechercher par ville, adresse ou code postal');
      }
    );
  };
  
  return (
    <div className="location-bar-container">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="location-input-container">
            <div className="relative flex-grow">
              <MapPin size={20} className="location-icon" />
              <input
                type="text"
                placeholder={placeholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="location-input"
                disabled={isGeolocating}
                aria-label="Localisation"
              />
            </div>
            
            <button
              type="button"
              onClick={handleGeolocation}
              disabled={isGeolocating}
              className="geolocation-button"
              aria-label="Utiliser ma position actuelle"
            >
              <Compass size={20} />
              <span className="hidden sm:inline">Ma position</span>
            </button>
            
            <button
              type="submit"
              className="search-button"
            >
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationBar;
