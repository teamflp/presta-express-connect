
// Interface DomaineProps définissant les types des propriétés passées au composant Domaine
interface DomaineProps {
  icone: string;
  titre: string; 
}

// Définition du composant Domaine qui prend en paramètre les propriétés définies dans DomaineProps
function Domaine({ icone, titre }: DomaineProps) {
  return (
    <div className="domaine-card"> {/* Conteneur principal avec la classe CSS 'domaine-card' */}
      <img src={`./assets/${icone}`} alt={`Image de ${titre}`} className="domaine-image" /> {/* Image avec chemin dynamique basé sur 'icone' et texte alternatif basé sur 'titre' */}
      <a>{titre}</a> {/* Titre affiché comme lien */}
    </div>
  );
}

export default Domaine; // Exportation du composant Domaine comme composant par défaut


