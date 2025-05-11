
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function RegistrationArtisan() {
  return (
    <div className="bg-primary p-6 rounded-[25px_1px_25px_25px] text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Vous êtes artisan ?</h3>
      <p className="mb-4 opacity-90">
        Rejoignez notre plateforme et développez votre activité en touchant plus de clients dans votre région.
      </p>
      <ul className="mb-5 list-disc list-inside space-y-2 opacity-90">
        <li>Visibilité accrue sur internet</li>
        <li>Gestion simplifiée de vos devis</li>
        <li>Avis clients pour renforcer votre crédibilité</li>
        <li>Assistance personnalisée</li>
      </ul>
      <NavLink to="/professional-register">
        <Button className="bg-white text-primary hover:bg-gray-100 font-medium rounded-lg py-2 px-5 transition-all hover:shadow-md hover:translate-y-[-2px]">
          <span>S'inscrire gratuitement</span>
        </Button>
      </NavLink>
    </div>
  );
}

export default RegistrationArtisan;
