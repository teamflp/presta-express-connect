
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, Bell, BarChart2, FileText, 
  Calendar, MessageSquare, LogOut, Menu, X 
} from 'lucide-react';
import toast from 'react-hot-toast';

const ClientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`bg-gradient-to-br from-gray-800 to-gray-900 text-white w-64 fixed h-full transform transition-transform duration-300 ease-in-out z-30
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <User className="mr-2" size={20} /> Espace Client
          </h2>
        </div>
        
        <nav className="py-4">
          <div className="px-4 py-2 text-gray-400 uppercase text-xs font-semibold">
            Général
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent hover:border-primary transition-all">
            <BarChart2 size={18} className="mr-3" />
            <span>Tableau de bord</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent hover:border-primary transition-all">
            <FileText size={18} className="mr-3" />
            <span>Mes demandes</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-primary bg-gray-800 transition-all">
            <Calendar size={18} className="mr-3" />
            <span>Rendez-vous</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent hover:border-primary transition-all">
            <MessageSquare size={18} className="mr-3" />
            <span>Messages</span>
          </a>
          
          <div className="px-4 py-2 mt-6 text-gray-400 uppercase text-xs font-semibold">
            Paramètres
          </div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent hover:border-primary transition-all">
            <Bell size={18} className="mr-3" />
            <span>Notifications</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white border-l-4 border-transparent hover:border-primary transition-all">
            <Settings size={18} className="mr-3" />
            <span>Préférences</span>
          </a>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 ${isSidebarOpen ? 'lg:ml-64' : '0'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 focus:outline-none lg:hidden"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">Tableau de bord</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-gray-400 hover:text-gray-600 focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Photo de profil"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Thomas Martin</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 card-hover">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-light text-primary">
                  <FileText size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Demandes en cours</h3>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 card-hover">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                  <Calendar size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Rendez-vous</h3>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 card-hover">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500">
                  <MessageSquare size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Messages</h3>
                  <p className="text-2xl font-bold">7</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 card-hover">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-500">
                  <BarChart2 size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">Projets complétés</h3>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent activities */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-semibold text-gray-800">Activités récentes</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    {/* Activity item */}
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="text-blue-500" size={20} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Rendez-vous confirmé</p>
                        <p className="text-sm text-gray-500">Jean Dupont (Plombier) - 15 Mai à 14:00</p>
                        <p className="text-xs text-gray-400 mt-1">Il y a 2 heures</p>
                      </div>
                    </div>
                    
                    {/* Activity item */}
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                          <FileText className="text-primary" size={20} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Devis reçu</p>
                        <p className="text-sm text-gray-500">Rénovation salle de bain - 590€</p>
                        <p className="text-xs text-gray-400 mt-1">Il y a 1 jour</p>
                      </div>
                    </div>
                    
                    {/* Activity item */}
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <MessageSquare className="text-green-500" size={20} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Nouveau message</p>
                        <p className="text-sm text-gray-500">Sophie Martin (Peintre) - "Bonjour, suite à notre conversation..."</p>
                        <p className="text-xs text-gray-400 mt-1">Il y a 2 jours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming appointments */}
            <div>
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-semibold text-gray-800">Prochains rendez-vous</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="bg-primary w-2 h-full rounded-full mr-3"></div>
                          <div>
                            <p className="font-medium">Jean Dupont</p>
                            <p className="text-xs text-gray-500">Plombier</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold bg-primary-light text-primary py-1 px-2 rounded-full">Confirmé</span>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span>15 Mai 2024 - 14:00</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="bg-blue-500 w-2 h-full rounded-full mr-3"></div>
                          <div>
                            <p className="font-medium">Sophie Martin</p>
                            <p className="text-xs text-gray-500">Peintre</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-500 py-1 px-2 rounded-full">En attente</span>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span>20 Mai 2024 - 10:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
