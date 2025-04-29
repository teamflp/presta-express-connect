
import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../assets/tableaux/categories';
import jobs from '../assets/tableaux/jobs';
import { Category as CategoryType } from '../assets/tableaux/categories';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

const Categories: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container my-5">
        <h1 className="mb-4 fw-bold title1">Toutes nos Catégories de Professionnels</h1>
        <p className="mb-5">Explorez l'ensemble de nos catégories de métiers pour trouver le professionnel adapté à votre projet</p>
        
        <div className="categories-grid">
          {categories.map((category: CategoryType) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
