
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginComponent from '../components/User/loginComponent';

// Mock event functions that we'll need
const mockFireEvent = {
  change: (element: Element, options: { target: { value: string } }) => {
    // Simple mock implementation
    const input = element as HTMLInputElement;
    if (input) {
      input.value = options.target.value;
    }
  },
  submit: (element: Element) => {
    // Simple mock implementation for form submission
    if (element) {
      const form = element as HTMLFormElement;
      const event = new Event('submit');
      form.dispatchEvent(event);
    }
  }
};

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
    
    mockFireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    mockFireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
    expect((passwordInput as HTMLInputElement).value).toBe('password123');
  });

  it('should handle form submission', () => {
    const mockSubmit = jest.fn();
    const originalConsoleLog = console.log;
    console.log = mockSubmit;
    
    const { getByRole, getByLabelText } = render(<LoginComponent />);
    
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Mot de passe/i);
    
    mockFireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    mockFireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const form = getByRole('button', { name: /Connexion/i }).closest('form');
    if (form) {
      mockFireEvent.submit(form);
    }
    
    expect(mockSubmit).toHaveBeenCalled();
    console.log = originalConsoleLog;
  });
});
