
export interface Job {
  id: number;
  name: string;
  image: string;
  icon?: string;
  description: string;
}

// Importation des images
import lyonImage from '../../assets/images/lyonImage.jpg';

const jobs: { [key: number]: Job[] } = {
  1: [
    { id: 1, name: 'Plomberie générale', image: lyonImage, icon: 'wrench', description: 'Installation et réparation de systèmes de plomberie résidentiels et commerciaux' },
    { id: 2, name: 'Tuyauterie industrielle', image: lyonImage, icon: 'tool', description: 'Pose et maintenance de réseaux de tuyauterie pour l\'industrie' },
    { id: 3, name: 'Canalisation', image: lyonImage, icon: 'pipe', description: 'Entretien et débouchage de canalisations et égouts' },
    { id: 4, name: 'Chauffe-eau', image: lyonImage, icon: 'thermometer', description: 'Installation et réparation de chauffe-eau et systèmes de chauffage' },
    { id: 5, name: 'Réparation de fuites', image: lyonImage, icon: 'droplet', description: 'Détection et réparation de fuites d\'eau dans les bâtiments' },
    { id: 6, name: 'Sanitaires', image: lyonImage, icon: 'bath', description: 'Installation et rénovation de salles de bain et toilettes' },
    { id: 7, name: 'Entretien chauffage', image: lyonImage, icon: 'flame', description: 'Maintenance et réparation de systèmes de chauffage' },
    { id: 8, name: 'Détection de fuites', image: lyonImage, icon: 'search', description: 'Services spécialisés de détection de fuites non visibles' },
  ],
  2: [
    { id: 9, name: 'Charpenterie', image: lyonImage, icon: 'axe', description: 'Construction et réparation de charpentes en bois' },
    { id: 10, name: 'Ébénisterie', image: lyonImage, icon: 'gem', description: 'Création de meubles et objets en bois de qualité' },
    { id: 11, name: 'Menuiserie intérieure', image: lyonImage, icon: 'door', description: 'Fabrication et installation de portes, fenêtres et escaliers intérieurs' },
    { id: 12, name: 'Menuiserie extérieure', image: lyonImage, icon: 'home', description: 'Réalisation de structures extérieures en bois: terrasses, pergolas' },
    { id: 13, name: 'Fabrication meubles', image: lyonImage, icon: 'sofa', description: 'Création sur mesure de mobilier adapté à vos besoins' },
    { id: 14, name: 'Pose de parquet', image: lyonImage, icon: 'grid', description: 'Installation professionnelle de parquets et revêtements de sol en bois' },
    { id: 15, name: 'Portes/Fenêtres', image: lyonImage, icon: 'square', description: 'Fabrication, installation et réparation de portes et fenêtres' },
    { id: 16, name: 'Restauration meubles', image: lyonImage, icon: 'refresh-cw', description: 'Rénovation et restauration de meubles anciens' },
  ],
  3: [
    { id: 17, name: 'Installation électrique', image: lyonImage, icon: 'plug', description: 'Mise en place de systèmes électriques aux normes' },
    { id: 18, name: 'Maintenance', image: lyonImage, icon: 'tool', description: 'Entretien régulier et préventif des installations électriques' },
    { id: 19, name: 'Réparation de circuits', image: lyonImage, icon: 'cpu', description: 'Diagnostic et réparation de pannes électriques' },
    { id: 20, name: 'Éclairage intérieur', image: lyonImage, icon: 'lightbulb', description: 'Conception et installation d\'éclairage pour l\'intérieur' },
    { id: 21, name: 'Éclairage extérieur', image: lyonImage, icon: 'sun', description: 'Solutions d\'éclairage pour jardins et façades' },
    { id: 22, name: 'Câblage réseau', image: lyonImage, icon: 'wifi', description: 'Installation de réseaux informatiques et téléphoniques' },
    { id: 23, name: 'Conformité électrique', image: lyonImage, icon: 'shield', description: 'Mise aux normes des installations électriques' },
    { id: 24, name: 'Systèmes domotiques', image: lyonImage, icon: 'smartphone', description: 'Installation de solutions domotiques pour maison intelligente' },
  ],
  4: [
    { id: 25, name: 'Peinture intérieure', image: lyonImage, icon: 'palette', description: 'Application de peinture décorative pour intérieurs' },
    { id: 26, name: 'Peinture extérieure', image: lyonImage, icon: 'home', description: 'Traitement et protection des façades et extérieurs' },
    { id: 27, name: 'Rénovation de façade', image: lyonImage, icon: 'building', description: 'Ravalement et rénovation complète de façades' },
    { id: 28, name: 'Décoration murale', image: lyonImage, icon: 'framer', description: 'Création de décorations murales artistiques' },
    { id: 29, name: 'Enduit et plâtrerie', image: lyonImage, icon: 'layers', description: 'Application d\'enduits décoratifs et travaux de plâtrerie' },
    { id: 30, name: 'Revêtements de sol', image: lyonImage, icon: 'grid', description: 'Pose de tous types de revêtements de sol' },
    { id: 31, name: 'Peinture sur boiseries', image: lyonImage, icon: 'brush', description: 'Traitement et peinture spécialisée pour surfaces en bois' },
    { id: 32, name: 'Peinture artistique', image: lyonImage, icon: 'feather', description: 'Fresques et décorations peintes personnalisées' },
  ],
  // Ajoutez d'autres catégories avec leurs métiers associés au besoin
};

export default jobs;
