
import { Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function SearchButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (  
    <Button className={`btn button1 btn-secondary d-flex justify-content-between align-items-center ${clicked ? 'clicked' : ''}`} 
            onClick={handleClick} style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', color: '#757575' }}>Rechercher
            <FaSearch style={{ color: '#757575' }} /> {/* Icône de recherche blanche */}
    </Button>
  );
}

export default SearchButton;






