
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthWrapper';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { FormInput, FormButton } from '../components/Forms/FormComponents';
import { Mail, Lock, User, Building } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('client');
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  useEffect(() => {
    if (isLogin) {
      setFormValid(email.includes('@') && password.length >= 6);
    } else {
      setFormValid(
        email.includes('@') && 
        password.length >= 6 && 
        password === confirmPassword &&
        firstName.length > 0 &&
        lastName.length > 0
      );
    }
  }, [email, password, confirmPassword, firstName, lastName, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValid) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (!error) {
          navigate(from, { replace: true });
        }
      } else {
        const userData = {
          first_name: firstName,
          last_name: lastName,
          user_type: userType
        };
        const { error } = await signUp(email, password, userData);
        if (!error) {
          // Stay on auth page to show email confirmation message
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Connexion' : 'Inscription'}
              </h1>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Connectez-vous pour accéder à votre compte' 
                  : 'Créez votre compte Presta Express'
                }
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Prénom"
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Votre prénom"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      icon={<User size={20} className="text-gray-500" />}
                    />
                    
                    <FormInput
                      label="Nom"
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Votre nom"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      icon={<User size={20} className="text-gray-500" />}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de compte
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setUserType('client')}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          userType === 'client'
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <User className="w-4 h-4 mx-auto mb-1" />
                        Client
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType('artisan')}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          userType === 'artisan'
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Building className="w-4 h-4 mx-auto mb-1" />
                        Artisan
                      </button>
                    </div>
                  </div>
                </>
              )}
              
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
                icon={<Mail size={20} className="text-gray-500" />}
                className="focus:ring-primary focus:border-primary"
              />
              
              <FormInput
                label="Mot de passe"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={20} className="text-gray-500" />}
                className="focus:ring-primary focus:border-primary"
              />
              
              {!isLogin && (
                <FormInput
                  label="Confirmer le mot de passe"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={<Lock size={20} className="text-gray-500" />}
                  className="focus:ring-primary focus:border-primary"
                />
              )}
              
              <FormButton 
                type="submit" 
                isLoading={isLoading} 
                fullWidth
                disabled={!formValid}
                className={`mt-6 bg-primary hover:bg-primary-hover focus:ring-primary ${!formValid && !isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isLogin ? 'Se connecter' : 'Créer mon compte'}
              </FormButton>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 text-gray-500 bg-white">
                  {isLogin ? 'Ou' : 'Déjà inscrit ?'}
                </span>
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary-hover font-medium"
              >
                {isLogin 
                  ? 'Créer un compte' 
                  : 'Se connecter à mon compte'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
