
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

const ProfessionalRegister = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !companyName || !email || !phone || !password || !confirmPassword) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      setIsLoading(true);
      // Pour l'instant, nous utilisons la même fonction register que pour les clients
      // Dans une implémentation réelle, il faudrait une fonction spécifique pour les professionnels
      const success = await register(name, email, password);
      
      if (success) {
        navigate('/professional-dashboard');
      } else {
        setError('Une erreur est survenue lors de l\'inscription');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="py-10 bg-[#FDFAF7]">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg border-t-0 rounded-tr-none">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Inscription Professionnelle</h1>
              <p className="mt-2 text-sm text-gray-600">
                Créez votre compte professionnel pour offrir vos services
              </p>
            </div>
            
            {error && (
              <div className="p-3 text-sm text-white bg-red-500 rounded-md">
                {error}
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Nom de l'entreprise
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email professionnel
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Numéro de téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 text-[#C63E46] border-gray-300 rounded focus:ring-[#C63E46]"
                />
                <label htmlFor="agree-terms" className="block ml-2 text-sm text-gray-900">
                  J'accepte les <a href="#" className="text-[#C63E46]">conditions d'utilisation</a> et la <a href="#" className="text-[#C63E46]">politique de confidentialité</a>
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#C63E46] border border-transparent rounded-md shadow-sm hover:bg-[#A33138] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C63E46] disabled:opacity-50"
                >
                  {isLoading ? 'Inscription en cours...' : 'S\'inscrire comme professionnel'}
                </button>
              </div>
            </form>
            
            <div className="text-sm text-center text-gray-600">
              Déjà un compte professionnel?{' '}
              <Link to="/professional-login" className="font-medium text-[#C63E46] hover:text-[#A33138]">
                Connectez-vous
              </Link>
            </div>
            
            <div className="pt-4 text-center border-t border-gray-200">
              <Link to="/register" className="text-sm font-medium text-gray-600 hover:text-[#C63E46]">
                Vous êtes un particulier? Inscrivez-vous ici
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalRegister;
