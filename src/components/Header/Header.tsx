
import { useState, useEffect } from 'react';
import NavBar from './partials/NavBar';
import IconsDomainesIntervention from './partials/IconsDomainesIntervention';
import ImageHeader from './partials/ImageHeader';

function Header() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .positionNav {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
      `}} />
      <div className="App">
        <div className="positionNav">
          <NavBar />
        </div>
        <ImageHeader />
        <IconsDomainesIntervention />
      </div>
    </>
  );
};

export default Header;