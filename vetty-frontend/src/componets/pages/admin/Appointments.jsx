import React, { useState } from 'react';
import Card from '../../ui/card';
import { Button } from '../../ui/buttons';
import dayjs from 'dayjs';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: 'Alice Walker',
      service: 'Vaccination',
      date: '2025-05-10',
      time: '14:00',
      status: 'pending',
    },
    {
      id: 2,
      client: 'Bob Smith',
      service: 'Check-up',
      date: '2025-05-12',
      time: '10:30',
      status: 'approved',
    },
  ]);

  const handleApprove = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: 'approved' } : appt
      )
    );
  };

  const handleDecline = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: 'declined' } : appt
      )
    );
  };

  const formatDateTime = (date, time) => {
    return dayjs(`${date}T${time}`).format('MMM D, YYYY [at] h:mm A');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold text-blue-800">Appointments</h2>
        <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Pending: {appointments.filter((a) => a.status === 'pending').length}
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((appt) => (
          <Card key={appt.id} className="shadow-md">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">{appt.client}</h3>
                <p className="text-sm text-gray-600">Service: {appt.service}</p>
                <p className="text-sm">Date & Time: {formatDateTime(appt.date, appt.time)}</p>
                <p className="text-sm">
                  Status:{' '}
                  <span
                    className={`font-medium ${
                      appt.status === 'approved'
                        ? 'text-green-600'
                        : appt.status === 'declined'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </p>
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
        ))}
      </div>
    </div>
  );
};

export default Appointments;