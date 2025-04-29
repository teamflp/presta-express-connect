
import { Domaine } from '../types/domaineTypes';
import IconCar from '../../icons/IconCar.svg';

const automobileDomaines: Domaine[] = [
  {
    id: 2,
    titre: "Automobile",
    icone: IconCar,
    adresse: "456 Avenue des Mécaniciens",
    codePostal: "69001",
    ville: "Lyon",
    phone: "04 56 78 90 12",
    dateInscription: "2023-02-20"
  },
  {
    id: 8,
    titre: "Mécanique",
    icone: IconCar,
    adresse: "246 Route des Moteurs",
    codePostal: "67000",
    ville: "Strasbourg",
    phone: "01 23 45 67 89",
    dateInscription: "2023-08-10"
  }
];

export default automobileDomaines;
