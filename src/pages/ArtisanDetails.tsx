
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductDetailsCard from '../components/Product/ProductDetailsCard';
import { useLocation } from 'react-router-dom';
import { Product } from '../assets/tableaux/productData';
import products from '../assets/tableaux/productData';

function ArtisanDetails() {
  const location = useLocation();
  // Get product from location state or use the first product as default
  const product: Product = location.state?.product || products[0];

  return (
    <div className="App">
      <Header />
      <ProductDetailsCard product={product} />
      <Footer />
    </div>
  );
}

export default ArtisanDetails;
