import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getting  all orders + their items when the component loads
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get('/orders');

        // For each order, also get the items tied to it
        const ordersWithItems = await Promise.all(
          res.data.map(async (order) => {
            const itemRes = await axiosInstance.get(`/orders/${order.id}/items`);
            return { ...order, items: itemRes.data };
          })
        );

        setOrders(ordersWithItems);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false); // Done fetching, hide loader
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (!orders.length) return <p>No orders yet.</p>;

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem' }}>
          <h4>Order #{order.id}</h4>
          <p>Total Paid: KES {order.total_price}</p>

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
