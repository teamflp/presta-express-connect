
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="text-artisan-primary text-2xl font-serif font-bold">
            Presta Express
          </Link>
        </div>
        
        <div className="hidden md:flex items-center flex-1 mx-8">
          <div className="relative w-full max-w-lg">
            <Input
              type="text"
              placeholder="Rechercher un artisan ou un service..."
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/categories" className="text-artisan-secondary hover:text-artisan-primary transition-colors duration-200">
            Catégories
          </Link>
          <Link to="/artisans" className="text-artisan-secondary hover:text-artisan-primary transition-colors duration-200">
            Artisans
          </Link>
          <Button variant="outline" className="border-artisan-primary text-artisan-primary hover:bg-artisan-primary hover:text-white">
            Se connecter
          </Button>
          <Button className="bg-artisan-primary text-white hover:bg-artisan-primary/90">
            S'inscrire
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
