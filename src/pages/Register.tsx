
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      setIsLoading(true);
      const success = await register(name, email, password);
      
      if (success) {
        navigate('/');
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
    <div className="flex items-center justify-center min-h-screen bg-[#FDFAF7]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg border-t-0 rounded-tr-none">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Inscription</h1>
          <p className="mt-2 text-sm text-gray-600">
            Créez un compte pour accéder à nos services
          </p>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-white bg-red-500 rounded-md">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </div>
        </form>
        
        <div className="text-sm text-center text-gray-600">
          Déjà un compte?{' '}
          <Link to="/login" className="font-medium text-[#C63E46] hover:text-[#A33138]">
            Connectez-vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
