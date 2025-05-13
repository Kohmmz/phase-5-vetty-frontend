import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../../api/api';
import './ServiceHistory.css';

Chart.register(ArcElement, Tooltip, Legend);

const ServiceHistory = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServiceHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/service_requests/');
      setServiceHistory(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchServices = async () => {
    setError(null);
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchServiceHistory();
    fetchServices();
  }, []);

  const getServiceById = (service_id) => {
    return services.find((service) => service.id === service_id);
  };

  // Prepare data for pie chart
  const statusCounts = serviceHistory.reduce(
    (acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieData = {
    labels: ['Completed', 'Cancelled', 'Pending'],
    datasets: [
      {
        data: [
          statusCounts['completed'] || 0,
          statusCounts['cancelled'] || 0,
          statusCounts['pending'] || 0,
        ],
        backgroundColor: ['#22c55e', '#ef4444', '#fbbf24'],
        hoverBackgroundColor: ['#16a34a', '#dc2626', '#ca8a04'],
      },
    ],
  };

  return (
    <div className="service-history-container">
      <div className="service-history-header">
        <h2 className="service-history-title">Service History</h2>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div style={{ maxWidth: '400px', marginBottom: '1rem' }}>
        <Pie data={pieData} />
      </div>

      <table className="service-history-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e40af', color: 'white' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Client</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Service</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Duration</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date & Time</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {serviceHistory.map((record) => {
            const service = getServiceById(record.service_id);
            return (
              <tr key={record.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{record.client || record.user_id}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{service ? service.name : 'N/A'}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{service ? service.category || 'N/A' : 'N/A'}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{service ? service.duration || 'N/A' : 'N/A'}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {new Date(record.appointment_time).toLocaleString()}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <span
                    style={{
                      color:
                        record.status === 'completed'
                          ? '#22c55e'
                          : record.status === 'cancelled'
                          ? '#ef4444'
                          : '#fbbf24',
                      fontWeight: '600',
                    }}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceHistory;
