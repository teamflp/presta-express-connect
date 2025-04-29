
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
      <div className="App">
        <NavBar />
        <ImageHeader />
        <IconsDomainesIntervention />
      </div>
    </>
  );
};

export default Header;
