
import { useState } from 'react';
import SearchFilters from '../components/Search/SearchFilters';
import ArtisanCard, { Artisan } from '../components/Search/ArtisanCard';
import PaginationComponent from '../components/Pagination/PaginationComponent';

function SearchResults() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters] = useState({
    category: '',
    rating: '',
    distance: '',
    availability: ''
  });
  
  const location = 'Paris, France'; // Location fixe pour l'exemple
  const itemsPerPage = 5;
  const totalItems = 25; // Nombre total d'exemples

  // Fonction pour simuler la récupération des résultats de recherche
  const generateMockResults = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return Array.from({ length: Math.min(itemsPerPage, totalItems - startIndex) }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Artisan ${startIndex + i + 1}`,
      job: 'Plombier',
      city: 'Paris',
      rating: 4.5,
      reviews: 15,
      image: 'https://via.placeholder.com/150',
      description: 'Expert en plomberie, disponible pour tous vos travaux.'
    }));
  };

  // Simuler les résultats de recherche
  const artisans = generateMockResults(currentPage);

  const handleFilterChange = () => {
    // Reset to first page when filters change
    setCurrentPage(1);
    console.log("Filters changed:", filters);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log("Page changed to:", pageNumber);
  };

  const handleContactArtisan = (artisan: Artisan) => {
    console.log("Contact artisan:", artisan);
  };

  // Structure JSX
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Résultats de recherche</h1>
      <p className="text-gray-600 mb-8">Artisans disponibles près de {location}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6 space-y-6">
            {artisans.map(artisan => (
              <ArtisanCard 
                key={artisan.id}
                artisan={artisan} 
                onContact={handleContactArtisan}
              />
            ))}
          </div>
          
          <PaginationComponent 
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
