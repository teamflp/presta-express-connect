/* eslint-env jest */
import React from 'react';
// Importation des fonctions nécessaires de la bibliothèque de test React Testing Library
import { render, screen } from '@testing-library/react';
// Importation du composant Category à tester
import Category from '../components/Artisant/Category';
import { Job } from '../../src/assets/tableaux/jobs';


const { expect, describe, it } = require('@jest/globals');
// Définition d'un test unitaire pour le composant Category
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

  // screen simule un écran pour rechercher l'elément passé en props
  // Recherche d'un élément dans le DOM rendu qui contient le texte "Example Title"
  const linkElement = screen.getByText(/Example Title/i);
  const linkElement2 = screen.getAllByText(/category[1-9]+/i);

  // Vérification que l'élément trouvé est bien présent dans le document
  expect(linkElement).toBeInTheDocument();
});

// Ce test unitaire vérifie que le composant Category se rend correctement et qu'il contient un élément avec le texte "Example Title". Si cet élément est trouvé dans le DOM rendu, le test passe ; sinon, il échoue.