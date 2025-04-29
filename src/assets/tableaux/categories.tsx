
export interface Category {
  id: number;
  title: string;
  icon?: string;
}

const categories: Category[] = [
  { id: 1, title: 'Plomberie', icon: 'wrench' },
  { id: 2, title: 'Menuiserie', icon: 'hammer' },
  { id: 3, title: 'Électricité', icon: 'zap' },
  { id: 4, title: 'Peinture', icon: 'paintbrush' },
  // Ajoutez d'autres catégories au besoin
];

export default categories;
