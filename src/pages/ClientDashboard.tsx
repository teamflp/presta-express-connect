
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  User, FileText, Settings, BarChart, Calendar, 
  MessageSquare, Edit, Trash, Check, Bell
} from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Données simulées pour le dashboard
  const stats = [
    { title: 'Demandes', value: '12', icon: <MessageSquare size={24} />, color: 'bg-green-100 text-green-600' },
    { title: 'En cours', value: '3', icon: <FileText size={24} />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Terminés', value: '8', icon: <Check size={24} />, color: 'bg-purple-100 text-purple-600' },
    { title: 'Favoris', value: '5', icon: <User size={24} />, color: 'bg-rose-100 text-rose-600' },
  ];

  // Demandes en cours (simulées)
  const activeRequests = [
    { id: 1, artisan: 'Robert Mercier', service: 'Installation électrique', date: '10/05/2023', status: 'En cours' },
    { id: 2, artisan: 'Julie Moreau', service: 'Réparation plomberie', date: '12/05/2023', status: 'En attente' },
    { id: 3, artisan: 'Thomas Lefebvre', service: 'Peinture salon', date: '15/05/2023', status: 'Validé' },
  ];

  // Historique des demandes (simulées)
  const requestHistory = [
    { id: 1, artisan: 'Michel Lambert', service: 'Maçonnerie', date: '01/04/2023', status: 'Terminé', rating: 5 },
    { id: 2, artisan: 'Caroline Dubois', service: 'Menuiserie', date: '15/03/2023', status: 'Terminé', rating: 4 },
    { id: 3, artisan: 'Thomas Lefebvre', service: 'Peinture cuisine', date: '28/02/2023', status: 'Terminé', rating: 5 },
    { id: 4, artisan: 'Robert Mercier', service: 'Plomberie salle de bain', date: '10/02/2023', status: 'Terminé', rating: 4 },
  ];

  // Artisans favoris (simulés)
  const favoriteArtisans = [
    { id: 1, name: 'Robert Mercier', profession: 'Plombier', rating: 4.8, projects: 3 },
    { id: 2, name: 'Julie Moreau', profession: 'Électricienne', rating: 4.6, projects: 2 },
    { id: 3, name: 'Thomas Lefebvre', profession: 'Peintre', rating: 4.9, projects: 3 },
  ];

  // Récentes notifications (simulées)
  const notifications = [
    { id: 1, message: 'Devis reçu de Robert Mercier', time: 'Il y a 5 minutes' },
    { id: 2, message: 'Julie Moreau a confirmé le rendez-vous', time: 'Il y a 2 heures' },
    { id: 3, message: 'Travaux terminés par Thomas Lefebvre', time: 'Hier' },
  ];
  
  // Gérer l'annulation d'une demande
  const handleCancelRequest = (id: number) => {
    toast.success(`Demande #${id} annulée`);
  };
  
  // Gérer la suppression d'un artisan des favoris
  const handleRemoveFavorite = (id: number) => {
    toast.success(`Artisan #${id} retiré des favoris`);
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
                {user?.email?.[0]?.toUpperCase() || 'C'}
              </div>
              <div>
                <p className="text-white font-medium truncate">Espace Client</p>
                <p className="text-gray-400 text-sm truncate">{user?.email || 'client@example.com'}</p>
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
                onClick={() => setActiveTab('requests')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'requests' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <MessageSquare size={18} />
                <span>Mes demandes</span>
              </button>
              
              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'history' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <FileText size={18} />
                <span>Historique</span>
              </button>
              
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'favorites' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <User size={18} />
                <span>Artisans favoris</span>
              </button>
              
              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'calendar' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Calendar size={18} />
                <span>Calendrier</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'notifications' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'profile' ? 'bg-[#C63E46] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Settings size={18} />
                <span>Mon profil</span>
              </button>
            </nav>
          </div>
          
          {/* Contenu principal */}
          <div className="flex-1 p-6">
            {activeTab === 'overview' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Bienvenue dans votre espace client</h2>
                
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
                
                {/* Récentes demandes et artisans favoris */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Demandes récentes</h3>
                      <button
                        onClick={() => setActiveTab('requests')}
                        className="text-[#C63E46] text-sm hover:underline"
                      >
                        Voir tout
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {activeRequests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">{request.service}</p>
                            <p className="text-sm text-gray-500">{request.artisan} - {request.date}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                            ${request.status === 'Validé' ? 'bg-green-100 text-green-800' : 
                              request.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {request.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Artisans favoris</h3>
                      <button
                        onClick={() => setActiveTab('favorites')}
                        className="text-[#C63E46] text-sm hover:underline"
                      >
                        Voir tout
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {favoriteArtisans.slice(0, 3).map((artisan) => (
                        <div key={artisan.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">{artisan.name}</p>
                              <p className="text-sm text-gray-500">{artisan.profession}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-1">{artisan.rating}</span>
                              <div className="text-yellow-400">
                                {'★'.repeat(Math.floor(artisan.rating))}
                                {'☆'.repeat(5 - Math.floor(artisan.rating))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'requests' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Mes demandes</h2>
                  <button 
                    onClick={() => navigate('/search')} 
                    className="bg-[#C63E46] text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <span className="mr-2">Nouvelle demande</span> <span className="text-xl">+</span>
                  </button>
                </div>
                
                <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artisan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.artisan}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{request.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${request.status === 'Validé' ? 'bg-green-100 text-green-800' : 
                                request.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <MessageSquare size={18} />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleCancelRequest(request.id)}
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
            
            {activeTab === 'history' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Historique des demandes</h2>
                
                <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artisan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Évaluation</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requestHistory.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.artisan}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{request.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex text-yellow-400">
                              {'★'.repeat(request.rating)}
                              {'☆'.repeat(5 - request.rating)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            
            {activeTab === 'favorites' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes artisans favoris</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {favoriteArtisans.map((artisan) => (
                    <div key={artisan.id} className="bg-white shadow rounded-xl p-6 border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                          {artisan.name[0]}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{artisan.name}</h3>
                          <p className="text-sm text-gray-500">{artisan.profession}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(artisan.rating))}
                          {'☆'.repeat(5 - Math.floor(artisan.rating))}
                          <span className="text-gray-500 ml-1">{artisan.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">{artisan.projects} projets</p>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <button onClick={() => navigate(`/professional/${artisan.id}`)} className="text-[#C63E46] hover:underline text-sm flex items-center">
                          <User size={16} className="mr-1" />
                          <span>Voir profil</span>
                        </button>
                        
                        <button 
                          onClick={() => handleRemoveFavorite(artisan.id)} 
                          className="text-gray-500 hover:text-red-500 text-sm flex items-center"
                        >
                          <Trash size={16} className="mr-1" />
                          <span>Retirer</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {activeTab === 'calendar' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendrier</h2>
                
                <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center justify-center h-96">
                    <p className="text-gray-500">Calendrier des rendez-vous (simulation)</p>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'notifications' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                
                <div className="bg-white shadow rounded-xl p-6 border border-gray-100 space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start p-4 border-b border-gray-100 last:border-b-0">
                      <div className="bg-red-100 rounded-full p-2 mr-4">
                        <Bell size={20} className="text-red-600" />
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
            
            {activeTab === 'profile' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mon profil</h2>
                
                <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Jean Dupont</h3>
                      <p className="text-sm text-gray-500">Membre depuis Mars 2023</p>
                      <p className="text-sm text-gray-500">{user?.email || 'client@example.com'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        defaultValue="Jean"
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        defaultValue="Dupont"
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input
                        type="text"
                        defaultValue="06 12 34 56 78"
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email || 'client@example.com'}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <input
                        type="text"
                        defaultValue="123 Rue du Commerce, 75001 Paris"
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C63E46] focus:border-[#C63E46]"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t border-gray-200 pt-5">
                    <button
                      onClick={() => toast.success('Profil mis à jour avec succès!')}
                      className="bg-[#C63E46] text-white py-2 px-4 rounded-md hover:bg-[#A33138] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C63E46]"
                    >
                      Mettre à jour le profil
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

export default ClientDashboard;
