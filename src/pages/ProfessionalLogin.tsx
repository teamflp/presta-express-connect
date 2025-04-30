
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';
import { FormInput, FormCheckbox, FormButton, FormCard, FormDivider } from '../components/Forms/FormComponents';
import { Mail, Lock, Building, User } from 'lucide-react';

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
        navigate('/professional-dashboard');
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
                <div className="bg-blue-700 p-2 rounded-full">
                  <Building size={24} className="text-white" />
                </div>
                <span className="text-gray-800 font-bold text-2xl">Espace Professionnel</span>
              </div>
            }
            subtitle="Connectez-vous pour gérer vos services et demandes"
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
                label="Email professionnel"
                id="pro-email"
                name="email"
                type="email"
                placeholder="pro@entreprise.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} className="text-blue-600" />}
                aria-label="Adresse email professionnelle"
                className="focus:border-blue-600"
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
                icon={<Lock size={18} className="text-blue-600" />}
                aria-label="Mot de passe"
                className="focus:border-blue-600"
              />
              
              <div className="flex items-center justify-between">
                <FormCheckbox
                  id="pro-remember-me"
                  name="remember-me"
                  label="Se souvenir de moi"
                />
                
                <Link to="#" className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors">
                  Mot de passe oublié?
                </Link>
              </div>
              
              <FormButton 
                type="submit" 
                isLoading={isLoading} 
                fullWidth
                disabled={!formValid}
                className={`mt-6 bg-blue-700 hover:bg-blue-800 ${!formValid && !isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                Se connecter
              </FormButton>
            </form>
            
            <FormDivider text="Ou" />
            
            <div className="text-center text-gray-600">
              <p className="mb-4 text-sm">
                Vous n'avez pas de compte professionnel?
              </p>
              <Link 
                to="/professional-register" 
                className="inline-block font-medium text-blue-700 hover:text-blue-900 transition-colors
                border-b border-blue-700 hover:border-blue-800 pb-0.5"
              >
                Inscrivez-vous
              </Link>
            </div>
            
            <div className="pt-5 text-center border-t border-gray-200 mt-6">
              <Link 
                to="/login" 
                className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors flex items-center justify-center"
              >
                <User size={16} className="mr-1.5" />
                Espace client? Connectez-vous ici
              </Link>
            </div>
          </FormCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalLogin;
