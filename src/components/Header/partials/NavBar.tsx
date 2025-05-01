
import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import '../../../assets/styles/layout/header.css'; 
import { useAuth } from '../../../hooks/useAuth';

const NavbarComponent = () => {
  const location = useLocation();
  const { isAuthenticated, user, logoutUser } = useAuth();
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 || location.pathname !== '/') {
        setIsNavbarScroll(true);
      } else {
        setIsNavbarScroll(false);
      }
    };

    // Appeler handleScroll une fois au montage pour définir l'état initial
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); 

  return (
    <>
      <Navbar
        expand="lg"
        className={`navbar sticky-top ${isNavbarScroll ? 'navbar-scroll' : ''} ${location.pathname === '/' && !isNavbarScroll ? 'navbar-home' : ''}`}
      >
        <Container>
          {/* Brand */}
          <NavLink to="/" className="navbar-brand fw-bold d-flex align-items-center">
            <span className="text-primary text-2xl font-bold">PRESTA</span>
            <span className="text-secondary text-xl">EXPRESS</span>
          </NavLink>

          {/* Toggle for mobile */}
          <Navbar.Toggle
            aria-controls="navbarNavAltMarkup"
            onClick={handleOffcanvasShow}
            className="navbar-toggler-custom d-lg-none"
          />

          {/* Desktop Navigation Links */}
          <Navbar.Collapse id="navbarNavAltMarkup" className="d-none d-lg-flex">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} className="nav-link" to="/">Accueil</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/Metiers">Métiers</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/Intervention">Domaines</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/about">A propos</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/contact">Contact</Nav.Link>
            </Nav>
            
            {/* Authentication links */}
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
                  <Nav.Link className="nav-link" onClick={logoutUser} style={{ cursor: 'pointer' }}>
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

      {/* Mobile Menu */}
      <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end" className="mobile-menu d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex align-items-center">
            <span className="text-primary text-xl font-bold">PRESTA</span>
            <span className="text-secondary">EXPRESS</span>
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
                <Nav.Link onClick={() => { logoutUser(); handleOffcanvasClose(); }} style={{ cursor: 'pointer' }}>
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
