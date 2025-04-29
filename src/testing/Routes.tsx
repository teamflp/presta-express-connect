import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import TestUsersComponent from '../store/test/testUsersComponent';
import TestProductsComponent from '../store/test/testProducts';
import LoginComponent from '../components/User/loginComponent';
import ProtectedRoute from '../components/Routes/ProtectedRoute';
import Home from '../pages/Home';

const Routes = () => (
  <ReactRoutes>
    <Route path="/auth" element={<LoginComponent />} />
    <Route path="/testUser" element={<ProtectedRoute element={<TestUsersComponent />} />} />
    <Route path="/testProducts" element={<TestProductsComponent />} />
    <Route path="/home" element={<Home />} />
  </ReactRoutes>
);

export default Routes;