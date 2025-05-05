
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color = "card-gradient-blue" }) => {
  return (
    <div className="stats-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        {icon && (
          <div className={`stats-icon ${color}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
