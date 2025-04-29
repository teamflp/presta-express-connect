// src/data/ProductData.tsx
import lyonImage from '../images/lyonImage.jpg';
import lyon from '../images/lyon.jpg';
import Tour_eiffel from '../images/Tour_eiffel.jpg';

// Définition de l'interface Product avec les nouvelles propriétés d'image
export interface Product {
  id: number;
  phone: string;
  address: string;
  name: string;
  descriptif: string;
  image: string;
  image1: string; // Propriétés d'image optionnelles
  image2: string;
  image3: string;
  image4: string;
  location: string; // Champ de localisation
}

// Liste des Nom et prénoms avec les nouvelles propriétés d'image
export const products: Product[] = [
  {
    id: 1,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 1',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 1',
    image: Tour_eiffel,
    image1: lyonImage,
    image2: lyon,
    image3: Tour_eiffel,
    image4: lyonImage,
    location: 'Paris',
  },
  {
    id: 2,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 2',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 2',
    image: lyonImage,
    image1: lyon,
    image2: Tour_eiffel,
    image3: lyonImage,
    image4: lyon,
    location: 'Nîmes',
  },
  {
    id: 3,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 3',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 3',
    image: lyonImage,
    image1: Tour_eiffel,
    image2: lyonImage,
    image3: lyon,
    image4: Tour_eiffel,
    location: 'Lyon',
  },
  {
    id: 4,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 4',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 4',
    image: lyonImage,
    image1: lyonImage,
    image2: lyon,
    image3: Tour_eiffel,
    image4: lyonImage,
    location: 'Bordeaux',
  },
  {
    id: 5,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 5',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 5',
    image: Tour_eiffel,
    image1: lyon,
    image2: lyonImage,
    image3: Tour_eiffel,
    image4: lyon,
    location: 'Paris',
  },
  {
    id: 6,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 6',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 6',
    image: lyonImage,
    image1: lyonImage,
    image2: Tour_eiffel,
    image3: lyon,
    image4: Tour_eiffel,
    location: 'Lyon',
  },
  {
    id: 7,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 7',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 7',
    image: lyon,
    image1: lyonImage,
    image2: Tour_eiffel,
    image3: lyonImage,
    image4: lyon,
    location: 'Cannes',
  },
  {
    id: 8,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 8',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 8',
    image: lyonImage,
    image1: Tour_eiffel,
    image2: lyonImage,
    image3: lyon,
    image4: Tour_eiffel,
    location: 'Laval',
  },
  {
    id: 9,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 9',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 9',
    image: lyon,
    image1: lyonImage,
    image2: Tour_eiffel,
    image3: lyon,
    image4: lyonImage,
    location: 'Paris',
  },
  {
    id: 10,
    phone: '0023 34 45 12',
    address: '2 rue Jean Lyon 69008',
    name: 'Nom et prénom 10',
    descriptif:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 10',
    image: Tour_eiffel,
    image1: lyonImage,
    image2: lyon,
    image3: Tour_eiffel,
    image4: lyonImage,
    location: 'Toulouse',
  },
];

export default products;
