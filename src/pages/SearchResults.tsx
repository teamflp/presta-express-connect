
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import NavBar from '../components/Header/partials/NavBar';
import SearchFilters from '../components/Search/SearchFilters';
import ArtisanResults from '../components/Search/ArtisanResults';
import LocationBar from '../components/Search/LocationBar';

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
  sortBy: string;
}

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchRadius, setSearchRadius] = useState(10); // Default 10km
  const [filters, setFilters] = useState<Filter>({
    profession: '',
    location: '',
    minRating: 0,
    sortBy: 'rating'
  });
  
  // Get location from URL params if present
  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setFilters(prev => ({ ...prev, location: locationParam }));
    }
  }, [searchParams]);

  // Simulating data fetch
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - extended for better testing
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
          },
          {
            id: 6,
            name: 'Claire Rousseau',
            profession: 'Électricienne',
            location: 'Paris',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3',
            description: 'Électricienne spécialisée en domotique et installations smart home.'
          },
          {
            id: 7,
            name: 'Philippe Durand',
            profession: 'Menuisier',
            location: 'Lyon',
            rating: 4.4,
            imageUrl: 'https://images.unsplash.com/photo-1560250097-10c8f3c596ef?ixlib=rb-4.0.3',
            description: 'Menuisier avec expertise en restauration de meubles anciens.'
          }
        ];
        
        setArtisans(mockArtisans);
        setFilteredArtisans(mockArtisans);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des artisans:', error);
        toast.error('Impossible de charger les artisans');
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
          artisan.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      // Apply rating filter
      if (filters.minRating > 0) {
        result = result.filter(artisan => artisan.rating >= filters.minRating);
      }
      
      // Apply sorting
      if (filters.sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }
      
      setFilteredArtisans(result);
    };
    
    applyFilters();
  }, [searchQuery, filters, artisans]);

  // Get unique professions and locations for filters
  const professions = [...new Set(artisans.map(a => a.profession))];
  const locations = [...new Set(artisans.map(a => a.location))];

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      profession: '',
      location: '',
      minRating: 0,
      sortBy: 'rating'
    });
    setSearchQuery('');
    toast.success('Filtres réinitialisés');
  };

  const handleResetFilter = (filterName: string) => {
    if (filterName === 'all') {
      clearFilters();
      return;
    }
    
    setFilters(prev => ({
      ...prev,
      [filterName]: filterName === 'minRating' ? 0 : ''
    }));
    
    toast.success(`Filtre ${filterName} réinitialisé`);
  };

  const expandSearch = () => {
    // Simulate expanding search radius
    setSearchRadius(prev => prev + 15);
    toast.success(`Recherche élargie à ${searchRadius + 15} km`);
    
    // In a real app, we would fetch more artisans here
    // For this demo, let's just pretend we found more artisans by removing location filter
    if (filters.location) {
      setFilters(prev => ({...prev, location: ''}));
    }
  };

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
    toast.success(`Rayon de recherche défini à ${radius} km`);
  };

  return (
    <div className="min-h-screen bg-[#FDFAF7]">
      <NavBar />
      
      <div className="pt-6 pb-4 bg-white shadow">
        <div className="container mx-auto px-4">
          <LocationBar 
            initialLocation={filters.location} 
            onLocationChange={(location) => setFilters(prev => ({...prev, location}))}
            onRadiusChange={handleRadiusChange}
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <SearchFilters 
          searchQuery={searchQuery}
          filters={filters}
          professions={professions}
          locations={locations}
          onSearchQueryChange={handleSearchQueryChange}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
        
        <ArtisanResults 
          artisans={filteredArtisans} 
          isLoading={isLoading}
          onExpandSearch={expandSearch}
          activeFilters={{
            profession: filters.profession,
            location: filters.location,
            minRating: filters.minRating
          }}
          onResetFilter={handleResetFilter}
        />
      </div>
    </div>
  );
};

export default SearchResults;
