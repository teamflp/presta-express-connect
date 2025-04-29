
import { Domaine } from '../types/domaineTypes';
import IconGarden from '../../icons/IconGarden.svg';

const constructionDomaines: Domaine[] = [
  {
    id: 3,
    titre: "Construction",
    icone: IconGarden,
    adresse: "789 Boulevard du Bâtiment",
    codePostal: "13001",
    ville: "Marseille",
    phone: "06 78 90 12 34",
    dateInscription: "2023-03-10"
  },
  {
    id: 7,
    titre: "Électricité",
    icone: IconGarden,
    adresse: "135 Rue du Circuit",
    codePostal: "06000",
    ville: "Nice",
    phone: "09 87 65 43 21",
    dateInscription: "2023-07-30"
  },
  {
    id: 11,
    titre: "Immobilier",
    icone: IconGarden,
    adresse: "852 Avenue des Propriétés",
    codePostal: "69003",
    ville: "Lyon",
    phone: "06 12 34 56 78",
    dateInscription: "2023-11-25"
  },
  {
    id: 14,
    titre: "Décoration",
    icone: IconGarden,
    adresse: "852 Avenue des Design",
    codePostal: "31000",
    ville: "Toulouse",
    phone: "05 67 89 01 23",
    dateInscription: "2024-02-15"
  },
  {
    id: 17,
    titre: "Rénovation",
    icone: IconGarden,
    adresse: "321 Rue du Neuf",
    codePostal: "75015",
    ville: "Paris",
    phone: "01 23 45 67 89",
    dateInscription: "2024-05-30"
  }
];

export default constructionDomaines;
