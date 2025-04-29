import React, { useState } from 'react';

// Création de fixtures en dynamique et en mémoire
// Fonction qui génère une liste de métiers factices basée sur une lettre donnée
function metierFixtures(letter) {
    const metiers = [];
    // Boucle pour créer 100 métiers en ajoutant un index à la lettre donnée
    for (let index = 1; index <= 100; index++) {
        metiers.push(letter + index); // Exemple : "A1", "A2", ..., "A100"
    }
    return metiers; // Retourne la liste des métiers
}

// Composant LetterMetiersWithList
function LetterMetiersWithList() {
    // État pour la lettre sélectionnée
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    // Tableau contenant toutes les lettres de l'alphabet
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="container my-5">
            <h3>Trouvez les artisans par lettre de l'alphabet</h3>
            {/* Conteneur pour les boutons de lettres */}
            <div className="letters d-flex justify-content-between flex-wrap mt-5">
                {/* Création d'un bouton pour chaque lettre */}
                {letters.map(letter => (
                    <button
                        className="letter-button"
                        key={letter}
                        onClick={() => setSelectedLetter(letter)} // Définir la lettre sélectionnée au clic
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <div className="redLineContainer mt-3"></div>
            {/* Affichage des métiers si une lettre est sélectionnée */}
            {selectedLetter && (
                <div className="metiers my-5">
                    <h4>Métiers commençant par {selectedLetter}</h4>
                    <ul className="list-unstyled d-flex flex-wrap">
                        {/* Création d'une liste d'éléments pour chaque métier */}
                        {metierFixtures(selectedLetter).map(metier => (
                            <li key={metier} className="col-2 d-inline-block px-2">
                                {metier}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LetterMetiersWithList;



