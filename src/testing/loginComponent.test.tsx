import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginComponent from '../components/User/loginComponent';
import usersReducer, { userLogin } from '../store/features/users/usersSlice';
import authReducer from '../store/features/Authentification/AuthSlice';
import { Route, Routes } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { AppDispatch } from '../type';
import Home from '../pages/Home';

// Nettoyage du localStorage avec et après chaque test
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

/// Mock de useNavigate
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Configurez le store avec uniquement les reducers nécessaires
const store = configureStore({
  reducer: {
    users: usersReducer, // Reducer utilisé par LoginComponent
    auth: authReducer, // Reducer utilisé pour gérer l'authentification
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

test('rendu correct', () => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginComponent />
      </MemoryRouter>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});

test('rendu avec champs email et password vide', () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginComponent />
      </MemoryRouter>
    </Provider>
  );

  const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
  const passwordInput = getByPlaceholderText(
    'Mot de passe'
  ) as HTMLInputElement;

  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
});

test("rendu avec le bouton 'Se connecter' disabled si les champs email et password sont vide", () => {
  const { getByPlaceholderText, getByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginComponent />
      </MemoryRouter>
    </Provider>
  );

  const loginButton = getByRole('button', { name: 'Se connecter' });

  const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
  const passwordInput = getByPlaceholderText(
    'Mot de passe'
  ) as HTMLInputElement;

  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
  expect(loginButton).toBeDisabled();
});

test("mise à jour de l'état 'se souvenir de moi' lorsque la checkbox est cochée", () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginComponent />
      </MemoryRouter>
    </Provider>
  );

  const rememberMeCheckbox = getByLabelText('Se souvenir de moi');

  // Vérifie si la checkbox est cochée au début
  expect(rememberMeCheckbox).not.toBeChecked();

  // Simule un clic sur la checkbox
  fireEvent.click(rememberMeCheckbox);

  // Vérifie que la checkbox est maintenant cochée
  expect(rememberMeCheckbox).toBeChecked();

  // Simule un autre click sur la checkbox
  fireEvent.click(rememberMeCheckbox);

  // Vérifie maintenant si la checkbox n'est plus cochée
  expect(rememberMeCheckbox).not.toBeChecked();
});

test('gère correctement un échec de connexion', async () => {
  // Simulez l'échec de l'authentification
  const user = { email: 'user1@test.com', password: 'wrongpassword' };

  // Définit les valeurs dans le localStorage
  localStorage.setItem('userEmail', JSON.stringify(user.email));
  localStorage.setItem('userPassword', JSON.stringify(user.password));

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginComponent />
      </MemoryRouter>
    </Provider>
  );

  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Mot de passe');

  // Simule la saisie des informations de connexion
  fireEvent.change(emailInput, { target: { value: user.email } });
  fireEvent.change(passwordInput, { target: { value: user.password } });

  // Simule la soumission du formulaire
  fireEvent.click(getByText('Se connecter'));

  // Attendre que les messages d'erreur apparaissent
  await waitFor(() => {
    expect(getByText('Identifiants incorrects')).toBeInTheDocument();
  });
});

test('supprime les informations de localstorage quand la checkbox est décochée', async () => {
  const user = { email: 'user1@test.com', password: '12345' };

  // Définit les valeurs dans le localStorage
  localStorage.setItem('userEmail', JSON.stringify(user.email));
  localStorage.setItem('userPassword', JSON.stringify(user.password));

  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginComponent />
      </MemoryRouter>
    </Provider>
  );

  const rememberMeCheckbox = getByLabelText(
    'Se souvenir de moi'
  ) as HTMLInputElement;

  // Vérifiez l'état initial de la checkbox
  expect(rememberMeCheckbox.checked).toBe(true);

  // Décoche la checkbox
  fireEvent.click(rememberMeCheckbox);

  // Simule la soumission du formulaire pour déclencher la suppression
  fireEvent.click(getByText('Se connecter'));

  // Attendre que les valeurs du localStorage soient mises à jour
  await waitFor(() => {
    expect(localStorage.getItem('userEmail')).toBeNull();
    expect(localStorage.getItem('userPassword')).toBeNull();
  });
});

test('gère la connexion réussie', async () => {
  const user = { email: 'user1@test.com', password: '12345' };

  // Mocker le dispatch pour qu'il retourne une action réussie
  const dispatch = jest.spyOn(
    store,
    'dispatch'
  ) as jest.MockedFunction<AppDispatch>;
  dispatch.mockResolvedValue({
    type: userLogin.fulfilled.type,
    payload: { email: user.email },
  } as unknown); // Remplacer any par unknown pour contourner les erreurs de type

  // Initialiser le mockNavigate
  mockNavigate.mockImplementation(() => {});

  const { getByPlaceholderText, getByText, getByLabelText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Mot de passe');
  const rememberMeCheckbox = getByLabelText(
    'Se souvenir de moi'
  ) as HTMLInputElement;

  // Simule la saisie des informations de connexion
  fireEvent.change(emailInput, { target: { value: user.email } });
  fireEvent.change(passwordInput, { target: { value: user.password } });

  // Coche la checkbox
  fireEvent.click(rememberMeCheckbox);

  // Simule la soumission du formulaire
  fireEvent.click(getByText('Se connecter'));

  // Attendre que la redirection se produise
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  // Vérifiez que les informations sont stockées dans le localStorage
  expect(localStorage.getItem('userEmail')).toBe(JSON.stringify(user.email));
  expect(localStorage.getItem('userPassword')).toBe(
    JSON.stringify(user.password)
  );
});
