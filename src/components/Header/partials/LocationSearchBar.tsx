import React, { useState } from 'react';
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
      setPlaceholder('Rechercher par ville, adresse ou code postal'); // Rétablir le placeholder initial
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`).then(response => response.json()).then(data => {
        const city = data.address.city || data.address.town || data.address.village || '';
        const postcode = data.address.postcode || '';
        const locationStr = city ? `${city}${postcode ? ', ' + postcode : ''}` : 'Position actuelle';
        setSearchTerm(locationStr);
        toast.success('Position récupérée avec succès');
      }).catch(err => {
        console.error('Erreur lors de la géolocalisation inverse:', err);
        toast.error('Impossible de déterminer votre adresse');
        setSearchTerm('Position actuelle'); // Peut-être laisser vide ou indiquer une erreur
      }).finally(() => {
        setPlaceholder('Rechercher par ville, adresse ou code postal');
        setIsGeolocating(false);
      });
    }, error => {
      console.error('Erreur de géolocalisation:', error);
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
  return <div className="location-search-container my-3"> {/* my-3 pour l'espacement vertical */}
        <Form onSubmit={handleSearch} className="location-search-form">
          <InputGroup className="location-search-bar shadow-sm rounded-pill py-0">
            <InputGroup.Text className="border-1 ps-3 pe-1">
              <MapPin size={20} className="text-muted" />
            </InputGroup.Text>
            <Form.Control type="text" placeholder={placeholder} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
        // shadow-none pour enlever l'ombre au focus
        disabled={isGeolocating} aria-label="Rechercher par ville, adresse ou code postal" className="search-input border-0 shadow-none py-lg-4 py-0" />
            <Button variant="light" onClick={handleGeolocation} disabled={isGeolocating}
        // d-flex et align-items-center pour l'alignement vertical
        title="Utiliser ma position actuelle" className="geolocation-button px-2 py-l border-2 d-flex align-items-center bg-slate-300 hover:bg-slate-200 rounded-none py-[16px]">
              <Compass size={18} className={isGeolocating ? 'animate-spin text-primary' : 'text-secondary'} />
              <span className="geolocation-text ms-1 d-none d-md-inline">Ma position</span>
            </Button>
            <Button type="submit" variant="primary"
        // react-bootstrap s'occupe des coins arrondis du dernier élément
        disabled={isGeolocating} className="search-submit-button py-lg-3 py-0">
              <Search size={18} className="me-1 d-none d-sm-inline" />
              Rechercher
            </Button>
          </InputGroup>
        </Form>
      </div>;
}
export default LocationSearchBar;