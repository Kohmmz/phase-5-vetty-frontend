import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import './OrdersManagement.css';
import { fetchOrders, approveOrder, disapproveOrder } from '../../../redux/orderSlice';
import { fetchProducts, selectAllProducts } from '../../../redux/productSlice';
import { fetchServices, selectAllServices } from '../../../redux/servicesSlice';
import api from '../../api/api';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const products = useSelector(selectAllProducts);
  const services = useSelector(selectAllServices);

  const [orderItemsMap, setOrderItemsMap] = useState({}); // Map orderId -> order items array
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorItems, setErrorItems] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState(null);

  // State for editing order status
  const [editingStatusOrderId, setEditingStatusOrderId] = useState(null);
  const [editStatusValue, setEditStatusValue] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const fetchOrderItemsForOrders = async () => {
      if (!orders || orders.length === 0) {
        setOrderItemsMap({});
        return;
      }
      setLoadingItems(true);
      setErrorItems(null);
      try {
        const newOrderItemsMap = {};
        for (const order of orders) {
          const response = await api.get(`/admin/orders/${order.id}/items`);
          newOrderItemsMap[order.id] = response.data;
        }
        setOrderItemsMap(newOrderItemsMap);
      } catch (err) {
        setErrorItems(err.response?.data?.error || err.message || 'Failed to fetch order items');
      } finally {
        setLoadingItems(false);
      }
    };
    fetchOrderItemsForOrders();
  }, [orders]);

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

  const handleApprove = (id) => {
    dispatch(approveOrder(id));
  };

  const handleDisapprove = (id) => {
    dispatch(disapproveOrder(id));
  };

  const startEditingStatus = (order) => {
    setEditingStatusOrderId(order.id);
    setEditStatusValue(order.status || '');
    setStatusUpdateError(null);
  };

  const cancelEditingStatus = () => {
    setEditingStatusOrderId(null);
    setEditStatusValue('');
    setStatusUpdateError(null);
  };

  const saveStatusEdit = async () => {
    if (!editingStatusOrderId) return;
    setStatusUpdating(true);
    setStatusUpdateError(null);
    try {
      await api.put(`/admin/orders/${editingStatusOrderId}/status`, { status: editStatusValue });
      dispatch(fetchOrders());
      cancelEditingStatus();
    } catch (err) {
      setStatusUpdateError(err.response?.data?.error || err.message || 'Failed to update order status');
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div className="orders-management-container">
      <h2 className="orders-management-title">Order Management</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {loadingItems && <p>Loading order items...</p>}
      {errorItems && <p className="text-red-600">{errorItems}</p>}

      {statusUpdateError && <p className="text-red-600">{statusUpdateError}</p>}

      <div className="orders-list">
        {orders.map((order) => (
          <Card key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.id}</h3>
                <p>Customer: {order.user_id}</p>
                <p>Total: ${order.total_price}</p>
              </div>
              <div className="order-status">
                Status:{' '}
                {editingStatusOrderId === order.id ? (
                  <>
                    <input
                      type="text"
                      value={editStatusValue}
                      onChange={(e) => setEditStatusValue(e.target.value)}
                      disabled={statusUpdating}
                      className="status-edit-input"
                    />
                    <div className="status-edit-buttons">
                      <Button size="sm" onClick={saveStatusEdit} disabled={statusUpdating}>
                        {statusUpdating ? 'Saving...' : 'Save'}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={cancelEditingStatus} disabled={statusUpdating}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className={`status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>{' '}
                    <Button size="sm" onClick={() => startEditingStatus(order)}>Edit</Button>
                  </>
                )}
              </div>
            </div>

            <div className="order-items">
              {orderItemsMap[order.id] && orderItemsMap[order.id].length > 0 ? (
                orderItemsMap[order.id].map((item) => {
                  let product = null;
                  let service = null;
                  if (item.product_id) {
                    product = productMap.get(item.product_id);
                  }
                  if (item.service_id) {
                    service = serviceMap.get(item.service_id);
                  }
                  return (
                    <div key={item.id} className="order-item">
                      {product && (
                        <>
                          <img src={product.image_url} alt={product.name} />
                          <div className="order-item-details">
                            <p className="order-item-name">{product.name}</p>
                            <p className="order-item-price">${product.price}</p>
                            <p className="order-item-description">{product.description}</p>
                          </div>
                        </>
                      )}
                      {service && (
                        <>
                          <img src={service.image_url} alt={service.name} />
                          <div className="order-item-details">
                            <p className="order-item-name">{service.name}</p>
                            <p className="order-item-price">${service.price}</p>
                            <p className="order-item-description">{service.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No order items found.</p>
              )}
            </div>

            <div className="order-actions">
              {order.status !== 'approved' && (
                <>
                  <Button size="sm" className="button-approve" onClick={() => handleApprove(order.id)}>Approve</Button>
                  <Button size="sm" variant="destructive" className="button-disapprove" onClick={() => handleDisapprove(order.id)}>Disapprove</Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
