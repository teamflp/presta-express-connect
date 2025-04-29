
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../Pagination/PaginationComponent';
import { MapPin, AlertCircle, ArrowRight, Star } from 'lucide-react';

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
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#C63E46] rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500">Chargement</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (artisans.length === 0) {
    return (
      <div className="rounded-lg p-8 animate-fadeIn no-results-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <AlertCircle size={32} className="text-[#C63E46] opacity-80" />
          </div>
          <h3 className="text-2xl font-medium text-gray-900 mb-3">Aucun artisan ne correspond à vos critères</h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Nous n'avons pas trouvé d'artisans correspondant à tous vos filtres actuels. 
            Voici quelques suggestions pour affiner votre recherche.
          </p>
        </div>

        {activeFilters && Object.keys(activeFilters).some(key => activeFilters[key]) && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-800 mb-4">Filtres actifs limitant vos résultats:</h4>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="suggestion-action-card" onClick={onExpandSearch}>
            <div className="flex items-center mb-3 text-[#C63E46] font-semibold">
              <MapPin size={20} className="mr-2" />
              Élargir votre zone de recherche
            </div>
            <p className="text-gray-600 mb-4">
              Étendez votre recherche à un plus grand rayon pour trouver plus d'artisans disponibles dans les zones environnantes.
            </p>
            <div className="flex items-center text-sm text-[#C63E46] font-medium">
              <span>Élargir la recherche</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>
          
          <div className="suggestion-action-card" onClick={() => onResetFilter && onResetFilter('all')}>
            <div className="flex items-center mb-3 text-[#C63E46] font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M3 3h18v18H3z"></path><path d="M13 17V7H7"></path>
              </svg>
              Réinitialiser tous les filtres
            </div>
            <p className="text-gray-600 mb-4">
              Recommencez votre recherche sans filtres pour voir tous les artisans disponibles dans votre secteur.
            </p>
            <div className="flex items-center text-sm text-[#C63E46] font-medium">
              <span>Tout réinitialiser</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>
        </div>

        <div className="text-center bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h4 className="font-medium text-gray-800 mb-3">Vous ne trouvez pas ce que vous cherchez?</h4>
          <p className="text-gray-600 mb-4">Notre équipe peut vous aider à trouver le professionnel idéal pour votre projet.</p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-[#C63E46] text-white rounded-lg hover:bg-[#A33138] transition-all flex items-center mx-auto"
          >
            Contactez-nous pour de l'aide
            <ArrowRight size={16} className="ml-2" />
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
            className="artisan-card-horizontal group"
          >
            <div className="flex flex-col sm:flex-row">
              <div 
                className="sm:w-48 h-48 sm:h-auto relative overflow-hidden cursor-pointer flex-shrink-0"
                onClick={() => handleProfileClick(artisan.id)}
              >
                <img
                  src={artisan.imageUrl}
                  alt={artisan.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-grow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <h3 
                      className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-[#C63E46] transition-colors"
                      onClick={() => handleProfileClick(artisan.id)}
                    >
                      {artisan.name}
                    </h3>
                    <div className="artisan-rating flex items-center">
                      <span className="mr-1">{artisan.rating}</span>
                      <Star size={14} fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="artisan-badge">
                      {artisan.profession}
                    </span>
                    <span className="artisan-badge flex items-center">
                      <MapPin size={14} className="mr-1" strokeWidth={2} />
                      {artisan.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-base mb-4 line-clamp-2">
                    {artisan.description}
                  </p>
                </div>
                
                <div className="flex justify-end mt-2">
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 border border-[#C63E46] text-[#C63E46] rounded-lg hover:bg-[#f8f0f1] transition-colors"
                      onClick={() => handleProfileClick(artisan.id)}
                    >
                      Voir le profil
                    </button>
                    <button 
                      className="artisan-contact-btn"
                      onClick={() => handleContactClick(artisan.id)}
                    >
                      Contacter
                    </button>
                  </div>
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
