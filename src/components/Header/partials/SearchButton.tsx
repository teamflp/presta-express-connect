
import { Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchButton() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate('/search');
    }, 300);
  };

  return (  
    <Button 
      className={`btn d-flex justify-content-between align-items-center ${clicked ? 'clicked' : ''}`} 
      onClick={handleClick} 
      style={{ 
        backgroundColor: 'white', 
        borderColor: '#e0e0e0',
        color: '#555',
        borderRadius: '50px',
        padding: '0.5rem 1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'}
      onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'}
    >
      Rechercher
      <FaSearch style={{ color: '#C63E46', marginLeft: '8px' }} />
    </Button>
  );
}

export default SearchButton;
