import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Category from '../components/Artisant/Category';

describe('Category component', () => {
  const mockJob = {
    id: 1,
    title: 'Plombier',
    servicesList: ['Réparation', 'Installation', 'Entretien'],
    icon: 'icon-plumber',
    description: 'Services de plomberie',
    image: '/path/to/image.jpg',
  };

  it('renders the category component correctly', () => {
    const { getByText } = render(
        <BrowserRouter>
          <Category job={mockJob} />
        </BrowserRouter>
    );

    // Ces assertions sont correctes et devraient maintenant passer
    expect(getByText('Plombier')).toBeInTheDocument();
    expect(getByText('Réparation, Installation, Entretien')).toBeInTheDocument();
    expect(getByText('Voir les artisans')).toBeInTheDocument();
  });
});