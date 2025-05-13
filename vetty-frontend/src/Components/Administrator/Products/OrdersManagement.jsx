import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import './OrdersManagement.css';
import { fetchOrders, approveOrder, disapproveOrder } from '../../../redux/orderSlice';
import { fetchProducts, selectAllProducts } from '../../../redux/productSlice';
import { fetchServices, selectAllServices } from '../../../redux/servicesSlice';
import api from '../../api/api';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const products = useSelector(selectAllProducts);
  const services = useSelector(selectAllServices);

  const [orderItemsMap, setOrderItemsMap] = useState({}); // Map orderId -> order items array
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorItems, setErrorItems] = useState(null);

  // New state for editing order items
  const [editingItem, setEditingItem] = useState(null); // { orderId, itemId }
  const [editQuantity, setEditQuantity] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // State for updating order status loading and error
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
    dispatch(fetchServices());
  }, [dispatch]);

  // Fetch order items for all orders after orders are loaded
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

  // Create maps for quick lookup of products and services by id
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

  // Start editing an order item
  const startEditing = (orderId, item) => {
    setEditingItem({ orderId, itemId: item.id });
    setEditQuantity(item.quantity ? item.quantity.toString() : '');
    setUpdateError(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingItem(null);
    setEditQuantity('');
    setUpdateError(null);
  };

  // Save updated order item with improved error handling
  const saveEdit = async () => {
    if (!editingItem) return;
    const { orderId, itemId } = editingItem;
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      const payload = { quantity: parseInt(editQuantity, 10) };
      const response = await api.put(`/admin/orders/${orderId}/items/${itemId}`, payload);
      // Update orderItemsMap with updated item
      setOrderItemsMap((prev) => {
        const updatedItems = prev[orderId].map((item) =>
          item.id === itemId ? response.data : item
        );
        return { ...prev, [orderId]: updatedItems };
      });
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
// Handle order status change
  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdating(true);
    setStatusUpdateError(null);
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      // Update local orders state to reflect new status
      // Since orders come from redux, ideally dispatch an action or refetch orders
      // For simplicity, refetch orders here
      dispatch(fetchOrders());
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
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={statusUpdating}
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="complete">Complete</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="disapproved">Disapproved</option>
                  </select>
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
                        const isEditing = editingItem && editingItem.orderId === order.id && editingItem.itemId === item.id;
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
                            <div>
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
                                  <p className="text-sm">Quantity: {item.quantity}</p>
                                  <Button size="sm" onClick={() => startEditing(order.id, item)}>Edit</Button>
                                </>
                              )}
                            </div>
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
                {/* Remove approve/disapprove buttons as status dropdown replaces them */}
                <Button size="sm" onClick={() => navigate(`/admin/orders/${order.id}`)}>View</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
