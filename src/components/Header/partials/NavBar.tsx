
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { User, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../../Auth/AuthWrapper';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Navbar 
      expand="lg" 
      className="bg-white shadow-sm fixed-top" 
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <span className="text-2xl font-bold text-primary">Presta Express</span>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          className="border-0"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <X size={24} /> : <Menu size={24} />}
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/categories" onClick={() => setExpanded(false)}>
              Catégories
            </Nav.Link>
            <Nav.Link as={Link} to="/Metiers" onClick={() => setExpanded(false)}>
              Métiers
            </Nav.Link>
            <Nav.Link as={Link} to="/Intervention" onClick={() => setExpanded(false)}>
              Domaines
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>
              À propos
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>
              Contact
            </Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <User size={16} />
                    <span className="d-none d-md-inline">
                      {user.user_metadata?.first_name || user.email?.split('@')[0]}
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link 
                        className="dropdown-item d-flex align-items-center gap-2" 
                        to="/client-dashboard"
                        onClick={() => setExpanded(false)}
                      >
                        <Settings size={16} />
                        Mon compte
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item d-flex align-items-center gap-2 text-danger"
                        onClick={handleSignOut}
                      >
                        <LogOut size={16} />
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button 
                  as={Link} 
                  to="/auth" 
                  variant="outline-primary"
                  onClick={() => setExpanded(false)}
                >
                  Connexion
                </Button>
                <Button 
                  as={Link} 
                  to="/auth" 
                  variant="primary"
                  onClick={() => setExpanded(false)}
                >
                  Inscription
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
