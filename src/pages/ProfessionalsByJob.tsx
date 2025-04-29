import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, UserRound, Mail } from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import products from '../assets/tableaux/productData';
import jobs from '../assets/tableaux/jobs';
const ProfessionalsByJob = () => {
  const {
    categoryId,
    jobId
  } = useParams();
  const numCategoryId = categoryId ? parseInt(categoryId) : 0;
  const numJobId = jobId ? parseInt(jobId) : 0;
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Récupération des informations du métier
    if (numCategoryId && numJobId && jobs[numCategoryId]) {
      const foundJob = jobs[numCategoryId].find(j => j.id === numJobId);
      setJob(foundJob);
    }

    // Simulation d'une requête API pour récupérer les professionnels
    const fetchProfessionals = async () => {
      try {
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 800));

        // Utilisez les données de produits comme professionnels (pour la démo)
        const mockProfessionals = products.slice(0, 6).map((product, index) => ({
          ...product,
          id: index + 1,
          rating: (Math.random() * 2 + 3).toFixed(1),
          // Note entre 3 et 5
          speciality: job?.name || "Spécialiste",
          experience: Math.floor(Math.random() * 15) + 2,
          // Entre 2 et 17 ans d'expérience
          // Images de profil aléatoires
          profileImage: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`,
          phone: `0${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`
        }));
        setProfessionals(mockProfessionals);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des professionnels:", error);
        setIsLoading(false);
      }
    };
    fetchProfessionals();
  }, [numCategoryId, numJobId, job?.name]);
  const handleViewProfile = professionalId => {
    navigate(`/professional/${professionalId}`, {
      state: {
        professional: professionals.find(p => p.id === professionalId)
      }
    });
  };
  const handleContact = professionalId => {
    navigate(`/contact-professional/${professionalId}`, {
      state: {
        professional: professionals.find(p => p.id === professionalId)
      }
    });
  };
  return <div className="App">
      <Navbar />
      <div className="container my-5">
        <div className="mb-4">
          <Link to={`/categories/${categoryId}`} className="text-decoration-none d-flex align-items-center gap-2">
            <ArrowLeft size={18} />
            <span>Retour à la catégorie</span>
          </Link>
        </div>

        <div className="mb-5">
          <h1 className="mb-2 title1 fw-bold">Professionnels {job?.name}</h1>
          <p className="text-muted">Découvrez les meilleurs professionnels pour vos projets de {job?.name}</p>
        </div>

        {isLoading ? <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div> : professionals.length > 0 ? <div className="row g-4">
            {professionals.map(professional => <div key={professional.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                  <div className="card-body p-4">
                    <div className="d-flex mb-3">
                      <div className="me-3">
                        <div className="profile-image-container">
                          <img src={professional.profileImage} alt={`${professional.name}`} className="profile-image rounded-circle" />
                        </div>
                      </div>
                      <div>
                        <h5 className="card-title mb-0 fw-bold text-base">{professional.name}</h5>
                        <div className="d-flex align-items-center mt-1">
                          <Star size={14} fill="#ffc107" stroke="#ffc107" className="me-1" />
                          <span className="fw-medium">{professional.rating}</span>
                        </div>
                        <p className="text-muted mb-0">{professional.speciality}</p>
                        <p className="text-muted small">{professional.experience} ans d'expérience</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center text-muted mb-2">
                        <MapPin size={16} className="me-2" />
                        <span>{professional.address}, {professional.location}</span>
                      </div>
                      <div className="d-flex align-items-center text-muted mb-2">
                        <Phone size={16} className="me-2" />
                        <span>{professional.phone}</span>
                      </div>
                      <div className="d-flex align-items-center text-muted">
                        <Mail size={16} className="me-2" />
                        <span>{professional.name.toLowerCase().replace(' ', '.')}@example.com</span>
                      </div>
                    </div>
                    
                    <p className="card-text mb-4">{professional.descriptif.substring(0, 80)}...</p>
                    
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary" style={{
                  backgroundColor: '#C63E46',
                  borderColor: '#C63E46'
                }} onClick={() => handleContact(professional.id)}>
                        Contacter
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => handleViewProfile(professional.id)}>
                        Voir le profil
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div> : <div className="alert alert-info">
            Aucun professionnel trouvé pour ce métier. Veuillez essayer une autre recherche.
          </div>}
      </div>
      <Footer />
    </div>;
};
export default ProfessionalsByJob;