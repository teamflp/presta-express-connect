
import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import TestUsersComponent from '../store/test/testUsersComponent';
import TestProductsComponent from '../store/test/testProducts';
import LoginComponent from '../components/User/loginComponent';
import ProtectedRoute from '../components/Routes/ProtectedRoute';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ArtisanDetails from '../pages/ArtisanDetails';

const Routes = () => (
  <ReactRoutes>
    <Route path="/auth" element={<LoginComponent />} />
    <Route path="/testUser" element={<ProtectedRoute element={<TestUsersComponent />} />} />
    <Route path="/testProducts" element={<TestProductsComponent />} />
    <Route path="/home" element={<Home />} />
    <Route path="/ProductDetails" element={<ProductDetails />} />
    <Route path="/ArtisanDetails" element={<ArtisanDetails />} />
  </ReactRoutes>
);

export default Routes;
