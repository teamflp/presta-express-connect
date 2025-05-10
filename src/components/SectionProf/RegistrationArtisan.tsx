
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function RegistrationArtisan() {
  return (
    <div className="bg-primary p-5 rounded-3xl text-white">
      <h3 className="text-2xl font-bold mb-3">Vous êtes artisan ?</h3>
      <p className="mb-4">
        Rejoignez notre plateforme et développez votre activité en touchant plus de clients dans votre région.
      </p>
      <ul className="mb-4 list-disc list-inside">
        <li>Visibilité accrue sur internet</li>
        <li>Gestion simplifiée de vos devis</li>
        <li>Avis clients pour renforcer votre crédibilité</li>
        <li>Assistance personnalisée</li>
      </ul>
      <NavLink to="/professional-register">
        <Button className="bg-white text-primary hover:bg-gray-100 font-medium rounded-lg py-2 px-4 transition-all">
          <span>S'inscrire gratuitement</span>
        </Button>
      </NavLink>
    </div>
  );
}

export default RegistrationArtisan;
