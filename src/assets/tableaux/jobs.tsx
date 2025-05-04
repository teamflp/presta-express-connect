// Types
export interface Job {
  id: number;
  title: string;
  image: string;
  servicesList: string[];
}

// Job data
const jobs: Job[] = [
  {
    id: 1,
    title: "Plombier",
    image: "/src/assets/images/plomberie.jpg",
    servicesList: ["Installation", "Réparation", "Débouchage", "Remplacement"]
  },
  {
    id: 2,
    title: "Électricien",
    image: "/src/assets/images/installation-electrique.jpg",
    servicesList: ["Installation", "Dépannage", "Rénovation", "Mise aux normes"]
  },
  {
    id: 3,
    title: "Menuisier",
    image: "/src/assets/images/menuiserie.jpg",
    servicesList: ["Fabrication sur mesure", "Pose de cuisine", "Rénovation"]
  },
  {
    id: 4,
    title: "Peintre",
    image: "/src/assets/images/peinture-interieure.jpg",
    servicesList: ["Intérieur", "Extérieur", "Décoration", "Rénovation"]
  },
  {
    id: 5,
    title: "Maçon",
    image: "/src/assets/images/maconnerie.jpg",
    servicesList: ["Construction", "Rénovation", "Aménagement extérieur"]
  },
  {
    id: 6,
    title: "Jardinier",
    image: "/src/assets/images/jardinage.jpg",
    servicesList: ["Entretien jardin", "Aménagement paysager", "Élagage"]
  }
];

// Export both the default and named exports for compatibility
export { jobs };
export default jobs;
