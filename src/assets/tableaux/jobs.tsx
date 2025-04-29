
export interface Job {
  id: number;
  name: string;
  image: string;
  icon?: string;
  description: string;
}

// Importation des images de métiers
import plomberie from '../../assets/images/plomberie.jpg';
import tuyauterie from '../../assets/images/tuyauterie.jpg';
import canalisation from '../../assets/images/canalisation.jpg';
import chauffeEau from '../../assets/images/chauffe-eau.jpg';
import reparationFuite from '../../assets/images/reparation-fuite.jpg';
import sanitaires from '../../assets/images/sanitaires.jpg';
import chauffage from '../../assets/images/chauffage.jpg';
import detectionFuite from '../../assets/images/detection-fuite.jpg';

import charpenterie from '../../assets/images/charpenterie.jpg';
import ebenisterie from '../../assets/images/ebenisterie.jpg';
import menuiserieInterieure from '../../assets/images/menuiserie-interieure.jpg';
import menuiserieExterieure from '../../assets/images/menuiserie-exterieure.jpg';
import fabricationMeubles from '../../assets/images/fabrication-meubles.jpg';
import poseParquet from '../../assets/images/pose-parquet.jpg';
import portesFenetres from '../../assets/images/portes-fenetres.jpg';
import restaurationMeubles from '../../assets/images/restauration-meubles.jpg';

import installationElectrique from '../../assets/images/installation-electrique.jpg';
import maintenance from '../../assets/images/maintenance-electrique.jpg';
import reparationCircuit from '../../assets/images/reparation-circuit.jpg';
import eclairageInterieur from '../../assets/images/eclairage-interieur.jpg';
import eclairageExterieur from '../../assets/images/eclairage-exterieur.jpg';
import cablageReseau from '../../assets/images/cablage-reseau.jpg';
import conformiteElectrique from '../../assets/images/conformite-electrique.jpg';
import domotique from '../../assets/images/domotique.jpg';

import peintureInterieure from '../../assets/images/peinture-interieure.jpg';
import peintureExterieure from '../../assets/images/peinture-exterieure.jpg';
import renovationFacade from '../../assets/images/renovation-facade.jpg';
import decorationMurale from '../../assets/images/decoration-murale.jpg';
import enduitPlatrerie from '../../assets/images/enduit-platrerie.jpg';
import revetementsSol from '../../assets/images/revetements-sol.jpg';
import peintureBoiseries from '../../assets/images/peinture-boiseries.jpg';
import peintureArtistique from '../../assets/images/peinture-artistique.jpg';

// Image de secours en cas d'erreur
import lyonImage from '../../assets/images/lyonImage.jpg';

const jobs: { [key: number]: Job[] } = {
  1: [
    { 
      id: 1, 
      name: 'Plomberie générale', 
      image: plomberie, 
      icon: 'wrench', 
      description: 'Installation et réparation de systèmes de plomberie pour résidences et commerces. Expertise dans tous types de travaux hydrauliques.' 
    },
    { 
      id: 2, 
      name: 'Tuyauterie industrielle', 
      image: tuyauterie, 
      icon: 'pipe', 
      description: 'Installation et maintenance de réseaux complexes pour l\'industrie. Solutions sur mesure pour tous secteurs industriels.' 
    },
    { 
      id: 3, 
      name: 'Débouchage de canalisations', 
      image: canalisation, 
      icon: 'droplet', 
      description: 'Intervention rapide pour déboucher et entretenir vos canalisations et égouts. Équipements professionnels de pointe.' 
    },
    { 
      id: 4, 
      name: 'Installation de chauffe-eau', 
      image: chauffeEau, 
      icon: 'thermometer', 
      description: 'Installation, remplacement et entretien de systèmes de chauffe-eau traditionnels ou à économie d\'énergie.' 
    },
    { 
      id: 5, 
      name: 'Réparation de fuites', 
      image: reparationFuite, 
      icon: 'droplet', 
      description: 'Détection et réparation rapide de fuites d\'eau visibles ou cachées. Intervention d\'urgence 24h/24.' 
    },
    { 
      id: 6, 
      name: 'Installation sanitaires', 
      image: sanitaires, 
      icon: 'bath', 
      description: 'Pose et rénovation d\'équipements sanitaires: vasques, douches, baignoires, WC. Design moderne ou classique.' 
    },
    { 
      id: 7, 
      name: 'Systèmes de chauffage', 
      image: chauffage, 
      icon: 'flame', 
      description: 'Installation et entretien de tous systèmes de chauffage: radiateurs, plancher chauffant, chaudières, pompes à chaleur.' 
    },
    { 
      id: 8, 
      name: 'Détection de fuites spécialisée', 
      image: detectionFuite, 
      icon: 'search', 
      description: 'Détection non invasive par caméra thermique et acoustique. Localisation précise sans dégâts supplémentaires.' 
    },
  ],
  2: [
    { 
      id: 9, 
      name: 'Charpenterie traditionnelle', 
      image: charpenterie, 
      icon: 'axe', 
      description: 'Construction et rénovation de charpentes en bois selon techniques anciennes et modernes. Structures durables et esthétiques.' 
    },
    { 
      id: 10, 
      name: 'Ébénisterie fine', 
      image: ebenisterie, 
      icon: 'gem', 
      description: 'Création de meubles et objets en bois précieux. Savoir-faire artisanal haut de gamme et finitions exceptionnelles.' 
    },
    { 
      id: 11, 
      name: 'Menuiserie intérieure', 
      image: menuiserieInterieure, 
      icon: 'door', 
      description: 'Conception et installation d\'aménagements intérieurs: portes, escaliers, placards, boiseries et moulures sur mesure.' 
    },
    { 
      id: 12, 
      name: 'Menuiserie extérieure', 
      image: menuiserieExterieure, 
      icon: 'home', 
      description: 'Réalisation de terrasses, pergolas, abris de jardin et autres structures d\'extérieur en bois traité et matériaux composites.' 
    },
    { 
      id: 13, 
      name: 'Fabrication de meubles sur mesure', 
      image: fabricationMeubles, 
      icon: 'sofa', 
      description: 'Création de mobilier personnalisé adapté à vos espaces et besoins spécifiques. Design contemporain ou traditionnel.' 
    },
    { 
      id: 14, 
      name: 'Pose de parquet et revêtements', 
      image: poseParquet, 
      icon: 'grid', 
      description: 'Installation professionnelle de parquets massifs, contrecollés, stratifiés et autres revêtements en bois. Finition impeccable.' 
    },
    { 
      id: 15, 
      name: 'Portes et fenêtres sur mesure', 
      image: portesFenetres, 
      icon: 'square', 
      description: 'Fabrication, installation et réparation de portes et fenêtres en bois, alliant esthétique traditionnelle et performance thermique.' 
    },
    { 
      id: 16, 
      name: 'Restauration de meubles anciens', 
      image: restaurationMeubles, 
      icon: 'refresh-cw', 
      description: 'Rénovation experte de mobilier d\'époque et d\'antiquités avec respect des techniques d\'origine et patines authentiques.' 
    },
  ],
  3: [
    { 
      id: 17, 
      name: 'Installation électrique complète', 
      image: installationElectrique, 
      icon: 'plug', 
      description: 'Réalisation d\'installations électriques résidentielles et commerciales aux normes. Solutions économiques et sécurisées.' 
    },
    { 
      id: 18, 
      name: 'Maintenance préventive', 
      image: maintenance, 
      icon: 'tool', 
      description: 'Services réguliers d\'entretien et de contrôle pour prévenir les pannes et assurer la longévité de vos installations.' 
    },
    { 
      id: 19, 
      name: 'Diagnostic et réparation de circuits', 
      image: reparationCircuit, 
      icon: 'cpu', 
      description: 'Analyse experte des dysfonctionnements électriques et réparations rapides. Intervention d\'urgence disponible.' 
    },
    { 
      id: 20, 
      name: 'Solutions d\'éclairage intérieur', 
      image: eclairageInterieur, 
      icon: 'lightbulb', 
      description: 'Conception et installation d\'éclairage personnalisé: ambiant, fonctionnel ou décoratif. Options LED basse consommation.' 
    },
    { 
      id: 21, 
      name: 'Éclairage paysager et sécurité', 
      image: eclairageExterieur, 
      icon: 'sun', 
      description: 'Mise en valeur de votre extérieur et renforcement de la sécurité par des systèmes d\'éclairage adaptés et économes.' 
    },
    { 
      id: 22, 
      name: 'Réseaux informatiques et télécoms', 
      image: cablageReseau, 
      icon: 'wifi', 
      description: 'Installation de câblage structuré pour internet, téléphonie et multimédia. Optimisation de couverture réseau dans tous vos espaces.' 
    },
    { 
      id: 23, 
      name: 'Mise aux normes électriques', 
      image: conformiteElectrique, 
      icon: 'shield', 
      description: 'Audit et mise en conformité de vos installations avec les dernières normes de sécurité en vigueur. Certification officielle.' 
    },
    { 
      id: 24, 
      name: 'Domotique et maison intelligente', 
      image: domotique, 
      icon: 'smartphone', 
      description: 'Intégration de systèmes domotiques pour contrôler éclairage, chauffage, volets et sécurité depuis votre smartphone.' 
    },
  ],
  4: [
    { 
      id: 25, 
      name: 'Peinture intérieure décorative', 
      image: peintureInterieure, 
      icon: 'palette', 
      description: 'Décoration murale de qualité avec large choix de finitions: mate, satinée, brillante. Conseils personnalisés sur les coloris.' 
    },
    { 
      id: 26, 
      name: 'Peinture extérieure durable', 
      image: peintureExterieure, 
      icon: 'home', 
      description: 'Application de revêtements extérieurs résistants aux intempéries et aux UV. Protection longue durée pour vos façades.' 
    },
    { 
      id: 27, 
      name: 'Ravalement et rénovation de façades', 
      image: renovationFacade, 
      icon: 'building', 
      description: 'Restauration complète de façades: nettoyage, traitement, réparation et application de nouveaux revêtements protecteurs.' 
    },
    { 
      id: 28, 
      name: 'Décorations murales artistiques', 
      image: decorationMurale, 
      icon: 'framer', 
      description: 'Création de fresques, trompe-l\'œil et autres techniques décoratives pour personnaliser vos espaces avec originalité.' 
    },
    { 
      id: 29, 
      name: 'Enduits décoratifs et plâtrerie', 
      image: enduitPlatrerie, 
      icon: 'layers', 
      description: 'Application d\'enduits traditionnels ou modernes: chaux, terre, stuc. Réalisation de moulures et ornements en plâtre.' 
    },
    { 
      id: 30, 
      name: 'Pose de revêtements sols', 
      image: revetementsSol, 
      icon: 'grid', 
      description: 'Installation professionnelle de tous types de sols: carrelage, parquet, moquette, vinyle, résine. Préparation soignée des supports.' 
    },
    { 
      id: 31, 
      name: 'Traitement et peinture des boiseries', 
      image: peintureBoiseries, 
      icon: 'brush', 
      description: 'Préparation minutieuse et finition experte pour portes, fenêtres, plinthes et mobilier en bois. Protection et embellissement.' 
    },
    { 
      id: 32, 
      name: 'Décoration artistique personnalisée', 
      image: peintureArtistique, 
      icon: 'feather', 
      description: 'Services de peintures décoratives haut de gamme: patines, dorures, effets métallisés et texturés sur tous supports.' 
    },
  ],
  // Ajoutez d'autres catégories avec leurs métiers associés au besoin
};

export default jobs;
