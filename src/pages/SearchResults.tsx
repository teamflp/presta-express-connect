import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import SearchFilters from '../components/Search/SearchFilters';
import ArtisanCard, { Artisan } from '../components/Search/ArtisanCard';
import NoResults from '../components/Search/NoResults';
import PaginationComponent from '../components/Pagination/PaginationComponent';

// Sample data for artisans
const mockArtisans: Artisan[] = [
  {
    id: 1,
    name: "Jean Dupont",
    job: "Plombier",
    city: "Lyon",
    rating: 4.8,
    reviews: 124,
    image: "/src/assets/images/plomberie.jpg",
    description: "Plombier professionnel avec plus de 15 ans d'expérience."
  },
  {
    id: 2,
    name: "Marie Martin",
    job: "Électricienne",
    city: "Paris",
    rating: 4.9,
    reviews: 89,
    image: "/src/assets/images/installation-electrique.jpg",
    description: "Spécialiste en installations électriques et dépannage."
  },
  {
    id: 3,
    name: "Pierre Durand",
    job: "Peintre",
    city: "Marseille",
    rating: 4.7,
    reviews: 65,
    image: "/src/assets/images/peinture-interieure.jpg",
    description: "Expert en peinture intérieure et extérieure."
  },
  {
    id: 4,
    name: "Sophie Lefebvre",
    job: "Jardinière",
    city: "Bordeaux",
    rating: 4.5,
    reviews: 42,
    image: "/src/assets/images/jardinier.jpg",
    description: "Création et entretien de jardins et espaces verts."
  },
  {
    id: 5,
    name: "Luc Bernard",
    job: "Menuisier",
    city: "Toulouse",
    rating: 4.6,
    reviews: 78,
    image: "/src/assets/images/menuisier.jpg",
    description: "Fabrication et installation de meubles sur mesure."
  },
  {
    id: 6,
    name: "Isabelle Garnier",
    job: "Carreleuse",
    city: "Nice",
    rating: 4.4,
    reviews: 32,
    image: "/src/assets/images/carreleur.jpg",
    description: "Pose de carrelage pour salles de bains et cuisines."
  },
  {
    id: 7,
    name: "Thomas Richard",
    job: "Chauffagiste",
    city: "Strasbourg",
    rating: 4.7,
    reviews: 95,
    image: "/src/assets/images/chauffagiste.jpg",
    description: "Installation et maintenance de systèmes de chauffage."
  },
  {
    id: 8,
    name: "Nathalie Dubois",
    job: "Plombière",
    city: "Nantes",
    rating: 4.9,
    reviews: 110,
    image: "/src/assets/images/plomberie.jpg",
    description: "Dépannage et installation de plomberie en urgence."
  },
  {
    id: 9,
    name: "Antoine Meunier",
    job: "Électricien",
    city: "Lille",
    rating: 4.6,
    reviews: 58,
    image: "/src/assets/images/installation-electrique.jpg",
    description: "Mise aux normes et rénovation électrique."
  },
  {
    id: 10,
    name: "Julie Roussel",
    job: "Peintre",
    city: "Reims",
    rating: 4.5,
    reviews: 48,
    image: "/src/assets/images/peinture-interieure.jpg",
    description: "Peinture décorative et revêtements muraux."
  }
];

function SearchResults() {
  const location = useLocation();
  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const [artisans, setArtisans] = useState<Artisan[]>(mockArtisans);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>(mockArtisans);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Extract search query from URL
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const locationParam = query.get('location');
    setSearchLocation(locationParam);
    
    // If there's a location filter, apply it
    if (locationParam) {
      const filtered = mockArtisans.filter(artisan => 
        artisan.city.toLowerCase().includes(locationParam.toLowerCase())
      );
      setFilteredArtisans(filtered);
    } else {
      setFilteredArtisans(mockArtisans);
    }
  }, [location]);
  
  // Get current artisans for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArtisans = filteredArtisans.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle contact button click
  const handleContact = (artisan: Artisan) => {
    console.log("Contact requested for:", artisan.name);
    // In a real app, this would navigate to a contact form or open a modal
  };

  return (
    <div className="App">
      <NavBar />
      
      <div className="container my-5">
        <div className="row">
          {/* Filters column */}
          <div className="col-lg-3 mb-4">
            <SearchFilters 
              location={searchLocation || ''} 
              onFilterChange={() => {}} 
            />
          </div>
          
          {/* Results column */}
          <div className="col-lg-9">
            <h2 className="mb-4">
              {searchLocation ? `Résultats pour "${searchLocation}"` : 'Tous les artisans'}
            </h2>
            
            {currentArtisans.length > 0 ? (
              <>
                {currentArtisans.map(artisan => (
                  <ArtisanCard 
                    key={artisan.id} 
                    artisan={artisan}
                    onContact={handleContact}
                  />
                ))}
                
                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4">
                  <PaginationComponent 
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredArtisans.length}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <NoResults location={searchLocation} />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default SearchResults;
