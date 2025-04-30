
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../store/features/Authentification/AuthSlice';
import { RootState } from '../store/store';

// Interface pour le contexte d'authentification
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: string) => Promise<boolean>;
  logoutUser: () => void;
}

// Interface pour l'utilisateur
interface User {
  id?: string;
  name?: string;
  email: string;
  userType: string;
}

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | null>(null);

// Provider pour le contexte d'authentification
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [user, setUser] = useState<User | null>(null);

  // Vérification de l'authentification au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [isAuthenticated]);

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulation d'une requête API
      // Dans un cas réel, vous utiliseriez un appel API
      
      // Pour démonstration, nous vérifions simplement si l'email contient "@" et si le mot de passe a au moins 6 caractères
      if (email.includes('@') && password.length >= 6) {
        // Détermine le type d'utilisateur basé sur l'email
        let userType = 'client';
        if (email.includes('admin')) {
          userType = 'admin';
        } else if (email.includes('pro') || email.includes('artisan')) {
          userType = 'professional';
        }
        
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          userType,
        };
        
        // Stockage des informations utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        dispatch(loginSuccess());
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Fonction d'inscription
  const register = async (name: string, email: string, password: string, userType: string): Promise<boolean> => {
    try {
      // Simulation d'une requête API
      // Dans un cas réel, vous utiliseriez un appel API
      
      // Vérifications basiques
      if (!email.includes('@') || password.length < 6) {
        return false;
      }
      
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        userType,
      };
      
      // Stockage des informations utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      dispatch(loginSuccess());
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Fonction de déconnexion
  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
