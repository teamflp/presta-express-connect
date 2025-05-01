
import { Provider } from 'react-redux';
import store from '../store/store';
import Routes from './Routes'; // Assurez-vous que vos routes sont définies dans un composant séparé

const AppWithoutRouter = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default AppWithoutRouter;
