import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleTabChange = (selectedTab: string) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Professionnel</h1>
      {/* Dashboard navigation tabs */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('overview')}
        >
          Vue d'ensemble
        </button>
        <button
          className={`px-4 py-2 rounded-lg ml-2 ${activeTab === 'profile' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('profile')}
        >
          Profil
        </button>
        <button
          className={`px-4 py-2 rounded-lg ml-2 ${activeTab === 'services' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('services')}
        >
          Services
        </button>
        <button
          className={`px-4 py-2 rounded-lg ml-2 ${activeTab === 'billing' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('billing')}
        >
          Facturation
        </button>
      </div>

      {/* Display content based on the active tab */}
      {activeTab === 'overview' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
          <p>Bienvenue sur votre tableau de bord professionnel. Ici, vous pouvez voir un aperçu de votre activité.</p>
        </div>
      )}

      {activeTab === 'profile' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Profil</h2>
          <p>Mettez à jour vos informations de profil ici.</p>
        </div>
      )}

      {activeTab === 'services' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <p>Gérez les services que vous proposez.</p>
        </div>
      )}

      {activeTab === 'billing' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Facturation</h2>
          <p>Consultez vos informations de facturation.</p>
        </div>
      )}
    </div>
  );
}

export default ProfessionalDashboard;
