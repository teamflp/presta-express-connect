
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';
import { FormInput, FormCheckbox, FormButton, FormCard, FormDivider } from '../components/Forms/FormComponents';
import { Mail, Lock, User, Building } from 'lucide-react';

const Login = () => {
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
        navigate('/');
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <FormCard 
            title={
              <div className="flex items-center justify-center space-x-2">
                <div className="bg-indigo-600 p-2 rounded-full">
                  <User size={24} className="text-white" />
                </div>
                <span className="text-gray-800 font-bold text-2xl">Connexion</span>
              </div>
            }
            subtitle="Connectez-vous pour trouver les meilleurs artisans"
          >
            {error && (
              <div className="p-4 mb-6 text-sm text-white bg-red-500 rounded-lg shadow-lg animate-fade-in flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <FormInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} className="text-indigo-500" />}
                aria-label="Adresse email"
                className="focus:border-indigo-500"
              />
              
              <FormInput
                label="Mot de passe"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} className="text-indigo-500" />}
                aria-label="Mot de passe"
                className="focus:border-indigo-500"
              />
              
              <div className="flex items-center justify-between">
                <FormCheckbox
                  id="remember-me"
                  name="remember-me"
                  label="Se souvenir de moi"
                />
                
                <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                  Mot de passe oublié?
                </Link>
              </div>
              
              <FormButton 
                type="submit" 
                isLoading={isLoading} 
                fullWidth
                disabled={!formValid}
                className={`mt-6 bg-indigo-600 hover:bg-indigo-700 ${!formValid && !isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                Se connecter
              </FormButton>
            </form>
            
            <FormDivider text="Ou" />
            
            <div className="text-center text-gray-600">
              <p className="mb-4 text-sm">
                Vous n'avez pas de compte?
              </p>
              <Link 
                to="/register" 
                className="inline-block font-medium text-indigo-600 hover:text-indigo-800 transition-colors
                border-b border-indigo-600 hover:border-indigo-800 pb-0.5"
              >
                Inscrivez-vous
              </Link>
            </div>
            
            <div className="pt-5 text-center border-t border-gray-200 mt-6">
              <Link 
                to="/professional-login" 
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors flex items-center justify-center"
              >
                <Building size={16} className="mr-1.5" />
                Vous êtes un professionnel? Connectez-vous ici
              </Link>
            </div>
          </FormCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
