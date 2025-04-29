import React from 'react';
import { useParams, Link } from 'react-router-dom';
import categories from '../assets/tableaux/categories';
import jobs from '../assets/tableaux/jobs';
import { Category as CategoryType } from '../assets/tableaux/categories';
import { Job } from '../assets/tableaux/jobs';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
const CategoryDetails: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const categoryId = id ? parseInt(id) : 0;
  const category: CategoryType | undefined = categories.find(cat => cat.id === categoryId);
  const categoryJobs: Job[] = jobs[categoryId] || [];
  if (!category) {
    return <div className="App">
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Catégorie non trouvée</h2>
          <Link to="/categories" className="btn btn-primary mt-3">Retour aux catégories</Link>
        </div>
        <Footer />
      </div>;
  }
  return <div className="App">
      <Navbar />
      <div className="container my-5">
        <div className="mb-4">
          <Link to="/categories" className="text-decoration-none">
            &larr; Retour aux catégories
          </Link>
        </div>
        
        <h1 className="mb-4 fw-bold title1">{category.title}</h1>
        <p className="mb-5">
          Découvrez tous nos professionnels dans le domaine de {category.title.toLowerCase()}
        </p>
        
        <h3 className="mb-4">Métiers disponibles</h3>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
          {categoryJobs.length > 0 ? categoryJobs.map(job => <div className="col" key={job.id}>
                <div className="card job-card h-100 border-0 shadow-sm hover-card">
                  <img className="img-fluid job-image" src={job.image} alt={job.name} />
                  <div className="card-body">
                    <h5 className="card-title text-lg">{job.name}</h5>
                    <a href="#" className="card-link">
                      Voir les professionnels
                    </a>
                  </div>
                </div>
              </div>) : <div className="col-12">
              <p>Aucun métier disponible dans cette catégorie pour le moment.</p>
            </div>}
        </div>
      </div>
      <Footer />
    </div>;
};
export default CategoryDetails;