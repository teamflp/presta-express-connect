
import React from 'react';
import { Product as ArtisanType } from '../../assets/tableaux/productData';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface ArtisanProps {
  artisan: ArtisanType;
}

const Artisan: React.FC<ArtisanProps> = ({ artisan }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ProductDetails', { state: { product: artisan } });
  };

  return (
    <div className="card shadow-sm mb-4 hover-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="position-relative">
        <img 
          src={artisan.image} 
          alt={artisan.name} 
          className="card-img-top" 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 m-2 bg-white rounded-pill px-2 py-1 d-flex align-items-center shadow-sm">
          <Star size={16} fill="#ffc107" stroke="#ffc107" className="me-1" />
          <span className="fw-bold">4.8</span>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{artisan.name}</h5>
        <p className="card-text text-muted mb-2">
          <small>{artisan.location}</small>
        </p>
        <p className="card-text text-truncate">{artisan.descriptif}</p>
        <div className="d-flex mt-3">
          <button 
            className="btn flex-grow-1 me-2" 
            style={{ backgroundColor: '#C63E46', color: 'white' }}
          >
            Contacter
          </button>
          <button 
            className="btn btn-outline-secondary flex-grow-1"
          >
            Détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artisan;
