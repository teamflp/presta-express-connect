
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import SearchFilters from '../components/Search/SearchFilters';
import ArtisanCard from '../components/Search/ArtisanCard';
import NoResults from '../components/Search/NoResults';
import { Search, Filter, MapPin } from 'lucide-react';
import '../assets/styles/components/search.css';

// Artisan interface definition
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

// Main search results component
const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || 'Brunoy, 91800');
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  
  // Filter states
  const [selectedDistance, setSelectedDistance] = useState<string>(searchParams.get('distance') || '');
  const [selectedAvailability, setSelectedAvailability] = useState<string>(searchParams.get('availability') || '');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    searchParams.get('services') ? searchParams.get('services')!.split(',') : []
  );
  const [selectedRating, setSelectedRating] = useState<string>(searchParams.get('rating') || '');

  // Mock data for artisans
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockArtisans: Artisan[] = [
        {
          id: 1,
          name: 'Jean Dupont',
          profession: 'Électricien',
          location: 'Brunoy (91800)',
          distance: 3.5,
          description: 'Expert en installations électriques, dépannage et mise aux normes.',
          rating: 4.8,
          services: ['Installation électrique', 'Dépannage'],
          availability: 'Aujourd\'hui'
        },
        {
          id: 2,
          name: 'Marie Laurent',
          profession: 'Plombière',
          location: 'Yerres (91330)',
          distance: 5.2,
          description: 'Spécialiste en plomberie générale, chauffage et sanitaires.',
          rating: 4.6,
          services: ['Plomberie', 'Chauffage', 'Sanitaires'],
          availability: 'Cette semaine'
        },
        {
          id: 3,
          name: 'Pierre Martin',
          profession: 'Menuisier',
          location: 'Épinay-sous-Sénart (91860)',
          distance: 4.7,
          description: 'Artisan menuisier avec 15 ans d\'expérience, spécialisé en menuiserie sur mesure.',
          rating: 4.9,
          services: ['Menuiserie', 'Fabrication sur mesure', 'Rénovation'],
          availability: 'Cette semaine'
        },
        {
          id: 4,
          name: 'Sophie Dubois',
          profession: 'Peintre',
          location: 'Brunoy (91800)',
          distance: 1.8,
          description: 'Peinture intérieure et extérieure, enduits décoratifs, revêtements muraux.',
          rating: 4.5,
          services: ['Peinture intérieure', 'Peinture extérieure', 'Revêtements'],
          availability: 'Dans 2 semaines'
        }
      ];
      setArtisans(mockArtisans);
      setFilteredArtisans(mockArtisans);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Apply filters
  useEffect(() => {
    if (!isLoading) {
      let results = [...artisans];
      
      // Filter by search term
      if (searchTerm) {
        results = results.filter(artisan => 
          artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          artisan.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artisan.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      // Filter by distance
      if (selectedDistance) {
        const maxDistance = parseInt(selectedDistance.replace('km', ''));
        results = results.filter(artisan => artisan.distance <= maxDistance);
      }
      
      // Filter by availability
      if (selectedAvailability) {
        results = results.filter(artisan => artisan.availability === selectedAvailability);
      }
      
      // Filter by services
      if (selectedServices.length > 0) {
        results = results.filter(artisan => 
          selectedServices.some(service => 
            artisan.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
          )
        );
      }
      
      // Filter by rating
      if (selectedRating) {
        const minRating = parseFloat(selectedRating);
        results = results.filter(artisan => artisan.rating >= minRating);
      }
      
      setFilteredArtisans(results);
      
      // Update URL params
      const params = new URLSearchParams();
      if (searchTerm) params.set('q', searchTerm);
      if (location) params.set('location', location);
      if (selectedDistance) params.set('distance', selectedDistance);
      if (selectedAvailability) params.set('availability', selectedAvailability);
      if (selectedServices.length > 0) params.set('services', selectedServices.join(','));
      if (selectedRating) params.set('rating', selectedRating);
      
      setSearchParams(params);
    }
  }, [searchTerm, selectedDistance, selectedAvailability, selectedServices, selectedRating, isLoading, artisans]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL and trigger filter
    const params = new URLSearchParams(searchParams);
    params.set('q', searchTerm);
    params.set('location', location);
    setSearchParams(params);
  };

  const handleContactArtisan = (id: number) => {
    toast.success("Demande de contact envoyée !");
    // Navigate to contact page
    navigate(`/contact-professional/${id}`);
  };

  const resetFilters = () => {
    setSelectedDistance('');
    setSelectedAvailability('');
    setSelectedServices([]);
    setSelectedRating('');
    toast.success("Filtres réinitialisés");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const activeFiltersCount = [
    selectedDistance, 
    selectedAvailability, 
    ...(selectedServices.length > 0 ? ['services'] : []), 
    selectedRating
  ].filter(Boolean).length;

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h1 className="text-2xl font-bold mb-4">Résultats de recherche</h1>
        
        <div className="search-location-container bg-white shadow-lg rounded-lg p-4 mb-4">
          <form onSubmit={handleSearch} className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={18} />
                </span>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Rechercher un artisan par métier, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text">
                  <MapPin size={18} />
                </span>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Localisation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <button 
                type="button" 
                className="btn w-100 d-flex align-items-center justify-content-center" 
                style={{ backgroundColor: '#C63E46', color: 'white' }}
                onClick={toggleFilters}
              >
                <Filter size={18} className="me-2" />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="ms-2 badge bg-white text-danger">{activeFiltersCount}</span>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredArtisans.length > 0 ? (
          <div className="row">
            <div className={`col-md-3 ${showFilters ? 'd-block' : 'd-none d-md-block'}`}>
              <SearchFilters 
                selectedDistance={selectedDistance}
                setSelectedDistance={setSelectedDistance}
                selectedAvailability={selectedAvailability}
                setSelectedAvailability={setSelectedAvailability}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                resetFilters={resetFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
            <div className={`${showFilters ? 'col-md-9' : 'col-md-12'}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="m-0">
                  <strong>{filteredArtisans.length}</strong> artisans trouvés
                </p>
                <div>
                  <select 
                    className="form-select"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'distance') {
                        setFilteredArtisans([...filteredArtisans].sort((a, b) => a.distance - b.distance));
                      } else if (value === 'rating') {
                        setFilteredArtisans([...filteredArtisans].sort((a, b) => b.rating - a.rating));
                      }
                    }}
                  >
                    <option value="">Trier par</option>
                    <option value="distance">Distance</option>
                    <option value="rating">Note</option>
                  </select>
                </div>
              </div>
              
              {filteredArtisans.map(artisan => (
                <ArtisanCard 
                  key={artisan.id} 
                  artisan={artisan} 
                  onContact={() => handleContactArtisan(artisan.id)} 
                />
              ))}
            </div>
          </div>
        ) : (
          <NoResults 
            searchTerm={searchTerm}
            resetSearch={() => setSearchTerm('')}
            resetFilters={resetFilters}
            hasActiveFilters={activeFiltersCount > 0}
          />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default SearchResults;
