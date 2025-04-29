
import { ArtisanCard } from "@/components/ArtisanCard";

// Sample data for featured artisans
const featuredArtisans = [
  {
    id: "1",
    name: "Jean Dupont",
    rating: 4.9,
    reviewCount: 124,
    specialties: ["Menuiserie", "Ébénisterie", "Rénovation"],
    location: "Lyon, Rhône",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    featured: true
  },
  {
    id: "2",
    name: "Marie Laurent",
    rating: 4.7,
    reviewCount: 89,
    specialties: ["Électricité", "Domotique", "Installation"],
    location: "Bordeaux, Gironde",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    featured: true
  },
  {
    id: "3",
    name: "Thomas Petit",
    rating: 4.8,
    reviewCount: 102,
    specialties: ["Plomberie", "Chauffage", "Sanitaire"],
    location: "Nantes, Loire-Atlantique",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    featured: false
  },
  {
    id: "4",
    name: "Sophie Martin",
    rating: 4.6,
    reviewCount: 73,
    specialties: ["Peinture", "Décoration", "Revêtement"],
    location: "Marseille, Bouches-du-Rhône",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    featured: false
  },
];

const FeaturedArtisans = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-artisan-primary mb-4">
            Artisans à l'honneur
          </h2>
          <p className="text-artisan-secondary max-w-2xl mx-auto">
            Découvrez nos artisans les mieux notés, reconnus pour la qualité de leur travail et leur professionnalisme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} {...artisan} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/artisans" className="text-artisan-primary font-medium hover:underline">
            Voir tous les artisans →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisans;
