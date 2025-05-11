import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItemQuantity, removeItemFromCart, clearCart, selectCartItems } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const [servicesDetails, setServicesDetails] = useState({}); // service_id -> service details

  useEffect(() => {
    // Fetch full service details for service items in cart
    const serviceItems = cartItems.filter(item => item.service);
    const serviceIdsToFetch = serviceItems
      .map(item => item.service.service_id ?? item.service.id)
      .filter(id => id && !servicesDetails[id]);

    if (serviceIdsToFetch.length > 0) {
      Promise.all(
        serviceIdsToFetch.map(id =>
          fetch(`https://backend-testing-main.onrender.com/services/${id}`)
            .then(res => res.json())
            .then(data => ({ id, data }))
            .catch(() => null)
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

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product?.price ?? item.service?.price ?? 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-grid">
            {cartItems.map((item) => {
              const serviceId = item.service?.service_id ?? item.service?.id;
              const serviceDetails = serviceId ? servicesDetails[serviceId] : null;

              const itemName = item.product?.name ?? serviceDetails?.name ?? 'Unknown Item';
              const itemPrice = item.product?.price ?? serviceDetails?.price ?? 0;
              const itemDescription = item.product?.description ?? serviceDetails?.description ?? '';
              const itemImage = item.product?.image_url ?? item.product?.imageUrl ?? serviceDetails?.image_url ?? serviceDetails?.imageUrl ?? '';

              return (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-image-container">
                    {itemImage ? (
                      <img src={itemImage} alt={itemName} className="cart-item-image" />
                    ) : (
                      <div className="cart-item-image-placeholder">No Image</div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h3>{itemName}</h3>
                    <p className="cart-item-description">{itemDescription}</p>
                    <p className="cart-item-price">${itemPrice.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                    </div>
                    <p className="cart-item-subtotal">Subtotal: ${(itemPrice * item.quantity).toFixed(2)}</p>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${itemName} from cart`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={handleClearCart}>Clear Cart</button>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
