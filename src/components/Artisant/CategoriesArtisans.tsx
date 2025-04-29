
import React from 'react';
import categories from '../../assets/tableaux/categories';
import jobs from '../../assets/tableaux/jobs';
import { Category as CategoryType } from '../../assets/tableaux/categories';

const CategoriesArtisans: React.FC = () => {
  return (
    <div className="categories-container">
      <h2 className="mb-4 fw-bold">Nos Catégories</h2>
      <div className="categories-grid">
        {categories.map((category: CategoryType) => (
          <div key={category.id} className="category-card">
            <h3 className="category-title">{category.title}</h3>
            <p className="category-job-count">
              {jobs[category.id] ? jobs[category.id].length : 0} métiers disponibles
            </p>
            <a href={`/categories/${category.id}`} className="discover-button">
              Découvrir
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesArtisans;
