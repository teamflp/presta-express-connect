
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Star, Phone, Clock, Award } from 'lucide-react';
import { useArtisans } from '../hooks/useArtisans';
import { SearchFilters } from '../services/artisanService';
import { toast } from 'react-hot-toast';

function SearchResultsPhase2() {
  const [searchParams] = useSearchParams();
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
  
  // Initialize filters from URL params
  const initialFilters: SearchFilters = {
    category: searchParams.get('category') || undefined,
    city: searchParams.get('location') || undefined,
    emergency: searchParams.get('emergency') === 'true',
    radius: 30 // Default 30km radius
  };

  const { artisans, loading, total, searchArtisans, filters, setFilters } = useArtisans(initialFilters);

  // Get user location for distance calculation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          
          // Update search with location
          searchArtisans({
            ...filters,
            ...location
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Search without location
          searchArtisans(filters);
        }
      );
    } else {
      // Search without location
      searchArtisans(filters);
    }
  }, []);

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    searchArtisans(updatedFilters);
  };

  const handleContactArtisan = (artisan: any) => {
    toast.success(`Contact initié avec ${artisan.business_name || 'l\'artisan'}`);
    // TODO: Implement contact flow
  };

  const handleBookArtisan = (artisan: any) => {
    toast.success(`Réservation initiée avec ${artisan.business_name || 'l\'artisan'}`);
    // TODO: Implement booking flow
  };

  const formatRating = (rating: number) => {
    return rating > 0 ? rating.toFixed(1) : 'Nouveau';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Artisans disponibles</h1>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin size={18} className="mr-1 text-[#C63E46]" />
          <p className="m-0">
            {total} professionnel{total !== 1 ? 's' : ''} trouvé{total !== 1 ? 's' : ''}
            {filters.city && ` près de ${filters.city}`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <input
              type="text"
              value={filters.city || ''}
              onChange={(e) => handleFilterChange({ city: e.target.value })}
              placeholder="Entrez une ville"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C63E46]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rayon (km)
            </label>
            <select
              value={filters.radius || 30}
              onChange={(e) => handleFilterChange({ radius: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C63E46]"
            >
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
              <option value={30}>30 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note minimum
            </label>
            <select
              value={filters.rating || ''}
              onChange={(e) => handleFilterChange({ rating: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C63E46]"
            >
              <option value="">Toutes les notes</option>
              <option value={4.5}>4.5+ ⭐</option>
              <option value={4.0}>4.0+ ⭐</option>
              <option value={3.5}>3.5+ ⭐</option>
              <option value={3.0}>3.0+ ⭐</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.emergency || false}
                onChange={(e) => handleFilterChange({ emergency: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Urgence</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="spinner-border text-[#C63E46]" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : artisans.length > 0 ? (
        <div className="space-y-6">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800 mr-3">
                        {artisan.business_name || 'Artisan Professionnel'}
                      </h3>
                      {artisan.is_verified && (
                        <div className="flex items-center text-green-600">
                          <Award size={16} className="mr-1" />
                          <span className="text-sm">Vérifié</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      <span>{artisan.city}, {artisan.postal_code}</span>
                      {artisan.distance && (
                        <span className="ml-2 text-sm">• {artisan.distance.toFixed(1)} km</span>
                      )}
                    </div>

                    <div className="flex items-center mb-3">
                      <div className={`flex items-center ${getRatingColor(artisan.rating)} mr-4`}>
                        <Star size={16} className="mr-1" fill="currentColor" />
                        <span className="font-semibold">{formatRating(artisan.rating)}</span>
                        <span className="text-gray-500 ml-1">({artisan.review_count} avis)</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">Répond en {artisan.response_time || 24}h</span>
                      </div>
                    </div>

                    {artisan.description && (
                      <p className="text-gray-600 mb-3 line-clamp-2">{artisan.description}</p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      {artisan.specialties?.slice(0, 3).map((specialty: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {artisan.is_premium && (
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>

                    {artisan.hourly_rate && (
                      <div className="text-sm text-gray-600">
                        À partir de <span className="font-semibold text-[#C63E46]">{artisan.hourly_rate}€/h</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-6">
                    <button
                      onClick={() => handleContactArtisan(artisan)}
                      className="flex items-center justify-center px-4 py-2 border border-[#C63E46] text-[#C63E46] rounded-md hover:bg-[#C63E46] hover:text-white transition-colors"
                    >
                      <Phone size={16} className="mr-2" />
                      Contacter
                    </button>
                    
                    <button
                      onClick={() => handleBookArtisan(artisan)}
                      className="px-4 py-2 bg-[#C63E46] text-white rounded-md hover:bg-[#B12E35] transition-colors"
                    >
                      Réserver
                    </button>
                  </div>
                </div>

                {/* Services */}
                {artisan.artisan_services && artisan.artisan_services.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-800 mb-2">Services proposés :</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {artisan.artisan_services.slice(0, 4).map((service: any) => (
                        <div key={service.id} className="flex justify-between items-center py-1">
                          <span className="text-gray-700">{service.name}</span>
                          {service.base_price && (
                            <span className="text-[#C63E46] font-medium">
                              {service.pricing_type === 'fixed' ? `${service.base_price}€` : `${service.base_price}€/h`}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">Aucun artisan trouvé avec ces critères</p>
          <p className="text-gray-500 mt-2">Essayez d'élargir votre recherche</p>
        </div>
      )}
    </div>
  );
}

export default SearchResultsPhase2;
