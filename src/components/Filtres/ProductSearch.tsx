
import React, { useState } from 'react';
import { products, Product } from '../../assets/tableaux/productData';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from '../Pagination/PaginationComponent';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ProductSearch: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [sortByPrice, setSortByPrice] = useState<string>('default');
  const [sortByName, setSortByName] = useState<string>('default');
  const [sortByDate, setSortByDate] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8; // Nombre de produits par page

  // Fonction pour trier les produits par prix
  const sortProductsByPrice = (products: Product[], ascending: boolean) => {
    return products.sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
  };

  // Fonction pour trier les produits par nom
  const sortProductsByName = (products: Product[], ascending: boolean) => {
    return products.sort((a, b) =>
      ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  };

  // Fonction pour trier les produits par date
  const sortProductsByDate = (products: Product[], ascending: boolean) => {
    return products.sort((a, b) =>
      ascending
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  // Fonction pour trier les produits
  const sortProducts = (products: Product[]) => {
    let sortedProducts = [...products];
    if (sortByPrice !== 'default') {
      sortedProducts = sortProductsByPrice(
        sortedProducts,
        sortByPrice === 'priceAsc'
      );
    }
    if (sortByName !== 'default') {
      sortedProducts = sortProductsByName(
        sortedProducts,
        sortByName === 'nameAsc'
      );
    }
    if (sortByDate !== 'default') {
      sortedProducts = sortProductsByDate(
        sortedProducts,
        sortByDate === 'dateAsc'
      );
    }
    return sortedProducts;
  };

  // Filtrer les produits en fonction de la localisation et du nom
  const filteredProducts = products.filter((product) =>
    product.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
    product.name.toLowerCase().includes(searchName.toLowerCase())
  );

  // Trier les produits filtrés
  const sortedProducts = sortProducts(filteredProducts);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  const clearFilters = () => {
    setSearchLocation('');
    setSearchName('');
    setSortByPrice('default');
    setSortByName('default');
    setSortByDate('default');
    toast.success('Filtres réinitialisés');
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Autres produits du même type</h3>
      <hr className="redLineContainer mb-4" />
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Affiner votre recherche</h5>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
          >
            <FaFilter /> {showFilters ? 'Masquer' : 'Filtres'}
          </button>
        </div>
        
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-secondary" />
              </span>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Rechercher par nom"
                className="form-control border-start-0"
                style={{borderRadius: '0 5px 5px 0'}}
              />
            </div>
          </div>
          
          <div className="col-md-6">
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Localisation"
              className="form-control form-filter"
            />
          </div>
        </div>
        
        {showFilters && (
          <div className="row g-3 mt-2 animate-fadeIn">
            <div className="col-md-4">
              <select
                id="sortByPrice"
                value={sortByPrice}
                onChange={(e) => setSortByPrice(e.target.value)}
                className="form-select form-filter"
              >
                <option value="default">Prix</option>
                <option value="priceAsc">Prix croissant</option>
                <option value="priceDesc">Prix décroissant</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                id="sortByName"
                value={sortByName}
                onChange={(e) => setSortByName(e.target.value)}
                className="form-select form-filter"
              >
                <option value="default">Nom</option>
                <option value="nameAsc">Nom croissant</option>
                <option value="nameDesc">Nom décroissant</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                id="sortByDate"
                value={sortByDate}
                onChange={(e) => setSortByDate(e.target.value)}
                className="form-select form-filter"
              >
                <option value="default">Date</option>
                <option value="dateAsc">Date croissante</option>
                <option value="dateDesc">Date décroissante</option>
              </select>
            </div>
            
            <div className="col-12">
              <button 
                onClick={clearFilters}
                className="btn btn-sm btn-danger"
                style={{backgroundColor: '#C63E46', borderColor: '#C63E46'}}
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="row">
        {currentProducts.length > 0 ? (
          currentProducts.map((product: Product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div
                className="card border-0 hover-card h-100"
                style={{
                  borderRadius: '25px 1px 25px 25px',
                  width: '100%',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <img
                  className="card-img-top"
                  style={{ borderRadius: '25px 1px 0px 0px', height: '160px', objectFit: 'cover' }}
                  src={product.image}
                  alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0">{product.name}</h6>
                    <span className="badge bg-primary" style={{backgroundColor: '#C63E46!important'}}>{product.price}€</span>
                  </div>
                  <p className="card-text small text-muted mb-2">{product.location}</p>
                  <a href="#" className="btn btn-sm btn-outline-primary mt-auto" style={{borderColor: '#C63E46', color: '#C63E46'}}>
                    Voir les détails
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              Aucun produit trouvé pour cette recherche
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {currentProducts.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductSearch;
