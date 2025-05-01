
import React from 'react';
import Navbar from '../components/Header/partials/NavBar';
import FaqAccordion from '../components/FAQ/Faqs';
import Footer from '../components/Footer/Footer';
import DomainFilter from '../components/Filtres/DomainesFilters'; 

const DomainesIntervention: React.FC = () => {
  return (
    <div className="App">
      {/* Affichage de la barre de navigation */}
      <Navbar />
      
      {/* Affichage des filtres pour les domaines */}
      <div className="container my-3 my-md-5">
        <DomainFilter />
      </div>
      
      {/* Affichage des questions fréquemment posées */}
      <div className="container my-3 my-md-5">
        <FaqAccordion />
      </div>
      
      {/* Affichage du pied de page */}
      <Footer />
    </div>
  );
};

export default DomainesIntervention;
