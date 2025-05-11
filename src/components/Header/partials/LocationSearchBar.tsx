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
    navigator.geolocation.getCurrentPosition(position => {
      // Utilisation de l'API de géocodage inverse pour obtenir l'adresse à partir des coordonnées
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`).then(response => response.json()).then(data => {
        // Formatage de l'adresse récupérée
        const city = data.address.city || data.address.town || data.address.village || '';
        const postcode = data.address.postcode || '';

        // Mise à jour du champ de recherche
        const locationStr = city ? `${city}${postcode ? ', ' + postcode : ''}` : 'Position actuelle';
        setSearchTerm(locationStr);

        // Message de succès
        toast.success('Position récupérée avec succès');
      }).catch(err => {
        console.error('Erreur lors de la géolocalisation inverse:', err);
        toast.error('Impossible de déterminer votre adresse');
        setSearchTerm('Position actuelle');
      }).finally(() => {
        setPlaceholder('Rechercher par ville, adresse ou code postal');
        setIsGeolocating(false);
      });
    }, error => {
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
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  };
  return <div className="location-search-container">
      <Form onSubmit={handleSearch} className="location-search-form">
        <InputGroup className="search-input-group">
          <InputGroup.Text className="search-icon-wrapper">
            <MapPin size={20} className="text-primary" />
          </InputGroup.Text>
          <Form.Control type="text" placeholder={placeholder} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" disabled={isGeolocating} />
          <Button variant="light" onClick={handleGeolocation} disabled={isGeolocating} title="Utiliser ma position actuelle" className="geolocation-button py-[17px]">
            <Compass size={18} className={isGeolocating ? 'animate-spin' : ''} />
            <span className="geolocation-text">Ma position</span>
          </Button>
          <Button type="submit" variant="primary" className="search-submit-button py-[17px]">
            <Search size={18} className="me-1 d-none d-sm-inline" />
            Rechercher
          </Button>
        </InputGroup>
      </Form>
    </div>;
}
export default LocationSearchBar;