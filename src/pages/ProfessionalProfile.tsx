
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar, Briefcase, Clock, CheckCircle } from 'lucide-react';

const ProfessionalProfile = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const professional = location.state?.professional;

  // Si le professionnel n'est pas trouvé dans l'état
  if (!professional) {
    return (
      <div className="App">
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Professionnel non trouvé</h2>
          <p>Le professionnel que vous cherchez n'existe pas ou n'est plus disponible.</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn"
            style={{
              backgroundColor: '#C63E46',
              color: 'white'
            }}
          >
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleContact = () => {
    navigate(`/contact-professional/${professional.id}`, {
      state: { professional }
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container my-5">
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2">
            <ArrowLeft size={18} />
            <span>Retour</span>
          </button>
        </div>

        <div className="row">
          {/* Colonne de gauche - Informations du professionnel */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <img 
                    src={professional.profileImage || 'https://via.placeholder.com/120'} 
                    alt={professional.name} 
                    className="rounded-circle mb-3"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                  />
                  <h2 className="card-title mb-0 fw-bold">{professional.name}</h2>
                  <p className="text-muted">{professional.speciality || 'Professionnel'}</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <Star size={18} fill="#ffc107" stroke="#ffc107" className="me-1" />
                    <span className="fw-medium">{professional.rating || '4.8'}</span>
                    <span className="text-muted ms-1">(28 avis)</span>
                  </div>
                </div>

                <hr />

                <div className="mb-3 d-flex align-items-center">
                  <MapPin size={18} className="me-2 text-primary" />
                  <span>{professional.address || 'Adresse non spécifiée'}, {professional.location || ''}</span>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Phone size={18} className="me-2 text-primary" />
                  <span>{professional.phone || 'Téléphone non spécifié'}</span>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Mail size={18} className="me-2 text-primary" />
                  <span>{professional.email || professional.name?.toLowerCase().replace(' ', '.') + '@example.com'}</span>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Calendar size={18} className="me-2 text-primary" />
                  <span>Inscrit depuis le 15/03/2023</span>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Briefcase size={18} className="me-2 text-primary" />
                  <span>{professional.experience || 5} ans d'expérience</span>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button 
                    className="btn btn-primary" 
                    onClick={handleContact}
                    style={{ backgroundColor: '#C63E46', borderColor: '#C63E46' }}
                  >
                    Contacter
                  </button>
                </div>
              </div>
            </div>

            {/* Qualifications et certifications */}
            <div className="card shadow-sm border-0 rounded-3 mt-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Qualifications</h5>
                <div className="mb-2 d-flex align-items-center">
                  <CheckCircle size={16} className="me-2 text-success" />
                  <span>Certification professionnelle</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <CheckCircle size={16} className="me-2 text-success" />
                  <span>Assurance décennale</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <CheckCircle size={16} className="me-2 text-success" />
                  <span>Garantie de qualité</span>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Description, services, galerie */}
          <div className="col-lg-8">
            {/* À propos */}
            <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-3">À propos</h3>
                <p>{professional.descriptif || 'Aucune description disponible.'}</p>
              </div>
            </div>

            {/* Services proposés */}
            <div className="card shadow-sm border-0 rounded-3 mb-4">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-3">Services proposés</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="me-2 text-primary" />
                      <span>Installation</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="me-2 text-primary" />
                      <span>Réparation</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="me-2 text-primary" />
                      <span>Maintenance</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="me-2 text-primary" />
                      <span>Conseil</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Galerie de réalisations */}
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-3">Galerie de réalisations</h3>
                <div className="row g-2">
                  {[
                    professional.image, 
                    professional.image1, 
                    professional.image2, 
                    professional.image3,
                    professional.image4
                  ].filter(Boolean).map((image, index) => (
                    <div key={index} className="col-4">
                      <img 
                        src={image} 
                        alt={`Réalisation ${index + 1}`} 
                        className="img-fluid rounded" 
                        style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
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
