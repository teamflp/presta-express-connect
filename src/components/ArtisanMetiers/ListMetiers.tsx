
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Function to generate realistic job names based on a letter
function generateJobs(letter: string) {
    // Real trades starting with each letter
    const letterJobs: Record<string, string[]> = {
        'A': ['Architecte', 'Aide-soignant', 'Agent immobilier', 'Accompagnateur de voyage', 'Acousticien', 'Affûteur', 'Armurier', 'Accordeur de piano'],
        'B': ['Boulanger', 'Boucher', 'Bijoutier', 'Barman', 'Barbier', 'Bottier', 'Bottier-cordonnier', 'Bronzier'],
        'C': ['Carreleur', 'Charpentier', 'Couvreur', 'Chauffagiste', 'Coiffeur', 'Cordonnier', 'Céramiste', 'Couturier'],
        'D': ['Décorateur', 'Diététicien', 'Déménageur', 'Dépanneur', 'Domoticien', 'Doreur', 'Dentiste', 'Dessinateur industriel'],
        'E': ['Électricien', 'Étancheur', 'Ébéniste', 'Éducateur', 'Entraîneur sportif', 'Esthéticien', 'Éleveur', 'Emballeur'],
        'F': ['Fleuriste', 'Forgeron', 'Fromager', 'Fraiseur', 'Ferronnier', 'Frigoriste', 'Fourreur', 'Fumiste'],
        'G': ['Garagiste', 'Graphiste', 'Glacier', 'Graveur', 'Guide touristique', 'Gardien', 'Géomètre', 'Gemmologue'],
        'H': ['Horloger', 'Huissier', 'Herboriste', 'Hôtelier', 'Hydraulicien', 'Hôte/Hôtesse d\'accueil'],
        'I': ['Infographiste', 'Imprimeur', 'Illusionniste', 'Informaticien', 'Ingénieur du son', 'Industriel'],
        'J': ['Jardinier', 'Joailler', 'Journaliste', 'Juriste'],
        'K': ['Kinésithérapeute'],
        'L': ['Luthier', 'Libraire', 'Lingère', 'Laveur de vitres', 'Livreur', 'Logisticien'],
        'M': ['Maçon', 'Mécanicien', 'Menuisier', 'Marbrier', 'Masseur', 'Métallier', 'Miroitier', 'Modéliste'],
        'N': ['Nettoyeur', 'Nutritionniste', 'Nageur-sauveteur', 'Navigateur'],
        'O': ['Opticien', 'Orthophoniste', 'Orfèvre', 'Ostéopathe', 'Outilleur'],
        'P': ['Peintre', 'Plombier', 'Pâtissier', 'Photographe', 'Plaquiste', 'Poseur', 'Polisseur', 'Pompier'],
        'Q': ['Quincaillier'],
        'R': ['Restaurateur', 'Ramoneur', 'Repasseur', 'Rémouleur', 'Réparateur', 'Retoucheur'],
        'S': ['Serrurier', 'Soudeur', 'Sculpteur', 'Staffeur', 'Souffleur de verre', 'Sellier', 'Savonnier'],
        'T': ['Tailleur', 'Tapissier', 'Thérapeute', 'Tourneur', 'Taxidermiste', 'Tonnelier', 'Traducteur'],
        'U': ['Urbaniste'],
        'V': ['Verrier', 'Viticulteur', 'Voiturier', 'Vernisseur', 'Vendeur', 'Vannier'],
        'W': ['Webdesigner', 'Webmaster'],
        'X': [''],
        'Y': ['Yogi'],
        'Z': ['Zoologiste', 'Zingueur']
    };

    return letterJobs[letter] || ['Aucun métier trouvé pour cette lettre'];
}

function LetterMetiersWithList() {
    const [selectedLetter, setSelectedLetter] = useState<string>('A');
    const [jobs, setJobs] = useState<string[]>([]);
    
    // Tableau contenant toutes les lettres de l'alphabet
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Mettre à jour les métiers lorsque la lettre sélectionnée change
    useEffect(() => {
        if (selectedLetter) {
            setJobs(generateJobs(selectedLetter));
        }
    }, [selectedLetter]);

    return (
        <div className="container mx-auto my-8 px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Trouvez les artisans par métier</h3>
                
                {/* Conteneur pour les boutons de lettres */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {letters.map(letter => (
                        <button
                            key={letter}
                            onClick={() => setSelectedLetter(letter)}
                            className={`px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-md
                                ${selectedLetter === letter 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            aria-pressed={selectedLetter === letter}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-xl font-medium mb-4 text-gray-700">
                        Métiers commençant par {selectedLetter}
                    </h4>
                    
                    {jobs.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {jobs.map((job, index) => (
                                <div key={index} className="group">
                                    <NavLink 
                                        to={`/metiers/${job.toLowerCase()}`} 
                                        className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300 group-hover:text-primary"
                                    >
                                        {job}
                                        <span className="block h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">Aucun métier trouvé pour cette lettre</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LetterMetiersWithList;
