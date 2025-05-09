import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEmail } from 'react-icons/md';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { loginUser, registerUser, verifyEmail } from '../../../redux/authActions';
import { setAuthToken } from '../../../redux/authSlice';
import { clearAuthError, setAuthError } from '../../../redux/errorSlice';
import Input from '../../ui/Input';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { token, userType } = useSelector((state) => state.auth);
    const { error: authError } = useSelector((state) => state.error);
    const [action, setAction] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        otp: '',
    });
    const [emailForVerification, setEmailForVerification] = useState('');
    // Removed local userType state, use redux userType instead

    // Alert when verification email is sent after registration
    useEffect(() => {
        if (emailForVerification && action === 'verify') {
            alert("A verification email has been sent to " + emailForVerification + ". Please check your inbox.");
        }
    }, [emailForVerification, action]);

    // Removed alert on email verified successfully when action changes from 'verify' to 'login'
    // useEffect(() => {
    //     if (action === 'login') {
    //         alert('Email verified successfully. You can now log in.');
    //     }
    // }, [action]);

    // Password visibility toggle for login and registration
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [showPasswordRegister, setShowPasswordRegister] = useState(false);

    // Clear auth error on mount to avoid stale errors
    useEffect(() => {
        dispatch(clearAuthError());
    }, [dispatch]);

    // Dispatch setAuthToken when token changes
    useEffect(() => {
        if (token) {
            dispatch(setAuthToken({ token }));
        }
    }, [token, dispatch]);

    // Handle input changes for form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        dispatch(clearAuthError()); // Clear any previous errors on input change
    };

    // Handle login submission for both clients and administrators
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            dispatch(clearAuthError());
            dispatch(setAuthError('Email is required.'));
            return;
        }
        if (!formData.password) {
            dispatch(clearAuthError());
            dispatch(setAuthError('Password is required.'));
            return;
        }
        dispatch(loginUser(formData.email, formData.password, navigate));
    };

    // Handle client registration only
    const handleRegistration = async (e) => {
        e.preventDefault();
        if (userType !== 'client') {
            return; // Prevent registration for administrators
        }
        dispatch(registerUser(formData.username, formData.email, formData.password, userType, setEmailForVerification, setFormData, setAction));
    };

    // Handle email verification submission
    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            await dispatch(verifyEmail(emailForVerification, formData.otp, navigate));
            setAction('login');
            setFormData({ username: '', email: '', password: '', otp: '' });
            setEmailForVerification('');
            dispatch(clearAuthError());
        } catch {
            // error handled in verifyEmail action
        }
    };

    // Toggle between login and register actions for clients only
    const toggleAction = () => {
        if (userType === 'client') {
            setFormData({ username: '', email: '', password: '', otp: '' }); // Clear form data
            dispatch(clearAuthError()); // Clear any previous errors
            setAction(action === 'login' ? 'register' : 'login');
        }
    };

    // Password toggle handlers
    const toggleShowPasswordLogin = () => setShowPasswordLogin(!showPasswordLogin);
    const toggleShowPasswordRegister = () => setShowPasswordRegister(!showPasswordRegister);

    return (
        <div className="login-root container">
            <div className="card">
                {action === 'login' && (
                    <form className="form" onSubmit={handleLogin}>
                        <h2>{userType === 'client' ? 'Login' : 'Administrator Login'}</h2>
                        {authError && <p className="error">{authError}</p>}
                        <div className="inputGroup">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <MdEmail className="icon" />
                        </div>
                        <div className="inputGroup" style={{ position: 'relative' }}>
                            <Input
                                type={showPasswordLogin ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FaLock className="icon" />
                            <span
                                className="passwordToggle"
                                onClick={toggleShowPasswordLogin}
                                role="button"
                                tabIndex={0}
                                aria-label={showPasswordLogin ? 'Hide password' : 'Show password'}
                            >
                                {showPasswordLogin ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className="button" type="submit">
                            Login
                        </button>
                        {userType === 'client' && (
                            <>
                                <p className="link" style={{ marginTop: '10px', fontSize: '0.9em' }}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/reset-password');
                                        }}
                                    >
                                        Forgot Password?
                                    </a>
                                </p>
                                <p className="link" style={{ marginTop: '15px', fontSize: '0.9em' }}>
                                    Don't have an account?{' '}
                                    <span onClick={toggleAction} className="link">
                                        Register
                                    </span>
                                </p>
                            </>
                        )}
                    </form>
                )}

                {action === 'register' && (
                    <form className="form" onSubmit={handleRegistration}>
                        <h2>Register</h2>
                        {authError && <p className="error">{authError}</p>}
                        <div className="inputGroup">
                        <Input
                            type="text"
                            name="username"
                            placeholder="Name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon" />
                        </div>
                        <div className="inputGroup">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <MdEmail className="icon" />
                        </div>
                        <div className="inputGroup" style={{ position: 'relative' }}>
                            <Input
                                type={showPasswordRegister ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FaLock className="icon" />
                            <span
                                className="passwordToggle"
                                onClick={toggleShowPasswordRegister}
                                role="button"
                                tabIndex={0}
                                aria-label={showPasswordRegister ? 'Hide password' : 'Show password'}
                            >
                                {showPasswordRegister ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className="button" type="submit">
                            Register
                        </button>
                        <p className="link" style={{ marginTop: '15px', fontSize: '0.9em' }}>
                            Already have an account?{' '}
                            <span onClick={toggleAction} className="link">
                                Login
                            </span>
                        </p>
                    </form>
                )}

                {action === 'verify' && (
                    <form className="form" onSubmit={handleVerification}>
                        <h2>Email Verification</h2>
                        <p>Please enter the verification code sent to your email: {emailForVerification}</p>
                        {authError && <p className="error">{authError}</p>}
                        <div className="inputGroup">
                            <Input
                                type="text"
                                name="otp"
                                placeholder="Verification Code"
                                value={formData.otp}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="button" type="submit">
                            Verify
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
