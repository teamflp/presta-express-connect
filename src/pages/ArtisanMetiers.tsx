
import { Briefcase, Search, UsersRound, HelpCircle } from 'lucide-react';
import LetterMetiersWithList from '../components/ArtisanMetiers/ListMetiers';
import FaqAccordion from '../components/FAQ/Faqs';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import ArtisanByLetter from '../components/SectionProf/ArtisanByLetter';

function Metiers() {
  return (
    <div className="App bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero section */}
      <section className="bg-gradient-to-br from-[#C63E46] to-[#b73840] text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Les métiers de nos artisans</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Explorez notre annuaire complet des métiers de l'artisanat et trouvez les professionnels qualifiés pour vos projets.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center max-w-xl mx-auto">
              <Search className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher un métier, ex: plombier, électricien..." 
                className="flex-1 outline-none text-gray-700"
              />
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-[#b73840] transition-colors">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">250+</h3>
              <p className="text-gray-600">Métiers artisanaux</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersRound className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-gray-600">Artisans inscrits</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">24/7</h3>
              <p className="text-gray-600">Support client</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-8">
        <div className="container mx-auto">
          <LetterMetiersWithList />
        </div>
      </section>
      
      {/* Secondary content */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Trouvez par professionnel</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              En plus de rechercher par métier, vous pouvez également parcourir les professionnels selon leur nom de famille.
            </p>
          </div>
          <ArtisanByLetter />
        </div>
      </section>
      
      {/* FAQ section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Questions fréquentes</h2>
            <p className="text-lg text-gray-600 text-center">
              Tout ce que vous devez savoir sur nos artisans et leurs métiers
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-gradient-to-br from-[#C63E46] to-[#b73840] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous êtes un artisan ?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté et profitez d'une visibilité accrue pour développer votre activité
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Inscrivez-vous gratuitement
          </button>
        </div>
      </section>
      
      <Footer />   
    </div>
  );
}

export default Metiers;
