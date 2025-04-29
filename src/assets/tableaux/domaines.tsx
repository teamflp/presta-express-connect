// assets/tableaux/domaines.tsx

import IconArtisan from '../icons/IconArtisan.svg';
import IconLegal from '../icons/IconLegal.svg';
import IconCare from '../icons/IconCare.svg';
import IconCar from '../icons/IconCar.svg';
import IconGarden from '../icons/IconGarden.svg';

// Définition du type Domaine avec les nouvelles propriétés
export interface Domaine {
  id: number;
  titre: string;
  icone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  phone: string;
  dateInscription: string;
}

const domaines: Domaine[] = [
  {
    id: 1,
    titre: "Domaine 1",
    icone: IconArtisan,
    adresse: "123 Rue de Exemple",
    codePostal: "75001",
    ville: "Paris",
    phone: "01 23 45 67 89",
    dateInscription: "2023-01-15" // Date d'inscription au format YYYY-MM-DD
  },
  {
    id: 2,
    titre: "Domaine 2",
    icone: IconCar,
    adresse: "456 Avenue du Test",
    codePostal: "69001",
    ville: "Lyon",
    phone: "04 56 78 90 12",
    dateInscription: "2023-02-20"
  },
  {
    id: 3,
    titre: "Domaine 3",
    icone: IconGarden,
    adresse: "789 Boulevard de la Ville",
    codePostal: "13001",
    ville: "Marseille",
    phone: "06 78 90 12 34",
    dateInscription: "2023-03-10"
  },
  {
    id: 4,
    titre: "Domaine 4",
    icone: IconCare,
    adresse: "321 Rue du Soin",
    codePostal: "31000",
    ville: "Toulouse",
    phone: "05 67 89 01 23",
    dateInscription: "2023-04-05"
  },
  {
    id: 5,
    titre: "Domaine 5",
    icone: IconLegal,
    adresse: "654 Avenue de la Loi",
    codePostal: "44000",
    ville: "Nantes",
    phone: "02 34 56 78 90",
    dateInscription: "2023-05-15"
  },
  {
    id: 6,
    titre: "Domaine 6",
    icone: IconArtisan,
    adresse: "987 Route des Artisans",
    codePostal: "59000",
    ville: "Lille",
    phone: "03 45 67 89 01",
    dateInscription: "2023-06-25"
  },
  {
    id: 7,
    titre: "Domaine 7",
    icone: IconGarden,
    adresse: "135 Rue des Jardins",
    codePostal: "06000",
    ville: "Nice",
    phone: "09 87 65 43 21",
    dateInscription: "2023-07-30"
  },
  {
    id: 8,
    titre: "Domaine 8",
    icone: IconCar,
    adresse: "246 Route des Voitures",
    codePostal: "67000",
    ville: "Strasbourg",
    phone: "01 23 45 67 89",
    dateInscription: "2023-08-10"
  },
  {
    id: 9,
    titre: "Domaine 9",
    icone: IconArtisan,
    adresse: "369 Boulevard des Ouvriers",
    codePostal: "75012",
    ville: "Paris",
    phone: "01 98 76 54 32",
    dateInscription: "2023-09-15"
  },
  {
    id: 10,
    titre: "Domaine 10",
    icone: IconLegal,
    adresse: "741 Rue du Droit",
    codePostal: "34000",
    ville: "Montpellier",
    phone: "04 12 34 56 78",
    dateInscription: "2023-10-20"
  },
  {
    id: 11,
    titre: "Domaine 11",
    icone: IconGarden,
    adresse: "852 Avenue des Plantes",
    codePostal: "69003",
    ville: "Lyon",
    phone: "06 12 34 56 78",
    dateInscription: "2023-11-25"
  },
  {
    id: 12,
    titre: "Domaine 12",
    icone: IconCare,
    adresse: "963 Boulevard des Soins",
    codePostal: "56000",
    ville: "Vannes",
    phone: "02 56 78 90 12",
    dateInscription: "2023-12-30"
  },
  {
    id: 13,
    titre: "Domaine 13",
    icone: IconLegal,
    adresse: "741 Rue des Juristes",
    codePostal: "44000",
    ville: "Nantes",
    phone: "02 34 56 78 90",
    dateInscription: "2024-01-10"
  },
  {
    id: 14,
    titre: "Domaine 14",
    icone: IconGarden,
    adresse: "852 Avenue des Arbres",
    codePostal: "31000",
    ville: "Toulouse",
    phone: "05 67 89 01 23",
    dateInscription: "2024-02-15"
  },
  {
    id: 15,
    titre: "Domaine 15",
    icone: IconCare,
    adresse: "963 Boulevard de la Santé",
    codePostal: "06000",
    ville: "Nice",
    phone: "09 87 65 43 21",
    dateInscription: "2024-03-20"
  },
  {
    id: 16,
    titre: "Domaine 16",
    icone: IconLegal,
    adresse: "654 Avenue des Avocats",
    codePostal: "69001",
    ville: "Lyon",
    phone: "04 56 78 90 12",
    dateInscription: "2024-04-25"
  },
  {
    id: 17,
    titre: "Domaine 17",
    icone: IconGarden,
    adresse: "321 Rue des Jardins",
    codePostal: "75015",
    ville: "Paris",
    phone: "01 23 45 67 89",
    dateInscription: "2024-05-30"
  },
  {
    id: 18,
    titre: "Domaine 18",
    icone: IconCare,
    adresse: "987 Route des Soins",
    codePostal: "44000",
    ville: "Nantes",
    phone: "02 34 56 78 90",
    dateInscription: "2024-06-15"
  }
];

export default domaines;
