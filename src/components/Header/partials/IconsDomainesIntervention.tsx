
import { useEffect, useState } from 'react';
import domaines from '../../../assets/tableaux/domaines';
import { Car, Wrench, Home, Hospital, Scale, Hammer, HandshakeIcon, Medkit, Building } from 'lucide-react';

function IconsDomainesIntervention() {
  return (
    <div className='container'>
      <div className="">
        <h2 className="my-5 title1">Nos Domaines d'Intervention</h2>
        <p className="mb-4">Trouvez des professionnels qualifiés dans de nombreux secteurs d'activité pour tous vos besoins</p>
      </div>

      <div className="domaines-container gap-3">
        {domaines.map(domaine => (
          <div key={domaine.id} className="domaine-card text-center mb-5">
            <img src={`${domaine.icone}`} alt={`Image de ${domaine.titre}`} className="argument-image" />
            <p className="mt-2 domaine-title">{domaine.titre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconsDomainesIntervention;
