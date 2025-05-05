
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import StatsCard from '../components/Dashboard/StatsCard';
import { Container, Row, Col } from 'react-bootstrap';
import DataTable from '../components/Dashboard/DataTable';
import ProfileCard from '../components/Dashboard/ProfileCard';

function ProfessionalDashboard() {
  // Sample data for demonstration
  const recentRequests = [
    { id: 1, client: 'Jean Dupont', service: 'Plomberie', date: '12/05/2023', status: 'completed' },
    { id: 2, client: 'Marie Martin', service: 'Installation', date: '10/05/2023', status: 'in-progress' },
    { id: 3, client: 'Paul Bernard', service: 'Réparation', date: '08/05/2023', status: 'pending' }
  ];

  return (
    <DashboardLayout>
      <Container fluid>
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-gray-600">Bienvenue sur votre espace professionnel</p>
          </Col>
          <Col lg={4} className="text-end">
            <button className="btn btn-primary">Nouvelle demande</button>
          </Col>
        </Row>

        <Row className="mb-6">
          <Col md={6} lg={3} className="mb-4">
            <StatsCard title="Devis en attente" value={5} color="card-gradient-amber" />
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <StatsCard title="Projets en cours" value={3} color="card-gradient-blue" />
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <StatsCard title="Projets terminés" value={12} color="card-gradient-green" />
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <StatsCard title="Avis clients" value="4.8" color="card-gradient-purple" />
          </Col>
        </Row>

        <Row className="mb-6">
          <Col lg={8} className="mb-4">
            <div className="bg-white rounded shadow">
              <div className="p-4 border-bottom">
                <h2 className="text-xl font-semibold">Demandes récentes</h2>
              </div>
              <DataTable 
                headers={['ID', 'Client', 'Service', 'Date', 'Statut']}
                data={recentRequests}
                renderRow={(item, index) => (
                  <tr key={index}>
                    <td>#{item.id}</td>
                    <td>{item.client}</td>
                    <td>{item.service}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status === 'completed' && 'Terminé'}
                        {item.status === 'in-progress' && 'En cours'}
                        {item.status === 'pending' && 'En attente'}
                      </span>
                    </td>
                  </tr>
                )}
              />
            </div>
          </Col>
          <Col lg={4}>
            <ProfileCard name="Jean Martin" role="Plombier" />
            <div className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-3">Tâches à faire</h3>
              <ul className="space-y-2">
                <li className="flex items-center p-2 border-bottom">
                  <input type="checkbox" className="mr-2" />
                  <span>Répondre aux nouveaux messages</span>
                </li>
                <li className="flex items-center p-2 border-bottom">
                  <input type="checkbox" className="mr-2" />
                  <span>Mettre à jour la disponibilité</span>
                </li>
                <li className="flex items-center p-2">
                  <input type="checkbox" className="mr-2" />
                  <span>Envoyer le devis au client Bernard</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}

export default ProfessionalDashboard;
