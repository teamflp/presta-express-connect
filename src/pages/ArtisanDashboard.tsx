import { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="App">
      <Navbar />
      
      <Container className="my-5">
        <h1 className="text-3xl font-bold mb-4">Tableau de bord artisan</h1>
        
        <Row>
          <Col lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="bg-light rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-3xl">👤</span>
                  </div>
                  <h5 className="mb-0">{user?.name || 'Artisan'}</h5>
                  <p className="text-muted small">Artisan</p>
                </div>
                
                <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={handleTabSelect}>
                  <Nav.Item>
                    <Nav.Link eventKey="overview" className="mb-2">Vue d'ensemble</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="profile" className="mb-2">Mon profil</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="demands" className="mb-2">Demandes</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="quotes" className="mb-2">Devis</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="calendar" className="mb-2">Calendrier</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reviews" className="mb-2">Avis clients</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings" className="mb-2">Paramètres</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={9}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="overview" active={activeTab === "overview"}>
                    <h2 className="text-2xl font-semibold mb-3">Vue d'ensemble</h2>
                    <Row className="g-3">
                      <Col md={4}>
                        <Card className="bg-light border-0">
                          <Card.Body className="text-center">
                            <h3 className="text-xl font-bold mb-1">12</h3>
                            <p className="mb-0 text-muted">Demandes en attente</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4}>
                        <Card className="bg-light border-0">
                          <Card.Body className="text-center">
                            <h3 className="text-xl font-bold mb-1">5</h3>
                            <p className="mb-0 text-muted">Devis envoyés</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4}>
                        <Card className="bg-light border-0">
                          <Card.Body className="text-center">
                            <h3 className="text-xl font-bold mb-1">4.7</h3>
                            <p className="mb-0 text-muted">Note moyenne</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="profile" active={activeTab === "profile"}>
                    <h2 className="text-2xl font-semibold mb-3">Mon profil professionnel</h2>
                    <p>Contenu du profil...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="demands" active={activeTab === "demands"}>
                    <h2 className="text-2xl font-semibold mb-3">Demandes de service</h2>
                    <p>Liste des demandes de service...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="quotes" active={activeTab === "quotes"}>
                    <h2 className="text-2xl font-semibold mb-3">Gestion des devis</h2>
                    <p>Liste des devis...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="calendar" active={activeTab === "calendar"}>
                    <h2 className="text-2xl font-semibold mb-3">Calendrier</h2>
                    <p>Contenu du calendrier...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="reviews" active={activeTab === "reviews"}>
                    <h2 className="text-2xl font-semibold mb-3">Avis clients</h2>
                    <p>Liste des avis...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="settings" active={activeTab === "settings"}>
                    <h2 className="text-2xl font-semibold mb-3">Paramètres</h2>
                    <p>Contenu des paramètres...</p>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <Footer />
    </div>
  );
}

export default ArtisanDashboard;
