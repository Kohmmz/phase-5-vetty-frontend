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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;