
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search as SearchIcon, Filter, X } from 'lucide-react';

interface Filter {
  profession: string;
  location: string;
  minRating: number;
  sortBy: string;
}

interface SearchFiltersProps {
  searchQuery: string;
  filters: Filter;
  professions: string[];
  locations: string[];
  onSearchQueryChange: (query: string) => void;
  onFilterChange: (filters: Filter) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  filters,
  professions,
  locations,
  onSearchQueryChange,
  onFilterChange,
  onClearFilters
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: name === 'minRating' ? parseFloat(value) : value
    });
  };

  const toggleFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const hasActiveFilters = filters.profession || filters.location || filters.minRating > 0 || filters.sortBy !== 'rating';

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h3>Affiner votre recherche</h3>
        <button
          onClick={toggleFilters}
          className="filter-toggle-button"
        >
          <Filter size={16} />
          Filtres
          {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      <div className="filter-body">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Rechercher un artisan par nom, métier..."
            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C63E46] focus:border-transparent text-sm"
            aria-label="Rechercher"
          />
        </div>
        
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 animate-fadeIn">
            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                Profession
              </label>
              <select
                id="profession"
                name="profession"
                value={filters.profession}
                onChange={handleSelectChange}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white"
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
                onChange={handleSelectChange}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white"
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
                onChange={handleSelectChange}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white"
              >
                <option value="0">Toutes les évaluations</option>
                <option value="3">3+ étoiles</option>
                <option value="4">4+ étoiles</option>
                <option value="4.5">4.5+ étoiles</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Trier par
              </label>
              <select
                id="sortBy"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleSelectChange}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white"
              >
                <option value="rating">Meilleure évaluation</option>
                <option value="name">Nom (A-Z)</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {hasActiveFilters && (
        <div className="filter-footer">
          <span className="text-gray-500 font-medium text-sm">Filtres actifs:</span>
          <div className="active-filters">
            {filters.profession && (
              <span className="active-filter-item">
                {filters.profession}
              </span>
            )}
            {filters.location && (
              <span className="active-filter-item">
                {filters.location}
              </span>
            )}
            {filters.minRating > 0 && (
              <span className="active-filter-item">
                {filters.minRating}+ étoiles
              </span>
            )}
            {filters.sortBy !== 'rating' && (
              <span className="active-filter-item">
                Trié par: {filters.sortBy === 'name' ? 'Nom' : filters.sortBy}
              </span>
            )}
          </div>
          <button
            onClick={onClearFilters}
            className="filter-reset-button ml-auto"
            title="Effacer tous les filtres"
          >
            <X size={16} className="mr-1" />
            Effacer
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
