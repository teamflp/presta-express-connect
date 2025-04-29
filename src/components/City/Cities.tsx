import React from 'react';
import cities from '../../assets/tableaux/cityData'; // Importation des données depuis cityData.tsx
import City from './City'; // Importation du composant City depuis City.tsx

function Cities() {
  return (
    <div className="cities my-5 container">
      <h3>Trouvez les artisans dans votre ville</h3>
      <div className="d-flex overflow-auto">
        <div className="row flex-nowrap">
          {cities.map((city) => (
            <div className="col-2 d-inline-block px-2" key={city.id}>
              <City ville={city.ville} backgroundImage={city.backgroundImage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cities;



