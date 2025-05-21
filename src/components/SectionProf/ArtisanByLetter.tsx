
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
    A: ['Abadie', 'Aubry', 'Arnaud', 'Adam', 'Aubert', 'André'],
    B: ['Bernard', 'Bertrand', 'Boucher', 'Blanc', 'Brunet', 'Boyer'],
    C: ['Chevalier', 'Collet', 'Caron', 'Colin', 'Cordier', 'Charpentier'],
    D: ['Dupont', 'Durand', 'Dubois', 'Dumas', 'Dufour', 'Delaunay'],
    E: ['Étienne', 'Émery', 'Évrard', 'Esteban', 'Esquivel', 'Escudero'],
    F: ['Fournier', 'Fontaine', 'François', 'Faure', 'Fleury', 'Ferreira'],
    G: ['Gauthier', 'Girard', 'Gaillard', 'Gautier', 'Garnier', 'Gonzalez']
  };

  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);
  };

  const letters = Object.keys(jobsByLetter);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Trouvez par nom de famille</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {letters.map((letter: string) => (
          <button
            key={letter}
            className={`px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-md
              ${activeLetter === letter 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => handleLetterClick(letter)}
            aria-pressed={activeLetter === letter}
          >
            {letter}
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-xl font-medium mb-4 text-gray-700">
          Artisans dont le nom commence par {activeLetter}
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {jobsByLetter[activeLetter].map((name: string, index: number) => (
            <div key={index} className="group">
              <NavLink 
                to={`/artisans/${name.toLowerCase()}`} 
                className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300 group-hover:text-primary"
              >
                {name}
                <span className="block h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtisanByLetter;
