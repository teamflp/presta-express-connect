
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
  Palette, Building, Framer, Layers, Brush, Feather, Settings,
  ArrowLeft
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
      case 'tool': return <Settings size={size} className="job-icon-large" />;
      case 'pipe': return <Wrench size={size} className="job-icon-large" />; // Changed from PipeLine to Wrench as a fallback
      case 'thermometer': return <Thermometer size={size} className="job-icon-large" />;
      case 'droplet': return <Droplet size={size} className="job-icon-large" />;
      case 'bath': return <Bath size={size} className="job-icon-large" />;
      case 'flame': return <Flame size={size} className="job-icon-large" />;
      case 'search': return <Search size={size} className="job-icon-large" />;
      case 'axe': return <Axe size={size} className="job-icon-large" />;
      case 'gem': return <Gem size={size} className="job-icon-large" />;
      case 'door': return <Home size={size} className="job-icon-large" />;
      case 'home': return <Home size={size} className="job-icon-large" />;
      case 'sofa': return <Sofa size={size} className="job-icon-large" />;
      case 'grid': return <Grid size={size} className="job-icon-large" />;
      case 'square': return <Square size={size} className="job-icon-large" />;
      case 'refresh-cw': return <RefreshCw size={size} className="job-icon-large" />;
      case 'plug': return <Plug size={size} className="job-icon-large" />;
      case 'cpu': return <Cpu size={size} className="job-icon-large" />;
      case 'lightbulb': return <Lightbulb size={size} className="job-icon-large" />;
      case 'sun': return <Sun size={size} className="job-icon-large" />;
      case 'wifi': return <Wifi size={size} className="job-icon-large" />;
      case 'shield': return <Shield size={size} className="job-icon-large" />;
      case 'smartphone': return <Smartphone size={size} className="job-icon-large" />;
      case 'palette': return <Palette size={size} className="job-icon-large" />;
      case 'building': return <Building size={size} className="job-icon-large" />;
      case 'framer': return <Framer size={size} className="job-icon-large" />;
      case 'layers': return <Layers size={size} className="job-icon-large" />;
      case 'brush': return <Brush size={size} className="job-icon-large" />;
      case 'feather': return <Feather size={size} className="job-icon-large" />;
      default: return <Wrench size={size} className="job-icon-large" />;
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
          <Link to="/categories" className="text-decoration-none d-flex align-items-center gap-2">
            <ArrowLeft size={18} />
            <span>Retour aux catégories</span>
          </Link>
        </div>
        
        <div className="category-header mb-5">
          <div className="category-icon-wrapper-large">
            {getIconComponent(category.icon, 64)}
          </div>
          <div>
            <h1 className="mb-1 fw-bold title1">{category.title}</h1>
            <p className="mb-0 text-muted">{category.description}</p>
          </div>
        </div>
        
        <h2 className="mb-4 title2">Nos professionnels dans cette catégorie</h2>
        
        <div className="jobs-grid">
          {categoryJobs.length > 0 ? (
            categoryJobs.map(job => (
              <div className="job-card-container" key={job.id}>
                <div className="modern-job-card">
                  <div className="job-icon-container">
                    {getIconComponent(job.icon, 100)}
                  </div>
                  <div className="job-content">
                    <h3 className="job-title-modern">{job.name}</h3>
                    <p className="job-description-modern">{job.description}</p>
                    <a href="#" className="job-link">
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
