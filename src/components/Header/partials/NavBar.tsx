import { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import SearchButton from './SearchButton';
import { FaUser } from 'react-icons/fa'; // Importation de l'icône utilisateur
import '../../../assets/styles/style.css' // Importation du fichier CSS

const NavbarComponent = () => {
  // État pour gérer si l'écran est large ou non (pour afficher ou non le bouton de recherche)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  
  // Hook pour obtenir l'emplacement actuel de la page (utile pour appliquer des styles conditionnels)
  const location = useLocation();

  // État pour déterminer si la navbar doit être stylisée comme scrollée
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);

  useEffect(() => {
    // Fonction pour mettre à jour l'état lorsque la taille de l'écran change
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    // Fonction pour ajouter ou supprimer la classe 'navbar-scroll' en fonction du défilement
    const handleScroll = () => {
      const imageHeader = document.querySelector('.image-header') as HTMLElement;

      if (imageHeader) {
        const imageHeaderHeight = imageHeader.offsetHeight;
        if (window.scrollY > imageHeaderHeight) {
          setIsNavbarScroll(true); // Ajoute la classe si le scroll dépasse la hauteur de l'image
        } else if (location.pathname === '/') {
          setIsNavbarScroll(false); // Supprime la classe si on est sur la page Home
        }
      }
    };

    // Ajoute les écouteurs d'événements pour le défilement et le redimensionnement de la fenêtre
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Définit la classe navbar-scroll si l'utilisateur n'est pas sur la page Home
    if (location.pathname !== '/') {
      setIsNavbarScroll(true);
    }

    // Nettoie les écouteurs d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]); // Recalcule l'effet lorsque la page change

  return (
    // Applique les classes conditionnelles en fonction de l'état de défilement et de la page actuelle
    <Navbar 
      expand="lg" 
      className={`z-3 navbar position-fixed container-fluid ${isNavbarScroll ? 'navbar-scroll' : ''} ${location.pathname === '/' ? 'navbar-home' : ''}`}
    >
      <div className="container">
        <a className="navbar-brand" href="#">LOGO</a>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} className="nav-link text-white" to="/" exact>Home</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link text-white" to="/features">Features</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link text-white" to="/pricing">Pricing</Nav.Link>
            <Nav.Link className="nav-link disabled text-white" href="#" aria-disabled="true">Disabled</Nav.Link>
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={NavLink} className="nav-link text-white" to="/admin"><FaUser /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {isLargeScreen && (
          <div className="searchButtonContainer">
            <SearchButton />
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default NavbarComponent;