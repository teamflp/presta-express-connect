
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Settings, BarChart, Bell, 
  Calendar, MessageSquare, Edit, Trash, Check
} from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Données simulées pour le dashboard
  const stats = [
    { title: 'Utilisateurs', value: '2,345', icon: <Users size={24} />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Artisans', value: '842', icon: <FileText size={24} />, color: 'bg-green-100 text-green-600' },
    { title: 'Demandes', value: '156', icon: <MessageSquare size={24} />, color: 'bg-purple-100 text-purple-600' },
    { title: 'En attente', value: '28', icon: <Calendar size={24} />, color: 'bg-amber-100 text-amber-600' },
  ];

  // Liste des utilisateurs (simulée)
  const users = [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Client', status: 'Actif' },
    { id: 2, name: 'Marie Laurent', email: 'marie@example.com', role: 'Artisan', status: 'En attente' },
    { id: 3, name: 'Pierre Michel', email: 'pierre@example.com', role: 'Client', status: 'Actif' },
    { id: 4, name: 'Sophie Durand', email: 'sophie@example.com', role: 'Artisan', status: 'Actif' },
    { id: 5, name: 'Luc Bernard', email: 'luc@example.com', role: 'Client', status: 'Inactif' },
  ];

  // Liste des artisans (simulée)
  const artisans = [
    { id: 1, name: 'Robert Mercier', profession: 'Plombier', rating: 4.8, jobs: 126 },
    { id: 2, name: 'Julie Moreau', profession: 'Électricienne', rating: 4.6, jobs: 98 },
    { id: 3, name: 'Thomas Lefebvre', profession: 'Peintre', rating: 4.9, jobs: 213 },
    { id: 4, name: 'Caroline Dubois', profession: 'Menuisière', rating: 4.7, jobs: 87 },
    { id: 5, name: 'Michel Lambert', profession: 'Maçon', rating: 4.5, jobs: 156 },
  ];

  // Récentes notifications (simulées)
  const notifications = [
    { id: 1, message: 'Nouvel artisan inscrit', time: 'Il y a 5 minutes' },
    { id: 2, message: 'Nouveau signalement de client', time: 'Il y a 2 heures' },
    { id: 3, message: 'Mise à jour système terminée', time: 'Hier' },
    { id: 4, message: '10 nouvelles demandes reçues', time: 'Il y a 2 jours' },
  ];
  
  // Gérer l'approbation d'un artisan
  const handleApproveArtisan = (id: number) => {
    toast.success(`Artisan #${id} approuvé avec succès`);
  };
  
  // Gérer la suppression d'un utilisateur
  const handleDeleteUser = (id: number) => {
    toast.success(`Utilisateur #${id} supprimé avec succès`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-800 p-4">
            <div className="flex items-center space-x-4 mb-8 p-2">
              <div className="w-10 h-10 rounded-full bg-[#C63E46] flex items-center justify-center text-white">
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <p className="text-white font-medium truncate">Admin</p>
                <p className="text-gray-400 text-sm truncate">{user?.email || 'admin@example.com'}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'overview' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <BarChart size={18} />
                <span>Vue d'ensemble</span>
              </button>
              
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'users' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Users size={18} />
                <span>Utilisateurs</span>
              </button>
              
              <button
                onClick={() => setActiveTab('artisans')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'artisans' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <FileText size={18} />
                <span>Artisans</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'notifications' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'settings' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Settings size={18} />
                <span>Paramètres</span>
              </button>
            </nav>
          </div>
          
          {/* Contenu principal */}
          <div className="flex-1 p-6">
            {activeTab === 'overview' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord administrateur</h2>
                
                {/* Statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white shadow rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center">
                        <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Graphiques et tendances (simulés) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-4">Tendance des inscriptions</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                      <p className="text-gray-500">Graphique d'inscriptions (simulation)</p>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-4">Répartition des services</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                      <p className="text-gray-500">Graphique des services (simulation)</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'users' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Gestion des utilisateurs</h2>
                  <button className="bg-[#C63E46] text-white px-4 py-2 rounded-lg flex items-center">
                    <span className="mr-2">Ajouter</span> <span className="text-xl">+</span>
                  </button>
                </div>
                
                <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                {user.name[0]}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.role}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${user.status === 'Actif' ? 'bg-green-100 text-green-800' : 
                                user.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Edit size={18} />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            
            {activeTab === 'artisans' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Gestion des artisans</h2>
                  <div className="flex space-x-2">
                    <button className="bg-[#C63E46] text-white px-4 py-2 rounded-lg flex items-center">
                      <span className="mr-2">Ajouter</span> <span className="text-xl">+</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artisan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Évaluation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interventions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {artisans.map((artisan) => (
                        <tr key={artisan.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                {artisan.name[0]}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{artisan.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {artisan.profession}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-900 mr-2">{artisan.rating}</span>
                              <div className="flex text-yellow-400">
                                {'★'.repeat(Math.floor(artisan.rating))}
                                {'☆'.repeat(5 - Math.floor(artisan.rating))}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {artisan.jobs}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Edit size={18} />
                              </button>
                              <button 
                                className="text-green-600 hover:text-green-900"
                                onClick={() => handleApproveArtisan(artisan.id)}
                              >
                                <Check size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            
            {activeTab === 'notifications' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                
                <div className="bg-white shadow rounded-xl p-6 border border-gray-100 space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start p-4 border-b border-gray-100 last:border-b-0">
                      <div className="bg-blue-100 rounded-full p-2 mr-4">
                        <Bell size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {activeTab === 'settings' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres</h2>
                
                <div className="bg-white shadow rounded-xl p-6 border border-gray-100 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Paramètres généraux</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Nom du site</label>
                        <input
                          type="text"
                          id="siteName"
                          defaultValue="PrestaExpress"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Email de contact</label>
                        <input
                          type="email"
                          id="contactEmail"
                          defaultValue="contact@prestaexpress.fr"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="maintenanceMode" className="flex items-center">
                          <input
                            type="checkbox"
                            id="maintenanceMode"
                            className="rounded border-gray-300 text-[#C63E46] focus:ring-[#C63E46]"
                          />
                          <span className="ml-2 text-sm text-gray-700">Mode maintenance</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <button
                      type="button"
                      className="bg-[#C63E46] text-white py-2 px-4 rounded-md hover:bg-[#A33138] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C63E46]"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
