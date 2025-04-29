
import { Domaine } from '../types/domaineTypes';
import IconArtisan from '../../icons/IconArtisan.svg';

const artisanatDomaines: Domaine[] = [
  {
    id: 1,
    titre: "Artisanat",
    icone: IconArtisan,
    adresse: "123 Rue de l'Artisanat",
    codePostal: "75001",
    ville: "Paris",
    phone: "01 23 45 67 89",
    dateInscription: "2023-01-15"
  },
  {
    id: 6,
    titre: "Plomberie",
    icone: IconArtisan,
    adresse: "987 Route des Canalisations",
    codePostal: "59000",
    ville: "Lille",
    phone: "03 45 67 89 01",
    dateInscription: "2023-06-25"
  },
  {
    id: 9,
    titre: "Menuiserie",
    icone: IconArtisan,
    adresse: "369 Boulevard du Bois",
    codePostal: "75012",
    ville: "Paris",
    phone: "01 98 76 54 32",
    dateInscription: "2023-09-15"
  }
];

export default artisanatDomaines;
