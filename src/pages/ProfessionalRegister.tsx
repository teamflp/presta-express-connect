
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';
import { FormInput, FormCheckbox, FormButton, FormCard, FormDivider } from '../components/Forms/FormComponents';
import { Mail, User, Phone, Lock } from 'lucide-react';

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
      const success = await register(name, email, password, 'professional');
      
      if (success) {
        toast.success('Inscription réussie!');
        navigate('/professional-dashboard');
      } else {
        setError('Une erreur est survenue lors de l\'inscription');
        toast.error('Une erreur est survenue lors de l\'inscription');
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
    <div className="App">
      <Navbar />
      <div className="py-16 bg-[#FDFAF7]">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <FormCard 
              title="Inscription Professionnelle" 
              subtitle="Créez votre compte professionnel pour offrir vos services"
            >
              {error && (
                <div className="p-3 mb-4 text-sm text-white bg-red-500 rounded-md">
                  {error}
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormInput
                    label="Nom complet"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jean Dupont"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<User size={18} />}
                  />
                  
                  <FormInput
                    label="Nom de l'entreprise"
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Entreprise SARL"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                <FormInput
                  label="Email professionnel"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contact@entreprise.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={18} />}
                />
                
                <FormInput
                  label="Numéro de téléphone"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={<Phone size={18} />}
                />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormInput
                    label="Mot de passe"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock size={18} />}
                  />
                  
                  <FormInput
                    label="Confirmer le mot de passe"
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Lock size={18} />}
                  />
                </div>
                
                <FormCheckbox
                  id="agree-terms"
                  name="agree-terms"
                  required
                  label={
                    <span>
                      J'accepte les <Link to="#" className="text-[#C63E46] hover:underline">conditions d'utilisation</Link> et la <Link to="#" className="text-[#C63E46] hover:underline">politique de confidentialité</Link>
                    </span>
                  }
                />
                
                <FormButton 
                  type="submit" 
                  isLoading={isLoading} 
                  fullWidth
                >
                  S'inscrire comme professionnel
                </FormButton>
              </form>
              
              <FormDivider text="Ou" />
              
              <div className="text-sm text-center text-gray-600">
                Déjà un compte professionnel?{' '}
                <Link to="/professional-login" className="font-medium text-[#C63E46] hover:text-[#A33138] transition-colors">
                  Connectez-vous
                </Link>
              </div>
              
              <div className="pt-4 text-center border-t border-gray-200">
                <Link to="/register" className="text-sm font-medium text-gray-600 hover:text-[#C63E46] transition-colors">
                  Vous êtes un particulier? Inscrivez-vous ici
                </Link>
              </div>
            </FormCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalRegister;
