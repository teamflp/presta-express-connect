
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
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

  const handleArtisanClick = (name: string) => {
    navigate(`/artisan-details/${name.toLowerCase()}`);
  };

  const letters = Object.keys(jobsByLetter);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Trouvez un artisan par nom de famille</h3>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {letters.map((letter: string) => (
          <button
            key={letter}
            className={`px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-md
              ${activeLetter === letter 
                ? 'bg-primary text-white shadow-md transform scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => handleLetterClick(letter)}
            aria-pressed={activeLetter === letter}
          >
            {letter}
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50 p-5 rounded-lg shadow-inner">
        <h4 className="text-xl font-medium mb-5 text-gray-700 border-b pb-2 border-gray-200">
          Artisans dont le nom commence par "{activeLetter}"
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {jobsByLetter[activeLetter].map((name: string, index: number) => (
            <div key={index} className="group">
              <button 
                onClick={() => handleArtisanClick(name)}
                className="block w-full text-left py-3 px-4 rounded-lg text-gray-700 bg-white hover:bg-primary hover:text-white shadow-sm transition-all duration-300 group-hover:shadow-md"
              >
                <span className="font-medium">{name}</span>
                <div className="h-0.5 w-0 group-hover:w-full bg-white transition-all duration-300 mt-1 opacity-70"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtisanByLetter;
