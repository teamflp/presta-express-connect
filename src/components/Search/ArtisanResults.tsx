
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../Pagination/PaginationComponent';

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
}

const ArtisanResults: React.FC<ArtisanResultsProps> = ({ artisans, isLoading }) => {
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
      <div className="bg-white rounded-lg shadow p-8 text-center mt-8 animate-fadeIn">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun artisan trouvé</h3>
        <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
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
