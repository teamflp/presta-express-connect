
// assets/tableaux/domaines.tsx

import IconArtisan from '../icons/IconArtisan.svg';
import IconLegal from '../icons/IconLegal.svg';
import IconCare from '../icons/IconCare.svg';
import IconCar from '../icons/IconCar.svg';
import IconGarden from '../icons/IconGarden.svg';
import IconSecurity from '../icons/IconSecurity.svg';
import IconKey from '../icons/IconKey.svg';

// Définition du type Domaine
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
    titre: "Artisanat",
    icone: IconArtisan,
    adresse: "123 Rue de l'Artisanat",
    codePostal: "75001",
    ville: "Paris",
    phone: "01 23 45 67 89",
    dateInscription: "2023-01-15"
  },
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
    id: 5,
    titre: "Juridique",
    icone: IconLegal,
    adresse: "654 Avenue des Conseils",
    codePostal: "44000",
    ville: "Nantes",
    phone: "02 34 56 78 90",
    dateInscription: "2023-05-15"
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
    id: 8,
    titre: "Mécanique",
    icone: IconCar,
    adresse: "246 Route des Moteurs",
    codePostal: "67000",
    ville: "Strasbourg",
    phone: "01 23 45 67 89",
    dateInscription: "2023-08-10"
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
  },
  {
    id: 10,
    titre: "Services",
    icone: IconLegal,
    adresse: "741 Rue des Services",
    codePostal: "34000",
    ville: "Montpellier",
    phone: "04 12 34 56 78",
    dateInscription: "2023-10-20"
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
    id: 13,
    titre: "Consultations",
    icone: IconLegal,
    adresse: "741 Rue des Conseils",
    codePostal: "44000",
    ville: "Nantes",
    phone: "02 34 56 78 90",
    dateInscription: "2024-01-10"
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
    id: 16,
    titre: "Assurance",
    icone: IconSecurity,
    adresse: "654 Avenue des Garanties",
    codePostal: "69001",
    ville: "Lyon",
    phone: "04 56 78 90 12",
    dateInscription: "2024-04-25"
  },
  {
    id: 17,
    titre: "Rénovation",
    icone: IconKey,
    adresse: "321 Rue du Neuf",
    codePostal: "75015",
    ville: "Paris",
    phone: "01 23 45 67 89",
    dateInscription: "2024-05-30"
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

export default domaines;
