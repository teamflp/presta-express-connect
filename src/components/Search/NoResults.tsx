
import React from 'react';

interface NoResultsProps {
  searchTerm: string;
  resetSearch: () => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const NoResults: React.FC<NoResultsProps> = ({ 
  searchTerm, 
  resetSearch, 
  resetFilters,
  hasActiveFilters 
}) => {
  return (
    <div className="text-center py-5 no-results-container p-5">
      <div className="mb-4">
        <span className="display-1 text-muted">
          <i className="bi bi-search"></i>
        </span>
      </div>
      <h3>Aucun artisan trouvé{searchTerm ? ` pour "${searchTerm}"` : ''}</h3>
      <p className="text-muted mb-4">
        {hasActiveFilters 
          ? 'Vos critères de recherche sont peut-être trop restrictifs.'
          : 'Essayez d\'élargir votre recherche ou de modifier vos termes.'}
      </p>
      
      <div className="row mt-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="suggestion-action-card text-center">
            <h5 className="mb-3">Élargir la recherche</h5>
            <p className="mb-3">Essayez des termes plus généraux ou une zone géographique plus large</p>
            <button 
              className="btn btn-outline-secondary"
              onClick={resetSearch}
            >
              Effacer la recherche
            </button>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="suggestion-action-card text-center">
            <h5 className="mb-3">Modifier les filtres</h5>
            <p className="mb-3">Supprimez certains filtres pour obtenir plus de résultats</p>
            <button 
              className="btn" 
              style={{ backgroundColor: '#C63E46', color: 'white' }}
              onClick={resetFilters}
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-5">
        <h5 className="mb-3">Vous pourriez être intéressé par</h5>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {['Plombier', 'Électricien', 'Peintre', 'Menuisier', 'Carreleur'].map(suggestion => (
            <span key={suggestion} className="filter-suggestion-chip">
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoResults;
