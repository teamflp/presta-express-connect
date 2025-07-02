import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppWithoutRouter from './AppWithoutRouter';

test('renders test products component on /testProducts route', () => {
    render(
        <MemoryRouter initialEntries={['/testProducts']}>
            <AppWithoutRouter />
        </MemoryRouter>
    );

    // Ce texte est bien affiché dans le composant <TestProducts />
    expect(screen.getByRole('heading', { name: /Test Products/i })).toBeInTheDocument();
});
