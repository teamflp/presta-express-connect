import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { NavLink, useLocation, Link } from 'react-router-dom';
import SearchButton from './SearchButton';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaSearch, FaBars } from 'react-icons/fa'; 
import { useAuth } from '../../../hooks/useAuth';
import '../../../assets/styles/layout/header.css';

const NavbarComponent = () => {
  // État pour gérer si l'écran est large ou non
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  
  // Hook pour obtenir l'emplacement actuel de la page
  const location = useLocation();

  // État pour déterminer si la navbar doit être stylisée comme scrollée
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);
  
  // État pour gérer le menu mobile
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Utilisation du hook d'authentification
  const { isAuthenticated, currentUser, logout } = useAuth();

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  useEffect(() => {
    // Fonction pour mettre à jour l'état lorsque la taille de l'écran change
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    // Fonction pour ajouter ou supprimer la classe 'navbar-scroll' en fonction du défilement
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavbarScroll(true); // Ajoute la classe si le scroll dépasse 50px
      } else if (location.pathname === '/') {
        setIsNavbarScroll(false); // Supprime la classe si on est sur la page Home et scroll < 50px
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
    <>
      {/* Navbar principale */}
      <Navbar 
        expand="lg" 
        className={`navbar ${isNavbarScroll ? 'navbar-scroll' : ''} ${location.pathname === '/' ? 'navbar-home' : ''}`}
      >
        <Container>
          <NavLink to="/" className="navbar-brand fw-bold">
            <span className="brand-artisan">ARTISAN</span>
            <span className="brand-express">EXPRESS</span>
          </NavLink>

          <div className="d-flex align-items-center">
            {/* Bouton de recherche pour les grands écrans */}
            {isLargeScreen && (
              <div className="searchButtonContainer me-3">
                <SearchButton />
              </div>
            )}

            {/* Bouton pour afficher le menu mobile */}
            <Navbar.Toggle 
              aria-controls="navbarNavAltMarkup" 
              onClick={handleOffcanvasShow} 
              className="navbar-toggler-custom"
            >
              <FaBars />
            </Navbar.Toggle>
          </div>

          {/* Navbar pour les grands écrans */}
          <Navbar.Collapse id="navbarNavAltMarkup" className="d-none d-lg-flex">
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
                    className="d-flex align-items-center gap-2 nav-btn"
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
        </Container>
      </Navbar>

      {/* Espace pour compenser la barre de navigation fixe */}
      <div className="header-spacing"></div>

      {/* Menu mobile avec Offcanvas */}
      <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end" className="mobile-menu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={handleOffcanvasClose}>Accueil</Nav.Link>
            <Nav.Link as={NavLink} to="/Metiers" onClick={handleOffcanvasClose}>Métiers</Nav.Link>
            <Nav.Link as={NavLink} to="/Intervention" onClick={handleOffcanvasClose}>Domaines</Nav.Link>
            <Nav.Link as={NavLink} to="/search" onClick={handleOffcanvasClose}>
              <span className="d-flex align-items-center">
                <FaSearch className="me-1" /> Rechercher un artisan
              </span>
            </Nav.Link>
            
            <hr className="my-3" />
            
            {/* Bouton de recherche pour mobile */}
            <div className="mb-3">
              <SearchButton />
            </div>
            
            {/* Authentification pour mobile */}
            {isAuthenticated ? (
              <>
                <div className="mb-2">Bonjour, {currentUser?.name}</div>
                <Button 
                  variant="danger" 
                  className="w-100 d-flex align-items-center justify-content-center"
                  onClick={() => {
                    logout();
                    handleOffcanvasClose();
                  }}
                >
                  <FaSignOutAlt className="me-2" /> Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-100 mb-2">
                  <Button 
                    variant="outline-primary" 
                    className="w-100"
                    onClick={handleOffcanvasClose}
                  >
                    <FaSignInAlt className="me-2" /> Connexion
                  </Button>
                </Link>
                <Link to="/register" className="w-100">
                  <Button 
                    variant="primary" 
                    className="w-100"
                    onClick={handleOffcanvasClose}
                  >
                    <FaUser className="me-2" /> Inscription
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;
