import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import './OrdersManagement.css';
import { fetchOrders, approveOrder, disapproveOrder } from '../../../redux/orderSlice';
import { fetchProducts, selectAllProducts } from '../../../redux/productSlice';
import { fetchServices, selectAllServices } from '../../../redux/servicesSlice';

const API_BASE_URL = '';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const products = useSelector(selectAllProducts);
  const services = useSelector(selectAllServices);

  const [orderItemsMap, setOrderItemsMap] = useState({}); // Map orderId -> order items array
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorItems, setErrorItems] = useState(null);

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
          const token = localStorage.getItem('token');
          const response = await fetch(API_BASE_URL + '/admin/orders/' + order.id + '/items', {
            headers: { Authorization: 'Bearer ' + token },
          });
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch items for order ' + order.id + '. Status: ' + response.status + '. Response: ' + errorText);
            throw new Error('Failed to fetch items for order ' + order.id);
          }
          const items = await response.json();
          newOrderItemsMap[order.id] = items;
        }
        setOrderItemsMap(newOrderItemsMap);
      } catch (err) {
        setErrorItems(err.message);
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Order Management</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {loadingItems && <p>Loading order items...</p>}
      {errorItems && <p className="text-red-600">{errorItems}</p>}

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="shadow-md">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">Customer: {order.user_id}</p>
                <p className="text-sm">Total: ${order.total_price}</p>
                <p className="text-sm">
                  Status:{' '}
                  <span className={order.status === 'approved' ? 'text-green-600' : 'text-red-600'}>
                    {order.status}
                  </span>
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
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-600">${product.price}</p>
                                </div>
                              </>
                            )}
                            {service && (
                              <>
                                <img src={service.image_url} alt={service.name} className="w-12 h-12 object-cover rounded" />
                                <div>
                                  <p className="font-medium">{service.name}</p>
                                  <p className="text-sm text-gray-600">${service.price}</p>
                                </div>
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {products.map((product) => (
                        <div key={`product-${product.id}`} className="flex flex-col items-center w-24">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                          <p className="text-xs text-center mt-1">{product.name}</p>
                        </div>
                      ))}
                      {services.map((service) => (
                        <div key={`service-${service.id}`} className="flex flex-col items-center w-24">
                          <img src={service.image_url} alt={service.name} className="w-16 h-16 object-cover rounded" />
                          <p className="text-xs text-center mt-1">{service.name}</p>
                        </div>
                      ))}
                    </div>
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
