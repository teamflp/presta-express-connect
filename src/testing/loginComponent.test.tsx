
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginComponent from '../components/User/loginComponent';

describe('LoginComponent', () => {
  it('should render login form', () => {
    const { getByText, getByLabelText } = render(<LoginComponent />);
    expect(getByText(/Connexion/i)).toBeInTheDocument();
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Mot de passe/i)).toBeInTheDocument();
  });

  it('should allow entering credentials', () => {
    const { getByLabelText } = render(<LoginComponent />);
    
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Mot de passe/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should handle form submission', () => {
    const mockSubmit = jest.fn();
    const originalConsoleLog = console.log;
    console.log = mockSubmit;
    
    const { getByRole, getByLabelText } = render(<LoginComponent />);
    
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Mot de passe/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const form = getByRole('button', { name: /Connexion/i }).closest('form');
    if (form) {
      fireEvent.submit(form);
    }
    
    expect(mockSubmit).toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});
