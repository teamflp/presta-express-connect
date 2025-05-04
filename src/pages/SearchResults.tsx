
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArtisanCard from '../components/Search/ArtisanCard';
import SearchFilters from '../components/Search/SearchFilters';
import NoResults from '../components/Search/NoResults';
import PaginationComponent from '../components/Pagination/PaginationComponent';

// Define the artisan type to match what ArtisanCard expects
interface Artisan {
  id: number;
  name: string;
  profession: string;
  location: string;
  distance: number;
  description: string;
  rating: number;
  services: string[];
  availability: string;
  image?: string;
}

interface FiltersState {
  service?: string;
  rating?: number;
  distance?: number;
  availability?: string;
}

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get('location');
  
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockArtisans: Artisan[] = locationParam ? 
        [
          {
            id: 1,
            name: "Jean Dupont",
            profession: "Électricien",
            location: locationParam,
            distance: 3.5,
            description: "Électricien professionnel avec 15 ans d'expérience.",
            rating: 4.7,
            services: ["Installation", "Dépannage", "Rénovation"],
            availability: "Disponible dès demain",
            image: "/src/assets/images/lyon.jpg"
          }
        ] : [];
      
      setArtisans(mockArtisans);
      setTotalPages(Math.ceil(mockArtisans.length / 10));
      setLoading(false);
    }, 1000);
  }, [locationParam]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleFilterChange = (filters: FiltersState) => {
    console.log("Filters changed:", filters);
    // In a real app, you would filter the artisans list here
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {artisans.length > 0 
          ? `Artisans disponibles ${locationParam ? `à ${locationParam}` : ''}`
          : "Résultats de recherche"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="md:col-span-3">
          {artisans.length > 0 ? (
            <div className="space-y-4">
              {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
              
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <PaginationComponent 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                  />
                </div>
              )}
            </div>
          ) : (
            <NoResults location={locationParam} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
