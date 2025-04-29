import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header/partials/NavBar';
import FaqAccordion from '../components/FAQ/Faqs';
import Footer from '../components/Footer/Footer';
import domaines, { Domaine } from '../assets/tableaux/domaines';  
import DomainFilter from '../components/Filtres/DomainesFilters'; 

const DomainesIntervention: React.FC = () => {
  // État pour gérer la taille de l'écran
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  // État pour stocker le domaine sélectionné
  const [selectedDomaine, setSelectedDomaine] = useState<Domaine | null>(null);

  useEffect(() => {
    // Fonction pour mettre à jour la taille de l'écran
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    // Ajouter un écouteur d'événement pour redimensionner
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur d'événement au démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Trouver le domaine avec l'ID spécifié dans les données
    const domaineId = 1; // Remplacez cette valeur par l'ID du domaine souhaité ou obtenez-la dynamiquement (ex. depuis les props ou un autre état)

    const domaine = domaines.find(d => d.id === domaineId) || null;

    // Mettre à jour l'état avec le domaine trouvé
    setSelectedDomaine(domaine);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .positionNav {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-top: 30px;
          }
        `,
        }}
      />
      <div className="App">
        {/* Affichage de la barre de navigation */}
        <div className="positionNav">
          <Navbar />
        </div>
        
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
    </>
  );
};

export default DomainesIntervention;
