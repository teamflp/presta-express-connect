
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/Auth/AuthWrapper';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import SearchResults from './pages/SearchResults';
import Metiers from './pages/ArtisanMetiers';
import MetierDetails from './pages/MetierDetails';
import ProductDetails from './pages/ProductDetails';
import DomainesIntervention from './pages/DomaineIntervention';
import Categories from './pages/Categories';
import CategoryDetails from './pages/CategoryDetails';
import ProfessionalsByJob from './pages/ProfessionalsByJob';
import ProfessionalProfile from './pages/ProfessionalProfile';
import ContactProfessional from './pages/ContactProfessional';
import About from './pages/About';
import Contact from './pages/Contact';

// Dashboards
import AdminDashboard from './pages/AdminDashboard';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ClientDashboard from './pages/ClientDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FDFAF7',
              color: '#333',
            }
          }}
        />
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />
          <Route path="/Metiers" element={<Metiers />} />
          <Route path="/metier-details/:jobName" element={<MetierDetails />} />
          <Route path="/Intervention" element={<DomainesIntervention />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />
          <Route path="/professionals/:categoryId/:jobId" element={<ProfessionalsByJob />} />
          <Route path="/professional/:id" element={<ProfessionalProfile />} />
          <Route path="/contact-professional/:id" element={<ContactProfessional />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/artisan-dashboard" element={
            <ProtectedRoute requiredRole="artisan">
              <ArtisanDashboard />
            </ProtectedRoute>
          } />
          <Route path="/client-dashboard" element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
