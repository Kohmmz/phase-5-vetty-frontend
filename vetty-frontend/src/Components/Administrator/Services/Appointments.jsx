import React, { useState, useEffect } from 'react';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import dayjs from 'dayjs';
import './Appointments.css';

const BASE_API_URL = '/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_API_URL}/service_requests/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_API_URL}/service_requests/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      if (!response.ok) throw new Error('Failed to approve appointment');
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_API_URL}/service_requests/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'disapproved' }),
      });
      if (!response.ok) throw new Error('Failed to decline appointment');
      await fetchAppointments();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Helper to get service details by service_id
  const getServiceById = (service_id) => {
    return services.find((service) => service.id === service_id);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-blue-800">Appointments</h2>
        <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Pending: {appointments.filter((a) => a.status === 'pending').length}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-4">
        {appointments.map((appt) => {
          const service = getServiceById(appt.service_id);
          return (
            <Card key={appt.id} className="shadow-md">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  {service && (
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-blue-900">{appt.client || appt.user_id}</h3>
                    {service && (
                      <>
                        <p className="text-sm text-gray-600">Service: {service.name}</p>
                        <p className="text-sm text-gray-600">Category: {service.category || 'N/A'}</p>
                        <p className="text-sm text-gray-600">Duration: {service.duration || 'N/A'}</p>
                        <p className="text-sm">{service.description}</p>
                      </>
                    )}
                    {!service && <p className="text-sm">Service ID: {appt.service_id}</p>}
                    <p className="text-sm">Date & Time: {dayjs(appt.appointment_time).format('MMM D, YYYY [at] h:mm A')}</p>
                    <p className="text-sm">
                      Status:{' '}
                      <span
                        className={`font-medium ${
                          appt.status === 'approved'
                            ? 'text-green-600'
                            : appt.status === 'disapproved'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
                {appt.status === 'pending' && (
                  <div className="flex flex-col gap-2 justify-center items-end">
                    <Button size="sm" onClick={() => handleApprove(appt.id)}>
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDecline(appt.id)}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Appointments;
