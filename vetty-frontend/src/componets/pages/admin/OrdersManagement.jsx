import React, { useState } from 'react';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 101,
      customer: 'Jane Doe',
      product: 'Flea Spray',
      amount: 2,
      total: 40,
      isPaid: false,
      isShipped: false,
    },
    {
      id: 102,
      customer: 'John Smith',
      product: 'Dog Vitamins',
      amount: 1,
      total: 25,
      isPaid: true,
      isShipped: false,
    },
  ]);

  const togglePaid = (id) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, isPaid: !order.isPaid } : order
      )
    );
  };

  const markShipped = (id) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, isShipped: true } : order
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Order Management</h2>

      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id} className="shadow-md">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                  <p className="text-sm">Product: {order.product}</p>
                  <p className="text-sm">Amount: {order.amount}</p>
                  <p className="text-sm font-medium">Total: ${order.total}</p>
                  <p className="text-sm">
                    Payment Status:{' '}
                    <span className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </p>
                  <p className="text-sm">
                    Shipping Status:{' '}
                    <span className={order.isShipped ? 'text-green-600' : 'text-yellow-600'}>
                      {order.isShipped ? 'Shipped' : 'Pending'}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-2 justify-center items-end">
                  <Button size="sm" onClick={() => togglePaid(order.id)}>
                    Mark as {order.isPaid ? 'Unpaid' : 'Paid'}
                  </Button>
                  {!order.isShipped && (
                    <Button size="sm" variant="outline" onClick={() => markShipped(order.id)}>
                      Mark as Shipped
                    </Button>
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
