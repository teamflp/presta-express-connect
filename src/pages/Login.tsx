
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';
import { FormInput, FormCheckbox, FormButton, FormCard, FormDivider } from '../components/Forms/FormComponents';
import { Mail, Lock, User } from 'lucide-react';

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
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-16 bg-[#FDFAF7] flex items-center justify-center">
        <div className="w-full max-w-md">
          <FormCard 
            title={
              <div className="flex items-center justify-center space-x-2">
                <User size={24} className="text-[#C63E46]" />
                <span>Connexion</span>
              </div>
            }
            subtitle="Connectez-vous pour trouver les meilleurs artisans"
          >
            {error && (
              <div className="p-3 mb-4 text-sm text-white bg-red-500 rounded-md">
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
                icon={<Mail size={18} />}
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
                icon={<Lock size={18} />}
              />
              
              <div className="flex items-center justify-between">
                <FormCheckbox
                  id="remember-me"
                  name="remember-me"
                  label="Se souvenir de moi"
                />
                
                <Link to="#" className="text-sm font-medium text-[#C63E46] hover:text-[#A33138] transition-colors">
                  Mot de passe oublié?
                </Link>
              </div>
              
              <FormButton 
                type="submit" 
                isLoading={isLoading} 
                fullWidth
                className="mt-6"
              >
                Se connecter
              </FormButton>
            </form>
            
            <FormDivider text="Ou" />
            
            <div className="text-sm text-center text-gray-600">
              Vous n'avez pas de compte?{' '}
              <Link to="/register" className="font-medium text-[#C63E46] hover:text-[#A33138] transition-colors">
                Inscrivez-vous
              </Link>
            </div>
            
            <div className="pt-4 text-center border-t border-gray-200 mt-4">
              <Link to="/professional-login" className="text-sm font-medium text-gray-600 hover:text-[#C63E46] transition-colors">
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
