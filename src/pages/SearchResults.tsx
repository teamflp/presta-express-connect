
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import SearchFilters from '../components/Search/SearchFilters';
import ArtisanCard from '../components/Search/ArtisanCard';
import NoResults from '../components/Search/NoResults';
import PaginationComponent from '../components/Pagination/PaginationComponent';

// Mock data for demonstration
const mockArtisans = [
  {
    id: 1,
    name: 'Jean Dupont',
    profession: 'Électricien',
    city: 'Lyon',
    rating: 4.8,
    reviewCount: 124,
    image: '/src/assets/images/lyon.jpg',
    description: 'Spécialiste en installations électriques résidentielles et commerciales avec plus de 15 ans d\'expérience.',
  },
  {
    id: 2,
    name: 'Marie Martin',
    profession: 'Plombier',
    city: 'Lyon',
    rating: 4.6,
    reviewCount: 98,
    image: '/src/assets/images/lyon.jpg',
    description: 'Plomberie générale, rénovation de salle de bains et installation de systèmes de chauffage.',
  },
  // More mock data...
];

function SearchResults() {
  const [artisans, setArtisans] = useState(mockArtisans);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get('location');
  
  // Fake loading effect for demo
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchLocation]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, you would fetch data for the new page here
  };
  
  // Filter handling (simplified for demo)
  const handleFilterChange = (filters) => {
    console.log('Applying filters:', filters);
    // In a real app, this would filter the results
  };

  return (
    <div className="App">
      <Navbar />
      
      <Container className="my-5">
        <h1 className="text-3xl font-bold mb-4">
          {searchLocation ? `Résultats pour "${searchLocation}"` : 'Résultats de recherche'}
        </h1>
        
        <Row>
          {/* Filters column */}
          <Col lg={3} className="mb-4">
            <SearchFilters onFilterChange={handleFilterChange} />
          </Col>
          
          {/* Results column */}
          <Col lg={9}>
            {loading ? (
              <div className="text-center py-5">
                <p>Chargement des résultats...</p>
              </div>
            ) : artisans.length > 0 ? (
              <>
                <p className="mb-4">
                  {artisans.length} artisans trouvés
                  {searchLocation && ` près de ${searchLocation}`}
                </p>
                
                {artisans.map((artisan) => (
                  <ArtisanCard key={artisan.id} artisan={artisan} />
                ))}
                
                <div className="mt-4 d-flex justify-content-center">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <NoResults location={searchLocation} />
            )}
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
}

export default SearchResults;
