import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  User, FileText, Settings, Calendar, 
  MessageSquare, Edit, Trash, Check, Bell, Home
} from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';

const ClientDashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Données simulées pour le dashboard
  const stats = [
    { title: 'Demandes', value: '12', icon: <MessageSquare size={24} />, color: 'card-gradient-blue' },
    { title: 'En cours', value: '3', icon: <FileText size={24} />, color: 'card-gradient-purple' },
    { title: 'Terminés', value: '8', icon: <Check size={24} />, color: 'card-gradient-green' },
    { title: 'Favoris', value: '5', icon: <User size={24} />, color: 'card-gradient-amber' },
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
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">Artisan<span className="text-red-400">Express</span></span>
          </div>
        </div>
        
        <div className="sidebar-content">
          <button
            onClick={() => setActiveTab('overview')}
            className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <Home size={18} strokeWidth={2} />
            <span>Vue d'ensemble</span>
          </button>
          
          <button
            onClick={() => setActiveTab('requests')}
            className={`nav-button ${activeTab === 'requests' ? 'active' : ''}`}
          >
            <MessageSquare size={18} strokeWidth={2} />
            <span>Mes demandes</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`nav-button ${activeTab === 'history' ? 'active' : ''}`}
          >
            <FileText size={18} strokeWidth={2} />
            <span>Historique</span>
          </button>
          
          <button
            onClick={() => setActiveTab('favorites')}
            className={`nav-button ${activeTab === 'favorites' ? 'active' : ''}`}
          >
            <User size={18} strokeWidth={2} />
            <span>Artisans favoris</span>
          </button>
          
          <button
            onClick={() => setActiveTab('calendar')}
            className={`nav-button ${activeTab === 'calendar' ? 'active' : ''}`}
          >
            <Calendar size={18} strokeWidth={2} />
            <span>Calendrier</span>
          </button>
          
          <button
            onClick={() => setActiveTab('notifications')}
            className={`nav-button ${activeTab === 'notifications' ? 'active' : ''}`}
          >
            <Bell size={18} strokeWidth={2} />
            <span>Notifications</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <Settings size={18} strokeWidth={2} />
            <span>Mon profil</span>
          </button>
        </div>
        
        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className="nav-button text-red-400 hover:text-red-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
      
      <div className="dashboard-main">
        <div className="dashboard-header rounded-xl shadow-sm">
          <div className="flex items-center">
            <button className="lg:hidden mr-4 text-gray-600" onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Tableau de bord</h2>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              Bienvenue, {user?.email?.split('@')[0] || 'Client'}
            </span>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              {user?.email?.[0]?.toUpperCase() || 'C'}
            </div>
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="stats-card">
                  <div className="flex items-center">
                    <div className={`stats-icon ${stat.color} text-white mr-4`}>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="table-container">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Demandes récentes</h3>
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
                
                <div className="p-5">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Artisan</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeRequests.slice(0, 3).map((request) => (
                        <tr key={request.id}>
                          <td>
                            <div className="font-medium">{request.service}</div>
                            <div className="text-sm text-gray-500">{request.date}</div>
                          </td>
                          <td>{request.artisan}</td>
                          <td>
                            <span className={`status-badge ${
                              request.status === 'Validé' ? 'completed' : 
                              request.status === 'En cours' ? 'in-progress' : 
                              'pending'}`}>
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="table-container">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Artisans favoris</h3>
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
                
                <div className="p-5">
                  {favoriteArtisans.map((artisan) => (
                    <div key={artisan.id} className="mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium mr-3">
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
            
            <div className="table-container">
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications récentes</h3>
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
                  <div key={notification.id} className="notification-item">
                    <div className="notification-icon bg-blue-100">
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
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Mes demandes</h2>
              <button 
                onClick={() => navigate('/search')} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <span className="mr-2">Nouvelle demande</span> <span className="text-xl">+</span>
              </button>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Artisan</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <div className="font-medium">{request.service}</div>
                      </td>
                      <td>{request.artisan}</td>
                      <td>{request.date}</td>
                      <td>
                        <span className={`status-badge ${
                          request.status === 'Validé' ? 'completed' : 
                          request.status === 'En cours' ? 'in-progress' : 
                          'pending'}`}>
                          {request.status}
                        </span>
                      </td>
                      <td>
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
  );
};

export default ClientDashboard;
