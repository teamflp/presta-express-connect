
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true);
      return;
    }
    
    // Reset error state
    setFormError(false);
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="App">
      <Navbar />
      
      <div className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col>
              <h1 className="text-center mb-3 title1" style={{ color: '#C63E46' }}>Contactez-nous</h1>
              <p className="text-center lead mb-0">
                Nous sommes là pour vous aider et répondre à toutes vos questions
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={5} className="mb-4 mb-lg-0">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="mb-4">Informations de contact</h3>
                  
                  <div className="d-flex align-items-start mb-4">
                    <div className="me-3" style={{ color: '#C63E46' }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1">Adresse</h5>
                      <p className="mb-0">
                        123 Avenue des Artisans<br />
                        69008 Lyon, France
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start mb-4">
                    <div className="me-3" style={{ color: '#C63E46' }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1">Téléphone</h5>
                      <p className="mb-0">
                        +33 4 78 12 34 56<br />
                        Lun - Ven, 9h - 18h
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start mb-4">
                    <div className="me-3" style={{ color: '#C63E46' }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1">Email</h5>
                      <p className="mb-0">
                        contact@prestaexpress.com<br />
                        support@prestaexpress.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start">
                    <div className="me-3" style={{ color: '#C63E46' }}>
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1">Réseaux sociaux</h5>
                      <p className="mb-0">
                        Suivez-nous sur Facebook, Twitter, et Instagram<br />
                        @prestaexpress
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={7}>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="mb-4">Envoyez-nous un message</h3>
                  
                  {formSubmitted && (
                    <Alert variant="success" className="mb-4">
                      <strong>Merci pour votre message !</strong> Nous vous répondrons dans les plus brefs délais.
                    </Alert>
                  )}
                  
                  {formError && (
                    <Alert variant="danger" className="mb-4">
                      <strong>Oops !</strong> Veuillez remplir tous les champs obligatoires.
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Nom complet <span className="text-danger">*</span></Form.Label>
                          <Form.Control 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Votre nom" 
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                          <Form.Control 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Votre email" 
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Sujet</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sujet de votre message" 
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Message <span className="text-danger">*</span></Form.Label>
                      <Form.Control 
                        as="textarea" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Votre message" 
                        rows={5} 
                        required
                      />
                    </Form.Group>
                    
                    <Button 
                      type="submit" 
                      className="w-100 py-2"
                      style={{ backgroundColor: '#C63E46', borderColor: '#C63E46' }}
                    >
                      Envoyer le message
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <iframe 
                    title="Carte Presta Express"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22239.801857378335!2d4.859872556008803!3d45.74713863762305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c204f0c23cc7%3A0xf2ecccf738627733!2s69008%20Lyon!5e0!3m2!1sfr!2sfr!4v1629968058697!5m2!1sfr!2sfr"
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col className="text-center">
              <h2 className="mb-4" style={{ color: '#C63E46' }}>Foire Aux Questions</h2>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item border mb-3 rounded shadow-sm">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      Comment fonctionne Presta Express ?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Presta Express vous permet de trouver des professionnels qualifiés en quelques clics. Recherchez par métier, consultez les profils, les avis, et contactez directement le professionnel de votre choix.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border mb-3 rounded shadow-sm">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      Comment sont sélectionnés les professionnels ?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Tous les professionnels présents sur notre plateforme sont vérifiés. Nous vérifions leurs diplômes, certifications, assurances et évaluons leur sérieux avant de les accepter.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border mb-3 rounded shadow-sm">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Les devis sont-ils gratuits ?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Oui, les devis sont gratuits. Une fois que vous avez contacté un professionnel, il peut vous proposer un devis sans engagement pour votre projet.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border rounded shadow-sm">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      Comment devenir un professionnel sur Presta Express ?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Pour devenir un professionnel référencé sur notre plateforme, rendez-vous sur la page d'inscription et sélectionnez "Je suis un professionnel". Vous devrez ensuite compléter votre profil et soumettre les documents nécessaires pour notre processus de vérification.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
