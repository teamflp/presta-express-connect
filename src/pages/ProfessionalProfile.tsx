
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Tabs, Tab } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Briefcase, Clock, Award, Tool, MessageSquare } from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

const ProfessionalProfile = () => {
  // Use the id from useParams
  const { id } = useParams<{id: string}>();
  const [professional, setProfessional] = useState({
    id: id || '1',
    name: 'Jean Dupont',
    rating: '4.8',
    speciality: 'Plomberie',
    experience: 12,
    profileImage: '/src/assets/images/lyonImage.jpg',
    phone: '06 12 34 56 78',
    email: 'jeandupont@example.com',
    address: '15 rue des Artisans',
    location: 'Lyon',
    descriptif: 'Plombier qualifié avec plus de 10 ans d\'expérience. Spécialisé dans les installations, réparations et l\'entretien de systèmes de plomberie résidentielle et commerciale. Travail soigné et propre, intervention rapide.',
    gallery: [
      '/src/assets/images/plomberie.jpg',
      '/src/assets/images/tuyauterie.jpg',
      '/src/assets/images/sanitaires.jpg',
      '/src/assets/images/chauffage.jpg'
    ],
    services: [
      'Installation de plomberie',
      'Réparation de fuites',
      'Installation et réparation de chauffe-eau',
      'Installation de sanitaires',
      'Débouchage de canalisations',
      'Entretien de systèmes de chauffage'
    ]
  });

  // Changed to string to match Link to prop type
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <img
                      src={professional.profileImage}
                      alt={professional.name}
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2" style={{ width: '40px', height: '40px' }}>
                      <div className="d-flex align-items-center justify-content-center text-white">
                        <Star size={20} fill="white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="mt-3 mb-1">{professional.name}</h2>
                  <p className="text-muted mb-2">{professional.speciality}</p>
                  
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={i < Math.floor(parseFloat(professional.rating)) ? '#ffc107' : '#e4e5e9'}
                        stroke="none"
                      />
                    ))}
                    <span className="ms-2 fw-medium">{professional.rating}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="d-flex align-items-start mb-3">
                    <MapPin size={20} className="text-primary mt-1 me-2" />
                    <div>
                      <p className="mb-0 fw-medium">Adresse</p>
                      <p className="mb-0 text-muted">{professional.address}, {professional.location}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start mb-3">
                    <Phone size={20} className="text-primary mt-1 me-2" />
                    <div>
                      <p className="mb-0 fw-medium">Téléphone</p>
                      <p className="mb-0 text-muted">{professional.phone}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start mb-3">
                    <Mail size={20} className="text-primary mt-1 me-2" />
                    <div>
                      <p className="mb-0 fw-medium">Email</p>
                      <p className="mb-0 text-muted">{professional.name.toLowerCase().replace(' ', '')}@example.com</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start mb-3">
                    <Briefcase size={20} className="text-primary mt-1 me-2" />
                    <div>
                      <p className="mb-0 fw-medium">Spécialité</p>
                      <p className="mb-0 text-muted">{professional.speciality}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start">
                    <Clock size={20} className="text-primary mt-1 me-2" />
                    <div>
                      <p className="mb-0 fw-medium">Expérience</p>
                      <p className="mb-0 text-muted">{professional.experience} ans</p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to={`/contact-professional/${professional.id}`} 
                  className="btn button-primary w-100 d-flex align-items-center justify-content-center"
                  style={{
                    borderRadius: '20px 0 20px 20px',
                  }}
                >
                  <MessageSquare size={18} className="me-2" />
                  Contacter
                </Link>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h3 className="mb-3">À propos</h3>
                <p>{professional.descriptif}</p>
                
                <div className="d-flex flex-wrap mt-4">
                  <Badge bg="light" text="dark" className="me-2 mb-2 p-2">
                    <Award size={14} className="me-1" />
                    {professional.experience} ans d'expérience
                  </Badge>
                  <Badge bg="light" text="dark" className="me-2 mb-2 p-2">
                    <Tool size={14} className="me-1" />
                    Professionnel qualifié
                  </Badge>
                  <Badge bg="light" text="dark" className="me-2 mb-2 p-2">
                    <Star size={14} className="me-1" />
                    Travail soigné
                  </Badge>
                </div>
              </Card.Body>
            </Card>
            
            <Tabs defaultActiveKey="services" className="mb-4">
              <Tab eventKey="services" title="Services">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h3 className="mb-3">Services proposés</h3>
                    <Row>
                      {professional.services.map((service, index) => (
                        <Col md={6} key={index} className="mb-2">
                          <div className="d-flex align-items-center">
                            <div className="me-2 text-primary">•</div>
                            <div>{service}</div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="gallery" title="Galerie">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h3 className="mb-3">Galerie de travaux</h3>
                    <Row>
                      {professional.gallery.map((image, index) => (
                        <Col md={6} className="mb-4" key={index}>
                          <img 
                            src={image} 
                            alt={`Travail ${index + 1}`}
                            className="img-fluid rounded shadow-sm hover-card"
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="reviews" title="Avis">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h3 className="mb-3">Avis clients</h3>
                    {/* Reviews content would go here */}
                    <div className="text-center py-4">
                      <p className="text-muted">Aucun avis pour le moment</p>
                      <Button variant="outline-primary">Laisser un avis</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProfessionalProfile;
