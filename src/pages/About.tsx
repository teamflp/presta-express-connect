import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import FaqAccordion from '../components/FAQ/Faqs';
function About() {
  return <div className="App my-[130px]">
      <Navbar />
      
      <Container className="my-[80px]">
        <h1 className="text-3xl font-bold mb-4 text-center">À propos de PrestaExpress</h1>
        
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-2xl font-semibold mb-3">Notre mission</h2>
                <p className="mb-3">
                  Fondé en 2023, PrestaExpress a pour mission de connecter les clients avec les meilleurs artisans et professionnels près de chez eux. Nous croyons en la qualité du travail, la transparence et l'excellence du service.
                </p>
                <p>
                  Notre plateforme facilite la mise en relation entre les clients ayant des besoins spécifiques et des artisans qualifiés, tout en offrant des outils pour simplifier la gestion des projets et des devis.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-5 g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm hover-card">
              <Card.Body className="p-4 text-center">
                <div className="mb-3 text-primary">
                  <i className="bi bi-people-fill fs-1"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Notre équipe</h3>
                <p>
                  Une équipe passionnée de professionnels du digital et d'experts dans le domaine de l'artisanat, dédiée à améliorer l'expérience des utilisateurs.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm hover-card">
              <Card.Body className="p-4 text-center">
                <div className="mb-3 text-primary">
                  <i className="bi bi-star-fill fs-1"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Nos valeurs</h3>
                <p>
                  Qualité, transparence, confiance et satisfaction client sont au cœur de notre approche pour transformer le secteur de l'artisanat.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm hover-card">
              <Card.Body className="p-4 text-center">
                <div className="mb-3 text-primary">
                  <i className="bi bi-graph-up-arrow fs-1"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Notre vision</h3>
                <p>
                  Devenir la référence française pour la mise en relation entre artisans et clients, et contribuer à la valorisation des métiers de l'artisanat.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <div className="container my-3 my-md-5">
        <FaqAccordion />
      </div>
      
      <Footer />
    </div>;
}
export default About;