
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-artisan-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">Presta Express</h3>
            <p className="text-artisan-secondary text-sm mb-6">
              Connectez-vous avec des artisans qualifiés pour tous vos projets.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/categories/menuiserie" className="text-gray-300 hover:text-white text-sm">Menuiserie</Link></li>
              <li><Link to="/categories/plomberie" className="text-gray-300 hover:text-white text-sm">Plomberie</Link></li>
              <li><Link to="/categories/electricite" className="text-gray-300 hover:text-white text-sm">Électricité</Link></li>
              <li><Link to="/categories/peinture" className="text-gray-300 hover:text-white text-sm">Peinture</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white text-sm">Tous les services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">À propos</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">Notre mission</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white text-sm">Comment ça marche</Link></li>
              <li><Link to="/testimonials" className="text-gray-300 hover:text-white text-sm">Témoignages</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white text-sm">Presse</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm">Nous contacter</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white text-sm">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Presta Express. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white">
              Conditions d'utilisation
            </Link>
            <Link to="/cookies" className="text-xs text-gray-400 hover:text-white">
              Politique des cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
