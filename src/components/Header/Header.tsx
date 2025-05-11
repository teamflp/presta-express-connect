
import NavBar from './partials/NavBar';
import IconsDomainesIntervention from './partials/IconsDomainesIntervention';
import HeroHeader from './partials/HeroHeader';

function Header() {
  return (
    <header className="bg-background">
      <NavBar />
      <HeroHeader />
      <IconsDomainesIntervention />
    </header>
  );
}

export default Header;
