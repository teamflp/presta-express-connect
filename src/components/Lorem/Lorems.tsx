
import React from 'react';
import LoremsData from '../../assets/tableaux/lorems';

function LoremsPresta() {
  return (
    <div className="container mx-auto p-4 p-md-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Conseils et actualités</h2>
        <p className="text-gray-600">Découvrez nos derniers conseils pour vos projets et actualités du secteur</p>
      </div>
      
      <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
        {LoremsData.map((item) => (
          <div 
            key={item.id} 
            className="flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            style={{ minWidth: '250px', maxWidth: '300px' }}
          >
            <div className="p-4">
              <div className="flex items-center justify-center mb-4">
                <img src={item.icone} alt={item.titre} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.titre}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
              <a
                href={item.lien}
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
                Lire la suite
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoremsPresta;
