
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users, Calendar } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10 text-artisan-primary" />,
    title: "Recherchez",
    description: "Trouvez l'artisan idéal en fonction de vos besoins spécifiques et de votre localisation."
  },
  {
    icon: <Calendar className="h-10 w-10 text-artisan-primary" />,
    title: "Contactez",
    description: "Discutez directement avec l'artisan pour expliquer votre projet et obtenir un devis personnalisé."
  },
  {
    icon: <Users className="h-10 w-10 text-artisan-primary" />,
    title: "Collaborez",
    description: "Travaillez ensemble pour réaliser votre projet avec un suivi de qualité et des résultats garantis."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-artisan-primary mb-4">
            Comment ça marche
          </h2>
          <p className="text-artisan-secondary max-w-2xl mx-auto">
            Presta Express vous permet de trouver facilement des artisans qualifiés pour tous vos projets en seulement quelques étapes simples.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-center gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-artisan-sand/20 border-none w-full md:w-1/3">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className="mb-6 bg-white p-4 rounded-full shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-artisan-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-artisan-secondary">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
