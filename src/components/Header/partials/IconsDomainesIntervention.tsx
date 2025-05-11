
import { Link } from 'react-router-dom';
import { domaines } from '../../../assets/tableaux/domaines';
import { Domaine } from '../../../assets/tableaux/types/domaineTypes';

function IconsDomainesIntervention() {
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos domaines d'intervention</h2>
        
        <div className="flex flex-nowrap justify-between overflow-x-auto pb-4">
          {domaines.slice(0, 6).map((domaine: Domaine) => (
            <Link 
              to={domaine.lien || "#"} 
              key={domaine.id}
              className="flex flex-col items-center text-center mx-4 transition-all duration-300 hover:transform hover:scale-105 group min-w-[100px]"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md mb-3 p-3 group-hover:bg-accent transition-colors duration-300">
                <img src={domaine.icone} alt={domaine.titre} className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors duration-300">{domaine.titre}</h3>
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
