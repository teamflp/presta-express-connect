
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search as SearchIcon, Filter, X, Star, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';

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
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Example search suggestions based on professions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const suggestions = [
        ...professions.filter(p => 
          p.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 3),
        // Add some service type suggestions based on professions
        ...['installation', 'réparation', 'maintenance', 'conseil']
          .map(service => `${service} ${searchQuery}`)
          .slice(0, 2)
      ];
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, professions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(e.target.value);
    setShowSuggestions(e.target.value.length > 1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchQueryChange(suggestion);
    setShowSuggestions(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: name === 'minRating' ? parseFloat(value) : value
    });
    
    // Show toast message when filter is applied
    if (name === 'profession' && value) {
      toast.success(`Filtrage par profession: ${value}`);
    } else if (name === 'location' && value) {
      toast.success(`Filtrage par location: ${value}`);
    } else if (name === 'minRating' && parseFloat(value) > 0) {
      toast.success(`Filtrage par note minimum: ${value}+ étoiles`);
    }
  };

  const toggleFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const clearFilterByName = (filterName: string) => {
    if (filterName === 'all') {
      onClearFilters();
      return;
    }
    
    onFilterChange({
      ...filters,
      [filterName]: filterName === 'minRating' ? 0 : ''
    });
  };

  const hasActiveFilters = filters.profession || filters.location || filters.minRating > 0 || filters.sortBy !== 'rating';
  const activeFiltersCount = [
    filters.profession, 
    filters.location, 
    filters.minRating > 0 ? 'rating' : null,
    filters.sortBy !== 'rating' ? 'sort' : null
  ].filter(Boolean).length;

  return (
    <div className="filter-container animate-fadeIn">
      <div className="filter-header">
        <h3 className="text-gray-800 font-semibold">Affiner votre recherche</h3>
        <button
          onClick={toggleFilters}
          className={`filter-toggle-button hover:bg-gray-200 transition-all duration-300 ${showAdvancedFilters ? 'bg-gray-200' : ''}`}
          aria-expanded={showAdvancedFilters}
          aria-controls="advanced-filters"
        >
          <Filter size={16} />
          <span className="mx-1">Filtres</span>
          {activeFiltersCount > 0 && (
            <span className="filter-count">{activeFiltersCount}</span>
          )}
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
            onFocus={() => {
              setInputFocused(true);
              setShowSuggestions(searchQuery.length > 1);
            }}
            onBlur={() => {
              setTimeout(() => {
                setInputFocused(false);
                setShowSuggestions(false);
              }, 200);
            }}
            placeholder="Nom de l'artisan, profession, type de service..."
            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C63E46] focus:border-transparent text-sm shadow-sm"
            aria-label="Rechercher"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchQueryChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#C63E46] transition-colors"
            >
              <X size={16} />
            </button>
          )}
          {showSuggestions && searchSuggestions.length > 0 && inputFocused && (
            <div className="search-suggestions">
              {searchSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="search-suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <SearchIcon size={16} className="text-gray-400 mr-2" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          {inputFocused && (
            <div className="search-help-text">
              <Info size={14} className="text-blue-500 mr-1" />
              <span>Astuce: recherchez par nom d'artisan, profession ou type de service</span>
            </div>
          )}
        </div>
        
        {showAdvancedFilters && (
          <div id="advanced-filters" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 animate-fadeIn">
            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                Profession
              </label>
              <select
                id="profession"
                name="profession"
                value={filters.profession}
                onChange={handleSelectChange}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white shadow-sm"
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
                className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white shadow-sm"
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
              <div className="flex items-center">
                <select
                  id="minRating"
                  name="minRating"
                  value={filters.minRating}
                  onChange={handleSelectChange}
                  className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white shadow-sm"
                >
                  <option value="0">Toutes les évaluations</option>
                  <option value="3">3+ étoiles</option>
                  <option value="4">4+ étoiles</option>
                  <option value="4.5">4.5+ étoiles</option>
                </select>
                <Star size={16} className="text-yellow-500 ml-2" />
              </div>
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
                className="w-full p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C63E46] bg-white shadow-sm"
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
              <span className="active-filter-item" title="Cliquez pour supprimer ce filtre">
                {filters.profession}
                <button 
                  onClick={() => clearFilterByName('profession')}
                  className="ml-1 text-gray-500 hover:text-[#C63E46]"
                  aria-label={`Supprimer le filtre ${filters.profession}`}
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.location && (
              <span className="active-filter-item" title="Cliquez pour supprimer ce filtre">
                {filters.location}
                <button 
                  onClick={() => clearFilterByName('location')}
                  className="ml-1 text-gray-500 hover:text-[#C63E46]"
                  aria-label={`Supprimer le filtre ${filters.location}`}
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.minRating > 0 && (
              <span className="active-filter-item" title="Cliquez pour supprimer ce filtre">
                {filters.minRating}+ étoiles
                <button 
                  onClick={() => clearFilterByName('minRating')}
                  className="ml-1 text-gray-500 hover:text-[#C63E46]"
                  aria-label="Supprimer le filtre d'évaluation minimale"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.sortBy !== 'rating' && (
              <span className="active-filter-item" title="Cliquez pour supprimer ce tri">
                Trié par: {filters.sortBy === 'name' ? 'Nom' : filters.sortBy}
                <button 
                  onClick={() => onFilterChange({...filters, sortBy: 'rating'})}
                  className="ml-1 text-gray-500 hover:text-[#C63E46]"
                  aria-label="Réinitialiser le tri"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
          <button
            onClick={onClearFilters}
            className="filter-reset-button ml-auto hover:bg-[#b73840] transition-all duration-300"
            title="Effacer tous les filtres"
          >
            <X size={16} className="mr-1" />
            Effacer tous les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
