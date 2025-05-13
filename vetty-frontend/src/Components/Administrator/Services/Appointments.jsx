import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../../api/api';
import './Appointments.css';

Chart.register(ArcElement, Tooltip, Legend);

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/service_requests/');
      setAppointments(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, []);

  const handleApprove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/service_requests/${id}/status`, { status: 'approved' });
      await fetchAppointments();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDecline = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/service_requests/${id}/status`, { status: 'disapproved' });
      await fetchAppointments();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getServiceById = (service_id) => {
    return services.find((service) => service.id === service_id);
  };

  // Prepare data for pie chart
  const statusCounts = appointments.reduce(
    (acc, appt) => {
      acc[appt.status] = (acc[appt.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieData = {
    labels: ['Approved', 'Pending', 'Disapproved'],
    datasets: [
      {
        data: [
          statusCounts['approved'] || 0,
          statusCounts['pending'] || 0,
          statusCounts['disapproved'] || 0,
        ],
        backgroundColor: ['#22c55e', '#fbbf24', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#ca8a04', '#dc2626'],
      },
    ],
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h2 className="appointments-title">Appointments</h2>
        <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Pending: {statusCounts['pending'] || 0}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div style={{ maxWidth: '400px', marginBottom: '1rem' }}>
        <Pie data={pieData} />
      </div>

      <table className="appointments-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1e40af', color: 'white' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Client</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Service</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Duration</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date & Time</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => {
            const service = getServiceById(appt.service_id);
            return (
              <tr key={appt.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{appt.client || appt.user_id}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{service ? service.name : 'N/A'}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{service ? service.category || 'N/A' : 'N/A'}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{service ? service.duration || 'N/A' : 'N/A'}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {new Date(appt.appointment_time).toLocaleString()}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <span
                    style={{
                      color:
                        appt.status === 'approved'
                          ? '#22c55e'
                          : appt.status === 'disapproved'
                          ? '#ef4444'
                          : '#fbbf24',
                      fontWeight: '600',
                    }}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {appt.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(appt.id)}
                        style={{
                          marginRight: '0.5rem',
                          padding: '4px 8px',
                          backgroundColor: '#22c55e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(appt.id)}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
