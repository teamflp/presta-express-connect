import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import '../../../assets/styles/layout/header.css'; // Assurez-vous que ce chemin est correct
import { useAuth } from '../../../hooks/useAuth'; // Assurez-vous que ce chemin est correct

const NavbarComponent = () => {
  // Note: L'état isLargeScreen n'était pas utilisé, je le commente ou vous pouvez le supprimer
  // const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992); 

  const location = useLocation();
  const { isAuthenticated, user, logoutUser } = useAuth();
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  useEffect(() => {
    // Note: La fonction handleResize n'était pas utilisée correctement avec setIsLargeScreen
    // Si vous en avez besoin, assurez-vous que setIsLargeScreen est bien utilisé
    // const handleResize = () => {
    //   setIsLargeScreen(window.innerWidth >= 992);
    // };

    const handleScroll = () => {
      // Logique de scroll simplifiée : applique si scroll > 50 OU si on n'est pas sur la Home
      if (window.scrollY > 50 || location.pathname !== '/') {
        setIsNavbarScroll(true);
      } else {
        setIsNavbarScroll(false);
      }
    };

    // Appeler handleScroll une fois au montage pour définir l'état initial
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    // window.addEventListener('resize', handleResize); // Ajoutez si vous réactivez isLargeScreen

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('resize', handleResize); // Ajoutez si vous réactivez isLargeScreen
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Déclenché seulement au changement de page

  return (
      <>
        {/* Navbar principale */}
        <Navbar
            expand="lg" // Garde le point de rupture du *toggle* à lg, mais on contrôle le collapse différemment
            className={`navbar sticky-top ${isNavbarScroll ? 'navbar-scroll' : ''} ${location.pathname === '/' && !isNavbarScroll ? 'navbar-home' : ''}`} // Simplifié la logique de classe
            // Ajout de la gestion du thème sombre si nécessaire (exemple)
            // data-bs-theme={isNavbarScroll ? "light" : "dark"} // Exemple pour Bootstrap 5.3+
        >
          <Container>
            {/* Brand */}
            <NavLink to="/" className="navbar-brand fw-bold d-flex align-items-center">
              <span className="brand-artisan">PRESTA</span>
              <span className="brand-express">EXPRESS</span>
            </NavLink>

            {/* Toggle pour mobile (toujours basé sur expand="lg") */}
            <Navbar.Toggle
                aria-controls="navbarNavAltMarkup"
                onClick={handleOffcanvasShow}
                className="navbar-toggler-custom d-lg-none" // Assurez-vous qu'il se cache sur lg
            />

            {/* Liens pour Desktop - MODIFICATION ICI */}
            <Navbar.Collapse id="navbarNavAltMarkup" className="d-none d-md-flex"> {/* Changé de d-lg-flex à d-md-flex */}
              {/* Liens de navigation principaux */}
              <Nav className="me-auto">
                <Nav.Link as={NavLink} className="nav-link" to="/">Accueil</Nav.Link>
                <Nav.Link as={NavLink} className="nav-link" to="/Metiers">Métiers</Nav.Link>
                <Nav.Link as={NavLink} className="nav-link" to="/Intervention">Domaines</Nav.Link>
                <Nav.Link as={NavLink} className="nav-link" to="/about">A propos</Nav.Link>
                <Nav.Link as={NavLink} className="nav-link" to="/contact">Contact</Nav.Link>
              </Nav>
              {/* Liens utilisateur/authentification */}
              <Nav>
                {isAuthenticated ? (
                    <div className="d-flex align-items-center">
                      {user?.userType === 'professional' ? (
                          <Nav.Link as={NavLink} className="nav-link" to="/professional-dashboard">
                            Mon Espace Pro
                          </Nav.Link>
                      ) : (
                          <Nav.Link as={NavLink} className="nav-link" to="/user-dashboard">
                            Mon Compte
                          </Nav.Link>
                      )}
                      <Nav.Link className="nav-link" onClick={logoutUser} style={{ cursor: 'pointer' }}> {/* Ajout style curseur */}
                        Déconnexion
                      </Nav.Link>
                    </div>
                ) : (
                    <div className="d-flex">
                      <Nav.Link as={NavLink} className="nav-link" to="/login">
                        Connexion
                      </Nav.Link>
                      <Nav.Link as={NavLink} className="nav-link" to="/professional-login">
                        Espace Pro
                      </Nav.Link>
                    </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Menu Offcanvas pour Mobile */}
        <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end" className="mobile-menu d-lg-none"> {/* Assurez-vous qu'il se cache sur lg */}
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="d-flex align-items-center">
              <span className="brand-artisan">PRESTA</span>
              <span className="brand-express">EXPRESS</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {/* Liens du menu mobile */}
              <Nav.Link as={NavLink} to="/" onClick={handleOffcanvasClose}>Accueil</Nav.Link>
              <Nav.Link as={NavLink} to="/Metiers" onClick={handleOffcanvasClose}>Métiers</Nav.Link>
              <Nav.Link as={NavLink} to="/Intervention" onClick={handleOffcanvasClose}>Domaines</Nav.Link>
              <Nav.Link as={NavLink} to="/about" onClick={handleOffcanvasClose}>A propos</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" onClick={handleOffcanvasClose}>Contact</Nav.Link>

              <hr className="my-3" />

              {/* Liens utilisateur/auth mobile */}
              {isAuthenticated ? (
                  <>
                    {user?.userType === 'professional' ? (
                        <Nav.Link as={NavLink} to="/professional-dashboard" onClick={handleOffcanvasClose}>
                          Mon Espace Pro
                        </Nav.Link>
                    ) : (
                        <Nav.Link as={NavLink} to="/user-dashboard" onClick={handleOffcanvasClose}>
                          Mon Compte
                        </Nav.Link>
                    )}
                    <Nav.Link onClick={() => { logoutUser(); handleOffcanvasClose(); }} style={{ cursor: 'pointer' }}> {/* Ajout style curseur */}
                      Déconnexion
                    </Nav.Link>
                  </>
              ) : (
                  <>
                    <Nav.Link as={NavLink} to="/login" onClick={handleOffcanvasClose}>
                      Connexion
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/professional-login" onClick={handleOffcanvasClose}>
                      Espace Pro
                    </Nav.Link>
                  </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
  );
};

export default NavbarComponent;