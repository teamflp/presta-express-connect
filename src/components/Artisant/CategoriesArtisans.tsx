
import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../assets/tableaux/categories';
import jobs from '../../assets/tableaux/jobs';
import { Category as CategoryType } from '../../assets/tableaux/categories';

const CategoriesArtisans: React.FC = () => {
  // Afficher uniquement les 4 premières catégories sur la page d'accueil
  const displayCategories = categories.slice(0, 4);
  
  return (
    <div className="categories-container">
      <h2 className="mb-4 fw-bold title1">Nos Catégories de Professionnels</h2>
      <p className="mb-4">Explorez nos différentes catégories de métiers pour trouver le professionnel adapté à votre projet</p>
      <div className="categories-grid">
        {displayCategories.map((category: CategoryType) => (
          <div key={category.id} className="category-card">
            <h3 className="category-title">{category.title}</h3>
            <p className="category-job-count">
              {jobs[category.id] ? jobs[category.id].length : 0} métiers disponibles
            </p>
            <Link to={`/categories/${category.id}`} className="discover-button">
              Découvrir
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link to="/categories" className="btn btn-primary btn-lg">
          Voir toutes les catégories
        </Link>
      </div>
    </div>
  );
};

export default CategoriesArtisans;
