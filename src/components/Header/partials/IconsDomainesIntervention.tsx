
import { Link } from 'react-router-dom';
import { domaines } from '../../../assets/tableaux/domaines';
import { Domaine } from '../../../assets/tableaux/types/domaineTypes';

function IconsDomainesIntervention() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Nos domaines d'intervention</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {domaines.slice(0, 6).map((domaine: Domaine) => (
          <div key={domaine.id} className="w-full">
            <Link to={domaine.lien || "#"} className="domaine-card block p-4 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex flex-col items-center">
                <div className="bg-accent p-4 rounded-full mb-3">
                  <img src={domaine.icone} alt={domaine.titre} className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-semibold">{domaine.titre}</h3>
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
