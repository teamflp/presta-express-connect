
import React from 'react';
import { Card } from 'react-bootstrap';
import { Shield, Clock, Award, Users } from 'lucide-react';

function ArgumentsPresta() {
    // Données d'arguments améliorées avec du contenu réel
    const argumentsData = [
        {
            id: 1,
            titre: "Professionnels vérifiés",
            description: "Tous nos artisans sont soigneusement sélectionnés et leurs qualifications sont vérifiées pour garantir un service de qualité.",
            icon: Shield
        },
        {
            id: 2,
            titre: "Réponse rapide",
            description: "Recevez des devis et des réponses en 24h maximum. Notre réseau d'artisans s'engage à être réactif pour tous vos projets.",
            icon: Clock
        },
        {
            id: 3,
            titre: "Garantie satisfaction",
            description: "Nous suivons chaque projet et garantissons votre satisfaction. En cas de problème, notre service client est à votre écoute.",
            icon: Award
        },
        {
            id: 4,
            titre: "7000+ clients satisfaits",
            description: "Rejoignez notre communauté de clients satisfaits qui font confiance à nos artisans pour leurs projets partout en France.",
            icon: Users
        }
    ];

    return (
        <div className="container bg-white p-4 p-md-5" style={{ borderRadius: "25px 1px 25px 25px", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)" }}>
            <div className="text-center">
                <h2 className="my-4 title1 fw-bold">Pourquoi choisir <span style={{ color: '#C63E46' }}>Presta Express</span> ?</h2>
                <p className="mb-5 fs-5">La plateforme qui connecte particuliers et professionnels de confiance pour tous vos projets</p>
            </div>
            <div className="flex flex-nowrap overflow-x-auto pb-4 gap-4">
                {argumentsData.map(argument => (
                    <Card className="border-0 hover-card flex-shrink-0" key={argument.id} style={{ minWidth: '250px', maxWidth: '300px' }}>
                        <div className="text-center p-3">
                            <div className="d-flex justify-content-center mb-3">
                                <div className="rounded-circle p-3" style={{ backgroundColor: '#f8f9fa', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
                                    {React.createElement(argument.icon, { size: 32, style: { color: '#C63E46' } })}
                                </div>
                            </div>
                            <div className="card-body">
                                <h5 className="title2 fw-bold mb-3">{argument.titre}</h5>
                                <p className="card-text">{argument.description}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ArgumentsPresta;
