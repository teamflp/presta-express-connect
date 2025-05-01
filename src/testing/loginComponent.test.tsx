
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginComponent from '../components/User/loginComponent';

describe('LoginComponent', () => {
  it('should render login form', () => {
    render(<LoginComponent />);
    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
  });

  it('should allow entering credentials', () => {
    render(<LoginComponent />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  // Fix the type error in the test
  it('should handle form submission', () => {
    const mockSubmit = jest.fn();
    const originalConsoleLog = console.log;
    console.log = mockSubmit;
    
    render(<LoginComponent />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const form = screen.getByRole('button', { name: /Connexion/i }).closest('form');
    if (form) {
      fireEvent.submit(form);
    }
    
    expect(mockSubmit).toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});
