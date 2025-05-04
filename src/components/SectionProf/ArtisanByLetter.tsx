
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface JobsByLetter {
  A: string[];
  B: string[];
  C: string[];
  D: string[];
  E: string[];
  F: string[];
  G: string[];
  [key: string]: string[]; // Index signature for dynamic access
}

function ArtisanByLetter() {
  const [activeLetter, setActiveLetter] = useState<string>('A');
  
  const jobsByLetter: JobsByLetter = {
    A: ['Architecte', 'Auditeur', 'Assureur', 'Agent immobilier'],
    B: ['Boulanger', 'Boucher', 'Bijoutier'],
    C: ['Carreleur', 'Charpentier', 'Couvreur', 'Chauffagiste'],
    D: ['Décorateur', 'Déménageur', 'Diagnostiqueur immobilier'],
    E: ['Electricien', 'Etancheur', 'Expert-comptable'],
    F: ['Fleuriste', 'Frigoriste', 'Forgeron'],
    G: ['Garagiste', 'Gardien', 'Graphiste']
  };

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
  };

  const letters = Object.keys(jobsByLetter);

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Trouvez par métier</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {letters.map((letter: string) => (
          <button
            key={letter}
            className={`px-3 py-1 rounded ${activeLetter === letter ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <ul className="list-disc list-inside">
          {jobsByLetter[activeLetter].map((job: string, index: number) => (
            <li key={index} className="mb-1">
              <NavLink to={`/metiers/${job.toLowerCase()}`} className="text-gray-700 hover:text-primary">
                {job}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArtisanByLetter;
