import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Axios instance pre-configured with base URL and headers
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks to access and update store
import { addToCart, clearCart, setRecentOrder } from '../redux/slices/orderSlice'; // Redux actions from the order slice

function CheckoutPage() {
  // Local state to hold all available products
  const [products, setProducts] = useState([]);

  // Get cart items from the Redux store
  const cartItems = useSelector((state) => state.order.cartItems);

  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // Fetch products from the backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axiosInstance.get('/products'); // GET /products
      setProducts(res.data); // Update local state with fetched products
    };
    fetchProducts();
  }, []);

  // Handle adding or updating product quantity in the cart
  const handleQuantityChange = (product, quantity) => {
    dispatch(addToCart({
      product_id: product.id,     // ID of the product being added
      quantity,                   // Quantity selected by user
      unit_price: product.price,  // Price of a single unit
    }));
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    // Calculate total price from cart items
    const total_price = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );

    try {
      // POST /orders to place the order
      const res = await axiosInstance.post('/orders', {
        total_price,
        items: cartItems,
      });

      // Save the newly created order in Redux
      dispatch(setRecentOrder(res.data));

      // Clear the cart after successful order
      dispatch(clearCart());

      alert('Order placed!');
    } catch (err) {
      console.error(err);
      alert('Order failed');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>

      {/* Display all available products with quantity input */}
      {products.map(product => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <p>KES {product.price}</p>
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            onChange={(e) =>
              handleQuantityChange(product, parseInt(e.target.value, 10) || 0)
            }
          />
        </div>
      ))}

      {/* Display "Place Order" button only if cart is not empty */}
      {cartItems.length > 0 && (
        <button onClick={handleSubmitOrder}>Place Order</button>
      )}
    </div>
  );
}

export default CheckoutPage;
