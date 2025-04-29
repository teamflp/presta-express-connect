
import { useState, useEffect } from 'react';
import NavBar from './partials/NavBar';
import IconsDomainesIntervention from './partials/IconsDomainesIntervention';
import ImageHeader from './partials/ImageHeader';

function Header() {
  return (
    <>
      <div className="header-spacing"></div>
      <NavBar />
      <ImageHeader />
      <div className="container my-5">
        <IconsDomainesIntervention />
      </div>
    </>
  );
}

export default Header;
