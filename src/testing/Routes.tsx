
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import TestUsersComponent from '../store/test/testUsersComponent';
import TestProductsComponent from '../store/test/testProducts';
import LoginComponent from '../components/User/loginComponent';
import ProtectedRoute from '../components/Routes/ProtectedRoute';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ArtisanDetails from '../pages/ArtisanDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';

const Routes = () => (
  <ReactRoutes>
    <Route path="/auth" element={<LoginComponent />} />
    <Route path="/testUser" element={<ProtectedRoute element={<TestUsersComponent />} />} />
    <Route path="/testProducts" element={<TestProductsComponent />} />
    <Route path="/home" element={<Home />} />
    <Route path="/ProductDetails" element={<ProductDetails />} />
    <Route path="/ArtisanDetails" element={<ArtisanDetails />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </ReactRoutes>
);

export default Routes;
