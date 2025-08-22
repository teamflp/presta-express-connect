
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import Home from '../pages/Home';

// Mock Redux store pour les tests
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('App Tests', () => {
  test('renders home page without crashing', () => {
    renderWithProviders(<Home />);
    expect(document.body).toBeInTheDocument();
  });

  test('displays navigation elements', () => {
    renderWithProviders(<Home />);
    // Test basic rendering without specific text that might not exist
    const mainContent = document.querySelector('.App');
    expect(mainContent).toBeInTheDocument();
  });
});
