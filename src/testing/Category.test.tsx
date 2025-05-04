
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Category from '../components/Artisant/Category';
import { Job } from '../assets/tableaux/jobs';

describe('Category Component', () => {
  const mockJob: Job = {
    id: 1,
    title: "Plombier",
    image: "/src/assets/images/plomberie.jpg",
    servicesList: ["Installation", "Réparation", "Débouchage", "Remplacement"]
  };
  
  it('renders category title', () => {
    render(
      <MemoryRouter>
        <Category job={mockJob} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Plombier')).toBeInTheDocument();
  });
  
  it('renders services list', () => {
    render(
      <MemoryRouter>
        <Category job={mockJob} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Installation, Réparation, Débouchage, Remplacement')).toBeInTheDocument();
  });
  
  it('renders link to professionals', () => {
    render(
      <MemoryRouter>
        <Category job={mockJob} />
      </MemoryRouter>
    );
    
    const link = screen.getByText('Voir les artisans');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/professionnels/1');
  });
});
