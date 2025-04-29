
import React, { useState } from 'react';

// Fonction qui génère une liste de métiers factices basée sur une lettre donnée
function metierFixtures(letter) {
    const metiers = [];
    // Créer 100 métiers en ajoutant un index à la lettre donnée
    for (let index = 1; index <= 100; index++) {
        metiers.push(letter + index); // Exemple : "A1", "A2", ..., "A100"
    }
    return metiers;
}

function LetterMetiersWithList() {
    // État pour la lettre sélectionnée
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    // Tableau contenant toutes les lettres de l'alphabet
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="container my-5">
            <h3 className="fw-bold mb-4">Trouvez les artisans par lettre de l'alphabet</h3>
            
            {/* Conteneur pour les boutons de lettres avec un style amélioré */}
            <div className="letters d-flex flex-wrap gap-2 mt-4">
                {letters.map(letter => (
                    <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`letter-button px-3 py-2 ${selectedLetter === letter ? 'active' : ''}`}
                        style={{
                            backgroundColor: selectedLetter === letter ? '#C63E46' : '#f5f5f5',
                            color: selectedLetter === letter ? 'white' : '#333',
                            border: 'none',
                            borderRadius: '10px 0px 10px 10px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedLetter === letter ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            
            <div className="redLineContainer mt-4"></div>
            
            {/* Affichage des métiers si une lettre est sélectionnée */}
            {selectedLetter && (
                <div className="metiers my-5">
                    <h4 className="mb-4">Métiers commençant par {selectedLetter}</h4>
                    <div className="card p-4 border-0 shadow-sm" style={{ borderRadius: "15px 0px 15px 15px" }}>
                        <ul className="list-unstyled row row-cols-2 row-cols-md-6 g-3">
                            {metierFixtures(selectedLetter).map(metier => (
                                <li key={metier} className="col">
                                    <a 
                                        href="#" 
                                        className="text-decoration-none"
                                        style={{
                                            color: '#333',
                                            transition: 'color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#C63E46'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                                    >
                                        {metier}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LetterMetiersWithList;
