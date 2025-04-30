
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import LoremsData from '../../assets/tableaux/lorems';
import { Link } from 'react-router-dom';

const Lorems: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold title1">Conseils et actualités</h2>
        <p className="fs-5">Découvrez nos derniers articles pour vos projets de rénovation</p>
      </div>
      
      <Row className="g-4">
        {LoremsData.map((item) => (
          <Col md={6} lg={3} key={item.id}>
            <Card className="h-100 border-0 shadow-sm hover-card" style={{ borderRadius: '20px 0px 20px 20px' }}>
              <div className="d-flex justify-content-center mb-3 pt-4">
                <div className="rounded-circle p-3" style={{ backgroundColor: '#f8f9fa', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
                  <img src={item.icone} alt={item.titre} style={{ width: '40px', height: '40px' }} />
                </div>
              </div>
              <Card.Body className="text-center px-4">
                <Card.Title className="mb-3 fw-bold">{item.titre}</Card.Title>
                <Card.Text className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                  {item.description}
                </Card.Text>
                <Link 
                  to={item.lien} 
                  className="btn px-4 py-2"
                  style={{
                    backgroundColor: '#C63E46',
                    color: 'white',
                    borderRadius: '20px 0px 20px 20px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#b73840';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#C63E46';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Lire l'article
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Lorems;
