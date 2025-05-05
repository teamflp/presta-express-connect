
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3 className="text-lg font-semibold">Tableau de bord</h3>
        </div>
        <div className="sidebar-content">
          {/* Navigation links will go here */}
        </div>
      </div>
      <div className="dashboard-main">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
