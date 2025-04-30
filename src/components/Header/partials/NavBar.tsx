
import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { NavLink, useLocation, Link } from 'react-router-dom';
import '../../../assets/styles/layout/header.css';
import { useAuth } from '../../../hooks/useAuth';

const NavbarComponent = () => {
  // État pour gérer si l'écran est large ou non
  const [setIsLargeScreen] = useState(window.innerWidth >= 992);

  // Hook pour obtenir l'emplacement actuel de la page
  const location = useLocation();
  
  // Récupérer les données d'authentification
  const { currentUser, logout } = useAuth();

  // État pour déterminer si la navbar doit être stylisée comme scrollée
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);

  // État pour gérer le menu mobile
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  
  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);
  
  useEffect(() => {
    // Fonction pour mettre à jour l'état lorsque la taille de l'écran change
    const handleResize = () => {
      // @ts-ignore
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

  // Fonction de déconnexion
  const handleLogout = () => {
    logout();
    handleOffcanvasClose();
  };

  return (
    <>
      {/* Navbar principale avec classe sticky-top pour le comportement sticky */}
      <Navbar 
        expand="lg" 
        className={`navbar sticky-top ${isNavbarScroll ? 'navbar-scroll' : ''} ${location.pathname === '/' ? 'navbar-home' : ''}`}
      >
        <Container>
          <NavLink to="/" className="navbar-brand fw-bold d-flex align-items-center">
            <span className="brand-artisan">PRESTA</span>
            <span className="brand-express">EXPRESS</span>
          </NavLink>

          <div className="d-flex align-items-center">
            {currentUser ? (
              <div className="d-none d-lg-flex me-3">
                <span className="text-nowrap me-3">Bonjour, {currentUser.name}</span>
                {currentUser.role === 'professional' ? (
                  <Link to="/professional-dashboard" className="btn btn-sm btn-outline-secondary me-2">Tableau de bord</Link>
                ) : null}
                <button onClick={logout} className="btn btn-sm btn-outline-danger">Déconnexion</button>
              </div>
            ) : (
              <div className="d-none d-lg-flex me-3">
                <Link to="/login" className="btn btn-sm btn-outline-secondary me-2">Connexion</Link>
                <Link to="/register" className="btn btn-sm btn-primary">Inscription</Link>
              </div>
            )}
            
            {/* Bouton pour afficher le menu mobile */}
            <Navbar.Toggle 
              aria-controls="navbarNavAltMarkup" 
              onClick={handleOffcanvasShow} 
              className="navbar-toggler-custom"
            >
            </Navbar.Toggle>
          </div>

          {/* Navbar pour les grands écrans */}
          <Navbar.Collapse id="navbarNavAltMarkup" className="d-none d-lg-flex">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} className="nav-link" to="/">Accueil</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/Metiers">Métiers</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/Intervention">Domaines</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/about">A propos</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Menu mobile avec Offcanvas */}
      <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end" className="mobile-menu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex align-items-center">
            <span className="brand-artisan">PRESTA</span>
            <span className="brand-express">EXPRESS</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={handleOffcanvasClose}>Accueil</Nav.Link>
            <Nav.Link as={NavLink} to="/Metiers" onClick={handleOffcanvasClose}>Métiers</Nav.Link>
            <Nav.Link as={NavLink} to="/Intervention" onClick={handleOffcanvasClose}>Domaines</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={handleOffcanvasClose}>A propos</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={handleOffcanvasClose}>Contact</Nav.Link>
            
            <hr className="my-3" />
            
            {currentUser ? (
              <>
                <div className="mb-3">
                  <p className="mb-1 fw-bold">Bonjour, {currentUser.name}</p>
                  <p className="text-muted small">{currentUser.email}</p>
                </div>
                {currentUser.role === 'professional' && (
                  <Nav.Link as={NavLink} to="/professional-dashboard" onClick={handleOffcanvasClose} className="text-primary">
                    Tableau de bord
                  </Nav.Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="btn btn-sm btn-outline-danger mt-2"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="d-flex flex-column gap-2">
                <Link to="/login" onClick={handleOffcanvasClose} className="btn btn-sm btn-outline-secondary">Connexion</Link>
                <Link to="/register" onClick={handleOffcanvasClose} className="btn btn-sm btn-primary">Inscription</Link>
                <div className="mt-2">
                  <Link to="/professional-login" onClick={handleOffcanvasClose} className="text-muted small d-block">Espace professionnel</Link>
                </div>
              </div>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;
