
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MapPin, Compass, Search, ArrowRight } from 'lucide-react';

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
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-grow">
            <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C63E46]" />
            <input
              type="text"
              placeholder={placeholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C63E46] focus:ring-opacity-50 focus:outline-none shadow-sm transition-all"
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
                <span className="text-xl font-bold">×</span>
              </button>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleGeolocation}
            disabled={isGeolocating}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg flex items-center hover:bg-gray-200 transition-colors shadow-sm"
            aria-label="Utiliser ma position actuelle"
          >
            <Compass size={20} className={`mr-2 ${isGeolocating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Ma position</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowRadiusSelector(!showRadiusSelector)}
            className={`px-4 py-3 rounded-lg flex items-center shadow-sm transition-colors ${showRadiusSelector ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            aria-label="Définir un rayon de recherche"
          >
            <span className="mr-1">Rayon</span>
            <span className="text-[#C63E46] font-medium">{searchRadius} km</span>
          </button>
          
          <button
            type="submit"
            className="px-6 py-3 bg-[#C63E46] text-white rounded-lg flex items-center hover:bg-[#b73840] transition-colors shadow-md"
          >
            <Search size={20} className="mr-2" />
            <span>Rechercher</span>
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
        
        {showRadiusSelector && (
          <div className="bg-white rounded-lg p-4 shadow-inner animate-fadeIn border border-gray-100">
            <label htmlFor="radius-slider" className="text-sm text-gray-700 mb-2 block">
              Distance de recherche: <span className="text-[#C63E46] font-medium">{searchRadius} km</span>
            </label>
            <input
              id="radius-slider"
              type="range"
              min="5"
              max="100"
              step="5"
              value={searchRadius}
              onChange={handleRadiusChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C63E46]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5 km</span>
              <span>50 km</span>
              <span>100 km</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LocationBar;
