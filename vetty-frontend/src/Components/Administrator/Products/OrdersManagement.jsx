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
    setEditStatusValue(order.status);
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
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Order Management</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {loadingItems && <p>Loading order items...</p>}
      {errorItems && <p className="text-red-600">{errorItems}</p>}

      {statusUpdateError && <p className="text-red-600">{statusUpdateError}</p>}

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="shadow-md p-4 rounded-lg border border-gray-300">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">Customer: {order.user_id}</p>
                <p className="text-sm">Total: ${order.total_price}</p>
                <p className="text-sm">
                  Status:{' '}
                  {editingStatusOrderId === order.id ? (
                    <>
                      <input
                        type="text"
                        value={editStatusValue}
                        onChange={(e) => setEditStatusValue(e.target.value)}
                        disabled={statusUpdating}
                        className="border rounded px-2 py-1"
                      />
                      <Button size="sm" onClick={saveStatusEdit} disabled={statusUpdating}>
                        {statusUpdating ? 'Saving...' : 'Save'}
                      </Button>
                      <Button size="sm" variant="destructive" onClick={cancelEditingStatus} disabled={statusUpdating}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className={order.status === 'approved' ? 'text-green-600' : 'text-red-600'}>
                        {order.status}
                      </span>{' '}
                      <Button size="sm" onClick={() => startEditingStatus(order)}>Edit</Button>
                    </>
                  )}
                </p>
                <div className="mt-2">
                  <h4 className="font-semibold">Order Items:</h4>
                  {orderItemsMap[order.id] && orderItemsMap[order.id].length > 0 ? (
                    <ul>
                      {orderItemsMap[order.id].map((item) => {
                        let product = null;
                        let service = null;
                        if (item.product_id) {
                          product = productMap.get(item.product_id);
                        }
                        if (item.service_id) {
                          service = serviceMap.get(item.service_id);
                        }
                        return (
                          <li key={item.id} className="flex items-center gap-4 my-2">
                            {product && (
                              <>
                                <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-600">${product.price}</p>
                                  <p className="text-sm">{product.description}</p>
                                </div>
                              </>
                            )}
                            {service && (
                              <>
                                <img src={service.image_url} alt={service.name} className="w-12 h-12 object-cover rounded" />
                                <div>
                                  <p className="font-medium">{service.name}</p>
                                  <p className="text-sm text-gray-600">${service.price}</p>
                                  <p className="text-sm">{service.description}</p>
                                </div>
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>No order items found.</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-end">
                {order.status !== 'approved' && (
                  <>
                    <Button size="sm" onClick={() => handleApprove(order.id)}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDisapprove(order.id)}>Disapprove</Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
