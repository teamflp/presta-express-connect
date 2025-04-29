
export interface Category {
  id: number;
  title: string;
  icon?: string;
  description: string;
}

const categories: Category[] = [
  { 
    id: 1, 
    title: 'Plomberie', 
    icon: 'wrench', 
    description: 'Experts en installation et réparation de systèmes de plomberie pour votre maison ou entreprise'
  },
  { 
    id: 2, 
    title: 'Menuiserie', 
    icon: 'hammer', 
    description: 'Artisans spécialisés dans la création et la restauration de mobilier et structures en bois'
  },
  { 
    id: 3, 
    title: 'Électricité', 
    icon: 'zap', 
    description: 'Professionnels qualifiés pour tous vos besoins en installations et réparations électriques'
  },
  { 
    id: 4, 
    title: 'Peinture', 
    icon: 'paint-bucket', 
    description: 'Peintres expérimentés pour transformer et embellir vos espaces intérieurs et extérieurs'
  },
  // Ajoutez d'autres catégories au besoin
];

export default categories;
