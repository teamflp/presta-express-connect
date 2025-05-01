
/* eslint-env jest */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Category from '../components/Artisant/Category';
import { Job } from '../../src/assets/tableaux/jobs';

test('renders Category component', () => {
  const props = {
    title: 'Example Title',
    jobs: [
      { id: 1, name: 'Job1', image: 'image1.jpg' },
      { id: 2, name: 'Job2', image: 'image2.jpg' }
    ] as Job[]
  };

  // On crée le composant sous forme d'objet en mémoire
  // Rendu du composant Category dans un environnement de test
  render(<Category {...props}/>);

  // Vérification que l'élément trouvé est bien présent dans le document
  // Nous utilisons getByText manuellement sans dépendre de screen
  const { getByText } = render(<Category {...props}/>);
  const linkElement = getByText(/Example Title/i);  
  expect(linkElement).toBeInTheDocument();
});

// Ce test unitaire vérifie que le composant Category se rend correctement et qu'il contient un élément avec le texte "Example Title". Si cet élément est trouvé dans le DOM rendu, le test passe ; sinon, il échoue.
