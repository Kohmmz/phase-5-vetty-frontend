// LogOut.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    // Determine user type based on the previous route and redirect
    const userType = location.state?.userType;
    if (userType === 'administrator') {
      navigate('/login', { state: { userType: 'administrator' } });
    } else {
      navigate('/login', { state: { userType: 'client' } });
    }
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogOut;