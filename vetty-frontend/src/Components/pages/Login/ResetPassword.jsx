import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { sendPasswordResetVerificationCode, resetPasswordWithToken, verifyOTP } from '../../../redux/authActions';
import './Login.css';
import Input from '../../ui/Input';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Send verification code to email
  const sendCode = async () => {
    if (!formData.email) {
      setError('Please enter your email.');
      alert('Please enter your email.');
      return false;
    }
    try {
      await dispatch(sendPasswordResetVerificationCode(formData.email));
      setCodeSent(true);
      alert('Verification code sent to your email.');
      return true;
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
      alert('Failed to send verification code. Please try again.');
      return false;
    }
  };

  // Verify the entered verification code
  const verifyCode = async () => {
    if (!formData.verificationCode) {
      setError('Please enter the verification code.');
      alert('Please enter the verification code.');
      return false;
    }
    try {
      await dispatch(verifyOTP(formData.email, formData.verificationCode, () => {}));
      setCodeVerified(true);
      alert('Verification code verified. You can now reset your password.');
      return true;
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      alert('Invalid verification code. Please try again.');
      return false;
    }
  };

  // Reset password after verification
  const resetPassword = async () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all password fields.');
      alert('Please fill in all password fields.');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match.');
      return false;
    }
    try {
      setIsResetting(true);
      await dispatch(resetPasswordWithToken(formData.verificationCode, formData.newPassword, navigate));
      setSuccessMessage('Password reset successful. Redirecting to login...');
      alert('Password reset successful. Redirecting to login...');
      navigate('/login');
      return true;
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      alert('Failed to reset password. Please try again.');
      return false;
    } finally {
      setIsResetting(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!codeSent) {
      // First step: send verification code
      const sent = await sendCode();
      if (!sent) return;
    } else if (!codeVerified) {
      // Second step: verify code
      const verified = await verifyCode();
      if (!verified) return;
    } else {
      // Third step: reset password
      await resetPassword();
    }
  };

  return (
    <div className="login-root container">
      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          {!codeSent && (
            <>
              <div className="inputGroup" style={{ position: 'relative' }}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FaEnvelope className="icon" />
              </div>
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
              <button className="button" type="submit" disabled={isResetting}>
                Send Verification Code
              </button>
            </>
          )}

          {codeSent && !codeVerified && (
            <>
              <div className="inputGroup" style={{ position: 'relative' }}>
                <Input
                  type="text"
                  name="verificationCode"
                  placeholder="Enter Verification Code"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="button" type="submit" disabled={isResetting}>
                Verify Code
              </button>
            </>
          )}

          {codeVerified && (
            <>
              <button className="button" type="submit" disabled={isResetting}>
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
