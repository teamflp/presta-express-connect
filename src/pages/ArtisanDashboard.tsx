
import { Container, Row, Col } from 'react-bootstrap';
import DashboardLayout from '../components/Dashboard/DashboardLayout';

function ArtisanDashboard() {
  return (
    <DashboardLayout>
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h1 className="text-3xl font-bold">Tableau de bord Artisan</h1>
            <p className="text-gray-600">Bienvenue sur votre espace artisan</p>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Fonctionnalités à venir</h2>
              <p>L'interface de gestion pour les artisans est en cours de développement.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}

export default ArtisanDashboard;
