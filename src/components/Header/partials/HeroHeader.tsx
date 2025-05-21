import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Background from '../../../assets/images/lyon.jpg';
import { ExternalLink } from 'lucide-react';
import LocationSearchBar from './LocationSearchBar';
function HeroHeader() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return <div className="relative h-[80vh] w-full overflow-hidden">
            {/* Background image with overlay */}
    <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${Background})`
    }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

        {/* Content container */}
    <div className="relative h-full flex flex-col items-center justify-center px-4">
            {/* Search bar */}
            <div className="w-full max-w-3xl mb-8">
                <LocationSearchBar />
            </div>

            {/* Hero text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
                Trouvez le professionnel idéal pour vos projets
            </h1>

            <p className="text-white text-xl mb-8 text-center">
                Des milliers d'artisans qualifiés à votre service partout en France
            </p>

            {/* CTA Button */}
            <Button onClick={handleClick} style={{
                backgroundColor: '#C63E46',
                borderColor: '#fff',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: '500',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }} onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#b73840';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
              }} onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#C63E46';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }} className="">
                <div className="me-2 flex items-center justify-center py-2">
                    <ExternalLink size={16} />  Déposer une annonce
                </div>

            </Button>
        </div>
    </div>;
}
export default HeroHeader;