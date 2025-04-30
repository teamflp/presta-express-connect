
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import ProfessionalRegistrationButton from '../components/User/ProfessionalRegistrationButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    
    try {
      setIsLoading(true);
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
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
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="w-full max-w-md">
              <div className="p-8 space-y-8 bg-white rounded-lg shadow-lg border-t-0 rounded-tr-none">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
                  <p className="mt-2 text-sm text-gray-600">
                    Connectez-vous pour accéder à votre compte
                  </p>
                </div>
                
                {error && (
                  <div className="p-3 text-sm text-white bg-red-500 rounded-md">
                    {error}
                  </div>
                )}
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-[#C63E46] border-gray-300 rounded focus:ring-[#C63E46]"
                      />
                      <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                        Se souvenir de moi
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="font-medium text-[#C63E46] hover:text-[#A33138]">
                        Mot de passe oublié?
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#C63E46] border border-transparent rounded-md shadow-sm hover:bg-[#A33138] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C63E46] disabled:opacity-50"
                    >
                      {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                  </div>
                </form>
                
                <div className="text-sm text-center text-gray-600">
                  Vous n'avez pas de compte?{' '}
                  <Link to="/register" className="font-medium text-[#C63E46] hover:text-[#A33138]">
                    Inscrivez-vous
                  </Link>
                </div>
                
                <div className="pt-4 text-center border-t border-gray-200">
                  <Link to="/professional-login" className="text-sm font-medium text-gray-600 hover:text-[#C63E46]">
                    Espace professionnel? Connectez-vous ici
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-96">
              <ProfessionalRegistrationButton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
