
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ArtisanByLetter() {
  const [activeLetter, setActiveLetter] = useState('A');
  
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  const jobs = {
    A: ['Architecte', 'Agent immobilier', 'Artisan', 'Avocat'],
    B: ['Boulanger', 'Boucher', 'Banquier', 'Bijoutier'],
    C: ['Carreleur', 'Chauffagiste', 'Charpentier', 'Couvreur'],
    D: ['Décorateur', 'Dentiste', 'Diagnostiqueur', 'Domoticien'],
    E: ['Électricien', 'Ébéniste', 'Expert-comptable', 'Étanchéiste'],
    F: ['Façadier', 'Fleuriste', 'Frigoriste', 'Ferrailleur'],
    G: ['Garagiste', 'Graphiste', 'Greffier', 'Garde-meuble'],
    // ... Remaining letters with job arrays
  };
  
  const handleLetterClick = (letter) => {
    setActiveLetter(letter);
  };
  
  return (
    <div className="bg-white p-4 rounded-3xl shadow-md">
      <h3 className="text-2xl font-bold mb-4">Artisans par métier</h3>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`letter-button ${letter === activeLetter ? 'active' : ''}`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      
      <div className="letter-jobs">
        <h4 className="font-semibold mb-2">Métiers en {activeLetter}</h4>
        <div className="grid grid-cols-2 gap-2">
          {jobs[activeLetter]?.map((job, index) => (
            <Link
              key={index}
              to={`/professionals/category/job?name=${job}`}
              className="text-gray-700 hover:text-primary"
            >
              {job}
            </Link>
          )) || <p>Pas de métiers disponibles.</p>}
        </div>
      </div>
    </div>
  );
}

export default ArtisanByLetter;
