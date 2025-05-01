
import { Link } from 'react-router-dom';
import categories from '../../assets/tableaux/categories';
import jobs from '../../assets/tableaux/jobs';
import { Category as CategoryType } from '../../assets/tableaux/categories';
import { Wrench, PaintBucket, Hammer, Zap } from 'lucide-react';

const CategoriesArtisans = () => {
  // Afficher uniquement les 4 premières catégories sur la page d'accueil
  const displayCategories = categories.slice(0, 4);
  
  // Fonction pour obtenir l'icône en fonction du nom
  const getIconComponent = (iconName: string | undefined) => {
    switch (iconName) {
      case 'wrench':
        return <Wrench className="text-primary" size={32} />;
      case 'hammer':
        return <Hammer className="text-primary" size={32} />;
      case 'zap':
        return <Zap className="text-primary" size={32} />;
      case 'paint-bucket':
        return <PaintBucket className="text-primary" size={32} />;
      default:
        return <Wrench className="text-primary" size={32} />;
    }
  };
  
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Nos Catégories de Professionnels</h2>
      <p className="text-gray-600 mb-8">Explorez nos différentes catégories de métiers pour trouver le professionnel adapté à votre projet</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCategories.map((category: CategoryType) => (
          <div key={category.id} className="bg-white rounded-[25px_1px_25px_25px] p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary bg-opacity-10 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                {getIconComponent(category.icon)}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
            <p className="text-gray-500 mb-4 font-medium text-sm">
              {jobs[category.id] ? jobs[category.id].length : 0} métiers disponibles
            </p>
            <Link 
              to={`/categories/${category.id}`}
              className="inline-block bg-primary text-white py-2 px-4 rounded-[15px_1px_15px_15px] hover:bg-primary-hover transition-colors font-medium text-sm"
            >
              Découvrir
            </Link>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link to="/categories" className="inline-block bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors font-medium">
          Voir toutes les catégories
        </Link>
      </div>
    </div>
  );
};

export default CategoriesArtisans;
