
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone } from "lucide-react";

type ArtisanProps = {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  location: string;
  image: string;
  featured?: boolean;
};

export const ArtisanCard = ({
  id,
  name,
  rating,
  reviewCount,
  specialties,
  location,
  image,
  featured = false,
}: ArtisanProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'border-artisan-terracotta border-2' : 'border-border'}`}>
      {featured && (
        <div className="bg-artisan-terracotta text-white text-xs font-bold py-1 px-3 absolute right-0 top-3 z-10 rounded-l-md">
          Artisan vérifié
        </div>
      )}
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-serif font-bold text-lg text-artisan-primary mb-2">{name}</h3>
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{rating}</span>
            <span className="text-artisan-secondary text-sm ml-1">({reviewCount} avis)</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {specialties.slice(0, 3).map((specialty, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-artisan-sand text-artisan-wood hover:bg-artisan-sand/80"
            >
              {specialty}
            </Badge>
          ))}
          {specialties.length > 3 && (
            <Badge variant="outline" className="text-xs text-artisan-secondary">
              +{specialties.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-center text-artisan-secondary text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-1/2 border-artisan-primary text-artisan-primary hover:bg-artisan-primary hover:text-white"
        >
          <Phone className="h-3 w-3 mr-1" />
          Contacter
        </Button>
        <Button 
          size="sm" 
          className="w-1/2 bg-artisan-primary text-white hover:bg-artisan-primary/90"
          asChild
        >
          <a href={`/artisans/${id}`}>Voir le profil</a>
        </Button>
      </CardFooter>
    </Card>
  );
};
