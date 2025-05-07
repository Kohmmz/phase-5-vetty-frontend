import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Home from './componets/pages/Home';
import Products from './componets/pages/Products';
import ProductDetail from './componets/pages/ProductDetail';
import About from './componets/pages/About';
import Login from './componets/pages/Login';
import Register from './componets/pages/Register';
import Service from './componets/pages/Service';
import AdminRoutes from './routes/AdminRoutes';


//Admin routes
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../componets/pages/admin/Admin_Dashboard';
import AdminProducts from '../componets/pages/admin/AdminProducts';
import AdminServices from '../componets/pages/admin/AdminServices';
import OrdersManagement from '../componets/pages/admin/OrdersManagement';
import Appointments from '../componets/pages/admin/Appointments';
import ServiceHistory from '../componets/pages/admin/ServiceHistory';
import PurchaseHistory from '../componets/pages/admin/PurchaseHistory';
import Notifications from '../componets/pages/admin/Notifications';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminRoutes />} /> 

          {/* Admin routes */}
           <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="orders" element={<OrdersManagement />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="service-history" element={<ServiceHistory />} />
                  <Route path="purchase-history" element={<PurchaseHistory />} />
                  <Route path="notifications" element={<Notifications />} />
           </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;