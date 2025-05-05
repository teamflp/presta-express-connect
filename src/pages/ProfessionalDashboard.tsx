import React, { useState } from 'react';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import StatsCard from '../components/Dashboard/StatsCard';
import { FaEnvelope, FaCog, FaChartBar, FaUsers } from 'react-icons/fa';
import DataTable from '../components/Dashboard/DataTable';
import ProfileCard from '../components/Dashboard/ProfileCard';

function ProfessionalDashboard() {
  const [userData] = useState({
    name: 'Professional Name',
    email: 'pro@example.com',
    service: 'Consulting',
    memberSince: '2022-08-10'
  });

  const stats = [
    { label: 'Messages', value: '50', icon: FaEnvelope, color: 'card-gradient-blue' },
    { label: 'Settings', value: '8', icon: FaCog, color: 'card-gradient-green' },
    { label: 'Statistics', value: '60', icon: FaChartBar, color: 'card-gradient-purple' },
    { label: 'Users', value: '20', icon: FaUsers, color: 'card-gradient-amber' },
  ];

  const tableData = [
    { id: 1, name: 'Client A', service: 'Consulting', status: 'completed' },
    { id: 2, name: 'Client B', service: 'Marketing', status: 'in-progress' },
    { id: 3, name: 'Client C', service: 'Design', status: 'pending' },
  ];

  const tableColumns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Service', accessor: 'service' },
    { Header: 'Status', accessor: 'status' },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <h2>Tableau de bord Professionnel</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DataTable columns={tableColumns} data={tableData} title="Clients" />
        </div>
        <div>
          <ProfileCard userData={userData} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProfessionalDashboard;
