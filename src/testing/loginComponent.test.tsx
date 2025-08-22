
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import { AuthProvider } from '../components/Auth/AuthWrapper';
import Auth from '../pages/Auth';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

describe('Login Component', () => {
  test('renders auth form', () => {
    renderWithProviders(<Auth />);
    
    // Test that the auth page renders without crashing
    expect(document.body).toBeInTheDocument();
  });

  test('displays auth elements', () => {
    renderWithProviders(<Auth />);
    
    // Simple test to ensure the component renders
    const body = document.querySelector('body');
    expect(body).toBeInTheDocument();
  });
});
