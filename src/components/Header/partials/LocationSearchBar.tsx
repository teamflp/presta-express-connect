
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { MapPin, Compass, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function LocationSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('Rechercher par ville, adresse ou code postal');
  const [isGeolocating, setIsGeolocating] = useState(false);
  const navigate = useNavigate();

  // Fonction pour gérer la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?location=${encodeURIComponent(searchTerm)}`);
    } else {
      toast.error('Veuillez entrer une adresse ou activer la géolocalisation');
    }
  };

  // Fonction pour gérer la géolocalisation
  const handleGeolocation = () => {
    setIsGeolocating(true);
    setPlaceholder('Récupération de votre position...');
    
    if (!navigator.geolocation) {
      toast.error('La géolocalisation n\'est pas prise en charge par votre navigateur');
      setIsGeolocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        // Utilisation de l'API de géocodage inverse pour obtenir l'adresse à partir des coordonnées
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`)
          .then(response => response.json())
          .then(data => {
            // Formatage de l'adresse récupérée
            const city = data.address.city || data.address.town || data.address.village || '';
            const postcode = data.address.postcode || '';

            // Mise à jour du champ de recherche
            const locationStr = city ? `${city}${postcode ? ', ' + postcode : ''}` : 'Position actuelle';
            setSearchTerm(locationStr);

            // Message de succès
            toast.success('Position récupérée avec succès');
          })
          .catch(err => {
            console.error('Erreur lors de la géolocalisation inverse:', err);
            toast.error('Impossible de déterminer votre adresse');
            setSearchTerm('Position actuelle');
          })
          .finally(() => {
            setPlaceholder('Rechercher par ville, adresse ou code postal');
            setIsGeolocating(false);
          });
      },
      error => {
        console.error('Erreur de géolocalisation:', error);

        // Messages d'erreur personnalisés selon le type d'erreur
        let errorMessage = 'Erreur lors de la récupération de votre position';
        if (error.code === 1) {
          errorMessage = 'Accès à la localisation refusé. Veuillez autoriser l\'accès à votre position.';
        } else if (error.code === 2) {
          errorMessage = 'Position indisponible. Veuillez réessayer plus tard.';
        } else if (error.code === 3) {
          errorMessage = 'Délai d\'attente dépassé. Veuillez réessayer.';
        }

        toast.error(errorMessage);
        setIsGeolocating(false);
        setPlaceholder('Rechercher par ville, adresse ou code postal');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="location-search-container w-full max-w-3xl mx-auto">
      <Form onSubmit={handleSearch} className="w-full">
        <InputGroup className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
          <InputGroup.Text className="border-0 bg-white ps-4 pe-2">
            <MapPin size={22} className="text-primary" />
          </InputGroup.Text>
          
          <Form.Control 
            type="text" 
            placeholder={placeholder} 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="border-0 py-3 shadow-none text-lg"
            disabled={isGeolocating} 
          />
          
          <Button 
            variant="light" 
            onClick={handleGeolocation} 
            disabled={isGeolocating} 
            title="Utiliser ma position actuelle" 
            className="border-0 border-l border-r border-gray-100 px-4 bg-white hover:bg-gray-50 transition-all"
          >
            <Compass 
              size={20} 
              className={`${isGeolocating ? 'animate-spin text-primary' : 'text-gray-600'}`} 
            />
            <span className="ms-2 d-none d-sm-inline font-medium">Ma position</span>
          </Button>
          
          <Button 
            type="submit" 
            className="border-0 bg-gradient-to-r from-primary to-[#a13138] px-5 hover:from-[#b7363d] hover:to-[#8c2930] transition-all"
          >
            <Search size={20} className="me-2 d-none d-md-inline" />
            <span className="font-medium">Rechercher</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default LocationSearchBar;
