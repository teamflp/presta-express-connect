
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FaSearch, FaMapPin, FaFilter } from 'react-icons/fa';
import '../assets/styles/components/search.css';

// Composant de la barre de recherche avec localisation
const LocationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('Brunoy, 91800');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-location-container bg-white shadow-lg rounded-lg p-4 mb-4 relative animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-grow relative">
          <div className="flex items-center border rounded-lg bg-gray-50 px-3 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-300 transition-all">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              className="search-input border-0 bg-gray-50 focus:outline-none py-3 w-full"
              placeholder="Rechercher un artisan par métier, service..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {showSuggestions && (
            <div className="search-suggestions animate-fadeIn">
              <div className="search-suggestion-item" onClick={() => setSearchTerm('Plombier')}>
                <span>Plombier</span>
              </div>
              <div className="search-suggestion-item" onClick={() => setSearchTerm('Électricien')}>
                <span>Électricien</span>
              </div>
              <div className="search-suggestion-item" onClick={() => setSearchTerm('Peintre')}>
                <span>Peintre</span>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="flex items-center border rounded-lg bg-gray-50 px-3 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-300 transition-all">
            <FaMapPin className="text-gray-400 mr-2" />
            <input
              type="text"
              className="search-input border-0 bg-gray-50 focus:outline-none py-3 w-full"
              placeholder="Localisation"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button className="filter-toggle-button md:px-4 bg-gray-100 hover:bg-gray-200 flex items-center gap-2 py-3 rounded-lg transition-all">
          <FaFilter className="text-gray-500" />
          <span className="hidden md:inline">Filtres</span>
          <span className="filter-count">3</span>
        </button>
      </div>
    </div>
  );
};

// Composant pour les filtres de recherche
const SearchFilters = () => {
  return (
    <div className="filter-container mb-5 animate-fadeIn">
      <div className="filter-header">
        <h3>Affiner votre recherche</h3>
        <button className="text-sm text-red-600 font-medium">Réinitialiser</button>
      </div>
      <div className="filter-body">
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Filtres appliqués</p>
          <div className="active-filters">
            <div className="active-filter-item">
              <span>Plomberie</span>
              <span className="cursor-pointer">×</span>
            </div>
            <div className="active-filter-item">
              <span>Moins de 10 km</span>
              <span className="cursor-pointer">×</span>
            </div>
            <div className="active-filter-item">
              <span>Disponible aujourd'hui</span>
              <span className="cursor-pointer">×</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Distance</p>
          <div className="flex gap-2 flex-wrap">
            <button className="artisan-badge">Moins de 5 km</button>
            <button className="artisan-badge">5 - 10 km</button>
            <button className="artisan-badge">10 - 20 km</button>
            <button className="artisan-badge">Plus de 20 km</button>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Disponibilité</p>
          <div className="flex gap-2 flex-wrap">
            <button className="artisan-badge">Aujourd'hui</button>
            <button className="artisan-badge">Cette semaine</button>
            <button className="artisan-badge">Ce week-end</button>
            <button className="artisan-badge">Sur rendez-vous</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour afficher les résultats de recherche d'artisans
const ArtisanResults = ({ isLoading, hasResults }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }
  
  if (!hasResults) {
    return (
      <div className="no-results-container p-6 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun artisan trouvé avec ces critères</h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            Nous n'avons pas trouvé d'artisans correspondant exactement à votre recherche. Essayez d'ajuster vos critères ou découvrez nos suggestions ci-dessous.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
          <h4 className="font-semibold text-lg mb-3">Suggestions pour affiner votre recherche</h4>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="filter-suggestion-chip">Élargir à 25 km</button>
            <button className="filter-suggestion-chip">Tous les jours de disponibilité</button>
            <button className="filter-suggestion-chip">Services similaires</button>
          </div>
          
          <p className="text-sm text-gray-600">Vous pouvez également essayer d'autres mots-clés ou catégories</p>
        </div>
        
        <h4 className="font-semibold text-lg mb-4">Artisans populaires près de Brunoy</h4>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="suggestion-action-card">
              <div className="font-medium text-gray-800 mb-1">Jean Dupont</div>
              <div className="text-sm text-gray-500 mb-2">Électricien • 12 km</div>
              <div className="flex gap-1">
                <div className="artisan-badge text-xs">Disponible</div>
                <div className="artisan-badge text-xs">4.8 ★</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="artisan-contact-btn">
            Créer une demande de service
          </button>
          <p className="mt-2 text-sm text-gray-500">Recevez des devis de plusieurs professionnels</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 animate-fadeIn">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="artisan-card-horizontal">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 h-48 md:h-auto relative">
              <img
                src={`https://source.unsplash.com/random/300x300?handyman&sig=${item}`}
                alt="Artisan"
                className="artisan-image"
              />
              <div className="absolute top-3 right-3">
                <span className="artisan-rating">
                  4.8 ★
                </span>
              </div>
            </div>
            <div className="p-4 md:p-6 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-1">Jean Dupont</h3>
                  <p className="text-gray-600 text-sm mb-2">Électricien • Brunoy (91800) • 3,5 km</p>
                </div>
                <div className="hidden md:block">
                  <button className="artisan-contact-btn">
                    Contacter
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-2">
                Expert en installations électriques, dépannage et mise aux normes. Service rapide et professionnel pour particuliers et entreprises.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="artisan-badge">Installation électrique</span>
                <span className="artisan-badge">Dépannage</span>
                <span className="artisan-badge">Mise aux normes</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="font-semibold text-green-600">Disponible aujourd'hui</span>
                  <span>• Répond en moins de 24h</span>
                </div>
                <div className="md:hidden">
                  <button className="artisan-contact-btn">
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Composant principal de la page de résultats de recherche
const SearchResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasResults, setHasResults] = useState(false);

  // Simuler un chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Changer cette valeur pour tester différents états
      setHasResults(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-2xl font-bold mb-4">Résultats de recherche</h1>
      
      <LocationBar />
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <SearchFilters />
        </div>
        <div className="md:col-span-2">
          <ArtisanResults isLoading={isLoading} hasResults={hasResults} />
        </div>
      </div>
    </Container>
  );
};

export default SearchResults;
