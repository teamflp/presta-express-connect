
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Background from '../../../assets/images/lyon.jpg';
import SearchButton from './SearchButton';
import { ExternalLink } from 'lucide-react';

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
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0px 0px 25px 25px',
    };

    return (
        <div className="d-flex justify-content-center image-header" style={{ height: '70vh' }}>
            <Card className="card-bg-image" style={{ background: `url(${Background}) no-repeat center center / cover`, height: '100%', borderRadius: '0px 0px 25px 25px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' }}>
                <div className="card-imageHeader" style={backgroundStyle}>
                    <div className="text-center px-3">
                        <h1 className="card-title text-white mb-4 fw-bold">Trouvez le professionnel idéal pour vos projets</h1>
                        <p className="text-white mb-5 fs-5">Des milliers d'artisans qualifiés à votre service partout en France</p>
                        <div className="d-flex justify-content-center">
                            {!isLargeScreen && <SearchButton />}
                        </div>
                        <Button 
                            className={`mt-3 button-primary ${clicked ? 'clicked' : ''}`} 
                            onClick={handleClick}
                            style={{
                                backgroundColor: '#C63E46',
                                borderColor: '#C63E46',
                                padding: '10px 20px',
                                borderRadius: '20px 0 20px 20px',
                                fontWeight: '500',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#b73840';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#C63E46';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <span className="me-2">Déposer une annonce</span>
                            <ExternalLink size={16} />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ImageHeader;
