import React from 'react';
import LoremsData from '../../assets/tableaux/lorems';
import { Card } from 'react-bootstrap';

// Styles définis
const defaultLinkStyle = {
    color: '#141414',
    textDecoration: 'none', 
    padding: '5px', 
    transition: 'color 0.3s ease, font-weight 0.3s ease',
  };
  
  const activeLinkStyle = {
    color: '#C63E46',
    textDecoration: 'none',
    padding: '5px',
    fontWeight: 'bold',
    transition: 'color 0.3s ease, font-weight 0.3s ease', 
  };

function LoremsPresta() {
    return (
        <div className="container">
            <div className="">
                <h2 className="my-5 title Lorem">Lorem ipsum (Suggestion:Actualité ou publicité)</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {LoremsData.map((Lorem) => (
                    <div key={Lorem.id} className="col">
                        <Card className="bg-white border-0 shadow-sm" style={{ borderRadius: "25px 1px 25px 25px" }}>
                            <div className="text-center">
                                <img src={Lorem.icone} alt={`Image de ${Lorem.titre}`} className="Lorem-image" />
                                <div className="card-body">
                                    <h5 className="title2">{Lorem.titre}</h5>
                                    <p className="card-text">{Lorem.description}</p>
                                    <a 
                                    href={Lorem.lien} 
                                    className=""         
                                    style={defaultLinkStyle}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C63E46'; e.currentTarget.style.fontWeight = 'bold'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = '#141414'; e.currentTarget.style.fontWeight = 'normal'; }}
                                    >
                                    Voir plus
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LoremsPresta;



