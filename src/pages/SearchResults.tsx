
import { useState, useEffect } from 'react';
import SearchFilters from '../components/Search/SearchFilters';
import ArtisanCard, { Artisan } from '../components/Search/ArtisanCard';
import PaginationComponent from '../components/Pagination/PaginationComponent';
import { useSearchParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import RegistrationArtisan from '../components/SectionProf/RegistrationArtisan';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    distance: '',
    availability: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Récupérer le paramètre de localisation depuis l'URL
  const location = searchParams.get('location') || 'Paris, France';
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
      city: 'Paris',
      rating: 4.0 + Math.random(),
      reviews: 5 + Math.floor(Math.random() * 20),
      image: `https://randomuser.me/api/portraits/${Math.random() > 0.7 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`,
      description: 'Expert disponible pour tous types de travaux. Service de qualité et interventions rapides garanties.'
    }));
  };

  // Simuler les résultats de recherche
  const artisans = generateMockResults(currentPage);

  const handleFilterChange = (newFilters: typeof filters) => {
    // Reset to first page when filters change
    setFilters(newFilters);
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

  // Structure JSX
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Résultats de recherche</h1>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin size={18} className="mr-1 text-primary" />
          <p className="m-0">Professionnels disponibles près de <span className="font-semibold">{location}</span></p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <SearchFilters onFilterChange={handleFilterChange} />
            <div className="mt-6">
              <RegistrationArtisan />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-3 text-gray-600">Recherche des meilleurs professionnels...</p>
            </div>
          ) : (
            <>
              <div className="rounded-lg bg-white p-4 shadow-sm mb-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="m-0 text-gray-700">
                    <span className="font-semibold">{totalItems}</span> professionnels trouvés
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
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
