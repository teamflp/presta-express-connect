
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-artisan-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Prêt à trouver le bon artisan pour votre projet ?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Rejoignez notre communauté et connectez-vous avec des professionnels qualifiés dans votre région.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-artisan-primary hover:bg-gray-100"
              asChild
            >
              <Link to="/artisans">Trouver un artisan</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/register">S'inscrire comme artisan</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
