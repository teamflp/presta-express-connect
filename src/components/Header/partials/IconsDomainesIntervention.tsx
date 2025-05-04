
import { Link } from 'react-router-dom';
import { domaines } from '../../../assets/tableaux/domaines';
import { Domaine } from '../../../assets/tableaux/types/domaineTypes';

function IconsDomainesIntervention() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Nos domaines d'intervention</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {domaines.slice(0, 6).map((domaine: Domaine) => (
          <div key={domaine.id} className="w-full">
            <Link to={domaine.lien || "#"} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <img src={domaine.icone} alt={domaine.titre} className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold">{domaine.titre}</h3>
                {domaine.description && <p className="mt-2 text-gray-600">{domaine.description}</p>}
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link to="/domaines" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
          Voir tous les domaines
        </Link>
      </div>
    </div>
  );
}

export default IconsDomainesIntervention;
