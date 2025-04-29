
import './Style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import TestUsersComponent from './store/test/testUsersComponent';
import TestProductsComponent from './store/test/testProducts';
import LoginComponent from './components/User/loginComponent';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Metiers from './pages/ArtisanMetiers';
import ProductDetails from './pages/ProductDetails';
import DomainesIntervention from './pages/DomaineIntervention';
import Categories from './pages/Categories';
import CategoryDetails from './pages/CategoryDetails';
import ProfessionalsByJob from './pages/ProfessionalsByJob';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<LoginComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/testUser"
              element={<ProtectedRoute element={<TestUsersComponent />} />}
            />
            <Route path="/testProducts" element={<TestProductsComponent />} />
            <Route path="/" element={<Home />} />
            <Route path="/ProductDetails" element={<ProductDetails />} />
            <Route path="/Metiers" element={<Metiers />} />
            <Route path="/Intervention" element={<DomainesIntervention />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
            <Route path="/professionals/:categoryId/:jobId" element={<ProfessionalsByJob />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
