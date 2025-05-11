import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, clearCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout= () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product?.price ?? item.service?.price ?? 0;
    return total + price * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      // Create order payload
      const orderItems = cartItems.map((item) => ({
        product_id: item.product ? item.product.id : null,
        service_id: item.service ? item.service.id : null,
        quantity: item.quantity,
      }));

      // Create order
      const orderResponse = await axios.post(
        'https://backend-testing-main.onrender.com/api/orders',
        { items: orderItems },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Initiate payment
      const paymentResponse = await axios.post(
        'https://backend-testing-main.onrender.com/api/mpesa/payment',
        {
          phoneNumber: paymentDetails.phoneNumber,
          amount: totalPrice,
          orderId: orderResponse.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Payment initiated successfully. Please complete the payment on your phone.');
      dispatch(clearCart());
      navigate('/payment-success');
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-items-grid">
              {cartItems.map((item) => {
                const serviceId = item.service?.service_id ?? item.service?.id;
                const serviceDetails = serviceId ? servicesDetails[serviceId] : null;

                const itemName = item.product?.name ?? serviceDetails?.name ?? 'Unknown Item';
                const itemPrice = item.product?.price ?? serviceDetails?.price ?? 0;
                const itemDescription = item.product?.description ?? serviceDetails?.description ?? '';
                const itemImage = item.product?.image_url ?? item.product?.imageUrl ?? serviceDetails?.image_url ?? serviceDetails?.imageUrl ?? '';

                return (
                  <div key={item.id} className="checkout-item-card">
                    <div className="checkout-item-image-container">
                      {itemImage ? (
                        <img src={itemImage} alt={itemName} className="checkout-item-image" />
                      ) : (
                        <div className="checkout-item-image-placeholder">No Image</div>
                      )}
                    </div>
                    <div className="checkout-item-details">
                      <h3>{itemName}</h3>
                      <p className="checkout-item-description">{itemDescription}</p>
                      <p className="checkout-item-price">${itemPrice.toFixed(2)}</p>
                      <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                      <p className="checkout-item-subtotal">Subtotal: ${(itemPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="checkout-total">Total: ${totalPrice.toFixed(2)}</p>
          </div>
          <div className="payment-section">
            <h2>Payment Details</h2>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={paymentDetails.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handlePayment} disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
