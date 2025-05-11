
import NavBar from './partials/NavBar';
import IconsDomainesIntervention from './partials/IconsDomainesIntervention';
import HeroHeader from './partials/HeroHeader';
import LocationSearchBar from './partials/LocationSearchBar';

function Header() {
  return (
    <header className="bg-background">
      <NavBar />
      <HeroHeader />
      <div className="container mx-auto mb-4">
        <LocationSearchBar />
      </div>
      <IconsDomainesIntervention />
    </header>
  );
}

export default Header;
