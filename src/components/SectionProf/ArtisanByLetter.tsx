import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Background from '../../assets/images/lyon.jpg';

const ArtisanByLetter = () => {
    // Tableau des lettres de l'alphabet
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Style pour le fond du titre dans la carte
    const backgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: '20px 0px 1px 0px',
    };

    // Style par défaut des liens
    const defaultLinkStyle = {
        color: '#141414', // Couleur du texte
        textDecoration: 'none', // Pas de soulignement
        padding: '5px', // Espacement intérieur
        transition: 'color 0.3s ease, fontWeight 0.3s ease', // Effet de transition pour les changements de couleur et de poids de la police
    };

    // Style actif des liens lorsqu'ils sont survolés
    const activeLinkStyle = {
        color: '#C63E46', // Couleur du texte lorsqu'actif
        textDecoration: 'none', // Pas de soulignement
        padding: '5px', // Espacement intérieur
        fontWeight: 'bold', // Texte en gras
        transition: 'color 0.3s ease, fontWeight 0.3s ease', // Effet de transition pour les changements de couleur et de poids de la police
    };

    // État local pour suivre la lettre actuellement survolée
    const [currentLetter, setCurrentLetter] = useState<string | null>(null);

    // Fonction de gestion du survol de la souris sur une lettre
    const handleMouseEnter = (letter: string) => {
        setCurrentLetter(letter);
    };

    // Fonction de gestion du retrait du survol de la souris
    const handleMouseLeave = () => {
        setCurrentLetter(null);
    };

    return (
        <Card className="mb-3 border-0" style={{ height: '100%', width: '100%', borderRadius: '20px 0px 20px 20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            {/* 
                Conteneur de la carte avec image de fond
                - `background: url(${Background}) no-repeat center center / cover` : Image de fond centrée et recouvre entièrement le conteneur
                - `height: '100%'` et `width: '100%'` : Hauteur et largeur maximales
                - `borderRadius: '20px 0px 1px 0px'` : Bordures arrondies
            */}
            <div className="d-flex justify-content-center" style={{ background: `url(${Background}) no-repeat center center / cover`, height: '100%', width: '100%', borderRadius: '20px 0px 1px 0px' }}>
                {/* Titre de la carte avec style de fond */}
                <Card.Title className="titre text-center card-img-top p-3 p-md-5 text-white" style={backgroundStyle}>
                    <h2>Le <span>Professionnels</span> qu’il vous faut à portée de main<span> !</span></h2>
                </Card.Title>
            </div>
            {/* Contenu principal de la carte */}
            <Card.Body className="px-2 px-md-4">
                <strong>Trouvez votre artisan par métier</strong>
                <div className="d-flex flex-wrap justify-content-center">
                    {/* Création des liens pour chaque lettre */}
                    {letters.map(letter => (
                        <Link
                            key={letter} // Clé unique pour chaque élément de liste
                            to={`/Metiers`} // URL de destination pour chaque lien
                            onMouseEnter={() => handleMouseEnter(letter)} // Gestion du survol de la souris
                            onMouseLeave={handleMouseLeave} // Gestion du retrait du survol de la souris
                            style={currentLetter === letter ? activeLinkStyle : defaultLinkStyle} // Application du style actif ou par défaut
                        >
                            {letter} {/* Affichage de la lettre */}
                        </Link>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
}

export default ArtisanByLetter;


