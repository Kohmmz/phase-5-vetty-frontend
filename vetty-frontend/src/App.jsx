import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Client Routes
import Home from './Components/pages/Home/Home';
import Products from './Components/pages/Products/Products';
import ProductDetail from './Components/pages/Products/ProductDetail';
import About from './Components/pages/About/About';
import Login from './Components/pages/Login/Login';
import Register from './Components/pages/Login/Register';
import Service from './Components/pages/Services/Service';

// Admin Routes
import AdminRoutes from './routes/AdminRoutes';

import Navbar from './components/ui/Navbar';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
