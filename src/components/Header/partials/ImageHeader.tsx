
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Background from '../../../assets/images/lyon.jpg';
import IconAdd from '../../../assets/icons/IconAdd.svg';
import SearchButton from './SearchButton';
import { BsBoxArrowUpRight } from 'react-icons/bs'; 

function ImageHeader() {
    const [clicked, setClicked] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

    const handleClick = () => {
        setClicked(!clicked);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 992);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const backgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0px 0px 25px 25px',
    };

    return (
        <div className="d-flex justify-content-center image-header" style={{ height: '70vh' }}>
            <Card className="card-bg-image" style={{ background: `url(${Background}) no-repeat center center / cover`, height: '100%', borderRadius: '0px 0px 25px 25px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-imageHeader" style={backgroundStyle}>
                    <div className="text-center">
                        <h1 className="card-title text-white mb-5">Trouvez le professionnel idéal pour vos projets</h1>
                        <p className="text-white mb-5">Des milliers d'artisans qualifiés prêts à vous aider dans toute la France</p>
                        <div className="d-flex justify-content-center">
                            {!isLargeScreen && <SearchButton />}
                        </div>
                        <Button className={`mt-3 button2 btn-primary ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
                            <span className="me-3">Déposer une annonce</span>
                            <BsBoxArrowUpRight className="ml-2" style={{ fontSize: '15px', verticalAlign: 'middle' }} />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ImageHeader;
