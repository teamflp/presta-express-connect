
import React from 'react';
import { useState } from 'react';
import { CSSProperties } from 'react';
import { Card, Button } from 'react-bootstrap';
import Background from '../../assets/images/lyonImage.jpg';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState('');

  const handleClick = () => {
    if (email) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
        setEmail('');
      }, 2000);
    }
  };

  // Style pour le fond rouge
  const backgroundStyle: CSSProperties = {
    backgroundColor: 'rgba(198, 62, 71, 0.838)',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0px 0px 20px 0px',
  };

  return (
    <Card
      style={{
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '20px 0px 20px 20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      className="hover-card"
    >
      <div className="row">
        <div className="col" style={{ width: '' }}>
          <Card.Body className="py-4 px-4">
            <Card.Text className="">
              <small className="text-muted fw-medium">
                Restez informés
              </small>
            </Card.Text>
            <hr className="redLineContainer" />
            <Card.Title className="mb-3 fw-bold">Notre newsletter mensuelle</Card.Title>
            <Card.Text className="mb-4">
              Inscrivez-vous pour recevoir nos actualités, conseils d'experts et offres exclusives pour vos projets d'artisanat et de rénovation.
            </Card.Text>
            
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control custom-form-control" 
                placeholder="Votre adresse email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button
              className={`button-primary d-flex justify-content-between align-items-center ${clicked ? 'clicked' : ''}`}
              onClick={handleClick}
              disabled={clicked}
            >
              <span className="me-2">{clicked ? 'Merci !' : 'S\'inscrire'}</span>
              <Mail size={18} />
            </Button>
          </Card.Body>
        </div>
        <div
          className="col d-flex align-items-stretch"
          style={{ height: '100%' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `url(${Background}) no-repeat center center`,
              backgroundSize: 'cover',
              borderRadius: '0px 0px 20px 0px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={backgroundStyle}
            >
              <Mail style={{ color: 'white', fontSize: '5em' }} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Newsletter;
