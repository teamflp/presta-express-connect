import React, { useState } from 'react';
import domaines from '../../assets/tableaux/domaines';
import type { PaginationComponent } from '../Pagination/PaginationComponent';

function DomainFilter() {
  // États locaux pour la pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Nombre d'éléments par page

  // États locaux pour stocker les valeurs des champs de filtrage
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  // État pour le type d'affichage
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // État pour le domaine sélectionné
  const [selectedDomaine, setSelectedDomaine] = useState<number | null>(null);

  // Fonction de filtrage
  const handleFilter = () => {
    let filteredDomaines = domaines;
    
    if (title) {
      filteredDomaines = filteredDomaines.filter(domaine => domaine.titre.toLowerCase().includes(title.toLowerCase()));
    }
    if (address) {
      filteredDomaines = filteredDomaines.filter(domaine => domaine.adresse.toLowerCase().includes(address.toLowerCase()));
    }
    if (postalCode) {
      filteredDomaines = filteredDomaines.filter(domaine => domaine.codePostal.includes(postalCode));
    }
    if (city) {
      filteredDomaines = filteredDomaines.filter(domaine => domaine.ville.toLowerCase().includes(city.toLowerCase()));
    }
    
    return filteredDomaines;
  };

  // Application des filtres
  const filteredDomaines = handleFilter();

  // Pagination
  const totalPages = Math.ceil(filteredDomaines.length / itemsPerPage);
  const indexOfLastDomaine = currentPage * itemsPerPage;
  const indexOfFirstDomaine = indexOfLastDomaine - itemsPerPage;
  const currentDomaines = filteredDomaines.slice(indexOfFirstDomaine, indexOfLastDomaine);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Gestion des clics pour la carte
  const handleDomaineSelect = (id: number) => {
    setSelectedDomaine(id);
  };

  // Styles des boutons
  const buttonStyle = (mode: 'list' | 'map') => ({
    backgroundColor: viewMode === mode ? '#C63E46' : 'white',
    color: viewMode === mode ? 'white' : '#C63E46',
    border: `1px solid ${viewMode === mode ? '#C63E46' : '#C63E46'}`,
    borderRadius: '15px 1px 15px 15px',
    padding: '10px 20px',
    boxShadow: viewMode === mode ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
  });

  // Affichage en mode liste
  const listView = (
    <div className="row">
      {currentDomaines.map(domaine => (
        <div key={domaine.id} className="col-12 my-4">
          <div className="card border-0 p-3" style={{ borderRadius: "25px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
            <div className="card-body">
              <p className="card-title">{domaine.titre}</p>
              <p className="card-text">Adresse: {domaine.adresse} {domaine.codePostal} {domaine.ville}</p>
              <p className="card-text">Téléphone: {domaine.phone}</p>
              <div className="d-flex justify-content-between">
                <p className="card-text">Inscrit depuis le: {domaine.dateInscription}</p>
                <p className='card-link'>Détails</p>
                <p className='card-link'>Avis</p>
                <p className='card-link'>Message</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Affichage en mode carte
  const mapView = (
    <div className='row'>
      <div className='col-12 col-md-8'>
        {currentDomaines.map(domaine => (
          <div
            key={domaine.id}
            className="col-12 my-4"
            onClick={() => handleDomaineSelect(domaine.id)}
            onMouseEnter={() => handleDomaineSelect(domaine.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card border-0 p-3" style={{ borderRadius: "25px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <div className="card-body">
                <p className="card-title">{domaine.titre}</p>
                <p className="card-text">Adresse: {domaine.adresse} {domaine.codePostal} {domaine.ville}</p>
                <p className="card-text">Téléphone: {domaine.phone}</p>
                <div className="d-flex justify-content-between">
                  <p className="card-text">Inscrit depuis le: {domaine.dateInscription}</p>
                  <p className='card-link'>Détails</p>
                  <p className='card-link'>Avis</p>
                  <p className='card-link'>Message</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='col-12 col-md-4'>
        {/* Intégration de Google Maps */}
        <div style={{ width: '100%', height: '400px' }}>
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(currentDomaines.map(d => d.adresse).join('|'))}&zoom=12&maptype=roadmap`}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1>Nom de la catégorie</h1>
      <p>Résultat</p>
      <div className='redLineContainer mt-5 mb-2'></div>
      <h4>Affinez votre recherche</h4>
      
      {/* Champs de filtrage pour chaque critère */}
      <div className="row mb-4">
        <div className="col-12 col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      {/* Affichage des boutons pour changer de mode */}
      <div className='d-flex gap-2 mb-4'>
        <p>Affichage: </p>
        <button 
          style={buttonStyle('list')} 
          onClick={() => setViewMode('list')}
          className="btn"
        >
          Liste
        </button>
        <button 
          style={buttonStyle('map')} 
          onClick={() => setViewMode('map')}
          className="btn"
        >
          Carte
        </button>
      </div>

      {/* Affichage en fonction du mode sélectionné */}
      {viewMode === 'list' ? listView : mapView}

      {/* Pagination */}
      {viewMode === 'list' && (
        <PaginationComponent 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default DomainFilter;

