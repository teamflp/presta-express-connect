
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout as logoutAction } from '../store/features/Authentification/AuthSlice';
import { RootState } from '../store/store';

// Types pour notre contexte d'authentification
type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'professional';
};

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: 'user' | 'professional') => Promise<boolean>;
  logout: () => void;
};

// Création du contexte avec des valeurs par défaut
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Composant Provider pour fournir le contexte à notre application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
  
  // Effet pour vérifier l'état d'authentification au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        dispatch(loginSuccess());
      } catch (error) {
        console.error("Erreur lors du chargement des données utilisateur:", error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);
  
  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulation d'une requête API - À remplacer par votre logique d'API
      if (email && password) {
        // Pour la démonstration, accepte toutes les connexions valides
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 15),
          name: email.split('@')[0], // Utilise la partie avant @ comme nom
          email,
          role: email.includes('professional') ? 'professional' : 'user'
        };
        
        // Enregistre l'utilisateur
        setCurrentUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Met à jour le state Redux
        dispatch(loginSuccess());
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
    }
  };
  
  // Fonction d'inscription
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'user' | 'professional' = 'user'
  ): Promise<boolean> => {
    try {
      // Simulation d'une requête API - À remplacer par votre logique d'API
      if (name && email && password) {
        // Pour la démonstration, accepte toutes les inscriptions valides
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 15),
          name,
          email,
          role
        };
        
        // Enregistre l'utilisateur
        setCurrentUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Met à jour le state Redux
        dispatch(loginSuccess());
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      return false;
    }
  };
  
  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    dispatch(logoutAction());
  };
  
  const value = {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
