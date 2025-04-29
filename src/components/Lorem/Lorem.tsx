import React from 'react';

// Styles définis
const defaultLinkStyle = {
  color: '#141414',
  textDecoration: 'none', 
  padding: '5px', 
  transition: 'color 0.3s ease, font-weight 0.3s ease',
};

interface LoremProps {
  icone: string;
  titre: string;
  description: string;
  lien: string; // Nouvelle propriété lien
}

const Lorem: React.FC<LoremProps> = ({ icone, titre, description, lien }) => {
  return (
    <div className="card">
      <img src={`./assets/${icone}`} alt={`Image de ${titre}`} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{titre}</h5>
        <p className="card-text">{description}</p>
        <a 
          href={lien} 
          className=""         
          style={defaultLinkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#C63E46'; e.currentTarget.style.fontWeight = 'bold'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#141414'; e.currentTarget.style.fontWeight = 'normal'; }}
          >
          Voir plus
        </a>
      </div>
    </div>
  );
};

export default Lorem;
