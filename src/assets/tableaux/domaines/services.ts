
import { Domaine } from '../types/domaineTypes';
import IconLegal from '../../icons/IconLegal.svg';
import IconSecurity from '../../icons/IconSecurity.svg';
import IconKey from '../../icons/IconKey.svg';

const servicesDomaines: Domaine[] = [
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
    id: 16,
    titre: "Assurance",
    icone: IconSecurity,
    adresse: "654 Avenue des Garanties",
    codePostal: "69001",
    ville: "Lyon",
    phone: "04 56 78 90 12",
    dateInscription: "2024-04-25"
  }
];

export default servicesDomaines;
