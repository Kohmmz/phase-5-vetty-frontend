// frontend/src/redux/authActions.js
import axios from 'axios';
import { setAuthToken } from './authSlice';
import { setAuthError, clearAuthError } from './errorSlice';

const baseUrl = 'https://backend-testing-5o8c.onrender.com';

export const loginUser = (email, password, navigate, loginUserType) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, { email, password, loginType: loginUserType }); // Send loginType
        const { access_token, user } = response.data;
        if (access_token) {
            localStorage.setItem('token', access_token); // Save token to localStorage for persistence
            dispatch(setAuthToken({ token: access_token, userType: user?.role || 'User' })); // Store user role
            alert('Successfully logged in.');
            // Navigation will now happen in the Login component's useEffect
        } else {
            dispatch(setAuthError('Invalid credentials.'));
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            dispatch(setAuthError(error.response.data.error));
        } else {
            dispatch(setAuthError('An error occurred. Please try again.'));
        }
    }
};

export const registerUser = (name, email, password, userType, setEmailForVerification, setFormData, setAction) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/users`, { name, email, password, role: userType }); // Send role on registration
        if (response.data.message) {
            setEmailForVerification(email);
            setFormData({ name: '', email: '', password: '' });
            setAction('verify');
        } else {
            dispatch(setAuthError('Registration failed. Please try again.'));
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            dispatch(setAuthError(error.response.data.error));
        } else {
            dispatch(setAuthError('Registration failed. Please try again.'));
        }
    }
};

// New action to verify OTP for email verification
export const verifyOTP = (email, otp, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/users/verify-otp`, { email, otp });
        if (response.data.message === 'Email verified successfully.') {
            alert('Email verified successfully. You can now log in.');
            navigate('/login');
        } else {
            dispatch(setAuthError('Email verification failed. Please try again.'));
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            dispatch(setAuthError(error.response.data.error));
        } else {
            dispatch(setAuthError('Email verification failed. Please try again.'));
        }
    }
};

// Deprecated verifyEmail action (optional to remove)
export const verifyEmail = (token, navigate) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/users/verify-email?token=${token}`);
        if (response.data.message === 'Email verified successfully.') {
            alert('Email verified successfully. You can now log in.');
            navigate('/login');
        } else {
            dispatch(setAuthError('Email verification failed. Please try again.'));
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            dispatch(setAuthError(error.response.data.error));
        } else {
            dispatch(setAuthError('Email verification failed. Please try again.'));
        }
    }
};

// New action to reset password using token and new password
export const resetPasswordWithToken = (token, newPassword, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/users/password-reset-confirm`, { token, new_password: newPassword });
        if (response.data.message === 'Password has been reset successfully.') {
            alert('Password reset successful. You can now log in.');
            navigate('/login');
        } else {
            dispatch(setAuthError('Password reset failed. Please try again.'));
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            dispatch(setAuthError(error.response.data.error));
        } else {
            dispatch(setAuthError('Password reset failed. Please try again.'));
        }
    }
};
