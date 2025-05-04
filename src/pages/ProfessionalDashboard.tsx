
import { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="App">
      <Navbar />
      
      <Container className="my-5">
        <h1 className="text-3xl font-bold mb-4">Tableau de bord professionnel</h1>
        
        <Row>
          <Col lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="bg-light rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-3xl">👤</span>
                  </div>
                  <h5 className="mb-0">{user?.name || 'Professional'}</h5>
                  <p className="text-muted small">Professionnel</p>
                </div>
                
                <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={handleTabSelect}>
                  <Nav.Item>
                    <Nav.Link eventKey="overview" className="mb-2">Vue d'ensemble</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="profile" className="mb-2">Mon profil</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="requests" className="mb-2">Demandes</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reviews" className="mb-2">Avis clients</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="services" className="mb-2">Mes services</Nav.Link>
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
                            <h3 className="text-xl font-bold mb-1">14</h3>
                            <p className="mb-0 text-muted">Demandes</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4}>
                        <Card className="bg-light border-0">
                          <Card.Body className="text-center">
                            <h3 className="text-xl font-bold mb-1">8</h3>
                            <p className="mb-0 text-muted">Services actifs</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4}>
                        <Card className="bg-light border-0">
                          <Card.Body className="text-center">
                            <h3 className="text-xl font-bold mb-1">4.5</h3>
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
                  
                  <Tab.Pane eventKey="requests" active={activeTab === "requests"}>
                    <h2 className="text-2xl font-semibold mb-3">Demandes de clients</h2>
                    <p>Liste des demandes...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="reviews" active={activeTab === "reviews"}>
                    <h2 className="text-2xl font-semibold mb-3">Avis clients</h2>
                    <p>Liste des avis...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="services" active={activeTab === "services"}>
                    <h2 className="text-2xl font-semibold mb-3">Mes services</h2>
                    <p>Liste des services...</p>
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

export default ProfessionalDashboard;
