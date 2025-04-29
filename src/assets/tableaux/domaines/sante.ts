
import { Domaine } from '../types/domaineTypes';
import IconCare from '../../icons/IconCare.svg';

const santeDomaines: Domaine[] = [
  {
    id: 4,
    titre: "Santé",
    icone: IconCare,
    adresse: "321 Rue du Bien-être",
    codePostal: "31000",
    ville: "Toulouse",
    phone: "05 67 89 01 23",
    dateInscription: "2023-04-05"
  },
  {
    id: 12,
    titre: "Urgences",
    icone: IconCare,
    adresse: "963 Boulevard des Secours",
    codePostal: "56000",
    ville: "Vannes",
    phone: "02 56 78 90 12",
    dateInscription: "2023-12-30"
  },
  {
    id: 15,
    titre: "Médecine",
    icone: IconCare,
    adresse: "963 Boulevard de la Santé",
    codePostal: "06000",
    ville: "Nice",
    phone: "09 87 65 43 21",
    dateInscription: "2024-03-20"
  },
  {
    id: 18,
    titre: "Soins",
    icone: IconCare,
    adresse: "987 Route du Bien-être",
    codePostal: "44000",
    ville: "Nantes",
    phone: "02 34 56 78 90",
    dateInscription: "2024-06-15"
  }
];

export default santeDomaines;
