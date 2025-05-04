
import LetterMetiersWithList from '../components/ArtisanMetiers/ListMetiers';
import FaqAccordion from '../components/FAQ/Faqs';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

function Metiers() {
  return (
    <div className="App">
      <Navbar />
      <div className="py-16">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8 text-center">Les métiers de nos artisans</h1>
          <LetterMetiersWithList />
        </div>
      </div>
      <div className="container my-3 my-md-5">
        <FaqAccordion />
      </div>
      <Footer />   
    </div>
  );
}

export default Metiers;
