import React from 'react';
import { useCart } from '../../../contexts/CartContext';

const CartPage = () => {
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cartItems.map(({ id, product, quantity }) => (
            <li key={id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
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
      <div style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '20px' }}>
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartPage;
