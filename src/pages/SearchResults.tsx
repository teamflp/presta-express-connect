
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

// Main search results component
const SearchResults: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasResults, setHasResults] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Change this value to test different states
      setHasResults(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h1 className="text-2xl font-bold mb-4">Résultats de recherche</h1>
        
        <div className="search-location-container bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Rechercher un artisan par métier, service..."
                />
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Localisation"
                  defaultValue="Brunoy, 91800"
                />
              </div>
            </div>
            <div className="col-md-2">
              <button className="btn w-100" style={{ backgroundColor: '#C63E46', color: 'white' }}>
                <i className="bi bi-filter me-2"></i>
                Filtres
              </button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : hasResults ? (
          <div className="row">
            <div className="col-md-3">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Filtres</h5>
                  <hr />
                  <div className="mb-3">
                    <label className="form-label">Distance</label>
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-sm btn-outline-secondary">- 5 km</button>
                      <button className="btn btn-sm btn-outline-secondary">5-10 km</button>
                      <button className="btn btn-sm btn-outline-secondary">10-20 km</button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Disponibilité</label>
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-sm btn-outline-secondary">Aujourd'hui</button>
                      <button className="btn btn-sm btn-outline-secondary">Cette semaine</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">Jean Dupont</h5>
                    <span className="badge bg-success">4.8 ★</span>
                  </div>
                  <p className="card-text text-muted mb-2">Électricien • Brunoy (91800) • 3,5 km</p>
                  <p className="card-text mb-3">
                    Expert en installations électriques, dépannage et mise aux normes.
                  </p>
                  <div className="d-flex gap-2 mb-3">
                    <span className="badge bg-light text-dark">Installation électrique</span>
                    <span className="badge bg-light text-dark">Dépannage</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success">Disponible aujourd'hui</span>
                    <button className="btn" style={{ backgroundColor: '#C63E46', color: 'white' }}>
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
              {/* Additional result cards would go here */}
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <span className="display-1 text-muted">
                <i className="bi bi-search"></i>
              </span>
            </div>
            <h3>Aucun artisan trouvé avec ces critères</h3>
            <p className="text-muted mb-4">
              Essayez d'élargir votre recherche ou de modifier vos filtres
            </p>
            <button className="btn btn-outline-secondary me-2">
              Élargir la recherche
            </button>
            <button className="btn" style={{ backgroundColor: '#C63E46', color: 'white' }}>
              Modifier les filtres
            </button>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default SearchResults;
