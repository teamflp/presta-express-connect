
import React from 'react';

interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, avatarUrl }) => {
  return (
    <div className="profile-card p-6 text-white mb-6">
      <div className="flex items-center">
        <div className="profile-avatar rounded-full overflow-hidden flex items-center justify-center mr-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl">{name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm opacity-80">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
