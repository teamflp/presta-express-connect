import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppWithoutRouter from './AppWithoutRouter';

test('renders test products component on /testProducts route', () => {
  window.history.pushState({}, 'Test page', '/testProducts');
  const { getByText } = render(
      <MemoryRouter initialEntries={['/testProducts']}>
        <AppWithoutRouter />
      </MemoryRouter>
  );

  expect(getByText(/Products Information/i)).toBeInTheDocument();
});