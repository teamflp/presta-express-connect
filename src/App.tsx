
import './Style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import TestUsersComponent from './store/test/testUsersComponent';
import TestProductsComponent from './store/test/testProducts';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Home from './pages/Home';
import ProfessionalLogin from './pages/ProfessionalLogin';
import ProfessionalRegister from './pages/ProfessionalRegister';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import SearchResults from './pages/SearchResults';
import Metiers from './pages/ArtisanMetiers';
import ProductDetails from './pages/ProductDetails';
import DomainesIntervention from './pages/DomaineIntervention';
import Categories from './pages/Categories';
import CategoryDetails from './pages/CategoryDetails';
import ProfessionalsByJob from './pages/ProfessionalsByJob';
import ProfessionalProfile from './pages/ProfessionalProfile';
import ContactProfessional from './pages/ContactProfessional';
import About from './pages/About';
import Contact from './pages/Contact';
import { AuthProvider } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/professional-login" element={<ProfessionalLogin />} />
            <Route path="/professional-register" element={<ProfessionalRegister />} />
            <Route path="/professional-dashboard" element={<ProtectedRoute element={<ProfessionalDashboard />} />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/testUser" element={<ProtectedRoute element={<TestUsersComponent />} />}/>
            <Route path="/testProducts" element={<TestProductsComponent />} />
            <Route path="/" element={<Home />} />
            <Route path="/ProductDetails" element={<ProductDetails />} />
            <Route path="/Metiers" element={<Metiers />} />
            <Route path="/Intervention" element={<DomainesIntervention />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
            <Route path="/professionals/:categoryId/:jobId" element={<ProfessionalsByJob />} />
            <Route path="/professional/:id" element={<ProfessionalProfile />} />
            <Route path="/contact-professional/:id" element={<ContactProfessional />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
