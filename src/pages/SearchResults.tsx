
import { useState, useEffect } from 'react';
import SearchFilters, { FiltersState } from '../components/Search/SearchFilters';
import ArtisanCard, { Artisan } from '../components/Search/ArtisanCard';
import LocationBar from '../components/Search/LocationBar';
import NoResults from '../components/Search/NoResults';
import PaginationComponent from '../components/Pagination/PaginationComponent';
import { useSearchParams } from 'react-router-dom';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import { toast } from 'react-hot-toast';
import RegistrationArtisan from '../components/SectionProf/RegistrationArtisan';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FiltersState>({
    category: '',
    rating: '',
    distance: '',
    availability: '',
    service: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [location, setLocation] = useState(searchParams.get('location') || 'Paris, France');
  const [searchRadius, setSearchRadius] = useState(10);
  
  const itemsPerPage = 5;
  const totalItems = 25; // Nombre total d'exemples

  // Simuler un chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour simuler la récupération des résultats de recherche
  const generateMockResults = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return Array.from({ length: Math.min(itemsPerPage, totalItems - startIndex) }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Artisan Professionnel ${startIndex + i + 1}`,
      job: ['Plombier', 'Électricien', 'Menuisier', 'Peintre', 'Maçon'][Math.floor(Math.random() * 5)],
      city: location.split(',')[0],
      rating: 4.0 + Math.random(),
      reviews: 5 + Math.floor(Math.random() * 20),
      image: `https://randomuser.me/api/portraits/${Math.random() > 0.7 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`,
      description: 'Expert disponible pour tous types de travaux. Service de qualité et interventions rapides garanties.'
    }));
  };

  // Simuler les résultats de recherche
  const artisans = generateMockResults(currentPage);

  const handleFilterChange = (newFilters: FiltersState) => {
    // Reset to first page when filters change
    setFilters({ ...filters, ...newFilters });
    setCurrentPage(1);
    toast.success('Filtres appliqués avec succès');
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactArtisan = (artisan: Artisan) => {
    toast.success(`Demande de contact envoyée à ${artisan.name}`);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Recherche mise à jour pour ${newLocation}`);
    }, 800);
  };

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
    toast.success(`Rayon de recherche défini à ${radius} km`);
  };

  // Structure JSX
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Résultats de recherche</h1>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin size={18} className="mr-1 text-[#C63E46]" />
          <p className="m-0">Professionnels disponibles près de <span className="font-semibold">{location}</span></p>
        </div>
      </div>
      
      {/* Barre de recherche de localisation améliorée */}
      <LocationBar 
        initialLocation={location}
        onLocationChange={handleLocationChange}
        onRadiusChange={handleRadiusChange}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar avec filtres */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="flex lg:hidden items-center justify-between bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="font-semibold m-0">Filtres de recherche</h3>
              <button 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
            
            {(showFilters || window.innerWidth >= 1024) && (
              <div className="lg:block">
                <SearchFilters onFilterChange={handleFilterChange} />
                <div className="mt-6">
                  <RegistrationArtisan />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 bg-white rounded-lg shadow-sm">
              <div className="spinner-border text-[#C63E46]" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-3 text-gray-600">Recherche des meilleurs professionnels...</p>
            </div>
          ) : artisans.length > 0 ? (
            <>
              <div className="rounded-lg bg-white p-4 shadow-sm mb-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="m-0 text-gray-700">
                    <span className="font-semibold">{totalItems}</span> professionnels trouvés {searchRadius && `dans un rayon de ${searchRadius}km`}
                  </p>
                  <select 
                    className="form-select border-gray-200" 
                    defaultValue="pertinence"
                  >
                    <option value="pertinence">Trier par pertinence</option>
                    <option value="rating">Trier par note</option>
                    <option value="price_low">Trier par prix croissant</option>
                    <option value="price_high">Trier par prix décroissant</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6 space-y-6 animate-fadeIn">
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
            </>
          ) : (
            <NoResults location={location} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
