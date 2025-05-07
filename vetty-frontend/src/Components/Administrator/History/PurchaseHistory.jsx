import React from 'react';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import dayjs from 'dayjs';

const PurchaseHistory = () => {
  const purchaseHistory = [
    {
      id: 1,
      product: 'Flea Spray',
      date: '2025-04-18',
      customer: 'Jane Doe',
      amount: 2,
      total: 40,
    },
    {
      id: 2,
      product: 'Dog Vitamins',
      date: '2025-04-19',
      customer: 'John Smith',
      amount: 1,
      total: 25,
    },
  ];

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(purchaseHistory, null, 2)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'purchase-history.json';
    document.body.appendChild(element);
    element.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-blue-800">Purchase History</h2>
        <div>
          <Button onClick={handleDownload} size="sm" className="mr-2">
            Download History
          </Button>
          <Button onClick={handlePrint} size="sm">
            Print History
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {purchaseHistory.map(purchase => (
          <Card key={purchase.id} className="shadow-md">
              <div>
                <h3 className="font-semibold text-blue-900">{purchase.product}</h3>
                <p className="text-sm text-gray-600">Customer: {purchase.customer}</p>
                <p className="text-sm">Date: {dayjs(purchase.date).format('MMM D, YYYY')}</p>
                <p className="text-sm">Amount: {purchase.amount}</p>
                <p className="text-sm font-medium">Total: ${purchase.total}</p>
              </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
