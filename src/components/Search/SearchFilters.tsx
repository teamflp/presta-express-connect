interface FiltersState {
  service?: string;
  rating?: number;
  distance?: number;
  availability?: string;
}

interface SearchFiltersProps {
  onFilterChange: (filters: FiltersState) => void;
}

function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ service: e.target.value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ rating: Number(e.target.value) });
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ distance: Number(e.target.value) });
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ availability: e.target.value });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-bold text-lg mb-3">Filtres</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
        <select 
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={handleServiceChange}
        >
          <option value="">Tous les services</option>
          <option value="installation">Installation</option>
          <option value="reparation">Réparation</option>
          <option value="renovation">Rénovation</option>
          <option value="conseil">Conseil</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Note minimale</label>
        <select 
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={handleRatingChange}
        >
          <option value="">Toutes les notes</option>
          <option value="4">4+ étoiles</option>
          <option value="3">3+ étoiles</option>
          <option value="2">2+ étoiles</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
        <select 
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={handleDistanceChange}
        >
          <option value="">Toutes distances</option>
          <option value="5">Moins de 5 km</option>
          <option value="10">Moins de 10 km</option>
          <option value="20">Moins de 20 km</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
        <select 
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={handleAvailabilityChange}
        >
          <option value="">Toutes disponibilités</option>
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois-ci</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilters;
