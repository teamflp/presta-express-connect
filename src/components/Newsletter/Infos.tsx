
import Card from 'react-bootstrap/Card';
import Background from '../../assets/images/lyon.jpg';
import { AlertTriangle } from 'lucide-react';

function Infos() {
  const backgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px 0px 20px 20px',
  };

  return (
    <Card
      className="text-bg-dark d-flex justify-content-center border-0 shadow"
      style={{
        background: `url(${Background}) no-repeat center center / cover`,
        width: '100%',
        height: '100%',
        borderRadius: '20px 0px 20px 20px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div style={backgroundStyle}>
        <div className="text-center p-4">
          <AlertTriangle size={48} style={{ color: '#C63E46' }} />
          <Card.Title className="titre mt-3">
            <h2 className="fw-bold">
              <span>Besoin d'urgence ?</span>
            </h2>
          </Card.Title>
          <Card.Text className="my-3">
            <h5 className="fw-normal">Contactez nos artisans disponibles 24/7 pour toutes vos urgences</h5>
          </Card.Text>
        </div>
      </div>
    </Card>
  );
}
export default Infos;
