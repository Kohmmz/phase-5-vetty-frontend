import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Admin Layout and Components
import AdminLayout from '../Components/Administrator/admin_layout/AdminLayout';
import AdminDashboard from '../Components/Administrator/Dashboard/Admin_Dashboard';
import AdminProducts from '../Components/Administrator/Products/AdminProducts';
import AdminServices from '../Components/Administrator/Services/AdminServices';
import OrdersManagement from '../Components/Administrator/Products/OrdersManagement';
import Appointments from '../Components/Administrator/Services/Appointments';
import ServiceHistory from '../Components/Administrator/History/ServiceHistory';
import PurchaseHistory from '../Components/Administrator/History/PurchaseHistory';
import Notifications from '../Components/Administrator/Dashboard/Notifications';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="service-history" element={<ServiceHistory />} />
        <Route path="purchase-history" element={<PurchaseHistory />} />
        <Route path="notifications" element={<Notifications />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
