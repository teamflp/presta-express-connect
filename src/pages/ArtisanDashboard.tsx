import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleTabChange = (selectedTab: string) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Artisan</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            onClick={() => handleTabChange('overview')}
          >
            Vue d'ensemble
          </button>
          <button
            className={`px-4 py-3 ${activeTab === 'projects' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            onClick={() => handleTabChange('projects')}
          >
            Mes projets
          </button>
          <button
            className={`px-4 py-3 ${activeTab === 'messages' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            onClick={() => handleTabChange('messages')}
          >
            Messages
          </button>
          <button
            className={`px-4 py-3 ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            onClick={() => handleTabChange('profile')}
          >
            Mon profil
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">Projets en cours</h3>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">Demandes de devis</h3>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">Messages non lus</h3>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
              
              <h3 className="font-semibold mb-3">Activité récente</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-3 py-1">
                  <p className="font-medium">Nouveau message de Jean Dupont</p>
                  <p className="text-sm text-gray-500">Il y a 2 heures</p>
                </div>
                <div className="border-l-4 border-primary pl-3 py-1">
                  <p className="font-medium">Nouvelle demande de devis</p>
                  <p className="text-sm text-gray-500">Il y a 1 jour</p>
                </div>
                <div className="border-l-4 border-primary pl-3 py-1">
                  <p className="font-medium">Projet marqué comme terminé</p>
                  <p className="text-sm text-gray-500">Il y a 3 jours</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Mes projets</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Marie Martin</td>
                      <td className="px-6 py-4 whitespace-nowrap">Rénovation salle de bain</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">En cours</span></td>
                      <td className="px-6 py-4 whitespace-nowrap">12/05/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap"><button className="text-primary hover:underline">Voir détails</button></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Pierre Dubois</td>
                      <td className="px-6 py-4 whitespace-nowrap">Installation électrique</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En attente</span></td>
                      <td className="px-6 py-4 whitespace-nowrap">08/05/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap"><button className="text-primary hover:underline">Voir détails</button></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Sophie Bernard</td>
                      <td className="px-6 py-4 whitespace-nowrap">Peinture salon</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Devis envoyé</span></td>
                      <td className="px-6 py-4 whitespace-nowrap">05/05/2023</td>
                      <td className="px-6 py-4 whitespace-nowrap"><button className="text-primary hover:underline">Voir détails</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Jean Dupont</h3>
                      <p className="text-sm text-gray-500">Projet: Rénovation cuisine</p>
                    </div>
                    <span className="text-xs text-gray-500">Il y a 2 heures</span>
                  </div>
                  <p className="mt-2 text-gray-700">Bonjour, je voudrais savoir quand vous pourriez commencer les travaux...</p>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Marie Martin</h3>
                      <p className="text-sm text-gray-500">Projet: Rénovation salle de bain</p>
                    </div>
                    <span className="text-xs text-gray-500">Hier</span>
                  </div>
                  <p className="mt-2 text-gray-700">Merci pour votre devis, j'ai quelques questions concernant...</p>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Pierre Dubois</h3>
                      <p className="text-sm text-gray-500">Projet: Installation électrique</p>
                    </div>
                    <span className="text-xs text-gray-500">Il y a 3 jours</span>
                  </div>
                  <p className="mt-2 text-gray-700">Est-ce que vous pourriez me donner plus de détails sur...</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Informations personnelles</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-500">Nom</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Dupont" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Prénom</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Jean" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Email</label>
                      <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="jean.dupont@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Téléphone</label>
                      <input type="tel" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="06 12 34 56 78" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Informations professionnelles</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-500">Métier</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Plombier" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Entreprise</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="Dupont Plomberie" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">SIRET</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="12345678901234" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Adresse</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" defaultValue="123 Rue de la Plomberie, 75001 Paris" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover">Enregistrer les modifications</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtisanDashboard;
