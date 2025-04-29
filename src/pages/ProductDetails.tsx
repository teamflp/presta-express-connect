
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header/partials/NavBar';
import FaqAccordion from '../components/FAQ/Faqs';
import Footer from '../components/Footer/Footer';
import ProductSearch from '../components/Filtres/ProductSearch';
import ProductDetailsCard from '../components/Product/ProductDetailsCard';
import { products, Product } from '../assets/tableaux/productData';

const ProductDetails: React.FC = () => {
  // État pour gérer la taille de l'écran
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  // État pour stocker le produit sélectionné
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fonction pour mettre à jour la taille de l'écran
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
      console.log(isLargeScreen);
    };

    // Ajouter un écouteur d'événement pour redimensionner
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur d'événement au démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLargeScreen]);

  useEffect(() => {
    const productId = 1;

    // Trouver le produit avec l'ID spécifié dans les données
    const product = products.find((p) => p.id === productId) || null;

    // Mettre à jour l'état avec le produit trouvé
    setSelectedProduct(product);
  }, []);

  return (
    <div className="App">
      {/* Affichage de la barre de navigation */}
      <Navbar />
      
      {/* Affichage des détails du produit si trouvé */}
      {selectedProduct ? (
        <ProductDetailsCard product={selectedProduct} />
      ) : (
        <p>Produit non trouvé</p>
      )}

      {/* Affichage du composant de recherche de produits */}
      <ProductSearch />

      <div className="container my-3 my-md-5">
        {/* Affichage des questions fréquemment posées */}
        <FaqAccordion />
      </div>
      {/* Affichage du pied de page */}
      <Footer />
    </div>
  );
};

export default ProductDetails;
