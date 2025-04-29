
import React, { useState } from 'react';
import { Product } from '../../assets/tableaux/productData';
import Review from '../Review/Review';
import { MessageSquare, Star, FileText } from 'lucide-react';

interface ProductProps {
  product: Product;
}

const ProductDetailsCard: React.FC<ProductProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'message'>('details');
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  // Créez un tableau des images à afficher pour éviter la répétition du code
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ];

  const handleTabChange = (tab: 'details' | 'reviews' | 'message') => {
    setActiveTab(tab);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMessageForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du message
    setTimeout(() => {
      setMessageSent(true);
      setMessageForm({
        name: '',
        email: '',
        message: ''
      });
    }, 1000);
  };

  // Sample reviews data
  const reviews = [
    {
      author: "Marie Dupont",
      date: "10/04/2025",
      rating: 5,
      comment: "Excellent travail, très professionnel et à l'écoute. Je recommande vivement!",
      helpful: 8
    },
    {
      author: "Jean Martin",
      date: "02/04/2025",
      rating: 4,
      comment: "Bonne prestation dans l'ensemble, ponctuel et efficace.",
      helpful: 3
    },
    {
      author: "Sophie Lefebvre",
      date: "25/03/2025",
      rating: 5,
      comment: "Service impeccable, travail de qualité et tarif raisonnable.",
      helpful: 5
    }
  ];

  return (
    <div className="container my-5 py-5">
      <div className="spacer"></div>
      <h5>Architectes d'intérieur</h5>
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
                  
                  {/* Navigation tabs */}
                  <div className="d-flex gap-3 mb-3 mt-4 border-bottom">
                    <a 
                      href="#" 
                      className={`card-link pb-2 ${activeTab === 'details' ? 'active fw-bold border-bottom border-3 border-primary' : ''}`}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleTabChange('details'); 
                      }}
                    >
                      <FileText size={16} className="me-1" />
                      Détails
                    </a>
                    <a 
                      href="#" 
                      className={`card-link pb-2 ${activeTab === 'reviews' ? 'active fw-bold border-bottom border-3 border-primary' : ''}`}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleTabChange('reviews'); 
                      }}
                    >
                      <Star size={16} className="me-1" />
                      Avis
                    </a>
                    <a 
                      href="#" 
                      className={`card-link pb-2 ${activeTab === 'message' ? 'active fw-bold border-bottom border-3 border-primary' : ''}`}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleTabChange('message'); 
                      }}
                    >
                      <MessageSquare size={16} className="me-1" />
                      Message
                    </a>
                  </div>
                  
                  {/* Tab content */}
                  <div className="tab-content mt-4">
                    {activeTab === 'details' && (
                      <div>
                        <p className="card-text">{product.descriptif}</p>
                        <div className="row mt-4">
                          <div className="col-sm-6">
                            <h6 className="mb-3">Horaires d'ouverture</h6>
                            <ul className="list-unstyled">
                              <li className="mb-1">Lundi - Vendredi: 8h - 18h</li>
                              <li className="mb-1">Samedi: 9h - 12h</li>
                              <li>Dimanche: Fermé</li>
                            </ul>
                          </div>
                          <div className="col-sm-6">
                            <h6 className="mb-3">Services proposés</h6>
                            <ul className="list-unstyled">
                              <li className="mb-1">Consultation</li>
                              <li className="mb-1">Devis gratuit</li>
                              <li>Intervention d'urgence</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'reviews' && (
                      <div>
                        <div className="d-flex justify-content-between mb-4">
                          <h6>Avis clients</h6>
                          <button className="btn btn-sm" style={{ backgroundColor: '#C63E46', color: 'white' }}>
                            Laisser un avis
                          </button>
                        </div>
                        {reviews.map((review, index) => (
                          <Review key={index} {...review} />
                        ))}
                      </div>
                    )}
                    
                    {activeTab === 'message' && (
                      <div>
                        {messageSent ? (
                          <div className="alert alert-success">
                            <h6 className="mb-2">Message envoyé !</h6>
                            <p className="mb-0">Merci pour votre message. {product.name} vous répondra dans les plus brefs délais.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleMessageSubmit}>
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">Nom</label>
                              <input 
                                type="text" 
                                className="form-control" 
                                id="name"
                                name="name"
                                value={messageForm.name}
                                onChange={handleMessageChange}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email</label>
                              <input 
                                type="email" 
                                className="form-control" 
                                id="email"
                                name="email"
                                value={messageForm.email}
                                onChange={handleMessageChange}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="message" className="form-label">Message</label>
                              <textarea 
                                className="form-control" 
                                id="message"
                                name="message"
                                rows={4}
                                value={messageForm.message}
                                onChange={handleMessageChange}
                                required
                              ></textarea>
                            </div>
                            <button 
                              type="submit" 
                              className="btn" 
                              style={{ backgroundColor: '#C63E46', color: 'white' }}
                            >
                              Envoyer
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
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
