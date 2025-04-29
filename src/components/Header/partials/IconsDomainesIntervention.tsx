import { useEffect, useState } from 'react';
/* import axios from 'axios'; */
import domaines from '../../../assets/tableaux/domaines.tsx'

function IconsDomainesIntervention() {

  return (
    <div className='container'>
      <div className="">
        <h2 className="my-5 title">Nos Domaines d'Intervention</h2>
      </div>

      <div className="domaines-container gap-3">
        {domaines.map(domaine => (
          <div key={domaine.id} className="domaine-card text-center mb-5">
            <img src={`${domaine.icone}`} alt={`Image de ${domaine.titre}`} className="argument-image" />
            <a>{domaine.titre}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconsDomainesIntervention;
