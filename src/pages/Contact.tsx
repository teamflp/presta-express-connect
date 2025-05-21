import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { MessageSquare, Mail, Send } from 'lucide-react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({} as Record<string, string>);

  // Function to handle form field changes with proper TypeScript types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
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
        subject: '',
        message: ''
      });
    }, 3000);
  };
  return <>
      <Navbar />
      <Container className="py-5 my-[75px]">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Contactez-nous</h1>
          <p className="text-muted">Nous sommes à votre écoute pour toute question ou suggestion</p>
        </div>
        
        {showSuccess && <Alert variant="success" className="mb-4">
            Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </Alert>}
        
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="bg-light p-4 rounded-3 h-100">
              <h3 className="mb-4">Informations de contact</h3>
              
              <div className="d-flex align-items-center mb-3">
                <Mail className="text-primary me-3" />
                <div>
                  <p className="mb-0 fw-medium">Email</p>
                  <p className="mb-0 text-muted">contact@prestaexpress.com</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <MessageSquare className="text-primary me-3" />
                <div>
                  <p className="mb-0 fw-medium">Assistance</p>
                  <p className="mb-0 text-muted">support@prestaexpress.com</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="mb-3">Horaires</h4>
                <p className="mb-1">Lundi - Vendredi: 9h - 18h</p>
                <p>Weekend: Fermé</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded-3 shadow-sm">
              <Form.Group className="mb-3">
                <Form.Label>Votre nom</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} className="custom-form-control" />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} className="custom-form-control" />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Sujet</Form.Label>
                <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} isInvalid={!!errors.subject} className="custom-form-control" />
                <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} name="message" value={formData.message} onChange={handleChange} isInvalid={!!errors.message} className="custom-form-control" />
                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
              </Form.Group>
              
              <Button variant="primary" type="submit" className="button-primary d-flex align-items-center" style={{
              borderRadius: '20px 0 20px 20px'
            }}>
                Envoyer le message
                <Send size={16} className="ms-2" />
              </Button>
            </Form>
          </div>
        </div>
      </Container>
      <Footer />
    </>;
};
export default Contact;