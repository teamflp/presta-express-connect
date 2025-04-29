import React from 'react';
import { useState } from 'react';
import { CSSProperties } from 'react';
import { Card, Button } from 'react-bootstrap';
import Background from '../../assets/images/lyonImage.jpg';
import { TfiWrite } from 'react-icons/tfi';
import { MdOutlineChat } from 'react-icons/md';

const Newsletter = () => {
  // Déclaration de l'état 'clicked' avec une valeur initiale de false
  const [clicked, setClicked] = useState(false);

  // Fonction de gestion du clic qui inverse la valeur de 'clicked'
  const handleClick = () => {
    setClicked(!clicked);
  };

  // Style pour le fond rouge
  const backgroundStyle: CSSProperties = {
    backgroundColor: 'rgba(198, 62, 71, 0.838)', // Fond noir avec opacité de 50%
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0px 0px 20px 0px',
  };

  // Newsletter
  const textStyle: React.CSSProperties = {
    fontWeight: 'bold',
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
    >
      <div className="row">
        <div className="col" style={{ width: '' }}>
          <Card.Body className="py-5">
            <Card.Text className="">
              <small className="text-muted" style={textStyle}>
                Newsletter
              </small>
            </Card.Text>
            <hr className="redLineContainer" />
            <Card.Title>Lorem ipsum dolor sit amet</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit
              amet
            </Card.Text>
            <Button
              className={`mt-3 button2 btn-primary d-flex justify-content-between align-items-center ${clicked ? 'clicked' : ''}`}
              onClick={handleClick}
            >
              <span className="me-3">Inscription</span>
              <TfiWrite
                className="ml-2"
                style={{ fontSize: '15px', verticalAlign: 'middle' }}
              />
            </Button>
          </Card.Body>
        </div>
        <div
          className="col d-flex align-items-stretch"
          style={{ height: '100%' }}
        >
          <div
            className=""
            style={{
              width: '100%',
              height: '100%',
              background: `url(${Background}) no-repeat center center`,
              borderRadius: '0px 0px 20px 0px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={backgroundStyle}
            >
              <MdOutlineChat style={{ color: 'white', fontSize: '10em' }} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Newsletter;
