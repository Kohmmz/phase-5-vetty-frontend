import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../ui/buttons';
import api from '../../api/api';
import { fetchProducts, selectAllProducts } from '../../../redux/productSlice';
import { fetchServices, selectAllServices } from '../../../redux/servicesSlice';
import './OrdersManagement.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const services = useSelector(selectAllServices);

  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // New state for editing order items
  const [editingItem, setEditingItem] = useState(null); // itemId
  const [editQuantity, setEditQuantity] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/admin/orders/${orderId}/items`);
        setOrderItems(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch order items');
      }
      setLoading(false);
    };
    fetchOrderItems();
  }, [orderId]);

  const productMap = React.useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.id, p));
    return map;
  }, [products]);

  const serviceMap = React.useMemo(() => {
    const map = new Map();
    services.forEach((s) => map.set(s.id, s));
    return map;
  }, [services]);

  const startEditing = (item) => {
    setEditingItem(item.id);
    setEditQuantity(item.quantity ? item.quantity.toString() : '');
    setUpdateError(null);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditQuantity('');
    setUpdateError(null);
  };

  const saveEdit = async () => {
    if (!editingItem) return;
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      const payload = { quantity: parseInt(editQuantity, 10) };
      const response = await api.put(`/admin/orders/${orderId}/items/${editingItem}`, payload);
      setOrderItems((prev) =>
        prev.map((item) => (item.id === editingItem ? response.data : item))
      );
      cancelEditing();
    } catch (err) {
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string' && err.response.data.startsWith('<!DOCTYPE')) {
          setUpdateError('Server returned an HTML error page. Please check your authentication and permissions.');
        } else if (err.response.data.error) {
          setUpdateError(err.response.data.error);
        } else {
          setUpdateError('Failed to update order item due to unexpected server response.');
        }
      } else {
        setUpdateError(err.message || 'Failed to update order item');
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleApprove = async (itemId) => {
    try {
      await api.put(`/admin/orders/${orderId}/items/${itemId}/approve`);
      // Refresh order items
      const response = await api.get(`/admin/orders/${orderId}/items`);
      setOrderItems(response.data);
    } catch (err) {
      setError(err.message || 'Failed to approve item');
    }
  };

  const handleDisapprove = async (itemId) => {
    try {
      await api.put(`/admin/orders/${orderId}/items/${itemId}/disapprove`);
      // Refresh order items
      const response = await api.get(`/admin/orders/${orderId}/items`);
      setOrderItems(response.data);
    } catch (err) {
      setError(err.message || 'Failed to disapprove item');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Order Details - Order #{orderId}</h2>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        Back to Orders
      </Button>

      {loading && <p>Loading order items...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {orderItems.length === 0 && !loading && <p>No order items found for this order.</p>}

      <table className="orders-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e40af', color: 'white' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Item</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Type</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Quantity</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => {
            const product = item.product_id ? productMap.get(item.product_id) : null;
            const service = item.service_id ? serviceMap.get(item.service_id) : null;
            const isEditing = editingItem === item.id;
            return (
              <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {product ? product.name : service ? service.name : 'N/A'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {product ? 'Product' : service ? 'Service' : 'N/A'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  ${product ? product.price : service ? service.price : '0'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        min="1"
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(e.target.value)}
                        className="border rounded px-2 py-1 w-20"
                      />
                      <div className="flex gap-2 mt-1">
                        <Button size="sm" onClick={saveEdit} disabled={updateLoading}>
                          {updateLoading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={cancelEditing} disabled={updateLoading}>
                          Cancel
                        </Button>
                      </div>
                      {updateError && <p className="text-red-600 text-sm mt-1">{updateError}</p>}
                    </>
                  ) : (
                    <>
                      {item.quantity}
                      <Button size="sm" onClick={() => startEditing(item)}>Edit</Button>
                    </>
                  )}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <Button size="sm" onClick={() => handleApprove(item.id)}>Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDisapprove(item.id)}>Disapprove</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
