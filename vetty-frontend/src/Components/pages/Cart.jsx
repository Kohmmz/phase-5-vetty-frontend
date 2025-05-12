import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItemQuantity, removeItemFromCart, clearCart, selectCartItems } from '../../redux/cartSlice';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import api from '../../api/api'; // Import the shared Axios instance
import { FaTrash } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi'; // Import FiArrowLeft
import './Cart.css'; // Import the custom CSS file

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const [servicesDetails, setServicesDetails] = useState({}); // service_id -> service details

  useEffect(() => {
    // Fetch full service details for service items in cart
    const serviceItems = cartItems.filter(item => item.service);
    const serviceIdsToFetch = serviceItems
      .map(item => item.service?.service_id ?? item.service?.id)
      .filter(id => id && !servicesDetails[id]);

    if (serviceIdsToFetch.length > 0) {
      Promise.all(
        serviceIdsToFetch.map(id =>
          api.get(`/services/${id}`) // Use Axios instance
            .then(response => ({ id, data: response.data }))
            .catch(error => {
              console.error(`Failed to fetch service details for ID ${id}:`, error);
              return null; // Allow other fetches to succeed
            })
        )
      ).then(results => {
        const newDetails = {};
        results.forEach(result => {
          if (result) {
            newDetails[result.id] = result.data;
          }
        });
        setServicesDetails(prev => ({ ...prev, ...newDetails }));
      });
    }
  }, [cartItems, servicesDetails]);

  const handleQuantityChange = (id, quantity) => {
    const qty = Math.max(1, Number(quantity));
    dispatch(updateCartItemQuantity({ id, quantity: qty }));
  };

  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Calculate the total amount to pay
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product?.price ?? item.service?.price ?? 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <div style={{ marginBottom: '1rem' }}> {/* Added margin for spacing */}
        <Link to="/products" className="inline-flex items-center text-indigo-600 hover:underline">
          <FiArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p className="empty-cart-message">Your cart is currently empty.</p>
          <button onClick={() => navigate('/shop')} className="continue-shopping-button">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {cartItems.map((item) => {
              const serviceId = item.service?.service_id ?? item.service?.id;
              const serviceDetails = serviceId ? servicesDetails[serviceId] : null;

              const itemName = item.product?.name ?? serviceDetails?.name ?? 'Unknown Item';
              const itemPrice = item.product?.price ?? serviceDetails?.price ?? 0;
              const itemDescription = item.product?.description ?? serviceDetails?.description ?? '';
              const itemImage = item.product?.image_url ?? item.product?.imageUrl ?? serviceDetails?.image_url ?? serviceDetails?.imageUrl ?? '';

              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image-wrapper">
                    {itemImage ? (
                      <img src={itemImage} alt={itemName} className="cart-item-image" />
                    ) : (
                      <div className="cart-item-image-placeholder">No Image</div>
                    )}
                  </div>
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{itemName}</h3>
                    <p className="cart-item-description">{itemDescription}</p>
                    <p className="cart-item-price">KES{itemPrice.toFixed(2)}</p>
                    <div className="cart-item-quantity-controls">
                      <label htmlFor={`quantity-${item.id}`} className="quantity-label">Quantity:</label>
                      <div className="quantity-input-wrapper">
                        <button
                          className="quantity-button decrease"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="quantity-input"
                        />
                        <button
                          className="quantity-button increase"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="cart-item-subtotal">KES{(itemPrice * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-item-button"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${itemName} from cart`}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <div className="summary-total">
              <span className="total-label">Total:</span>
              <span className="total-price">KES{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-actions">
              <button onClick={handleClearCart} className="clear-cart-button">
                Clear Cart
              </button>
              <button onClick={handleCheckout} className="checkout-button" disabled={cartItems.length === 0}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
