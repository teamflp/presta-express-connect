
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-artisan-sand/30 py-16">
        <div className="text-center max-w-md px-4">
          <h1 className="text-5xl font-serif font-bold text-artisan-primary mb-6">404</h1>
          <p className="text-xl text-artisan-secondary mb-8">
            Oups ! La page que vous recherchez semble introuvable.
          </p>
          <Button asChild className="bg-artisan-primary text-white hover:bg-artisan-primary/90">
            <a href="/">Retour à l'accueil</a>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
