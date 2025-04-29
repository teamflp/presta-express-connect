
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-pattern">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-artisan-primary mb-6">
              Découvrez des artisans qualifiés près de chez vous
            </h1>
            <p className="text-lg md:text-xl text-artisan-secondary mb-8 max-w-lg">
              Connectez-vous avec des professionnels de l'artisanat pour tous vos projets. Qualité, proximité et savoir-faire garantis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-artisan-primary text-white hover:bg-artisan-primary/90">
                <Link to="/categories">Parcourir les services</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-artisan-primary text-artisan-primary hover:bg-artisan-primary hover:text-white">
                <Link to="/artisans">Voir les artisans</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-artisan-terracotta/10 rounded-full"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-artisan-primary/10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Artisan au travail"
                className="rounded-lg shadow-xl relative z-10 w-full h-auto object-cover max-h-[500px]" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
