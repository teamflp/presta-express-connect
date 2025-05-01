
import LetterMetiersWithList from '../components/ArtisanMetiers/ListMetiers';
import FaqAccordion from '../components/FAQ/Faqs';
import Navbar from '../../src/components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';

function Metiers() {
  return (
    <div className="App">
      <Navbar />
      <LetterMetiersWithList /> 
      <div className="container my-3 my-md-5">
        <FaqAccordion />
      </div>
      <Footer />   
    </div>
  );
}

export default Metiers;
