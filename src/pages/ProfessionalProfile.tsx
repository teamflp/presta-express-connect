
import React from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar, Award, Briefcase } from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

const ProfessionalProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const professional = location.state?.professional;

  if (!professional) {
    // Redirection vers une page d'erreur ou la liste des professionnels si les données ne sont pas disponibles
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

  const handleContact = () => {
    navigate(`/contact-professional/${professional.id}`, { state: { professional } });
  };

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
        
        <div className="professional-profile-header">
          <div className="large-profile-image-container">
            <img 
              src={professional.profileImage} 
              alt={professional.name} 
              className="profile-image" 
            />
          </div>
          <div className="professional-info">
            <h1 className="mb-2">{professional.name}</h1>
            <div className="d-flex align-items-center mb-2">
              <Star size={18} fill="#ffc107" stroke="#ffc107" className="me-2" />
              <span className="fw-medium">{professional.rating}</span>
              <span className="text-muted ms-2">(32 avis)</span>
            </div>
            <p className="text-muted mb-1">{professional.speciality}</p>
            <div className="d-flex align-items-center mb-3">
              <Calendar size={16} className="me-2 text-muted" />
              <span className="text-muted">{professional.experience} ans d'expérience</span>
            </div>
            <button 
              className="btn btn-primary" 
              style={{backgroundColor: '#C63E46', borderColor: '#C63E46'}}
              onClick={handleContact}
            >
              Contacter ce professionnel
            </button>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3">À propos</h3>
                <p>{professional.descriptif}</p>
              </div>
            </div>
            
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3">Compétences</h3>
                <div className="d-flex flex-wrap gap-2">
                  {['Installation', 'Réparation', 'Maintenance', 'Conseil', 'Urgences'].map((skill, index) => (
                    <span key={index} className="badge bg-light text-dark p-2">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3">Expériences</h3>
                <div className="d-flex align-items-start mb-4">
                  <Briefcase size={24} className="me-3 mt-1" />
                  <div>
                    <h5 className="mb-1">Expert {professional.speciality}</h5>
                    <p className="text-muted mb-1">Entreprise Exemple • 2018 - Aujourd'hui</p>
                    <p>Expertise en {professional.speciality} pour des clients particuliers et professionnels.</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <Briefcase size={24} className="me-3 mt-1" />
                  <div>
                    <h5 className="mb-1">Technicien {professional.speciality}</h5>
                    <p className="text-muted mb-1">Entreprise ABC • 2015 - 2018</p>
                    <p>Intervention technique et maintenance dans le domaine de {professional.speciality}.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h3 className="mb-3">Certifications</h3>
                <div className="d-flex align-items-start mb-3">
                  <Award size={24} className="me-3 mt-1" />
                  <div>
                    <h5 className="mb-1">Certification Professionnelle</h5>
                    <p className="text-muted">Obtenue en 2019</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <Award size={24} className="me-3 mt-1" />
                  <div>
                    <h5 className="mb-1">Formation Technique Avancée</h5>
                    <p className="text-muted">Obtenue en 2016</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="contact-info-card">
              <h3 className="mb-3">Coordonnées</h3>
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
                <h3 className="mb-3">Disponibilité</h3>
                <p className="mb-3">Généralement disponible sous 24 à 48 heures</p>
                <h5 className="mb-2">Horaires de travail</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">Lundi - Vendredi: 8h - 18h</li>
                  <li>Samedi: 9h - 14h (urgences uniquement)</li>
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

export default ProfessionalProfile;
