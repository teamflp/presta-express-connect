
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';
import { FormInput, FormCheckbox, FormButton } from '../components/Forms/FormComponents';
import { Mail, Lock, User } from 'lucide-react';

const ProfessionalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validate form when email or password changes
  useEffect(() => {
    setFormValid(email.includes('@') && password.length >= 6);
  }, [email, password]);

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
        toast.success('Connexion réussie!');
        navigate('/artisan-dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
        toast.error('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      toast.error('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-auth-pattern">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-form p-8 border border-gray-100 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <User size={32} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Espace Professionnel</h1>
              <p className="text-gray-600">Connectez-vous pour gérer vos services</p>
            </div>
            
            {error && (
              <div className="p-4 mb-6 text-sm text-white bg-primary rounded-lg shadow-lg animate-pulse flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormInput
                label="Email professionnel"
                id="pro-email"
                name="email"
                type="email"
                placeholder="pro@entreprise.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={20} className="text-gray-500" />}
                aria-label="Adresse email professionnelle"
                className="focus:ring-primary focus:border-primary"
              />
              
              <FormInput
                label="Mot de passe"
                id="pro-password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={20} className="text-gray-500" />}
                aria-label="Mot de passe"
                className="focus:ring-primary focus:border-primary"
              />
              
              <div className="flex items-center justify-between">
                <FormCheckbox
                  id="pro-remember-me"
                  name="remember-me"
                  label="Se souvenir de moi"
                />
                
                <Link to="#" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
                  Mot de passe oublié?
                </Link>
              </div>
              
              <FormButton 
                type="submit" 
                isLoading={isLoading} 
                fullWidth
                disabled={!formValid}
                className={`mt-6 bg-primary hover:bg-primary-hover focus:ring-primary-light ${!formValid && !isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                Se connecter
              </FormButton>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 text-gray-500 bg-white">Ou</span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Vous n'avez pas de compte professionnel?
              </p>
              <Link 
                to="/professional-register" 
                className="block w-full py-3 px-4 rounded-lg bg-gray-100 text-center text-gray-700 font-medium hover:bg-gray-200 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Créer un compte professionnel
              </Link>
            </div>
            
            <div className="pt-5 text-center border-t border-gray-200 mt-8">
              <Link 
                to="/login" 
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                <User size={16} className="mr-1.5" />
                Espace client? Connectez-vous ici
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2025 Presta-Express | Tous droits réservés
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfessionalLogin;
