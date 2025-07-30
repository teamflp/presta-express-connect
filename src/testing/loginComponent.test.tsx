// src/testing/loginComponent.test.tsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import LoginComponent from '../components/User/loginComponent';

// Mock de la fonction login du hook useAuth
const mockLogin = jest.fn();

// Mock du hook useAuth
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

// Réinitialise le mock avant chaque test
beforeEach(() => {
  mockLogin.mockClear();
});

describe('LoginComponent', () => {
  it('devrait afficher correctement le formulaire de connexion', () => {
    render(<LoginComponent />);

    expect(screen.getByRole('heading', { name: /Connexion/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Connexion/i })).toBeInTheDocument();
  });

  it("devrait permettre à l'utilisateur de saisir ses identifiants", async () => {
    const user = userEvent.setup();
    render(<LoginComponent />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('devrait appeler la fonction de connexion avec les bonnes données lors de la soumission', async () => {
    const user = userEvent.setup();
    render(<LoginComponent />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });

    await user.type(emailInput, 'user@test.com');
    await user.type(passwordInput, 'securepassword');
    await user.click(submitButton);

    // Vérifie que mockLogin est bien appelé avec les bons arguments
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith('user@test.com', 'securepassword');
    });
  });
});
