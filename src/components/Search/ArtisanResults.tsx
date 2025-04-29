
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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C63E46]"></div>
      </div>
    );
  }
  
  if (artisans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun artisan trouvé</h3>
        <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4">
        <p className="text-gray-600">
          {artisans.length} {artisans.length > 1 ? 'résultats' : 'résultat'} trouvés
        </p>
      </div>
      
      <div className="space-y-4">
        {currentArtisans.map((artisan) => (
          <div 
            key={artisan.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row">
              <div 
                className="sm:w-32 h-32 sm:h-auto overflow-hidden cursor-pointer"
                onClick={() => handleProfileClick(artisan.id)}
              >
                <img
                  src={artisan.imageUrl}
                  alt={artisan.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 
                      className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-[#C63E46] transition-colors"
                      onClick={() => handleProfileClick(artisan.id)}
                    >
                      {artisan.name}
                    </h3>
                    <div className="flex items-center bg-[#C63E46] text-white px-2 py-1 rounded text-sm">
                      {artisan.rating} ★
                    </div>
                  </div>
                  
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {artisan.profession}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {artisan.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {artisan.description}
                  </p>
                </div>
                
                <div className="flex justify-end mt-2 sm:mt-0">
                  <button 
                    className="bg-[#C63E46] hover:bg-[#A33138] text-white py-1.5 px-4 rounded-md transition-colors text-sm flex items-center"
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
        <div className="mt-8">
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
