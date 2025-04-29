
import React from 'react';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  selectedDistance: string;
  setSelectedDistance: (distance: string) => void;
  selectedAvailability: string;
  setSelectedAvailability: (availability: string) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
  resetFilters: () => void;
  activeFiltersCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedDistance,
  setSelectedDistance,
  selectedAvailability,
  setSelectedAvailability,
  selectedServices,
  setSelectedServices,
  selectedRating,
  setSelectedRating,
  resetFilters,
  activeFiltersCount
}) => {
  // Available service options
  const serviceOptions = [
    'Installation électrique',
    'Dépannage électrique',
    'Plomberie',
    'Chauffage',
    'Menuiserie',
    'Peinture intérieure',
    'Peinture extérieure',
    'Rénovation',
    'Sanitaires'
  ];

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };
  
  return (
    <div className="filter-container mb-4">
      <div className="filter-header">
        <h3>Filtres</h3>
        {activeFiltersCount > 0 && (
          <span className="badge bg-light text-danger">
            {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      <div className="filter-body">
        {/* Distance filter */}
        <div className="mb-4">
          <label className="form-label fw-bold">Distance</label>
          <div className="d-flex flex-wrap gap-2">
            {['5km', '10km', '20km', '50km'].map(distance => (
              <button
                key={distance}
                type="button"
                className={`btn btn-sm ${selectedDistance === distance ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedDistance(selectedDistance === distance ? '' : distance)}
              >
                {distance}
              </button>
            ))}
          </div>
        </div>
        
        {/* Availability filter */}
        <div className="mb-4">
          <label className="form-label fw-bold">Disponibilité</label>
          <div className="d-flex flex-wrap gap-2">
            {['Aujourd\'hui', 'Cette semaine', 'Ce mois-ci'].map(availability => (
              <button
                key={availability}
                type="button"
                className={`btn btn-sm ${selectedAvailability === availability ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedAvailability(selectedAvailability === availability ? '' : availability)}
              >
                {availability}
              </button>
            ))}
          </div>
        </div>
        
        {/* Services filter */}
        <div className="mb-4">
          <label className="form-label fw-bold">Services</label>
          <div className="d-flex flex-wrap gap-2">
            {serviceOptions.map(service => (
              <button
                key={service}
                type="button"
                className={`btn btn-sm ${selectedServices.includes(service) ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => handleServiceToggle(service)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
        
        {/* Rating filter */}
        <div className="mb-4">
          <label className="form-label fw-bold">Note minimum</label>
          <div className="d-flex flex-wrap gap-2">
            {['3', '4', '4.5', '5'].map(rating => (
              <button
                key={rating}
                type="button"
                className={`btn btn-sm ${selectedRating === rating ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedRating(selectedRating === rating ? '' : rating)}
              >
                {rating} <i className="bi bi-star-fill ms-1"></i>
              </button>
            ))}
          </div>
        </div>

        {/* Active filters */}
        {activeFiltersCount > 0 && (
          <div className="mb-4">
            <label className="form-label fw-bold">Filtres actifs</label>
            <div className="active-filters">
              {selectedDistance && (
                <div className="active-filter-item" onClick={() => setSelectedDistance('')}>
                  Max {selectedDistance} <X size={14} />
                </div>
              )}
              {selectedAvailability && (
                <div className="active-filter-item" onClick={() => setSelectedAvailability('')}>
                  {selectedAvailability} <X size={14} />
                </div>
              )}
              {selectedServices.map(service => (
                <div 
                  key={service} 
                  className="active-filter-item" 
                  onClick={() => handleServiceToggle(service)}
                >
                  {service} <X size={14} />
                </div>
              ))}
              {selectedRating && (
                <div className="active-filter-item" onClick={() => setSelectedRating('')}>
                  {selectedRating}+ étoiles <X size={14} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {activeFiltersCount > 0 && (
        <div className="filter-footer">
          <button
            type="button"
            className="filter-reset-button ms-auto"
            onClick={resetFilters}
          >
            <i className="bi bi-x-circle me-2"></i>
            Réinitialiser tous les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
