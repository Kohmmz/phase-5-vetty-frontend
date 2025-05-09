import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { CartProvider } from './contexts/CartContext';

import Home from './Components/pages/Home/Home';
import Products from './Components/pages/Products/Products';
import ProductDetail from './Components/pages/Products/ProductDetail';
import About from './Components/pages/About/About';
import Login from './Components/pages/Login/Login';
import Service from './Components/pages/Services/Service';
import CartPage from './Components/pages/Cart/CartPage';

// Admin Routes
import AdminRoutes from './routes/AdminRoutes';
import NarBar from './layouts/NarBar';
import Footer from './layouts/Footer';

function AppContent() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      {token && <NarBar />}
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Provider>
  );
}

export default App;
