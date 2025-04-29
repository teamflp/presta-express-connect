import React from 'react';
import Header from '../components/Header/Header';
import Cities from '../components/City/Cities';
import CardArguments from '../components/Arguments/Arguments';
import LoremsPresta from '../components/Lorem/Lorems';
import ArtisanByLetter from '../components/SectionProf/ArtisanByLetter';
import CategoriesArtisans from '../components/Artisant/CategoriesArtisans';
import RegistrationArtisan from '../components/SectionProf/RegistrationArtisan';


function Home() {
  return (
    <div className="App">
      <Header />
      <div className="my-8">
        <CardArguments />
      </div>
      <div className="container my-15 container-carousel">
        <CategoriesArtisans />
      </div>
      <div className="container px-0 my-15">
        <div className="row my-5 d-flex justify-content-between">
          <div className="col-12 col-md-5">
            <ArtisanByLetter />
          </div>
          <div className="col-12 col-md-7">
            <RegistrationArtisan />
          </div>
        </div>
      </div>
      <div className="my-15">
        <LoremsPresta />
      </div>
      <div className="my-15">
        <Cities />
      </div>
    </div>
  );
}

export default Home;