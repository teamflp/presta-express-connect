
import NavBar from './partials/NavBar';
import IconsDomainesIntervention from './partials/IconsDomainesIntervention';
import HeroHeader from './partials/HeroHeader';

function Header() {
  return (
    <>
      <NavBar />
      <HeroHeader />
      <div className="container my-10">
        <h2 className="text-3xl font-bold text-center mb-4">Nos Domaines d'Intervention</h2>
        <p className="text-center mb-8 text-gray-600">
          Trouvez des professionnels qualifiés dans de nombreux secteurs d'activité pour tous vos besoins
        </p>
        <IconsDomainesIntervention />
      </div>
    </>
  );
}

export default Header;
