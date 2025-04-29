
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MapPin, Compass, Search } from 'lucide-react';

interface LocationBarProps {
  initialLocation: string;
  onLocationChange: (location: string) => void;
  onRadiusChange?: (radius: number) => void;
}

const LocationBar: React.FC<LocationBarProps> = ({ initialLocation, onLocationChange, onRadiusChange }) => {
  const [location, setLocation] = useState(initialLocation || '');
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [placeholder, setPlaceholder] = useState('Rechercher par ville, adresse ou code postal');
  const [searchRadius, setSearchRadius] = useState(10); // Default radius in km
  const [showRadiusSelector, setShowRadiusSelector] = useState(false);
  
  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationChange(location);
    if (onRadiusChange) {
      onRadiusChange(searchRadius);
    }
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value);
    setSearchRadius(newRadius);
    if (onRadiusChange) {
      onRadiusChange(newRadius);
    }
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
          setShowRadiusSelector(true); // Show radius selector after geolocation
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
    <div className="location-bar-container shadow-md">
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
                className="location-input focus:ring-2 focus:ring-[#C63E46] focus:ring-opacity-50"
                disabled={isGeolocating}
                aria-label="Localisation"
              />
              {location && (
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C63E46] transition-colors"
                  onClick={() => {
                    setLocation('');
                    setShowRadiusSelector(false);
                  }}
                  aria-label="Effacer la localisation"
                >
                  ×
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => setShowRadiusSelector(!showRadiusSelector)}
              className={`radius-toggle-button transition-all ${showRadiusSelector ? 'bg-gray-100' : ''}`}
              aria-label="Définir un rayon de recherche"
            >
              <span className="hidden sm:inline">Rayon</span>
              <span className="block sm:hidden">⦿</span>
              {showRadiusSelector ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleGeolocation}
              disabled={isGeolocating}
              className="geolocation-button transition-all hover:bg-gray-100"
              aria-label="Utiliser ma position actuelle"
            >
              <Compass size={20} className={isGeolocating ? 'animate-spin' : ''} />
              <span className="hidden sm:inline ml-2">Ma position</span>
            </button>
            
            <button
              type="submit"
              className="search-button transition-all hover:bg-[#b73840]"
            >
              <Search size={20} className="mr-2" />
              <span>Rechercher</span>
            </button>
          </form>
          
          {showRadiusSelector && (
            <div className="radius-selector animate-fadeIn">
              <label htmlFor="radius-slider" className="text-sm font-medium text-gray-600 mb-1 block">
                Rayon de recherche: <span className="text-[#C63E46] font-semibold">{searchRadius} km</span>
              </label>
              <input
                id="radius-slider"
                type="range"
                min="5"
                max="100"
                value={searchRadius}
                onChange={handleRadiusChange}
                className="w-full radius-slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 km</span>
                <span>50 km</span>
                <span>100 km</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationBar;
