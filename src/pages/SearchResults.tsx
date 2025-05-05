import React, { useState } from 'react';
import SearchFilters from '../components/Search/SearchFilters';
import ArtisanCard from '../components/Search/ArtisanCard';
import PaginationComponent from '../components/Search/PaginationComponent';

function SearchResults() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    distance: '',
    availability: ''
  });
  // Remplaçons la déclaration inutilisée d'artisans
  const [searchResults, setSearchResults] = useState([]);
  const location = 'Paris, France'; // Location fixe pour l'exemple
  const itemsPerPage = 5;
  const totalItems = 25; // Nombre total d'exemples

  // Fonction pour simuler la récupération des résultats de recherche
  const getSearchResults = (page: number, filterOptions: any) => {
    // Simuler une requête API ici
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Retourner une tranche des résultats simulés
    return Array.from({ length: Math.min(itemsPerPage, totalItems - startIndex) }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Artisan ${startIndex + i + 1}`,
      category: 'Plombier',
      rating: 4.5,
      description: 'Description de l\'artisan...',
      imageUrl: 'https://via.placeholder.com/150'
    }));
  };

  const handleFilterChange = () => {
    // Reset to first page when filters change
    setCurrentPage(1);
    // Dans une implémentation réelle, cette fonction ferait une requête API avec les nouveaux filtres
    console.log("Filters changed:", filters);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Dans une implémentation réelle, cette fonction ferait une requête API pour la nouvelle page
    console.log("Page changed to:", pageNumber);
  };

  // Structure JSX
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Résultats de recherche</h1>
      <p className="text-gray-600 mb-8">Artisans disponibles près de {location}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          {/* Correction des props de SearchFilters */}
          <SearchFilters 
            filters={filters}
            setFilters={setFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="lg:col-span-3">
          {/* Contenu des résultats de recherche */}
          <div className="mb-6 space-y-6">
            {/* Exemple d'ArtisanCard */}
            <ArtisanCard />
            <ArtisanCard />
            <ArtisanCard />
            <ArtisanCard />
            <ArtisanCard />
          </div>
          
          {/* Correction des props de PaginationComponent */}
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
