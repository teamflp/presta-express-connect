import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // Tableau contenant toutes les lettres de l'alphabet
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Mettre à jour les métiers lorsque la lettre sélectionnée change
  useEffect(() => {
    if (selectedLetter) {
      setJobs(generateJobs(selectedLetter));
    }
  }, [selectedLetter]);
  const handleJobClick = (job: string) => {
    navigate(`/metier-details/${job.toLowerCase()}`);
  };
  return <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Trouvez les artisans par métier</h3>
            
            {/* Conteneur pour les boutons de lettres */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                {letters.map(letter => <button key={letter} onClick={() => setSelectedLetter(letter)} className={`px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-md
                            ${selectedLetter === letter ? 'bg-primary text-white shadow-md transform scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} aria-pressed={selectedLetter === letter}>
                        {letter}
                    </button>)}
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg shadow-inner">
                <h4 className="text-xl font-medium mb-5 text-gray-700 border-b pb-2 border-gray-200">
                    Métiers commençant par "{selectedLetter}"
                </h4>
                
                {jobs.length > 0 && jobs[0] !== '' ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {jobs.map((job, index) => <div key={index} className="group">
                                <button onClick={() => handleJobClick(job)} className="block w-full text-left py-3 px-4 rounded-lg text-gray-700 bg-white hover:bg-primary hover:text-white shadow-sm transition-all duration-300 group-hover:shadow-md">
                                    <span className="font-medium text-red-700">{job}</span>
                                    <div className="h-0.5 w-0 group-hover:w-full bg-white transition-all duration-300 mt-1 opacity-70"></div>
                                </button>
                            </div>)}
                    </div> : <p className="text-gray-500 italic py-3 px-4">Aucun métier trouvé pour cette lettre</p>}
            </div>
        </div>;
}
export default LetterMetiersWithList;