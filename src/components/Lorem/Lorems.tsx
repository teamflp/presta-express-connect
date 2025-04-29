
import React from 'react';
import LoremsData from '../../assets/tableaux/lorems';
import { Card } from 'react-bootstrap';

function LoremsPresta() {
    return (
        <div className="container py-5">
            <div className="mb-4">
                <h2 className="fw-bold title1">Actualités et conseils</h2>
                <p className="mb-4">Découvrez nos derniers articles et conseils pour vous aider dans vos projets</p>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {LoremsData.map((article) => (
                    <div key={article.id} className="col mb-4">
                        <Card className="h-100 bg-white border-0 shadow-sm hover-card" style={{ borderRadius: "25px 1px 25px 25px" }}>
                            <div className="text-center p-3">
                                <img src={article.icone} alt={`Image de ${article.titre}`} className="mb-3" style={{ maxHeight: "80px", objectFit: "contain" }} />
                                <div className="card-body">
                                    <h5 className="title2 mb-3">{article.titre}</h5>
                                    <p className="card-text mb-4">{article.description}</p>
                                    <a 
                                        href={article.lien} 
                                        className="btn-link"         
                                        style={{
                                            color: '#141414',
                                            textDecoration: 'none', 
                                            padding: '8px 16px',
                                            borderRadius: '20px 0px 20px 20px',
                                            border: '1px solid #C63E46',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => { 
                                            e.currentTarget.style.color = '#FFFFFF'; 
                                            e.currentTarget.style.fontWeight = 'bold';
                                            e.currentTarget.style.backgroundColor = '#C63E46';
                                        }}
                                        onMouseLeave={(e) => { 
                                            e.currentTarget.style.color = '#141414'; 
                                            e.currentTarget.style.fontWeight = 'normal';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
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
