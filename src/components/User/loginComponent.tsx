import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { loginFailure, userLogin } from '../../store/features/users/usersSlice';
import { PiWarningCircle } from 'react-icons/pi';
import { AppDispatch, RootState } from '../../store/store';
import './login.css';
import IconArtisan from '../../assets/icons/IconArtisan.svg';
import { loginSuccess } from '../../store/features/Authentification/AuthSlice';
import useLocalStorage from '../../hooks/useLocalStorage';

const LoginComponent: React.FC = () => {
  const [email, setEmail, removeEmail] = useLocalStorage('userEmail', '');
  const [password, setPassword, removePassword] = useLocalStorage(
    'userPassword',
    ''
  );
  const [rememberMe, setRememberMe] = useState(email !== '' || password !== '');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const loginFailed = useSelector(
    (state: RootState) => state.users.loginFailed
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isButtonDisabled = email === '' || password === '';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
    if (!event.target.checked) {
      removeEmail();
      removePassword();
    }
  };

  const handleLogin = async () => {
    const resultAction = await dispatch(userLogin({ email, password }));
    if (userLogin.fulfilled.match(resultAction)) {
      dispatch(loginSuccess());
      if (rememberMe) {
        setEmail(email);
        setPassword(password);
      }
      navigate('/home');
    } else {
      dispatch(loginFailure());
    }
  };

  return (
    <div className="containerLogin">
      <div className="loginDiv">
        {loginFailed && (
          <p className="errorMessageLogin">
            <PiWarningCircle className="iconeLoginWarning" />
            Identifiants incorrects
          </p>
        )}
        <div className="divIconLogin">
          <img src={IconArtisan} id="iconArtisanLogin" />
        </div>

        <h2>Connectez-vous et profitez de nos fonctionnalités</h2>
        <div className="inputLoginDiv">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="checkboxLoginDiv">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            id="rememberMe"
          />
          <label htmlFor="rememberMe">Se souvenir de moi</label>
        </div>
        <p>
          <Link to="" id="mdpOublie">
            Mot de passe oublié ?
          </Link>
        </p>
        <button
          onClick={handleLogin}
          disabled={isButtonDisabled}
          className="buttonLogin"
        >
          Se connecter
          <span>
            <FaArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
