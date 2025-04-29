import React from 'react';
import { useState } from 'react';
import  Card from 'react-bootstrap/Card';
import  Button from 'react-bootstrap/Button';
import IconRegister from '../../assets/icons/IconRegister.svg';
import Background from '../../assets/images/Tour_eiffel.jpg';

function RegistrationArtisan() {

    const [clicked, setClicked] = useState(false); // État local pour gérer l'état de clic du bouton

    // Fonction appelée lorsqu'on clique sur le bouton
    const handleClick = () => {
        setClicked(!clicked); // Inverse l'état de 'clicked'
    };

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
        <Card className="text-bg-dark d-flex justify-content-center border-0 " style={{ background: `url(${Background}) no-repeat center center`, width: '100%', height: '100%', borderRadius: '20px 0px 20px 20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div className="p-3 p-md-5" style={backgroundStyle}>
                <div className="text-center">
                    <Card.Title className="titre"><h2><span>Professionnels</span>, renforcez votre proximité avec vos <span>Clients</span> !</h2> </Card.Title>
                    <Card.Text className='my-3'>
                        <h4>Gérez gratuitement toutes vos informations, vos avis, vos publications et bien plus encore via notre plateforme.</h4>
                    </Card.Text>
                    <div>
                        <Button className={`button2 ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
                            <small>Profitez de notre solution</small>
                            <img className="fit-picture" src={IconRegister} alt="Icône" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
export default RegistrationArtisan;
