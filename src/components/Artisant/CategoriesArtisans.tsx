import React from 'react';
import Category from '../Artisant/Category';
import categories from '../../assets/tableaux/categories';
import jobs from '../../assets/tableaux/jobs';
import { Category as CategoryType } from '../../assets/tableaux/categories';

const CategoriesArtisans: React.FC = () => {
  /* Boucle de mapping */
  return (
    <div className="categories-list">
      {categories.map((category: CategoryType) => (
        <Category
          key={category.id}
          title={category.title}
          jobs={jobs[category.id] || []}
        />
      ))}
    </div>
  );
};

export default CategoriesArtisans;





