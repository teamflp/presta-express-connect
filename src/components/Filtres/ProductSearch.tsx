import React, { useState } from 'react';
import { products, Product } from '../../assets/tableaux/productData';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationComponent from '../Pagination/PaginationComponent'; // Assurez-vous du chemin correct

const ProductSearch: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [sortByPrice, setSortByPrice] = useState<string>('default');
  const [sortByName, setSortByName] = useState<string>('default');
  const [sortByDate, setSortByDate] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  // Filtrer les produits en fonction de la localisation
  const filteredProducts = products.filter((product) =>
    product.location.toLowerCase().includes(searchLocation.toLowerCase())
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

  return (
    <div className="container mt-5">
      <h3>Autres produits du même type</h3>
      <hr className="redLineContainer" />
      <h6>Affiner votre recherche</h6>

      <div className="d-flex mb-4 gap-2">
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Localisation"
          className="form-filter"
        />
        <div className="form-group mr-3">
          <select
            id="sortByPrice"
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
            className="form-filter"
          >
            <option value="default">Prix</option>
            <option value="priceAsc">Prix croissant</option>
            <option value="priceDesc">Prix décroissant</option>
          </select>
        </div>

        <div className="form-group mr-3">
          <select
            id="sortByName"
            value={sortByName}
            onChange={(e) => setSortByName(e.target.value)}
            className="form-filter"
          >
            <option value="default">Nom</option>
            <option value="nameAsc">Nom croissant</option>
            <option value="nameDesc">Nom décroissant</option>
          </select>
        </div>

        <div className="form-group">
          <select
            id="sortByDate"
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
            className="form-filter"
          >
            <option value="default">Date</option>
            <option value="dateAsc">Date croissante</option>
            <option value="dateDesc">Date décroissante</option>
          </select>
        </div>
      </div>

      <div className="row">
        {currentProducts.length > 0 ? (
          currentProducts.map((product: Product) => (
            <div
              key={product.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <div
                className="card border-0"
                style={{
                  borderRadius: '25px 1px 25px 25px',
                  width: '100%',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <img
                  className="card-img-top"
                  style={{ borderRadius: '25px 1px 0px 0px' }}
                  src={product.image}
                  alt={product.name}
                />
                <div className="card-body d-flex justify-content-between">
                  <a href="#" className="card-link">
                    {product.name}
                  </a>
                  <span className="card-link">{product.price}€</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>Aucun produit trouvé pour cette localisation</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductSearch;
