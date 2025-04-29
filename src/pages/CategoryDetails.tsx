
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import categories from '../assets/tableaux/categories';
import jobs from '../assets/tableaux/jobs';
import { Category as CategoryType } from '../assets/tableaux/categories';
import { Job } from '../assets/tableaux/jobs';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { 
  Wrench, PaintBucket, Hammer, Zap,
  Thermometer, Droplet, Bath, Flame, Search, 
  Axe, Gem, Home, Sofa, Grid, Square, RefreshCw,
  Plug, Cpu, Lightbulb, Sun, Wifi, Shield, Smartphone,
  Palette, Building, Framer, Layers, Brush, Feather, Settings
} from 'lucide-react';

const CategoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? parseInt(id) : 0;
  const category: CategoryType | undefined = categories.find(cat => cat.id === categoryId);
  const categoryJobs: Job[] = jobs[categoryId] || [];

  // Fonction pour obtenir l'icône en fonction du nom
  const getIconComponent = (iconName: string | undefined, size = 24) => {
    switch (iconName) {
      // Category Icons
      case 'wrench': return <Wrench size={size} className="category-icon-large" />;
      case 'hammer': return <Hammer size={size} className="category-icon-large" />;
      case 'zap': return <Zap size={size} className="category-icon-large" />;
      case 'paint-bucket': return <PaintBucket size={size} className="category-icon-large" />;
      
      // Job Icons
      case 'tool': return <Settings size={size} className="job-icon" />;
      case 'pipe': return <Wrench size={size} className="job-icon" />; // Changed from PipeLine to Wrench as a fallback
      case 'thermometer': return <Thermometer size={size} className="job-icon" />;
      case 'droplet': return <Droplet size={size} className="job-icon" />;
      case 'bath': return <Bath size={size} className="job-icon" />;
      case 'flame': return <Flame size={size} className="job-icon" />;
      case 'search': return <Search size={size} className="job-icon" />;
      case 'axe': return <Axe size={size} className="job-icon" />;
      case 'gem': return <Gem size={size} className="job-icon" />;
      case 'door': return <Home size={size} className="job-icon" />;
      case 'home': return <Home size={size} className="job-icon" />;
      case 'sofa': return <Sofa size={size} className="job-icon" />;
      case 'grid': return <Grid size={size} className="job-icon" />;
      case 'square': return <Square size={size} className="job-icon" />;
      case 'refresh-cw': return <RefreshCw size={size} className="job-icon" />;
      case 'plug': return <Plug size={size} className="job-icon" />;
      case 'cpu': return <Cpu size={size} className="job-icon" />;
      case 'lightbulb': return <Lightbulb size={size} className="job-icon" />;
      case 'sun': return <Sun size={size} className="job-icon" />;
      case 'wifi': return <Wifi size={size} className="job-icon" />;
      case 'shield': return <Shield size={size} className="job-icon" />;
      case 'smartphone': return <Smartphone size={size} className="job-icon" />;
      case 'palette': return <Palette size={size} className="job-icon" />;
      case 'building': return <Building size={size} className="job-icon" />;
      case 'framer': return <Framer size={size} className="job-icon" />;
      case 'layers': return <Layers size={size} className="job-icon" />;
      case 'brush': return <Brush size={size} className="job-icon" />;
      case 'feather': return <Feather size={size} className="job-icon" />;
      default: return <Wrench size={size} className="category-icon-large" />;
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
            {getIconComponent(category.icon, 64)}
          </div>
          <div>
            <h1 className="mb-1 fw-bold title1">{category.title}</h1>
            <p className="mb-0 text-muted">{category.description}</p>
          </div>
        </div>
        
        <h3 className="mb-4 title2">Nos professionnels dans cette catégorie</h3>
        
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {categoryJobs.length > 0 ? (
            categoryJobs.map(job => (
              <div className="col" key={job.id}>
                <div className="card job-card h-100 border-0 shadow-sm hover-card">
                  <div className="job-image-wrapper">
                    <img 
                      className="img-fluid job-image" 
                      src={job.image} 
                      alt={job.name} 
                      loading="lazy"
                    />
                    <div className="job-icon-wrapper">
                      {getIconComponent(job.icon, 28)}
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title job-title">{job.name}</h5>
                    <p className="card-text job-description">{job.description}</p>
                    <a href="#" className="card-link stretched-link">
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
