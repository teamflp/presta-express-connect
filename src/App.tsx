import '../src/Style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import TestUsersComponent from './store/test/testUsersComponent';
import TestProductsComponent from './store/test/testProducts';
import LoginComponent from './components/User/loginComponent';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Home from './pages/Home';
import Metiers from './pages/ArtisanMetiers';
import ProductDetails from './pages/ProductDetails';
import DomainesIntervention from './pages/DomaineIntervention';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/auth" element={<LoginComponent />} />
          <Route
            path="/testUser"
            element={<ProtectedRoute element={<TestUsersComponent />} />}
          />
          <Route path="/testProducts" element={<TestProductsComponent />} />
          <Route path="/" element={<Home />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />
          <Route path="/Metiers" element={<Metiers />} />
          <Route path="/Intervention" element={<DomainesIntervention />} />
          {/* <Route path="/list-metiers/:letter" element={<LetterMetiersWithList />} /> */}{' '}
          {/* Route pour les métiers */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
