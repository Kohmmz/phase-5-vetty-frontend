import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = ({ onClose }) => {
  const { cartItems, setCartItems } = useCart();

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '320px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
        padding: '16px',
        zIndex: 1000,
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Shopping Cart</h2>
        <button onClick={onClose} aria-label="Close cart" style={{ fontSize: '20px', cursor: 'pointer' }}>
          &times;
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cartItems.map(({ id, product, quantity }) => (
            <li key={id} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Quantity: {quantity}</p>
              <div>
                <button onClick={() => increaseQuantity(id)} aria-label={`Increase quantity of ${product.name}`} style={{ marginRight: '8px' }}>
                  +
                </button>
                <button onClick={() => decreaseQuantity(id)} aria-label={`Decrease quantity of ${product.name}`} style={{ marginRight: '8px' }}>
                  -
                </button>
                <button onClick={() => removeItem(id)} aria-label={`Remove ${product.name} from cart`} style={{ color: 'red' }}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: 'auto', fontWeight: 'bold', fontSize: '18px' }}>
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
