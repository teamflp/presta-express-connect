// import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Background from '../../assets/images/lyon.jpg';
import { CgDanger } from 'react-icons/cg';

function Infos() {
  // const [clicked, setClicked] = useState(false); // État local pour gérer l'état de clic du bouton

  // Fonction appelée lorsqu'on clique sur le bouton
  // const handleClick = () => {
  //     setClicked(!clicked); // Inverse l'état de 'clicked'
  // };

  // Style pour le fond du titre
  const backgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond noir avec opacité de 50%
    height: '100%', // Hauteur de 100%
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px 0px 20px 20px',
  };

  return (
    <Card
      className="text-bg-dark d-flex justify-content-center border-0 "
      style={{
        background: `url(${Background}) no-repeat center center`,
        width: '100%',
        height: '100%',
        borderRadius: '20px 0px 20px 20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="" style={backgroundStyle}>
        <div className="text-center">
          <CgDanger style={{ color: '#C63E46', fontSize: '4em' }} />
          <Card.Title className="titre">
            <h2>
              <span>Dolor sit amet, consectetur</span>
            </h2>{' '}
          </Card.Title>
          <Card.Text className="my-3">
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
          </Card.Text>
        </div>
      </div>
    </Card>
  );
}
export default Infos;
