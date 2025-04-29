
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Clipboard, Check, ArrowRight } from 'lucide-react';

const RegistrationArtisan = () => {
  return (
    <Card className="shadow border-0" style={{ borderRadius: '25px 1px 25px 25px', overflow: 'hidden' }}>
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Vous êtes un professionnel ?</h2>
          <p className="text-muted">Rejoignez notre réseau d'artisans qualifiés</p>
        </div>
        
        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <div className="me-3">
              <div className="rounded-circle bg-light-gray p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Check size={20} style={{ color: '#C63E46' }} />
              </div>
            </div>
            <div>
              <p className="mb-0 fw-medium">Inscription gratuite et rapide</p>
            </div>
          </div>
          
          <div className="d-flex align-items-center mb-3">
            <div className="me-3">
              <div className="rounded-circle bg-light-gray p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Clipboard size={20} style={{ color: '#C63E46' }} />
              </div>
            </div>
            <div>
              <p className="mb-0 fw-medium">Recevez des demandes de devis qualifiées</p>
            </div>
          </div>
          
          <div className="d-flex align-items-center mb-4">
            <div className="me-3">
              <div className="rounded-circle bg-light-gray p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <ArrowRight size={20} style={{ color: '#C63E46' }} />
              </div>
            </div>
            <div>
              <p className="mb-0 fw-medium">Développez votre activité localement</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            variant="primary" 
            className="button-primary px-4 py-2"
            style={{
              borderRadius: '20px 0 20px 20px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            S'inscrire comme artisan
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RegistrationArtisan;
