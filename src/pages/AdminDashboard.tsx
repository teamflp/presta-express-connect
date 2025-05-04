import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // To fix the TS error, we need to properly type the parameter
  const handleTabChange = (selectedTab: string) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Administrateur</h1>
      <div className="md:flex md:space-x-6">
        <div className="md:w-1/4">
          <nav className="mb-6 md:mb-0">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleTabChange('overview')}
                  className={`w-full text-left py-2 px-4 rounded block hover:bg-gray-100 ${activeTab === 'overview' ? 'bg-gray-100 font-medium' : ''}`}
                >
                  Vue d'ensemble
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange('users')}
                  className={`w-full text-left py-2 px-4 rounded block hover:bg-gray-100 ${activeTab === 'users' ? 'bg-gray-100 font-medium' : ''}`}
                >
                  Gestion des utilisateurs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange('products')}
                  className={`w-full text-left py-2 px-4 rounded block hover:bg-gray-100 ${activeTab === 'products' ? 'bg-gray-100 font-medium' : ''}`}
                >
                  Gestion des produits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange('orders')}
                  className={`w-full text-left py-2 px-4 rounded block hover:bg-gray-100 ${activeTab === 'orders' ? 'bg-gray-100 font-medium' : ''}`}
                >
                  Gestion des commandes
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="md:w-3/4">
          {activeTab === 'overview' && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Vue d'ensemble</h2>
              <p>Bienvenue sur le tableau de bord administrateur. Ici, vous pouvez gérer les utilisateurs, les produits et les commandes.</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Gestion des utilisateurs</h2>
              <p>Liste des utilisateurs et actions possibles (modifier, supprimer, etc.).</p>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Gestion des produits</h2>
              <p>Liste des produits et actions possibles (ajouter, modifier, supprimer, etc.).</p>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Gestion des commandes</h2>
              <p>Liste des commandes et détails (statut, date, etc.).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
