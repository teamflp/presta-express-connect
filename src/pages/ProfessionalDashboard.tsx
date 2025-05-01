
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { User, Calendar, FileText, Bell, Settings, LogOut, Home, Users } from 'lucide-react';

const ProfessionalDashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  useEffect(() => {
    if (!user) {
      navigate('/professional-login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/professional-login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-grow py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 lg:w-1/5">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-primary to-primary-hover text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary">
                        {user.name ? user.name.charAt(0).toUpperCase() : "P"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{user.name || "Professionnel"}</h3>
                      <p className="text-sm text-white/80">{user.email}</p>
                      <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium rounded-full bg-white/20">
                        Artisan Pro
                      </span>
                    </div>
                  </div>
                </div>
                
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
                        <Home size={18} />
                        <span>Tableau de bord</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <FileText size={18} />
                        <span>Mes services</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Bell size={18} />
                        <span>Demandes reçues</span>
                        <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">5</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Calendar size={18} />
                        <span>Planning</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Users size={18} />
                        <span>Clients</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <User size={18} />
                        <span>Mon profil</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <Settings size={18} />
                        <span>Paramètres</span>
                      </button>
                    </li>
                    <li className="pt-4 mt-4 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} />
                        <span>Déconnexion</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-3/4 lg:w-4/5 space-y-6">
              {/* Header */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Bonjour, {user.name || "Artisan"}</h2>
                    <p className="text-gray-500">Bienvenue dans votre espace professionnel</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Voir mon profil public
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
                      + Ajouter un service
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Demandes en attente</p>
                      <p className="text-3xl font-bold text-gray-800">5</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Bell size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +20%
                    </span>
                    <span className="text-gray-500 ml-2">depuis le mois dernier</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Projets en cours</p>
                      <p className="text-3xl font-bold text-gray-800">3</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Calendar size={24} className="text-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +12%
                    </span>
                    <span className="text-gray-500 ml-2">depuis le mois dernier</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Projets terminés</p>
                      <p className="text-3xl font-bold text-gray-800">12</p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <FileText size={24} className="text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +35%
                    </span>
                    <span className="text-gray-500 ml-2">depuis le mois dernier</span>
                  </div>
                </div>
              </div>
              
              {/* Recent Requests */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Dernières demandes</h3>
                    <button className="text-primary hover:text-primary-hover text-sm font-medium">Voir tout</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500">M</div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Martin Dupont</div>
                              <div className="text-sm text-gray-500">martin@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Plomberie</div>
                          <div className="text-xs text-gray-500">Installation sanitaire</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">15/04/2025</div>
                          <div className="text-xs text-gray-500">14:30</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            En attente
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              Voir
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              Accepter
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500">S</div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Sophie Martin</div>
                              <div className="text-sm text-gray-500">sophie@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Électricité</div>
                          <div className="text-xs text-gray-500">Installation tableau</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">14/04/2025</div>
                          <div className="text-xs text-gray-500">10:15</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            En attente
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              Voir
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              Accepter
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500">L</div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Lucas Petit</div>
                              <div className="text-sm text-gray-500">lucas@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Menuiserie</div>
                          <div className="text-xs text-gray-500">Installation portes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">13/04/2025</div>
                          <div className="text-xs text-gray-500">09:00</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Accepté
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-800">
                            Voir
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center">
                  <button className="text-sm text-gray-500 hover:text-gray-700">Charger plus</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalDashboard;
