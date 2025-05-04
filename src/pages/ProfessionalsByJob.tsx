import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import NoResults from '../components/Search/NoResults';
import { jobs, Job } from '../assets/tableaux/jobs';

// Mock professionals data - in a real app, this would come from an API
interface Professional {
  id: number;
  name: string;
  jobId: number;
  city: string;
  rating: number;
  image: string;
}

// Sample data
const mockProfessionals: Professional[] = [
  { id: 1, name: "Jean Dupont", jobId: 1, city: "Lyon", rating: 4.8, image: "/src/assets/images/plomberie.jpg" },
  { id: 2, name: "Marie Martin", jobId: 2, city: "Paris", rating: 4.9, image: "/src/assets/images/installation-electrique.jpg" },
  { id: 3, name: "Pierre Durand", jobId: 1, city: "Marseille", rating: 4.7, image: "/src/assets/images/plomberie.jpg" },
  { id: 4, name: "Sophie Lefebvre", jobId: 3, city: "Bordeaux", rating: 4.5, image: "/src/assets/images/peinture-interieure.jpg" },
  { id: 5, name: "Luc Bernard", jobId: 2, city: "Toulouse", rating: 4.6, image: "/src/assets/images/installation-electrique.jpg" },
  { id: 6, name: "Isabelle Garcia", jobId: 3, city: "Nice", rating: 4.8, image: "/src/assets/images/peinture-interieure.jpg" },
  { id: 7, name: "Thomas Roux", jobId: 1, city: "Nantes", rating: 4.9, image: "/src/assets/images/plomberie.jpg" },
  { id: 8, name: "Julie Chevalier", jobId: 3, city: "Strasbourg", rating: 4.7, image: "/src/assets/images/peinture-interieure.jpg" },
  { id: 9, name: "David Meunier", jobId: 2, city: "Lille", rating: 4.5, image: "/src/assets/images/installation-electrique.jpg" },
  { id: 10, name: "Catherine Dubois", jobId: 1, city: "Rennes", rating: 4.6, image: "/src/assets/images/plomberie.jpg" }
];

function ProfessionalsByJob() {
  const { id } = useParams<{ id: string }>();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [category, setCategory] = useState<Job | null>(null);
  const jobList = jobs as Job[];

  useEffect(() => {
    // Find job category
    const jobId = Number(id);
    const foundCategory = jobList.find((j) => j.id === jobId);
    if (foundCategory) {
      setCategory(foundCategory);
    }

    // Filter professionals by job ID
    const filteredProfessionals = mockProfessionals.filter((p) => p.jobId === jobId);
    setProfessionals(filteredProfessionals);
  }, [id, jobList]);

  return (
    <div className="App">
      <NavBar />
      
      <div className="container my-5">
        {category ? (
          <>
            <h1 className="title1 mb-4">Artisans {category.title}</h1>
            <div className="row mb-5">
              {professionals.length > 0 ? (
                professionals.map((pro) => (
                  <div key={pro.id} className="col-md-4 mb-4">
                    <div className="card hover-card h-100">
                      <img 
                        src={pro.image} 
                        className="card-img-top" 
                        alt={pro.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{pro.name}</h5>
                        <p className="card-text">
                          <small className="text-muted">{pro.city}</small>
                        </p>
                        <div className="d-flex align-items-center mb-3">
                          <span className="me-2">★</span>
                          <span>{pro.rating} / 5</span>
                        </div>
                        <a href={`/artisan/${pro.id}`} className="btn btn-primary">
                          Voir le profil
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NoResults />
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2>Catégorie non trouvée</h2>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default ProfessionalsByJob;
