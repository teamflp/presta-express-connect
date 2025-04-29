
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { Users, Building2, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="App">
      <Navbar />
      
      <div className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col>
              <h1 className="text-center mb-3 title1" style={{ color: '#C63E46' }}>À Propos de Presta Express</h1>
              <p className="text-center lead mb-0">
                Votre plateforme de confiance pour trouver des professionnels qualifiés
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="À propos de Presta Express" 
                className="img-fluid rounded shadow-sm" 
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </Col>
            <Col lg={6}>
              <h2 className="mb-4" style={{ color: '#C63E46' }}>Notre Mission</h2>
              <p>
                Fondée en 2020, Presta Express a pour mission de connecter les particuliers avec des professionnels de confiance pour tous leurs besoins de services et de travaux. 
              </p>
              <p>
                Notre plateforme facilite la mise en relation avec des artisans qualifiés, certifiés et évalués par notre communauté d'utilisateurs. Nous croyons en la transparence, la qualité du service et la satisfaction du client.
              </p>
              <p>
                Que vous ayez besoin d'un plombier en urgence, d'un électricien pour votre rénovation ou d'un menuisier pour créer votre mobilier sur mesure, Presta Express est là pour vous aider à trouver le bon professionnel, au bon moment et au bon prix.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={12} className="text-center mb-4">
              <h2 style={{ color: '#C63E46' }}>Nos Valeurs</h2>
            </Col>
            <Col md={3} className="mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3" style={{ color: '#C63E46' }}>
                    <Users size={48} />
                  </div>
                  <h4 className="card-title">Confiance</h4>
                  <p className="card-text">
                    Tous nos professionnels sont vérifiés et passent par un processus de sélection rigoureux.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3" style={{ color: '#C63E46' }}>
                    <Building2 size={48} />
                  </div>
                  <h4 className="card-title">Qualité</h4>
                  <p className="card-text">
                    Nous nous engageons à proposer des services de haute qualité et des professionnels compétents.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3" style={{ color: '#C63E46' }}>
                    <Target size={48} />
                  </div>
                  <h4 className="card-title">Transparence</h4>
                  <p className="card-text">
                    Les avis et évaluations sont authentiques et vérifiés pour vous aider dans votre décision.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3" style={{ color: '#C63E46' }}>
                    <Heart size={48} />
                  </div>
                  <h4 className="card-title">Satisfaction</h4>
                  <p className="card-text">
                    Votre satisfaction est notre priorité. Nous vous accompagnons à chaque étape.
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={6} className="order-lg-2 mb-4 mb-lg-0">
              <img 
                src="https://images.unsplash.com/photo-1524230572899-a752b3835840" 
                alt="Notre équipe" 
                className="img-fluid rounded shadow-sm" 
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </Col>
            <Col lg={6} className="order-lg-1">
              <h2 className="mb-4" style={{ color: '#C63E46' }}>Notre Équipe</h2>
              <p>
                Chez Presta Express, notre équipe est composée d'experts passionnés par l'amélioration de l'habitat et la qualité des services. Nous travaillons chaque jour pour vous offrir la meilleure expérience possible.
              </p>
              <p>
                Notre personnel de support client est disponible pour répondre à vos questions et vous accompagner dans votre recherche du professionnel idéal pour votre projet.
              </p>
              <p>
                Nos développeurs et designers s'efforcent constamment d'améliorer notre plateforme pour la rendre plus intuitive et adaptée à vos besoins. Notre objectif est de vous faire gagner du temps et de vous garantir une tranquillité d'esprit.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
