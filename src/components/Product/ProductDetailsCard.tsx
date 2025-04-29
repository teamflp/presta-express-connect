import React from 'react';
import { Product } from '../../assets/tableaux/productData'; // Assurez-vous que le chemin est correct

interface ProductProps {
  product: Product; // Utilisez Product comme type pour le produit
}

const ProductDetailsCard: React.FC<ProductProps> = ({ product }) => {
  // Créez un tableau des images à afficher pour éviter la répétition du code
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ];

  return (
    <div className="container my-5 py-5">
      <div className="spacer"></div>
      <h5>Architectes d’intérieur</h5>
      <div className="row">
        <div className="col-sm-8">
          <div className="row mb-3">
            <div className="col">
              <div
                className="card mb-3 border-0"
                style={{
                  width: '100%',
                  borderRadius: '25px 1px 25px 25px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="card-body text-start">
                  <h6 className="card-text">Afficher le ou les métier(s)</h6>
                  <h6 className="card-text">{product.name}</h6>
                  <h6 className="card-subtitle mb-2">
                    Téléphone: {product.phone}
                  </h6>
                  <h6 className="card-subtitle mb-2">
                    Adresse: {product.address}
                  </h6>
                  <p className="card-text">{product.descriptif}</p>
                  <div className="d-flex gap-3">
                    <a href="#" className="card-link">
                      Avis
                    </a>
                    <a href="#" className="card-link">
                      Faire une suggestion
                    </a>
                    <a href="#" className="card-link">
                      Laisser un message
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            {images.map((image, index) => (
              <div className="col-sm" key={index}>
                <img
                  src={image}
                  alt={`Produit ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    marginBottom: '10px',
                    borderRadius: '20px 1px 20px 20px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-sm-4 d-none d-md-block" style={{ height: '400px' }}>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(product.location)}&output=embed`}
            frameBorder="0"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            style={{
              border: 0,
              width: '100%',
              height: '100%',
              borderRadius: '20px 1px 20px 20px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
