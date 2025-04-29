
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
};

const categories: Category[] = [
  { id: "1", name: "Menuiserie", icon: "🪚", count: 42 },
  { id: "2", name: "Plomberie", icon: "🔧", count: 35 },
  { id: "3", name: "Électricité", icon: "⚡", count: 28 },
  { id: "4", name: "Peinture", icon: "🖌️", count: 53 },
  { id: "5", name: "Maçonnerie", icon: "🧱", count: 31 },
  { id: "6", name: "Jardinage", icon: "🌱", count: 47 },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-artisan-sand/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-artisan-primary mb-4">
            Parcourez nos catégories de services
          </h2>
          <p className="text-artisan-secondary max-w-2xl mx-auto">
            Des professionnels qualifiés dans de nombreux domaines sont prêts à vous aider pour tous vos projets, qu'ils soient petits ou grands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id}>
              <Card className="hover:shadow-md transition-shadow duration-300 border border-artisan-sand h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <span className="text-4xl mb-3" aria-hidden="true">
                    {category.icon}
                  </span>
                  <h3 className="font-medium text-artisan-primary mb-1">{category.name}</h3>
                  <p className="text-sm text-artisan-secondary">{category.count} artisans</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/categories" className="text-artisan-primary font-medium hover:underline">
            Voir toutes les catégories →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
