
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "1",
    name: "Alexandre Dubois",
    role: "Propriétaire de maison",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    content: "J'ai trouvé un excellent menuisier pour rénover ma cuisine. Le travail était impeccable et le prix très raisonnable. Je recommande vivement cette plateforme !",
    rating: 5
  },
  {
    id: "2",
    name: "Céline Moreau",
    role: "Propriétaire d'appartement",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
    content: "Grâce à Presta Express, j'ai pu entrer en contact avec un plombier qualifié rapidement. Communication facile et service de qualité.",
    rating: 4
  },
  {
    id: "3",
    name: "François Leroy",
    role: "Gérant de boutique",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    content: "Le peintre que j'ai engagé via cette plateforme a transformé ma boutique. Service professionnel du début à la fin. Je suis très satisfait.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-artisan-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-artisan-primary mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-artisan-secondary max-w-2xl mx-auto">
            Découvrez les expériences de nos clients qui ont trouvé l'artisan parfait pour leurs projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-artisan-primary">{testimonial.name}</p>
                    <p className="text-sm text-artisan-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                </div>
                <p className="italic text-artisan-secondary flex-grow">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
