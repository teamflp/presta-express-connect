
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Types
interface Artisan {
  id: number;
  name: string;
  profession: string;
  location: string;
  rating: number;
  imageUrl: string;
  description: string;
}

interface Filter {
  profession: string;
  location: string;
  minRating: number;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    profession: '',
    location: '',
    minRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetch
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockArtisans: Artisan[] = [
          {
            id: 1,
            name: 'Jean Dupont',
            profession: 'Plombier',
            location: 'Paris',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1560250056-07ba64664864?ixlib=rb-4.0.3',
            description: 'Plombier professionnel avec plus de 15 ans d\'expérience.'
          },
          {
            id: 2,
            name: 'Marie Lambert',
            profession: 'Électricienne',
            location: 'Lyon',
            rating: 4.5,
            imageUrl: 'https://images.unsplash.com/photo-1573496546735-c274b1fd186f?ixlib=rb-4.0.3',
            description: 'Électricienne certifiée spécialisée dans les installations résidentielles.'
          },
          {
            id: 3,
            name: 'Ahmed Benali',
            profession: 'Menuisier',
            location: 'Marseille',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1613294326794-e7c71a208164?ixlib=rb-4.0.3',
            description: 'Menuisier artisan créant des meubles sur mesure.'
          },
          {
            id: 4,
            name: 'Sophie Martin',
            profession: 'Peintre',
            location: 'Paris',
            rating: 4.6,
            imageUrl: 'https://images.unsplash.com/photo-1598300188783-9a950f650a6e?ixlib=rb-4.0.3',
            description: 'Peintre décoratrice proposant des services de rénovation intérieure.'
          },
          {
            id: 5,
            name: 'Thomas Leroy',
            profession: 'Plombier',
            location: 'Lyon',
            rating: 4.3,
            imageUrl: 'https://images.unsplash.com/photo-1586307078048-b065cc6855e1?ixlib=rb-4.0.3',
            description: 'Spécialiste en réparation de plomberie et installation de salles de bain.'
          }
        ];
        
        setArtisans(mockArtisans);
        setFilteredArtisans(mockArtisans);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des artisans:', error);
        setIsLoading(false);
      }
    };
    
    fetchArtisans();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    const applyFilters = () => {
      let result = [...artisans];
      
      // Apply text search
      if (searchQuery) {
        result = result.filter(artisan => 
          artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          artisan.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artisan.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply profession filter
      if (filters.profession) {
        result = result.filter(artisan => 
          artisan.profession.toLowerCase() === filters.profession.toLowerCase()
        );
      }
      
      // Apply location filter
      if (filters.location) {
        result = result.filter(artisan => 
          artisan.location.toLowerCase() === filters.location.toLowerCase()
        );
      }
      
      // Apply rating filter
      if (filters.minRating > 0) {
        result = result.filter(artisan => artisan.rating >= filters.minRating);
      }
      
      setFilteredArtisans(result);
    };
    
    applyFilters();
  }, [searchQuery, filters, artisans]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'minRating' ? parseFloat(value) : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      profession: '',
      location: '',
      minRating: 0
    });
    setSearchQuery('');
  };

  // Get unique professions and locations for filters
  const professions = [...new Set(artisans.map(a => a.profession))];
  const locations = [...new Set(artisans.map(a => a.location))];

  return (
    <div className="min-h-screen bg-[#FDFAF7] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Trouvez l'artisan idéal pour votre projet
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un artisan par nom, métier..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C63E46] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              <FaFilter /> Filtres
            </button>
            
            {filters.profession || filters.location || filters.minRating > 0 ? (
              <button
                onClick={clearFilters}
                className="bg-[#C63E46] hover:bg-[#A33138] text-white px-4 py-2 rounded-md transition-colors"
              >
                Effacer les filtres
              </button>
            ) : null}
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                  Profession
                </label>
                <select
                  id="profession"
                  name="profession"
                  value={filters.profession}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46]"
                >
                  <option value="">Toutes les professions</option>
                  {professions.map(profession => (
                    <option key={profession} value={profession}>{profession}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <select
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46]"
                >
                  <option value="">Toutes les villes</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">
                  Évaluation minimale
                </label>
                <select
                  id="minRating"
                  name="minRating"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46]"
                >
                  <option value="0">Toutes les évaluations</option>
                  <option value="3">3+ étoiles</option>
                  <option value="4">4+ étoiles</option>
                  <option value="4.5">4.5+ étoiles</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C63E46]"></div>
          </div>
        ) : filteredArtisans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan) => (
              <div key={artisan.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={artisan.imageUrl}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{artisan.name}</h2>
                    <div className="flex items-center bg-[#C63E46] text-white px-2 py-1 rounded text-sm">
                      {artisan.rating} ★
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                      {artisan.profession}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {artisan.location}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {artisan.description}
                  </p>
                  <button className="w-full bg-[#C63E46] hover:bg-[#A33138] text-white py-2 rounded-md transition-colors">
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun artisan trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
