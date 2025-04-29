
import { useEffect, useState } from 'react';
import domaines from '../../../assets/tableaux/domaines';
import { Wrench, Home, Building, ShoppingCart, HeartPulse, Scale, Car, Users, FileText } from 'lucide-react';

function IconsDomainesIntervention() {
  return (
    <div className='container'>
      <div className="text-center mb-5">
        <h2 className="my-4 title1 fw-bold">Nos Domaines d'Intervention</h2>
        <p className="mb-4 fs-5">Trouvez des professionnels qualifiés dans de nombreux secteurs d'activité pour tous vos besoins</p>
      </div>

      <div className="domaines-container gap-3">
        {domaines.map(domaine => {
          let IconComponent;
          
          // Attribution des icônes en fonction du titre
          switch(domaine.titre.toLowerCase()) {
            case 'artisanat':
            case 'plomberie':
            case 'menuiserie':
              IconComponent = Wrench;
              break;
            case 'automobile':
            case 'mécanique':
              IconComponent = Car;
              break;
            case 'construction':
            case 'immobilier':
            case 'rénovation':
            case 'électricité':
            case 'décoration':
              IconComponent = Building;
              break;
            case 'santé':
            case 'médecine':
            case 'soins':
            case 'urgences':
              IconComponent = HeartPulse;
              break;
            case 'juridique':
            case 'services':
            case 'consultations':
              IconComponent = Scale;
              break;
            case 'assurance':
              IconComponent = FileText;
              break;
            default:
              IconComponent = Home;
              break;
          }
          
          return (
            <div key={domaine.id} className="domaine-card text-center mb-4 hover-card">
              <div className="icon-container mb-2">
                {IconComponent && <IconComponent size={32} className="text-primary" style={{ color: '#C63E46' }} />}
              </div>
              <p className="mt-2 domaine-title fw-medium">{domaine.titre}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IconsDomainesIntervention;
