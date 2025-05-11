
import { Link } from 'react-router-dom';
import { domaines } from '../../../assets/tableaux/domaines';
import { Domaine } from '../../../assets/tableaux/types/domaineTypes';

function IconsDomainesIntervention() {
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos domaines d'intervention</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {domaines.slice(0, 6).map((domaine: Domaine) => (
            <Link 
              to={domaine.lien || "#"} 
              key={domaine.id}
              className="flex flex-col items-center text-center transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-md mb-4 p-4 group-hover:bg-accent transition-colors duration-300">
                <img src={domaine.icone} alt={domaine.titre} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 group-hover:text-primary transition-colors duration-300">{domaine.titre}</h3>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link 
            to="/domaines" 
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            Voir tous les domaines
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IconsDomainesIntervention;
