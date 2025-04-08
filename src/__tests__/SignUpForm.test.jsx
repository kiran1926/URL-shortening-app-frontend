import { render, screen, fireEvent } from '@testing-library/react';
// import SignUpForm from '../components/SignUpForm';
import SignUpForm from '../components/SignUpForm/SignUpForm'
import { UserContext } from '../contexts/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SignUpForm', () => {
  test('disables the Sign Up button if the form is invalid', () => {
    render(
      <Router>
        <UserContext.Provider value={{ setUser: jest.fn() }}>
          <SignUpForm />
        </UserContext.Provider>
      </Router>
    );

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: 'password123' },
    });

    expect(signUpButton).not.toBeDisabled();
  });
});
