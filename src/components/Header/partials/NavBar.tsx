
import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useLocation, Link } from 'react-router-dom';
import SearchButton from './SearchButton';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaSearch } from 'react-icons/fa'; 
import { useAuth } from '../../../hooks/useAuth';
import '../../../assets/styles/style.css'; // Importation du fichier CSS

const NavbarComponent = () => {
  // État pour gérer si l'écran est large ou non (pour afficher ou non le bouton de recherche)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  
  // Hook pour obtenir l'emplacement actuel de la page
  const location = useLocation();

  // État pour déterminer si la navbar doit être stylisée comme scrollée
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);
  
  // Utilisation du hook d'authentification
  const { isAuthenticated, currentUser, logout } = useAuth();

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
      } else {
        // Si pas d'image header sur la page (non-home pages)
        setIsNavbarScroll(window.scrollY > 50);
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
      <Container>
        <NavLink to="/" className="navbar-brand">ARTISAN EXPRESS</NavLink>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} className="nav-link" to="/">Accueil</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link" to="/Metiers">Métiers</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link" to="/Intervention">Domaines</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link" to="/search">
              <span className="d-flex align-items-center">
                <FaSearch className="me-1" /> Rechercher un artisan
              </span>
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="me-3 nav-link">Bonjour, {currentUser?.name}</span>
                <Button 
                  variant="outline-light" 
                  className="d-flex align-items-center gap-2"
                  onClick={logout}
                >
                  <FaSignOutAlt /> Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2 nav-link">
                  <span className="d-flex align-items-center">
                    <FaSignInAlt className="me-1" /> Connexion
                  </span>
                </Nav.Link>
                <Link to="/register">
                  <Button variant="outline-light" className="nav-btn">
                    <FaUser className="me-1" /> Inscription
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {isLargeScreen && (
          <div className="searchButtonContainer ms-3">
            <SearchButton />
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
