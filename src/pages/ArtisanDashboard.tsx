import React, { useState } from 'react';
import { Calendar, BarChart, Users, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

function ArtisanDashboard() {
  const [userData] = useState({
    name: 'Artisan Name',
    email: 'artisan@example.com',
    profession: 'Plombier',
    memberSince: '2023-01-15'
  });

  const menuItems = [
    { id: 1, label: 'Aperçu', icon: Calendar, path: '/artisan/dashboard' },
    { id: 2, label: 'Statistiques', icon: BarChart, path: '/artisan/stats' },
    { id: 3, label: 'Clients', icon: Users, path: '/artisan/clients' },
    { id: 4, label: 'Factures', icon: FileText, path: '/artisan/invoices' },
    { id: 5, label: 'Paramètres', icon: Settings, path: '/artisan/settings' },
  ];

  const stats = [
    { label: 'Chiffre d\'affaires', value: '12,500 €', icon: BarChart },
    { label: 'Nouveaux clients', value: '32', icon: Users },
    { label: 'Prochain RDV', value: '15 Mai', icon: Calendar },
    { label: 'Factures impayées', value: '3', icon: FileText },
  ];

  const recentActivities = [
    { id: 1, description: 'Nouveau rendez-vous avec M. Dupont', date: '2023-05-05' },
    { id: 2, description: 'Facture envoyée à Mme. Martin', date: '2023-05-04' },
    { id: 3, description: 'Paiement reçu de M. Garcia', date: '2023-05-03' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Tableau de bord Artisan">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="stats-card">
            <div className="flex items-center space-x-4">
              <div className={`stats-icon card-gradient-${['blue', 'green', 'purple', 'amber'][index % 4]}`}>
                <stat.icon size={24} color="white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="table-container">
          <h4 className="font-semibold text-lg p-4">Activités récentes</h4>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map(activity => (
              <li key={activity.id} className="py-3 px-4">
                <div className="flex justify-between">
                  <p className="text-gray-700">{activity.description}</p>
                  <time className="text-sm text-gray-500">{activity.date}</time>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-card p-6 text-white">
          <div className="flex items-center space-x-6 mb-4">
            <div className="profile-avatar rounded-full overflow-hidden">
              <img src="https://via.placeholder.com/88" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h5 className="font-bold text-xl">{userData.name}</h5>
              <p className="text-sm opacity-70">{userData.profession}</p>
            </div>
          </div>
          <p className="opacity-80 mb-2">Email: {userData.email}</p>
          <p className="opacity-80">Membre depuis: {userData.memberSince}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ArtisanDashboard;
