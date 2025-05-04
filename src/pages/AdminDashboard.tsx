
import { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="App">
      <Navbar />
      
      <Container className="my-5">
        <h1 className="text-3xl font-bold mb-4">Tableau de bord administrateur</h1>
        
        <Row>
          <Col lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="bg-light rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-3xl">👤</span>
                  </div>
                  <h5 className="mb-0">{user?.name || 'Admin'}</h5>
                  <p className="text-muted small">Administrateur</p>
                </div>
                
                <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={handleTabSelect}>
                  <Nav.Item>
                    <Nav.Link eventKey="overview" className="mb-2">Vue d'ensemble</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="users" className="mb-2">Utilisateurs</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="artisans" className="mb-2">Artisans</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="categories" className="mb-2">Catégories</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="reports" className="mb-2">Rapports</Nav.Link>
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
                            <h3 className="text-xl font-bold mb-1">1,245</h3>
                            <p className="mb-0 text-muted">Utilisateurs</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4}>
                        <Card className="bg-light border-0">
                          <Card.Body className="text-center">
                            <h3 className="text-xl font-bold mb-1">487</h3>
                            <p className="mb-0 text-muted">Artisans</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4}>
                        <Card className="bg-light border-0">
                          <Card.Body className="text-center">
                            <h3 className="text-xl font-bold mb-1">3,298</h3>
                            <p className="mb-0 text-muted">Demandes</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="users" active={activeTab === "users"}>
                    <h2 className="text-2xl font-semibold mb-3">Gestion des utilisateurs</h2>
                    <p>Contenu de gestion des utilisateurs...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="artisans" active={activeTab === "artisans"}>
                    <h2 className="text-2xl font-semibold mb-3">Gestion des artisans</h2>
                    <p>Contenu de gestion des artisans...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="categories" active={activeTab === "categories"}>
                    <h2 className="text-2xl font-semibold mb-3">Gestion des catégories</h2>
                    <p>Contenu de gestion des catégories...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="reports" active={activeTab === "reports"}>
                    <h2 className="text-2xl font-semibold mb-3">Rapports et statistiques</h2>
                    <p>Contenu des rapports...</p>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="settings" active={activeTab === "settings"}>
                    <h2 className="text-2xl font-semibold mb-3">Paramètres du site</h2>
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

export default AdminDashboard;
