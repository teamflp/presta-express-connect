
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  User, FileText, Settings, BarChart, Calendar, 
  MessageSquare, Edit, Trash, Check, Bell, Home
} from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';

const ClientDashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Données simulées pour le dashboard
  const stats = [
    { title: 'Demandes', value: '12', icon: <MessageSquare size={24} />, color: 'bg-blue-100 text-blue-600' },
    { title: 'En cours', value: '3', icon: <FileText size={24} />, color: 'bg-indigo-100 text-indigo-600' },
    { title: 'Terminés', value: '8', icon: <Check size={24} />, color: 'bg-green-100 text-green-600' },
    { title: 'Favoris', value: '5', icon: <User size={24} />, color: 'bg-amber-100 text-amber-600' },
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

  // Gérer la déconnexion
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
    toast.success('Vous avez été déconnecté avec succès');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Header Dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue, {user?.email?.split('@')[0] || 'Client'}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-semibold backdrop-blur-sm border border-white/30">
                    {user?.email?.[0]?.toUpperCase() || 'C'}
                  </div>
                  <div>
                    <p className="font-medium">Espace Client</p>
                    <p className="text-sm text-white/80 truncate">{user?.email || 'client@example.com'}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-1 transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Home size={18} strokeWidth={2} />
                  <span>Vue d'ensemble</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-1 transition-colors ${activeTab === 'requests' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <MessageSquare size={18} strokeWidth={2} />
                  <span>Mes demandes</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-1 transition-colors ${activeTab === 'history' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FileText size={18} strokeWidth={2} />
                  <span>Historique</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-1 transition-colors ${activeTab === 'favorites' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <User size={18} strokeWidth={2} />
                  <span>Artisans favoris</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-1 transition-colors ${activeTab === 'calendar' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Calendar size={18} strokeWidth={2} />
                  <span>Calendrier</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-1 transition-colors ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Bell size={18} strokeWidth={2} />
                  <span>Notifications</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-1 transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Settings size={18} strokeWidth={2} />
                  <span>Mon profil</span>
                </button>

                <div className="border-t border-gray-200 my-2"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Vue d'ensemble</h2>
                
                {/* Statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 transition-shadow hover:shadow-md">
                      <div className="flex items-center">
                        <div className={`rounded-full p-3 mr-4 ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Récentes demandes et artisans favoris */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">Demandes récentes</h3>
                        <button
                          onClick={() => setActiveTab('requests')}
                          className="text-blue-600 text-sm hover:underline flex items-center"
                        >
                          Voir tout
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      {activeRequests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div>
                            <p className="font-medium text-gray-800">{request.service}</p>
                            <p className="text-sm text-gray-500">{request.artisan} - {request.date}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                            ${request.status === 'Validé' ? 'bg-green-100 text-green-800' : 
                              request.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                              'bg-amber-100 text-amber-800'}`}>
                            {request.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">Artisans favoris</h3>
                        <button
                          onClick={() => setActiveTab('favorites')}
                          className="text-blue-600 text-sm hover:underline flex items-center"
                        >
                          Voir tout
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      {favoriteArtisans.slice(0, 3).map((artisan) => (
                        <div key={artisan.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                                {artisan.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{artisan.name}</p>
                                <p className="text-sm text-gray-500">{artisan.profession}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-1">{artisan.rating}</span>
                              <div className="text-amber-400">
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
                
                {/* Dernières notifications */}
                <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-800">Notifications récentes</h3>
                      <button
                        onClick={() => setActiveTab('notifications')}
                        className="text-blue-600 text-sm hover:underline flex items-center"
                      >
                        Voir tout
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start p-4 hover:bg-gray-50 transition-colors">
                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                          <Bell size={18} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'requests' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Mes demandes</h2>
                  <button 
                    onClick={() => navigate('/search')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <span className="mr-2">Nouvelle demande</span> <span className="text-xl">+</span>
                  </button>
                </div>
                
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
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
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors">
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
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${request.status === 'Validé' ? 'bg-green-100 text-green-800' : 
                                  request.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-amber-100 text-amber-800'}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-3">
                                <button className="text-blue-600 hover:text-blue-900 transition-colors">
                                  <MessageSquare size={18} />
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-900 transition-colors"
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
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Historique des demandes</h2>
                
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
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
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors">
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
                              <div className="flex text-amber-400">
                                {'★'.repeat(request.rating)}
                                {'☆'.repeat(5 - request.rating)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mes artisans favoris</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {favoriteArtisans.map((artisan) => (
                    <div key={artisan.id} className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                            {artisan.name[0]}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{artisan.name}</h3>
                            <p className="text-sm text-gray-500">{artisan.profession}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <div className="text-amber-400 mr-1">
                              {'★'.repeat(Math.floor(artisan.rating))}
                              {'☆'.repeat(5 - Math.floor(artisan.rating))}
                            </div>
                            <span className="text-gray-600 text-sm">{artisan.rating}</span>
                          </div>
                          <p className="text-sm text-gray-500">{artisan.projects} projets</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <button 
                            onClick={() => navigate(`/professional/${artisan.id}`)} 
                            className="flex items-center justify-center px-3 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm"
                          >
                            <User size={16} className="mr-1" />
                            <span>Voir profil</span>
                          </button>
                          
                          <button 
                            onClick={() => handleRemoveFavorite(artisan.id)} 
                            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                          >
                            <Trash size={16} className="mr-1" />
                            <span>Retirer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'calendar' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calendrier</h2>
                
                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                  <div className="flex flex-col items-center justify-center h-96">
                    <Calendar size={64} className="text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">Calendrier des rendez-vous</p>
                    <p className="text-gray-400 text-sm">Fonctionnalité en développement</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>
                
                <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start p-5 hover:bg-gray-50 transition-colors">
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                          <Bell size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mon profil</h2>
                
                <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <div className="flex items-center">
                      <div className="relative group">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 border-white/30">
                          {user?.email?.[0]?.toUpperCase() || 'C'}
                        </div>
                        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                          <Edit size={18} />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-semibold">Jean Dupont</h3>
                        <p className="text-white/80">Membre depuis Mars 2023</p>
                        <p className="text-white/60 text-sm">{user?.email || 'client@example.com'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input
                          type="text"
                          defaultValue="Jean"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input
                          type="text"
                          defaultValue="Dupont"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="text"
                          defaultValue="06 12 34 56 78"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email || 'client@example.com'}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          readOnly
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                        <input
                          type="text"
                          defaultValue="123 Rue du Commerce, 75001 Paris"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => toast.success('Profil mis à jour avec succès!')}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Mettre à jour le profil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientDashboard;

