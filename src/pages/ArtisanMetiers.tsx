import React from 'react';
import LetterMetiersWithList from '../components/ArtisanMetiers/ListMetiers';
import FaqAccordion from '../components/FAQ/Faqs';
import Navbar from '../../src/components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';


function Metiers() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .positionNav {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-top: 30px;
          }
        `,
        }}
      />
    <div className="App">
      <div className="positionNav">
          <Navbar />
        </div>
      <LetterMetiersWithList /> 
      <div className="container my-3 my-md-5">
        <FaqAccordion />
      </div>
      <Footer />   
    </div>
    </>
  );
}

export default Metiers;