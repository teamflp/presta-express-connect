
import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Send } from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

const ContactProfessional = () => {
  const { id } = useParams();
  const location = useLocation();
  const professional = location.state?.professional;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi du formulaire
    setTimeout(() => {
      setFormSubmitted(true);
    }, 1000);
  };

  if (!professional) {
    return (
      <div className="App">
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Professionnel non trouvé</h2>
          <p>Les informations de ce professionnel ne sont pas disponibles.</p>
          <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <div className="container my-5">
        <div className="mb-4">
          <Link to={-1} className="text-decoration-none d-flex align-items-center gap-2">
            <ArrowLeft size={18} />
            <span>Retour</span>
          </Link>
        </div>

        <h1 className="mb-4 title1">Contacter {professional.name}</h1>
        
        <div className="row">
          <div className="col-lg-8">
            {formSubmitted ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <Send size={50} className="text-success" />
                  </div>
                  <h3 className="mb-3">Message envoyé avec succès !</h3>
                  <p className="mb-4">Votre demande a été transmise à {professional.name}. Il vous contactera dans les plus brefs délais.</p>
                  <Link to="/" className="btn btn-primary" style={{backgroundColor: '#C63E46', borderColor: '#C63E46'}}>
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            ) : (
              <div className="professional-contact-form">
                <h4 className="mb-4">Envoyez un message à {professional.name}</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="name" className="form-label">Votre nom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Votre email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Votre téléphone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Sujet</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Votre message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100" 
                    style={{backgroundColor: '#C63E46', borderColor: '#C63E46'}}
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            )}
          </div>
          
          <div className="col-lg-4">
            <div className="contact-info-card mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="profile-image-container-small">
                  <img 
                    src={professional.profileImage} 
                    alt={professional.name} 
                    className="profile-image" 
                  />
                </div>
                <div className="ms-3">
                  <h5 className="mb-1">{professional.name}</h5>
                  <p className="text-muted mb-0">{professional.speciality}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <MapPin size={20} />
                <span>{professional.address}, {professional.location}</span>
              </div>
              <div className="contact-info-item">
                <Phone size={20} />
                <span>{professional.phone}</span>
              </div>
              <div className="contact-info-item">
                <Mail size={20} />
                <span>{professional.name.toLowerCase().replace(' ', '.')}@example.com</span>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">Pourquoi contacter ce professionnel ?</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">✓ {professional.experience} ans d'expérience</li>
                  <li className="mb-2">✓ Note de {professional.rating}/5</li>
                  <li className="mb-2">✓ Interventions rapides</li>
                  <li>✓ Devis gratuit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactProfessional;
