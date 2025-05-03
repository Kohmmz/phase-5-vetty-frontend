import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './layouts/NarBar'; 
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './componets/pages/Home';
import About from './componets/pages/About';
import Contect from './componets/pages/Contect';
import Products from './componets/pages/Products';
import Login from './componets/pages/Login';
import Register from './componets/pages/Register';
import Service from './componets/pages/Service';
import Requester from './componets/pages/Requester';

// Admin Pages
import AdminDashboard from './componets/pages/admin/Admin_Dashboard';
import AdminProjects from './componets/pages/admin/AdminProjects';
import AdminServices from './componets/pages/admin/AdminServices';
import Appointments from './componets/pages/admin/Appointments';
import Notifications from './componets/pages/admin/Notifications';
import OrdersMangment from './componets/pages/admin/OrdersMangment';
import PurchaseHistory from './componets/pages/admin/PurchaseHistory';
import ServiceHistory from './componets/pages/admin/ServiceHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contect" element={<Contect />} />
          <Route path="products" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="service" element={<Service />} />
          <Route path="requester" element={<Requester />} />
        </Route>

        {/* Admin Site */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="orders" element={<OrdersMangment />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="service-history" element={<ServiceHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
