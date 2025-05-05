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

const AdminRoutes = () => {
  return (
    <Routes>
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
  );
};

export default AdminRoutes;