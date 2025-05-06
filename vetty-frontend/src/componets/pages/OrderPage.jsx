import React, { useEffect, useState } from 'react';
// bringing in axios instance for backend communication
import axiosInstance from '../axiosInstance';

// hooks to interact with redux store
import { useDispatch, useSelector } from 'react-redux';
// custom action to set the orders globally
import { setOrders } from '../redux/slices/orderSlice';

function OrderPage() {
  const dispatch = useDispatch();
  // grabbing orders from redux state
  const orders = useSelector((state) => state.order.orders);
  const [loading, setLoading] = useState(true); // local loading state

  useEffect(() => {
    // get all orders when this component mounts
    const fetchOrders = async () => {
      try {
        // hitting the orders endpoint
        const res = await axiosInstance.get('/orders');

        // for each order, fetch the related items
        const ordersWithItems = await Promise.all(
          res.data.map(async (order) => {
            const itemRes = await axiosInstance.get(`/orders/${order.id}/items`);
            // include items inside each order object
            return { ...order, items: itemRes.data };
          })
        );

        // saving  the result in redux
        dispatch(setOrders(ordersWithItems));
      } catch (err) {
        // basic error logging
        console.error('Error fetching orders:', err);
      } finally {
        // turn off the loader once done
        setLoading(false);
      }
    };

    // invok the function
    fetchOrders();
  }, [dispatch]);

  // loading state UI
  if (loading) return <p>Loading your orders...</p>;
  if (!orders.length) return <p>No orders yet.</p>; // if nothing returned

  return (
    <div>
      <h2>My Orders</h2>

      {/* render all fetched orders */}
      {orders.map((order) => (
        <div key={order.id} style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem' }}>
          <h4>Order #{order.id}</h4>
          <p>Total Paid: KES {order.total_price}</p>

          {/* show individual items in the order */}
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.product_name} — {item.quantity} x KES {item.unit_price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderPage;

