import lyonImage from '../images/lyonImage.jpg';
import lyon from '../images/lyon.jpg';
import Tour_eiffel from '../images/Tour_eiffel.jpg';

// Définition de l'interface pour une ville
interface City {
  id: number;
  ville: string;
  backgroundImage: string;
}

// Tableau de données des villes françaises avec leurs propriétés et le chemin d'image spécifique
const cities: City[] = [
  {
    id: 1,
    ville: 'Paris',
    backgroundImage: Tour_eiffel,
  },
  {
    id: 2,
    ville: 'Marseille',
    backgroundImage: lyon,
  },
  {
    id: 3,
    ville: 'Lyon',
    backgroundImage: lyonImage,
  },
  {
    id: 4,
    ville: 'Tour Eiffel',
    backgroundImage: Tour_eiffel,
  },
  {
    id: 5,
    ville: 'Nice',
    backgroundImage: lyon,
  },
  {
    id: 6,
    ville: 'Nantes',
    backgroundImage: Tour_eiffel,
  },
  {
    id: 7,
    ville: 'Strasbourg',
    backgroundImage: lyon,
  },
  {
    id: 8,
    ville: 'Bordeaux',
    backgroundImage: lyonImage,
  },
  {
    id: 9,
    ville: 'Lille',
    backgroundImage: Tour_eiffel,
  },
  {
    id: 10,
    ville: 'Montpellier',
    backgroundImage: lyon,
  },
];

export default cities;
