
import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import '../../../assets/styles/layout/header.css';
import { useAuth } from '../../../hooks/useAuth';
import { Menu, User, LogIn } from 'lucide-react';

const NavbarComponent = () => {
  const location = useLocation();
  const {
    isAuthenticated,
    user,
    logoutUser
  } = useAuth();
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
      <Navbar expand="lg" className={`navbar fixed-top ${isNavbarScroll ? 'navbar-scroll shadow-lg' : ''} ${location.pathname === '/' && !isNavbarScroll ? 'navbar-home' : ''}`}>
        <Container>
          {/* Brand */}
          <NavLink to="/" className="navbar-brand fw-bold d-flex align-items-center">
            <span className="text-primary text-2xl font-bold">PRESTA</span>
            <span className="text-secondary text-xl">EXPRESS</span>
          </NavLink>

          {/* Toggle for mobile */}
          <Navbar.Toggle aria-controls="navbarNavAltMarkup" onClick={handleOffcanvasShow} className="navbar-toggler-custom d-lg-none border-0">
            <Menu size={24} />
          </Navbar.Toggle>

          {/* Desktop Navigation Links */}
          <Navbar.Collapse id="navbarNavAltMarkup" className="d-none d-lg-flex">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} className="nav-link px-3 mx-1" to="/">Accueil</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link px-3 mx-1" to="/Metiers">Métiers</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link px-3 mx-1" to="/Intervention">Domaines</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link px-3 mx-1" to="/about">À propos</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link px-3 mx-1" to="/contact">Contact</Nav.Link>
            </Nav>
            
            {/* Authentication links */}
            <Nav className="align-items-center">
              {isAuthenticated ? <div className="d-flex align-items-center">
                  <Nav.Link as={NavLink} className="nav-link d-flex align-items-center gap-2" to={user?.userType === 'professional' ? "/professional-dashboard" : "/user-dashboard"}>
                    <User size={16} />
                    {user?.userType === 'professional' ? 'Espace Pro' : 'Mon Compte'}
                  </Nav.Link>
                  <Nav.Link className="nav-link btn-outline-primary ms-2 py-2 px-3 rounded-3" onClick={logoutUser} style={{
                cursor: 'pointer'
              }}>
                    Déconnexion
                  </Nav.Link>
                </div> : <div className="d-flex align-items-center">
                  <Nav.Link as={NavLink} className="nav-link d-flex align-items-center gap-2" to="/login">
                    <LogIn size={16} />
                    Connexion
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/professional-login" className="btn btn-primary ms-2 py-2 px-3 rounded text-white">
                    Espace Pro
                  </Nav.Link>
                </div>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Menu */}
      <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end" className="mobile-menu d-lg-none">
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="d-flex align-items-center">
            <span className="text-primary text-xl font-bold">PRESTA</span>
            <span className="text-secondary">EXPRESS</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/" onClick={handleOffcanvasClose} className="py-3 border-bottom">Accueil</Nav.Link>
            <Nav.Link as={NavLink} to="/Metiers" onClick={handleOffcanvasClose} className="py-3 border-bottom">Métiers</Nav.Link>
            <Nav.Link as={NavLink} to="/Intervention" onClick={handleOffcanvasClose} className="py-3 border-bottom">Domaines</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={handleOffcanvasClose} className="py-3 border-bottom">À propos</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={handleOffcanvasClose} className="py-3 border-bottom">Contact</Nav.Link>

            <div className="my-4">
              {isAuthenticated ? <>
                  <Nav.Link as={NavLink} to={user?.userType === 'professional' ? "/professional-dashboard" : "/user-dashboard"} onClick={handleOffcanvasClose} className="d-flex align-items-center gap-2 py-3">
                    <User size={18} />
                    {user?.userType === 'professional' ? 'Mon Espace Pro' : 'Mon Compte'}
                  </Nav.Link>
                  <Nav.Link onClick={() => {
                logoutUser();
                handleOffcanvasClose();
              }} className="btn btn-outline-primary w-100 mt-3 d-flex justify-content-center" style={{
                cursor: 'pointer'
              }}>
                    Déconnexion
                  </Nav.Link>
                </> : <>
                  <Nav.Link as={NavLink} to="/login" onClick={handleOffcanvasClose} className="d-flex align-items-center gap-2 py-3">
                    <LogIn size={18} />
                    Connexion
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/professional-login" onClick={handleOffcanvasClose} className="btn btn-primary w-100 mt-3 d-flex justify-content-center">
                    Espace Pro
                  </Nav.Link>
                </>}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;
