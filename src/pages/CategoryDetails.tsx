
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import categories from '../assets/tableaux/categories';
import jobs from '../assets/tableaux/jobs';
import { Category as CategoryType } from '../assets/tableaux/categories';
import { Job } from '../assets/tableaux/jobs';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { Wrench, PaintBucket, Hammer, Zap } from 'lucide-react';

const CategoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? parseInt(id) : 0;
  const category: CategoryType | undefined = categories.find(cat => cat.id === categoryId);
  const categoryJobs: Job[] = jobs[categoryId] || [];

  // Fonction pour obtenir l'icône en fonction du nom
  const getIconComponent = (iconName: string | undefined) => {
    switch (iconName) {
      case 'wrench':
        return <Wrench className="category-icon-large" size={64} />;
      case 'hammer':
        return <Hammer className="category-icon-large" size={64} />;
      case 'zap':
        return <Zap className="category-icon-large" size={64} />;
      case 'paintbrush':
        return <PaintBucket className="category-icon-large" size={64} />;
      default:
        return <Wrench className="category-icon-large" size={64} />;
    }
  };

  if (!category) {
    return (
      <div className="App">
        <Navbar />
        <div className="container my-5 text-center">
          <h2>Catégorie non trouvée</h2>
          <Link to="/categories" className="btn btn-primary mt-3">Retour aux catégories</Link>
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
          <Link to="/categories" className="text-decoration-none">
            &larr; Retour aux catégories
          </Link>
        </div>
        
        <div className="category-header mb-4">
          <div className="category-icon-wrapper-large">
            {getIconComponent(category.icon)}
          </div>
          <h1 className="mb-4 fw-bold title1">{category.title}</h1>
        </div>
        
        <p className="mb-5">
          Découvrez tous nos professionnels dans le domaine de {category.title.toLowerCase()}
        </p>
        
        <h3 className="mb-4">Métiers disponibles</h3>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
          {categoryJobs.length > 0 ? (
            categoryJobs.map(job => (
              <div className="col" key={job.id}>
                <div className="card job-card h-100 border-0 shadow-sm hover-card">
                  <img className="img-fluid job-image" src={job.image} alt={job.name} />
                  <div className="card-body">
                    <h5 className="card-title text-base text-center">{job.name}</h5>
                    <a href="#" className="card-link">
                      Voir les professionnels
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>Aucun métier disponible dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryDetails;
