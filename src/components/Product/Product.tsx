
import React from 'react';
import { Product as ProductType } from '../../assets/tableaux/productData';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ProductDetails', { state: { product } });
  };

  return (
    <div className="card shadow-sm mb-4 hover-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="position-relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="card-img-top" 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 m-2 bg-white rounded-pill px-2 py-1 d-flex align-items-center shadow-sm">
          <Star size={16} fill="#ffc107" stroke="#ffc107" className="me-1" />
          <span className="fw-bold">4.8</span>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted mb-2">
          <small>{product.location}</small>
        </p>
        <p className="card-text text-truncate">{product.descriptif}</p>
        <button 
          className="btn w-100" 
          style={{ backgroundColor: '#C63E46', color: 'white' }}
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default Product;
