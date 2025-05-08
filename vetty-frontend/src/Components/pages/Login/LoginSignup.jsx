import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEmail } from 'react-icons/md';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginSignup.module.css';
import { loginUser, registerUser, verifyEmail } from '../../../redux/authActions';
import { setAuthToken } from '../../../redux/authSlice';
import { clearAuthError } from '../../../redux/errorSlice';

const LoginSignup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { error: authError } = useSelector((state) => state.error);
    const [action, setAction] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [emailForVerification, setEmailForVerification] = useState('');
    
    // Password visibility toggle for login and registration
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [showPasswordRegister, setShowPasswordRegister] = useState(false);

    // Determine user type from location state or default to 'client'
    const userType = location.state?.userType || 'client';

    // Dispatch setAuthToken when token changes
    useEffect(() => {
        if (token) {
            dispatch(setAuthToken(token));
        }
    }, [token, dispatch]);

    // Detect verify-email route with token query param and verify email automatically
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');
        if (location.pathname === '/verify-email' && tokenParam) {
            dispatch(verifyEmail(tokenParam))
                .then(() => {
                    alert('Verification for email is successful. You can now proceed to login.');
                    setAction('login'); // Ensure login form is shown
                    setFormData({ username: '', email: '', password: '' }); // Reset form data
                })
                .catch(() => {
                    setAction('login');
                });
        }
    }, [location, dispatch]);

    // Handle input changes for form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        dispatch(clearAuthError()); // Clear any previous errors on input change
    };

    // Handle login submission for both clients and administrators
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser(formData.email, formData.password, userType, navigate));
    };

    // Handle client registration only
    const handleRegistration = async (e) => {
        e.preventDefault();
        if (userType !== 'client') {
            return; // Prevent registration for administrators
        }
        dispatch(registerUser(formData.username, formData.email, formData.password, userType, setEmailForVerification, setFormData, () => {}));
        alert('Registration successful. Please check your email to verify your account.');
        setAction('login');
    };

    // Toggle between login and register actions for clients only
    const toggleAction = () => {
        if (userType === 'client') {
            setFormData({ username: '', email: '', password: '' }); // Clear form data
            dispatch(clearAuthError()); // Clear any previous errors
            setAction(action === 'login' ? 'register' : 'login');
        }
    };

    // Password toggle handlers
    const toggleShowPasswordLogin = () => setShowPasswordLogin(!showPasswordLogin);
    const toggleShowPasswordRegister = () => setShowPasswordRegister(!showPasswordRegister);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {action === 'login' && (
                    <form className={styles.form} onSubmit={handleLogin}>
                        <h2>{userType === 'client' ? 'Client Login' : 'Administrator Login'}</h2>
                        {authError && <p className={styles.error}>{authError}</p>}
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <MdEmail className={styles.icon} />
                        </div>
                        <div className={styles.inputGroup} style={{ position: 'relative' }}>
                            <input
                                type={showPasswordLogin ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FaLock className={styles.icon} />
                            <span
                                className={styles.passwordToggle}
                                onClick={toggleShowPasswordLogin}
                                role="button"
                                tabIndex={0}
                                aria-label={showPasswordLogin ? 'Hide password' : 'Show password'}
                            >
                                {showPasswordLogin ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className={styles.button} type="submit">
                            Login
                        </button>
                        {userType === 'client' && (
                            <>
                                <p className={styles.link} style={{ marginTop: '10px', fontSize: '0.9em' }}>
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
                                <p className={styles.link} style={{ marginTop: '15px', fontSize: '0.9em' }}>
                                    Don't have an account?{' '}
                                    <span onClick={toggleAction} className={styles.link}>
                                        Register
                                    </span>
                                </p>
                            </>
                        )}
                    </form>
                )}

                {action === 'register' && (
                    <form className={styles.form} onSubmit={handleRegistration}>
                        <h2>Register</h2>
                        {authError && <p className={styles.error}>{authError}</p>}
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <FaUser className={styles.icon} />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <MdEmail className={styles.icon} />
                        </div>
                        <div className={styles.inputGroup} style={{ position: 'relative' }}>
                            <input
                                type={showPasswordRegister ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FaLock className={styles.icon} />
                            <span
                                className={styles.passwordToggle}
                                onClick={toggleShowPasswordRegister}
                                role="button"
                                tabIndex={0}
                                aria-label={showPasswordRegister ? 'Hide password' : 'Show password'}
                            >
                                {showPasswordRegister ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className={styles.button} type="submit">
                            Register
                        </button>
                        <p className={styles.link} style={{ marginTop: '15px', fontSize: '0.9em' }}>
                            Already have an account?{' '}
                            <span onClick={toggleAction} className={styles.link}>
                                Login
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
