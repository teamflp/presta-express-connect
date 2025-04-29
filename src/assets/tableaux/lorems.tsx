
import IconSecurity from '../icons/IconSecurity.svg';
import IconKey from '../icons/IconKey.svg';
import IconLegal from '../icons/IconLegal.svg';
import IconCare from '../icons/IconCare.svg';

const LoremsData = [
  {
    id: 1,
    titre: 'Comment choisir le bon artisan ?',
    description:
      'Découvrez nos conseils pour trouver le professionnel idéal pour vos travaux : vérification des qualifications, devis comparatifs et retours clients.',
    icone: IconSecurity,
    lien: '/conseils/choisir-artisan',
  },
  {
    id: 2,
    titre: 'Rénovation énergétique',
    description:
      'Les aides financières disponibles en 2024 pour améliorer la performance énergétique de votre logement et réduire vos factures.',
    icone: IconKey,
    lien: '/conseils/renovation-energetique',
  },
  {
    id: 3,
    titre: 'Droits et obligations',
    description:
      'Quelles sont vos obligations et vos droits lors de la signature d\'un contrat avec un artisan ? Nos experts juridiques vous répondent.',
    icone: IconLegal,
    lien: '/conseils/droits-obligations',
  },
  {
    id: 4,
    titre: 'Entretien maison',
    description:
      'Le calendrier des entretiens essentiels pour maintenir votre maison en parfait état toute l\'année : chaudière, toiture, jardin...',
    icone: IconCare,
    lien: '/conseils/entretien-maison',
  },
];

export default LoremsData;
