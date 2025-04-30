
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Settings, BarChart, Calendar, 
  MessageSquare, Edit, Check, Trash, Bell 
} from 'lucide-react';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-hot-toast';

const ArtisanDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Données simulées pour le dashboard
  const stats = [
    { title: 'Demandes', value: '24', icon: <MessageSquare size={24} />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Projets en cours', value: '8', icon: <FileText size={24} />, color: 'bg-green-100 text-green-600' },
    { title: 'Terminés', value: '156', icon: <Check size={24} />, color: 'bg-purple-100 text-purple-600' },
    { title: 'Évaluation', value: '4.8', icon: <Users size={24} />, color: 'bg-amber-100 text-amber-600' },
  ];

  // Liste des demandes (simulée)
  const requests = [
    { id: 1, client: 'Jean Dupont', service: 'Installation électrique', date: '10/05/2023', status: 'En attente' },
    { id: 2, client: 'Marie Laurent', service: 'Réparation plomberie', date: '12/05/2023', status: 'En cours' },
    { id: 3, client: 'Pierre Michel', service: 'Peinture salon', date: '15/05/2023', status: 'Accepté' },
    { id: 4, client: 'Sophie Durand', service: 'Installation cuisine', date: '18/05/2023', status: 'En attente' },
  ];

  // Projets en cours (simulés)
  const projects = [
    { id: 1, client: 'Marc Bernard', service: 'Rénovation salle de bain', progress: 75, deadline: '25/05/2023' },
    { id: 2, client: 'Lucie Moreau', service: 'Installation électrique', progress: 50, deadline: '30/05/2023' },
    { id: 3, client: 'Antoine Dupuis', service: 'Peinture appartement', progress: 30, deadline: '05/06/2023' },
  ];

  // Avis clients (simulés)
  const reviews = [
    { id: 1, client: 'Jean Dupont', service: 'Installation électrique', rating: 5, comment: 'Excellent travail, rapide et efficace.' },
    { id: 2, client: 'Marie Laurent', service: 'Réparation plomberie', rating: 4, comment: 'Bon service, artisan professionnel.' },
    { id: 3, client: 'Sophie Durand', service: 'Installation cuisine', rating: 5, comment: 'Travail impeccable, je recommande!' },
  ];

  // Récentes notifications (simulées)
  const notifications = [
    { id: 1, message: 'Nouvelle demande de devis', time: 'Il y a 5 minutes' },
    { id: 2, message: 'Projet terminé: évaluation reçue', time: 'Il y a 2 heures' },
    { id: 3, message: 'Rappel: rendez-vous demain à 10h', time: 'Hier' },
  ];
  
  // Gérer l'acceptation d'une demande
  const handleAcceptRequest = (id: number) => {
    toast.success(`Demande #${id} acceptée`);
  };
  
  // Gérer le refus d'une demande
  const handleRejectRequest = (id: number) => {
    toast.success(`Demande #${id} refusée`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-800 p-4">
            <div className="flex items-center space-x-4 mb-8 p-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <p className="text-white font-medium truncate">Espace Artisan</p>
                <p className="text-gray-400 text-sm truncate">{user?.email || 'artisan@example.com'}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <BarChart size={18} />
                <span>Vue d'ensemble</span>
              </button>
              
              <button
                onClick={() => setActiveTab('requests')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'requests' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <MessageSquare size={18} />
                <span>Demandes</span>
              </button>
              
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <FileText size={18} />
                <span>Projets</span>
              </button>
              
              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Calendar size={18} />
                <span>Calendrier</span>
              </button>
              
              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Users size={18} />
                <span>Avis clients</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Settings size={18} />
                <span>Profil</span>
              </button>
            </nav>
          </div>
          
          {/* Contenu principal */}
          <div className="flex-1 p-6">
            {activeTab === 'overview' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Bienvenue dans votre espace artisan</h2>
                
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
                
                {/* Récentes demandes et projets */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Dernières demandes</h3>
                      <button
                        onClick={() => setActiveTab('requests')}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Voir tout
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {requests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">{request.client}</p>
                            <p className="text-sm text-gray-500">{request.service}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                            ${request.status === 'Accepté' ? 'bg-green-100 text-green-800' : 
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
                      <h3 className="font-medium text-gray-700">Projets en cours</h3>
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Voir tout
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-800">{project.client}</p>
                            <span className="text-sm text-gray-500">Échéance: {project.deadline}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{project.service}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-right mt-1 text-gray-500">{project.progress}%</p>
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
                  <h2 className="text-2xl font-bold text-gray-800">Demandes de services</h2>
                </div>
                
                <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
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
                      {requests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{request.client}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{request.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${request.status === 'Accepté' ? 'bg-green-100 text-green-800' : 
                                request.status === 'En cours' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button 
                                className="text-green-600 hover:text-green-900"
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                <Check size={18} />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <Trash size={18} />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <MessageSquare size={18} />
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
            
            {activeTab === 'projects' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Projets en cours</h2>
                
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white shadow rounded-xl p-6 border border-gray-100">
                      <div className="flex flex-wrap justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">{project.service}</h3>
                          <p className="text-sm text-gray-500">Client: {project.client}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Échéance: {project.deadline}</p>
                          <p className="text-sm font-medium text-blue-600">{project.progress}% terminé</p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center">
                          <Edit size={16} className="mr-1" />
                          <span>Mettre à jour</span>
                        </button>
                        
                        <button className="text-gray-600 hover:text-gray-800 flex items-center">
                          <MessageSquare size={16} className="mr-1" />
                          <span>Contacter client</span>
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
            
            {activeTab === 'reviews' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Avis clients</h2>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white shadow rounded-xl p-6 border border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium text-gray-800">{review.client}</h3>
                        <div className="flex text-yellow-400">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Service: {review.service}</p>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
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
            
            {activeTab === 'profile' && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil professionnel</h2>
                
                <div className="bg-white shadow rounded-xl p-6 border border-gray-100 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
                            <input
                              type="text"
                              id="name"
                              defaultValue="Robert Mercier"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession</label>
                            <input
                              type="text"
                              id="profession"
                              defaultValue="Plombier"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              type="email"
                              id="email"
                              defaultValue="robert@example.com"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                            <input
                              type="tel"
                              id="phone"
                              defaultValue="06 12 34 56 78"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            id="description"
                            rows={4}
                            defaultValue="Plombier professionnel avec plus de 10 ans d'expérience dans l'installation et la réparation de systèmes de plomberie résidentiels et commerciaux."
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <button
                      type="button"
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => toast.success('Profil mis à jour avec succès')}
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

export default ArtisanDashboard;
