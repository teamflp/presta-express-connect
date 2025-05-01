
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { Phone, Mail, Clock, Send } from 'lucide-react';

const ContactProfessional = () => {
  // Use useParams to get the id - correct the unused variable warning
  const { id } = useParams<{id: string}>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({} as Record<string, string>);

  // Function to handle form field changes with proper TypeScript types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission with proper TypeScript types
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors
    setErrors({});
    
    // Show success message (in a real app, you would send data to backend here)
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  // Corrected the return type to use string instead of number for to prop
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Link to={`/professional/${id}`} className="btn btn-outline-secondary mb-4">
          &larr; Retour au profil
        </Link>
        
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Contacter le Professionnel</h1>
          <p className="text-muted">Envoyez un message pour demander un devis ou poser vos questions</p>
        </div>
        
        {showSuccess && (
          <Alert variant="success" className="mb-4">
            Votre message a été envoyé avec succès ! Le professionnel vous contactera bientôt.
          </Alert>
        )}
        
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h3 className="mb-4">Informations de contact</h3>
                
                <div className="d-flex align-items-center mb-3">
                  <Mail className="text-primary me-3" size={20} />
                  <div>
                    <p className="mb-0 fw-medium">Email</p>
                    <p className="mb-0 text-muted">artisan@example.com</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <Phone className="text-primary me-3" size={20} />
                  <div>
                    <p className="mb-0 fw-medium">Téléphone</p>
                    <p className="mb-0 text-muted">06 12 34 56 78</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <Clock className="text-primary me-3" size={20} />
                  <div>
                    <p className="mb-0 fw-medium">Disponibilité</p>
                    <p className="mb-0 text-muted">Lundi - Vendredi: 8h - 18h</p>
                  </div>
                </div>
                
                <div className="alert alert-info mt-4">
                  <small>Le professionnel vous répondra généralement dans un délai de 24 à 48 heures</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Votre nom</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          className="custom-form-control"
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          className="custom-form-control"
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone}
                          className="custom-form-control"
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Sujet</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          isInvalid={!!errors.subject}
                          className="custom-form-control"
                        />
                        <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Votre message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                      className="custom-form-control"
                      placeholder="Décrivez votre projet ou posez vos questions..."
                    />
                    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="button-primary d-flex align-items-center"
                    style={{
                      borderRadius: '20px 0 20px 20px',
                    }}
                  >
                    Envoyer le message
                    <Send size={16} className="ms-2" />
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ContactProfessional;
