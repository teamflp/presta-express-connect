
import { Provider } from 'react-redux';
import store from '../store/store';
import Routes from './Routes';

const AppWithoutRouter = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default AppWithoutRouter;
