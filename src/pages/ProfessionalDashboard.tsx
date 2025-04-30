
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

const ProfessionalDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/professional-login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/professional-login');
  };

  if (!currentUser) return null;

  return (
    <div className="App">
      <Navbar />
      <div className="py-10 bg-[#FDFAF7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-0 rounded-tr-none mb-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-gray-500">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{currentUser.name}</h3>
                  <p className="text-gray-500">{currentUser.email}</p>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <ul className="space-y-2">
                    <li>
                      <button className="w-full text-left px-4 py-2 bg-[#C63E46] text-white rounded-md">
                        Tableau de bord
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                        Mes services
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                        Demandes reçues
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                        Profil
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 rounded-md"
                      >
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-0 rounded-tr-none mb-6">
                <h2 className="text-2xl font-bold mb-6">Tableau de bord</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#FDFAF7] p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700">Demandes en attente</h4>
                    <p className="text-2xl font-bold text-[#C63E46]">5</p>
                  </div>
                  <div className="bg-[#FDFAF7] p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700">Projets en cours</h4>
                    <p className="text-2xl font-bold text-[#C63E46]">3</p>
                  </div>
                  <div className="bg-[#FDFAF7] p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-700">Projets terminés</h4>
                    <p className="text-2xl font-bold text-[#C63E46]">12</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Dernières demandes</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 text-left border-b">Client</th>
                        <th className="py-3 px-4 text-left border-b">Service</th>
                        <th className="py-3 px-4 text-left border-b">Date</th>
                        <th className="py-3 px-4 text-left border-b">Statut</th>
                        <th className="py-3 px-4 text-left border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 border-b">Martin Dupont</td>
                        <td className="py-3 px-4 border-b">Plomberie</td>
                        <td className="py-3 px-4 border-b">15/04/2025</td>
                        <td className="py-3 px-4 border-b">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            En attente
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <button className="text-blue-500 hover:underline mr-3">Voir</button>
                          <button className="text-green-500 hover:underline">Accepter</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">Sophie Martin</td>
                        <td className="py-3 px-4 border-b">Électricité</td>
                        <td className="py-3 px-4 border-b">14/04/2025</td>
                        <td className="py-3 px-4 border-b">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            En attente
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <button className="text-blue-500 hover:underline mr-3">Voir</button>
                          <button className="text-green-500 hover:underline">Accepter</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">Lucas Petit</td>
                        <td className="py-3 px-4 border-b">Menuiserie</td>
                        <td className="py-3 px-4 border-b">13/04/2025</td>
                        <td className="py-3 px-4 border-b">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Accepté
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <button className="text-blue-500 hover:underline">Voir</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
