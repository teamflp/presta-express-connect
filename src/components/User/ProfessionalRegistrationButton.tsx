
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clipboard, Check, ArrowRight } from 'lucide-react';

const ProfessionalRegistrationButton = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/professional-register');
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border-t-0 rounded-tr-none">
      <h3 className="text-xl font-semibold mb-4">Vous êtes un professionnel ?</h3>
      <p className="text-gray-600 mb-4">
        Rejoignez notre réseau d'artisans qualifiés et développez votre activité
      </p>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#FDFAF7] flex items-center justify-center mr-3">
            <Check size={16} className="text-[#C63E46]" />
          </div>
          <span className="text-sm">Inscription gratuite et rapide</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#FDFAF7] flex items-center justify-center mr-3">
            <Clipboard size={16} className="text-[#C63E46]" />
          </div>
          <span className="text-sm">Recevez des demandes de devis qualifiées</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#FDFAF7] flex items-center justify-center mr-3">
            <ArrowRight size={16} className="text-[#C63E46]" />
          </div>
          <span className="text-sm">Développez votre activité localement</span>
        </div>
      </div>
      
      <button
        onClick={handleClick}
        className="w-full py-2 px-4 bg-[#C63E46] hover:bg-[#A33138] text-white rounded-md transition-colors duration-300"
      >
        S'inscrire comme professionnel
      </button>
    </div>
  );
};

export default ProfessionalRegistrationButton;
