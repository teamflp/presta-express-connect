import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { Star, MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';

// Mock data for artisans by job
interface Artisan {
  id: number;
  name: string;
  job: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  phone: string;
  email: string;
  workingHours: string;
  experience: number;
}
const generateMockArtisans = (jobName: string): Artisan[] => {
  // This would be replaced by an API call in a real app
  return [{
    id: 1,
    name: `Jean Dupont`,
    job: jobName,
    location: 'Lyon, France',
    rating: 4.8,
    reviews: 127,
    image: "/src/assets/images/installation-electrique.jpg",
    description: `Artisan ${jobName} expérimenté avec plus de 15 ans d'expérience. Spécialisé dans tous types de travaux de ${jobName.toLowerCase()}.`,
    phone: '06 12 34 56 78',
    email: 'jean.dupont@example.com',
    workingHours: 'Lun-Ven: 8h-18h',
    experience: 15
  }, {
    id: 2,
    name: `Marie Martin`,
    job: jobName,
    location: 'Paris, France',
    rating: 4.9,
    reviews: 85,
    image: "/src/assets/images/plomberie.jpg",
    description: `Artisan ${jobName} qualifié proposant des services de qualité. Travaux soignés et garantis.`,
    phone: '06 98 76 54 32',
    email: 'marie.martin@example.com',
    workingHours: 'Lun-Sam: 9h-19h',
    experience: 8
  }, {
    id: 3,
    name: `Pierre Durand`,
    job: jobName,
    location: 'Marseille, France',
    rating: 4.7,
    reviews: 56,
    image: "/src/assets/images/peinture-interieure.jpg",
    description: `Artisan ${jobName} passionné par son métier. Service rapide et professionnel.`,
    phone: '06 45 67 89 01',
    email: 'pierre.durand@example.com',
    workingHours: 'Lun-Ven: 8h30-17h30',
    experience: 12
  }];
};
function MetierDetails() {
  const {
    jobName
  } = useParams<{
    jobName: string;
  }>();
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // In a real app, you would fetch artisans by job from an API
    if (jobName) {
      const formattedJobName = jobName.charAt(0).toUpperCase() + jobName.slice(1);
      // Simulate API call
      setTimeout(() => {
        const mockData = generateMockArtisans(formattedJobName);
        setArtisans(mockData);
        setLoading(false);
      }, 500);
    }
  }, [jobName]);

  // Capitalize job name for display
  const displayJobName = jobName ? jobName.charAt(0).toUpperCase() + jobName.slice(1) : '';
  return <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary via-[#b73840] to-[#a73238] text-white my-[70px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Artisans {displayJobName}
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Découvrez les meilleurs professionnels {displayJobName.toLowerCase()} près de chez vous
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm opacity-75">
              <span className="px-3 py-1 bg-white/10 rounded-full">Professionnels certifiés</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Devis gratuits</span>
              <span className="px-3 py-1 bg-white/10 rounded-full">Service de qualité</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div> : artisans.length > 0 ? <>
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {artisans.length} artisans {displayJobName.toLowerCase()} trouvés
                </h2>
                <div className="flex gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Trier par: Pertinence
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {artisans.map(artisan => <div key={artisan.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <img src={artisan.image} alt={`${artisan.name}, ${artisan.job}`} className="w-full h-48 object-cover" />
                      <div className="absolute top-3 right-3 bg-white rounded-full py-1 px-2 flex items-center shadow-sm">
                        <Star size={16} fill="#ffc107" stroke="#ffc107" className="mr-1" />
                        <span className="font-semibold text-sm">{artisan.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({artisan.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{artisan.name}</h3>
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <MapPin size={14} className="mr-1 text-gray-400" />
                        {artisan.location}
                      </p>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {artisan.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone size={14} className="mr-2 text-primary" />
                          {artisan.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail size={14} className="mr-2 text-primary" />
                          {artisan.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-2 text-primary" />
                          {artisan.workingHours}
                        </div>
                      </div>
                      
                      <div className="mt-5 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {artisan.experience} ans d'expérience
                        </span>
                        <a href={`/artisan/${artisan.id}`} className="flex items-center text-primary font-medium text-sm hover:underline">
                          Voir profil
                          <ChevronRight size={16} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>)}
              </div>
            </> : <div className="text-center py-20">
              <h2 className="text-2xl font-medium text-gray-700 mb-3">
                Aucun artisan trouvé
              </h2>
              <p className="text-gray-500 mb-6">
                Nous n'avons pas trouvé d'artisans {displayJobName.toLowerCase()} pour le moment.
              </p>
              <a href="/Metiers" className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-[#b73840] transition-colors">
                Revenir à la liste des métiers
              </a>
            </div>}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Vous êtes {displayJobName.toLowerCase()} ?</h2>
            <p className="text-gray-600 mb-6">
              Rejoignez notre plateforme pour développer votre clientèle et faire connaître vos services.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-[#b73840] transition-colors">
              S'inscrire en tant qu'artisan
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
}
export default MetierDetails;