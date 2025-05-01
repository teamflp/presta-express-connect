
import { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ContactProfessional = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const professional = location.state?.professional;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    termsAccepted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    if (!formData.termsAccepted) {
      toast.error('Vous devez accepter les conditions générales.');
      return;
    }

    // Simuler l'envoi du formulaire
    toast.success('Votre message a été envoyé avec succès!');
    
    // Rediriger vers la page du professionnel
    navigate(`/professional/${professional?.id || ''}`);
  };

  if (!professional) {
    return (
      <div className="App">
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Professionnel non trouvé</h2>
          <p>Le professionnel que vous cherchez n'existe pas ou n'est plus disponible.</p>
          <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
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
          <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2">
            <ArrowLeft size={18} />
            <span>Retour</span>
          </button>
        </div>

        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h1 className="card-title mb-4 fw-bold">Contacter {professional.name}</h1>

                <div className="professional-info mb-4 d-flex align-items-center">
                  <div className="me-3">
                    <img 
                      src={professional.profileImage || 'https://via.placeholder.com/60'} 
                      alt={professional.name} 
                      className="rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                    />
                  </div>
                  <div>
                    <h5 className="mb-1">{professional.name}</h5>
                    <p className="text-muted mb-0">{professional.speciality || 'Professionnel'}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="firstName" className="form-label">Prénom *</label>
                      <input
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Nom *</label>
                      <input
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Téléphone</label>
                      <input
                        type="tel" 
                        className="form-control" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      className="form-control" 
                      id="message" 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox" 
                      className="form-check-input" 
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="termsAccepted">
                      J'accepte les conditions générales et la politique de confidentialité
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    style={{ backgroundColor: '#C63E46', borderColor: '#C63E46' }}
                  >
                    Envoyer le message
                  </button>
                </form>
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
