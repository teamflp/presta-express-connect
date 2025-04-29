
import React from 'react';
import { Card } from 'react-bootstrap';
import { ShieldCheck, TerminalSquare, FileText, HomeIcon } from 'lucide-react';

function LoremsPresta() {
    // Données des articles améliorées avec du contenu réel
    const LoremsData = [
        {
            id: 1,
            titre: "Comment choisir le bon artisan ?",
            description: "Découvrez nos conseils pour trouver le professionnel idéal pour vos travaux : vérification des qualifications, devis comparatifs et retours clients.",
            icon: ShieldCheck,
            lien: '/conseils/choisir-artisan',
        },
        {
            id: 2,
            titre: "Rénovation énergétique",
            description: "Les aides financières disponibles en 2024 pour améliorer la performance énergétique de votre logement et réduire vos factures.",
            icon: TerminalSquare,
            lien: '/conseils/renovation-energetique',
        },
        {
            id: 3,
            titre: "Droits et obligations",
            description: "Quelles sont vos obligations et vos droits lors de la signature d'un contrat avec un artisan ? Nos experts juridiques vous répondent.",
            icon: FileText,
            lien: '/conseils/droits-obligations',
        },
        {
            id: 4,
            titre: "Entretien maison",
            description: "Le calendrier des entretiens essentiels pour maintenir votre maison en parfait état toute l'année : chaudière, toiture, jardin...",
            icon: HomeIcon,
            lien: '/conseils/entretien-maison',
        },
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold title1">Actualités et conseils</h2>
                <p className="mb-4 fs-5">Découvrez nos derniers articles et conseils pour vous aider dans vos projets</p>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {LoremsData.map((article) => (
                    <div key={article.id} className="col mb-4">
                        <Card className="h-100 bg-white border-0 shadow-sm hover-card" style={{ borderRadius: "25px 1px 25px 25px" }}>
                            <div className="text-center p-4">
                                <div className="d-flex justify-content-center mb-4">
                                    <div className="rounded-circle p-3" style={{ backgroundColor: '#f8f9fa', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
                                        {React.createElement(article.icon, { size: 32, style: { color: '#C63E46' } })}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="title2 fw-bold mb-3">{article.titre}</h5>
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
