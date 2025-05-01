
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import store, { persistor } from './store/store';
import { AuthProvider } from './hooks/useAuth';
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
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Router>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#FDFAF7',
                  color: '#333',
                }
              }}
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/professional-login" element={<ProfessionalLogin />} />
              <Route path="/professional-register" element={<ProfessionalRegister />} />
              <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
              <Route path="/artisan-dashboard" element={<ProtectedRoute element={<ArtisanDashboard />} />} />
              <Route path="/client-dashboard" element={<ProtectedRoute element={<ClientDashboard />} />} />
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
      </PersistGate>
    </Provider>
  );
}

export default App;
