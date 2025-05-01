
import { useNavigate } from 'react-router-dom';
import { domainesIntervention } from '../../../assets/tableaux/domaines';

function IconsDomainesIntervention() {
  const navigate = useNavigate();
  
  const handleNavigateToDomaine = (domaine: string) => {
    navigate(`/Intervention?domaine=${encodeURIComponent(domaine)}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
      {domainesIntervention.map((domaine, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center justify-center p-4 cursor-pointer transition-all hover:scale-105"
          onClick={() => handleNavigateToDomaine(domaine.name)}
        >
          <div className="bg-blue-50 rounded-full p-4 mb-3 shadow-md">
            <img 
              src={domaine.icon} 
              alt={domaine.name} 
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-center font-medium text-gray-800">{domaine.name}</span>
        </div>
      ))}
    </div>
  );
}

export default IconsDomainesIntervention;
