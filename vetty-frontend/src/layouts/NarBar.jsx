import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../Components/ShoppingCartIcon';

const NarBar = () => {
  return (
    <nav style={{ 
      backgroundColor: '#4F46E5', 
      padding: '10px 20px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/home" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Products</Link>
        <Link to="/services" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Services</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>About</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/cart" aria-label="Go to cart page" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <ShoppingCartIcon />
          <span style={{ marginLeft: '5px' }}>Cart</span>
        </Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
      </div>
    </nav>
  );
};

export default NarBar;
