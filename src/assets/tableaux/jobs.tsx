export interface Job {
  id: number;
  name: string;
  image: string; // Ajoutez cette ligne
}

// Importation des images
import lyonImage from '../../assets/images/lyonImage.jpg';

const jobs: { [key: number]: Job[] } = {
  1: [
    { id: 1, name: 'Plomberie', image: lyonImage },
    { id: 2, name: 'Tuyauterie', image: lyonImage },
    { id: 3, name: 'Canalisation', image: lyonImage },
    { id: 4, name: 'Chauffe-eau', image: lyonImage },
    { id: 5, name: 'Réparation de fuites', image: lyonImage },
    { id: 6, name: 'Sanitaires', image: lyonImage },
    { id: 7, name: 'Entretien chauffage', image: lyonImage },
    { id: 8, name: 'Détection de fuites', image: lyonImage },
  ],
  2: [
    { id: 9, name: 'Charpenterie', image: lyonImage },
    { id: 10, name: 'Ébénisterie', image: lyonImage },
    { id: 11, name: 'Menuiserie intérieure', image: lyonImage },
    { id: 12, name: 'Menuiserie extérieure', image: lyonImage },
    { id: 13, name: 'Fabrication meubles', image: lyonImage },
    { id: 14, name: 'Pose de parquet', image: lyonImage },
    { id: 15, name: 'Portes/Fenêtres', image: lyonImage },
    { id: 16, name: 'Restauration meubles', image: lyonImage },
  ],
  3: [
    { id: 17, name: 'Installation électrique', image: lyonImage },
    { id: 18, name: 'Maintenance', image: lyonImage },
    { id: 19, name: 'Réparation de circuits', image: lyonImage },
    { id: 20, name: 'Éclairage intérieur', image: lyonImage },
    { id: 21, name: 'Éclairage extérieur', image: lyonImage },
    { id: 22, name: 'Câblage réseau', image: lyonImage },
    { id: 23, name: 'Conformité électrique', image: lyonImage },
    { id: 24, name: 'Systèmes domotiques', image: lyonImage },
  ],
  4: [
    { id: 25, name: 'Peinture intérieure', image: lyonImage },
    { id: 26, name: 'Peinture extérieure', image: lyonImage },
    { id: 27, name: 'Rénovation de façade', image: lyonImage },
    { id: 28, name: 'Décoration murale', image: lyonImage },
    { id: 29, name: 'Enduit et plâtrerie', image: lyonImage },
    { id: 30, name: 'Revêtements de sol', image: lyonImage },
    { id: 31, name: 'Peinture sur boiseries', image: lyonImage },
    { id: 32, name: 'Peinture artistique', image: lyonImage },
  ],
  // Ajoutez d'autres catégories avec leurs métiers associés au besoin
};

export default jobs;
