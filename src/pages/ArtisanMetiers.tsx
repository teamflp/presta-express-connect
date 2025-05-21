import { Briefcase, Search, UsersRound, HelpCircle, ChevronRight } from 'lucide-react';
import LetterMetiersWithList from '../components/ArtisanMetiers/ListMetiers';
import FaqAccordion from '../components/FAQ/Faqs';
import Navbar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import ArtisanByLetter from '../components/SectionProf/ArtisanByLetter';
import { useState } from 'react';
function Metiers() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémentation de la recherche - cette partie serait connectée à une API réelle
    console.log(`Recherche pour: ${searchTerm}`);
  };
  return <div className="App bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero section avec gradient amélioré */}
      <section className="bg-gradient-to-br from-primary via-[#b73840] to-[#a73238] text-white py-16 md:py-24 px-4 mx-0 my-[70px]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">Les métiers de nos artisans</h1>
            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Explorez notre annuaire complet des métiers de l'artisanat et trouvez les professionnels qualifiés pour vos projets.
            </p>
            
            <form onSubmit={handleSearch} className="bg-white p-2 rounded-lg shadow-lg flex items-center max-w-xl mx-auto">
              <Search className="text-gray-400 ml-3 mr-2" size={20} />
              <input type="text" placeholder="Rechercher un métier, ex: plombier, électricien..." className="flex-1 outline-none text-gray-700 py-3 px-2" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <button type="submit" className="bg-primary text-white px-6 py-3 rounded hover:bg-[#b73840] transition-colors flex items-center">
                Rechercher
                <ChevronRight size={18} className="ml-1" />
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Statistics section avec animation */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md text-center transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <Briefcase className="text-primary" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">250+</h3>
              <p className="text-gray-600">Métiers artisanaux</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md text-center transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <UsersRound className="text-primary" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">10,000+</h3>
              <p className="text-gray-600">Artisans inscrits</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md text-center transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <HelpCircle className="text-primary" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">24/7</h3>
              <p className="text-gray-600">Support client</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Trouvez par métier</h2>
            <p className="text-lg text-gray-600">
              Parcourez notre liste complète de métiers de l'artisanat classés par ordre alphabétique.
            </p>
          </div>
          <LetterMetiersWithList />
        </div>
      </section>
      
      {/* Secondary content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Trouvez par nom de famille</h2>
            <p className="text-lg text-gray-600 mb-8">
              En plus de rechercher par métier, vous pouvez également parcourir les professionnels selon leur nom de famille.
            </p>
          </div>
          <ArtisanByLetter />
        </div>
      </section>
      
      {/* FAQ section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Questions fréquentes</h2>
            <p className="text-lg text-gray-600 mb-8">
              Tout ce que vous devez savoir sur nos artisans et leurs métiers
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-[#b73840] to-[#a73238] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Vous êtes un artisan ?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Rejoignez notre communauté et profitez d'une visibilité accrue pour développer votre activité
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors transform hover:-translate-y-1 hover:shadow-lg">
            Inscrivez-vous gratuitement
          </button>
        </div>
      </section>
      
      <Footer />   
    </div>;
}
export default Metiers;