
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../Pagination/PaginationComponent';
import { MapPin, AlertCircle, ArrowRight } from 'lucide-react';

interface Artisan {
  id: number;
  name: string;
  profession: string;
  location: string;
  rating: number;
  imageUrl: string;
  description: string;
}

interface ArtisanResultsProps {
  artisans: Artisan[];
  isLoading: boolean;
  onExpandSearch?: () => void;
  activeFilters?: {
    profession?: string;
    location?: string;
    minRating?: number;
  };
  onResetFilter?: (filterName: string) => void;
}

const ArtisanResults: React.FC<ArtisanResultsProps> = ({ 
  artisans, 
  isLoading, 
  onExpandSearch,
  activeFilters,
  onResetFilter 
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  
  const handleContactClick = (artisanId: number) => {
    navigate(`/contact-professional/${artisanId}`);
  };
  
  const handleProfileClick = (artisanId: number) => {
    navigate(`/professional/${artisanId}`);
  };
  
  // Calculate pagination
  const indexOfLastArtisan = currentPage * itemsPerPage;
  const indexOfFirstArtisan = indexOfLastArtisan - itemsPerPage;
  const currentArtisans = artisans.slice(indexOfFirstArtisan, indexOfLastArtisan);
  const totalPages = Math.ceil(artisans.length / itemsPerPage);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C63E46]"></div>
      </div>
    );
  }
  
  if (artisans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 animate-fadeIn no-results-container">
        <div className="text-center mb-6">
          <AlertCircle size={48} className="mx-auto mb-4 text-[#C63E46] opacity-80" />
          <h3 className="text-xl font-medium text-gray-900 mb-3">Aucun artisan ne correspond à vos critères</h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Nous n'avons pas trouvé d'artisans correspondant à tous vos filtres actuels. Voici quelques suggestions pour affiner votre recherche.
          </p>
        </div>

        {activeFilters && Object.keys(activeFilters).some(key => activeFilters[key]) && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">Filtres actifs limitant vos résultats:</h4>
            <div className="flex flex-wrap gap-2">
              {activeFilters.profession && (
                <div 
                  onClick={() => onResetFilter && onResetFilter('profession')}
                  className="filter-suggestion-chip"
                >
                  <span>Profession: {activeFilters.profession}</span>
                  <span className="ml-1">×</span>
                </div>
              )}
              {activeFilters.location && (
                <div 
                  onClick={() => onResetFilter && onResetFilter('location')}
                  className="filter-suggestion-chip"
                >
                  <span>Localisation: {activeFilters.location}</span>
                  <span className="ml-1">×</span>
                </div>
              )}
              {activeFilters.minRating && activeFilters.minRating > 0 && (
                <div 
                  onClick={() => onResetFilter && onResetFilter('minRating')}
                  className="filter-suggestion-chip"
                >
                  <span>Évaluation min.: {activeFilters.minRating}+ étoiles</span>
                  <span className="ml-1">×</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="suggestion-action-card" onClick={onExpandSearch}>
            <div className="flex items-center mb-2 text-[#C63E46] font-medium">
              <MapPin size={20} className="mr-2" />
              Élargir votre zone de recherche
            </div>
            <p className="text-sm text-gray-600">
              Étendre votre recherche à un plus grand rayon pour trouver plus d'artisans.
            </p>
            <ArrowRight size={16} className="mt-2 text-[#C63E46]" />
          </div>
          
          <div className="suggestion-action-card" onClick={() => onResetFilter && onResetFilter('all')}>
            <div className="flex items-center mb-2 text-[#C63E46] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M3 3h18v18H3z"></path><path d="M13 17V7H7"></path>
              </svg>
              Réinitialiser tous les filtres
            </div>
            <p className="text-sm text-gray-600">
              Recommencer votre recherche sans filtres pour voir tous les artisans disponibles.
            </p>
            <ArrowRight size={16} className="mt-2 text-[#C63E46]" />
          </div>
        </div>

        <div className="text-center">
          <h4 className="font-medium text-gray-800 mb-3">Vous ne trouvez pas ce que vous cherchez?</h4>
          <button 
            onClick={() => navigate('/contact')}
            className="px-4 py-2 bg-[#C63E46] text-white rounded-md hover:bg-[#A33138] transition-all"
          >
            Contactez-nous pour de l'aide
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fadeIn">
      <div className="mb-6 mt-6">
        <p className="text-gray-700 font-medium">
          {artisans.length} {artisans.length > 1 ? 'résultats' : 'résultat'} trouvés
        </p>
      </div>
      
      <div className="space-y-6">
        {currentArtisans.map((artisan) => (
          <div 
            key={artisan.id} 
            className="artisan-card-horizontal hover-card group"
          >
            <div className="flex flex-col sm:flex-row">
              <div 
                className="sm:w-36 h-36 sm:h-auto relative overflow-hidden cursor-pointer flex-shrink-0"
                onClick={() => handleProfileClick(artisan.id)}
              >
                <img
                  src={artisan.imageUrl}
                  alt={artisan.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-grow p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 
                      className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-[#C63E46] transition-colors"
                      onClick={() => handleProfileClick(artisan.id)}
                    >
                      {artisan.name}
                    </h3>
                    <div className="artisan-rating flex items-center">
                      <span>{artisan.rating}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="artisan-badge bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                      {artisan.profession}
                    </span>
                    <span className="artisan-badge bg-gray-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {artisan.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {artisan.description}
                  </p>
                </div>
                
                <div className="flex justify-end mt-2 sm:mt-0">
                  <button 
                    className="artisan-contact-btn hover:shadow-md transition-all duration-300"
                    onClick={() => handleContactClick(artisan.id)}
                  >
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-10">
          <PaginationComponent 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ArtisanResults;
