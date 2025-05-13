import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { resetPasswordWithToken } from '../../../redux/authActions';
import './Login.css';
import Input from '../../ui/Input';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Extract token and email from query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!email) {
      setError('Email is missing in the URL.');
      alert('Email is missing in the URL.');
    }
    if (!token) {
      setError('Token is missing in the URL.');
      alert('Token is missing in the URL.');
    }
  }, [email, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all password fields.');
      alert('Please fill in all password fields.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match.');
      return;
    }

    if (!email) {
      setError('Email is missing in the URL.');
      alert('Email is missing in the URL.');
      return;
    }

    if (!token) {
      setError('Invalid or missing token.');
      alert('Invalid or missing token.');
      return;
    }

    try {
      await dispatch(resetPasswordWithToken(token, formData.newPassword, navigate));
      setSuccessMessage('Password reset successful. You can now log in.');
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="login-root container">
      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <div className="inputGroup" style={{ position: 'relative' }}>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
            <span
              className="passwordToggle"
              onClick={toggleShowPassword}
              role="button"
              tabIndex={0}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="inputGroup" style={{ position: 'relative' }}>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>
          <button className="button" type="submit" disabled={!email || !token}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
