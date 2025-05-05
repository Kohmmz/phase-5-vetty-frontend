import React from 'react';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import dayjs from 'dayjs';

const ServiceHistory = () => {
  const servicesHistory = [
    {
      id: 1,
      service: 'Vaccination',
      date: '2025-04-20',
      client: 'Alice Walker',
      status: 'Completed',
    },
    {
      id: 2,
      service: 'Check-up',
      date: '2025-04-22',
      client: 'Bob Smith',
      status: 'Completed',
    },
  ];

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(servicesHistory, null, 2)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'service-history.json';
    document.body.appendChild(element);
    element.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-blue-800">Service History</h2>
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
        {servicesHistory.map(service => (
          <Card key={service.id} className="shadow-md">
            <div>
              <h3 className="font-semibold text-blue-900">{service.service}</h3>
              <p className="text-sm text-gray-600">Client: {service.client}</p>
              <p className="text-sm">Date: {dayjs(service.date).format('MMM D, YYYY')}</p>
              <p className="text-sm">
                Status: <span className="text-green-600">{service.status}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceHistory;