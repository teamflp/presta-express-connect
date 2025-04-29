
import React, { useState } from 'react';

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'in category:', category);
    // Search functionality would go here
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-sm" style={{borderRadius: '15px', overflow: 'hidden'}}>
        <div className="card-body p-4">
          <h5 className="card-title mb-4">Rechercher des professionnels similaires</h5>
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-5">
                <label htmlFor="search" className="form-label">Mot-clé</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Rechercher par nom, service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <label htmlFor="category" className="form-label">Catégorie</label>
                <select 
                  className="form-select" 
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  <option value="plombiers">Plombiers</option>
                  <option value="electriciens">Électriciens</option>
                  <option value="menuisiers">Menuisiers</option>
                  <option value="peintres">Peintres</option>
                  <option value="architectes">Architectes</option>
                </select>
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button 
                  type="submit" 
                  className="btn w-100" 
                  style={{
                    backgroundColor: '#C63E46',
                    color: 'white',
                    borderRadius: '10px'
                  }}
                >
                  Rechercher
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
