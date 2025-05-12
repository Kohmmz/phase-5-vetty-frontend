import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchAllPayments } from '../../api/api';
import api from '../../api/api';  // Import axios instance

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PurchaseHistory = () => {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const response = await api.get('/admin/users');  // Use axios instance with baseURL
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoadingUsers(false);
  };

  const fetchPayments = async () => {
    setLoadingPayments(true);
    setError(null);
    try {
      const response = await fetchAllPayments();
      setPayments(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoadingPayments(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchPayments();
  }, []);

  // Map user id to username for label display
  const userIdToName = users.reduce((acc, user) => {
    acc[user.id] = user.username;
    return acc;
  }, {});

  // Sum amount per user from payments
  const totalPaidByUser = payments.reduce((acc, payment) => {
    acc[payment.user_id] = (acc[payment.user_id] || 0) + payment.amount;
    return acc;
  }, {});

  // Prepare data for line chart
  const labels = users.map((user) => user.username);
  const dataValues = users.map((user) => totalPaidByUser[user.id] || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Amount Paid',
        data: dataValues,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Total Amount Paid by Users' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount Paid' },
      },
      x: {
        title: { display: true, text: 'Usernames' },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
      {loadingUsers || loadingPayments ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default PurchaseHistory;
