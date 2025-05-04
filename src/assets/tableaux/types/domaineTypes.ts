
// Types for domaines data
export interface Domaine {
  id: number;
  titre: string;
  icone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  phone: string;
  dateInscription: string;
  lien?: string;
  description?: string;
}
