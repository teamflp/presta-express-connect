
// Main domaines.tsx file that imports and combines all domain categories
import { Domaine } from './types/domaineTypes';
import artisanatDomaines from './domaines/artisanat';
import automobileDomaines from './domaines/automobile';
import constructionDomaines from './domaines/construction';
import santeDomaines from './domaines/sante';
import servicesDomaines from './domaines/services';

// Re-export the Domain type
export type { Domaine };

// Combine all domain categories
const domaines: Domaine[] = [
  ...artisanatDomaines,
  ...automobileDomaines,
  ...constructionDomaines,
  ...santeDomaines,
  ...servicesDomaines
];

// Export both the default and named export to maintain compatibility
export { domaines };
export default domaines;
