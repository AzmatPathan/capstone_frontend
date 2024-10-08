import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

import Loader from '../components/Loader';
import Message from '../components/Message';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userName, setUserName] = useState(''); // Add this state to store user name

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [login, { isLoading }] = useLoginMutation();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/dashboard';

    useEffect(() => {
        if (userInfo) {
            console.log('Navigating to:', redirect);
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login({ email, password }).unwrap();

            dispatch(setCredentials({ ...res }));
            setUserName(res.name); // Assuming the API response contains the user's name
            localStorage.setItem('userInfo', JSON.stringify(res));
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo')); // Retrieve it right away to check
            console.log('Stored User Info:', storedUserInfo);
            navigate('/profile', { state: { userName: res.name, email: res.email } });

            dispatch(setCredentials(res)); // Assuming `res` already contains necessary user info
            setLoading(false);

        } catch (err) {
            setLoading(false);
            setError(err?.data?.message || err.error);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <section className="vh-100 gradient-custom d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card text-white" style={{ borderRadius: "1rem", backgroundColor: '#49266C' }}>
                            <div className="card-body p-4 text-center">
                                <h2 className="fw-bold mb-2 text-uppercase">Welcome Back</h2>
                                <p className="text-white-50 mb-4">Login to ITMS</p>
                                <form onSubmit={submitHandler}>
                                    <div className="form-outline form-white mb-3">
                                        <input
                                            type="email"
                                            id="typeEmailX"
                                            className="form-control form-control-lg"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>

                                    <div className="form-outline form-white mb-3">
                                        <input
                                            type="password"
                                            id="typePasswordX"
                                            className="form-control form-control-lg"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>

                                    <p className="small mb-3 pb-1">
                                        <Link to="/forgot" className="text-white-50">Forgot password?</Link>
                                    </p>

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                        {loading ? <Loader /> : 'Login'}
                                    </button>
                                </form>

                                <div className="d-flex justify-content-center text-center mt-3">
                                    <a href="https://www.facebook.com/TULUSband/" className="text-white mx-2">
                                        <i className="fab fa-facebook-f fa-lg"></i>
                                    </a>
                                    <a href="https://x.com/telus" className="text-white mx-2">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </a>
                                    <a href="https://www.instagram.com/telus/?hl=en" className="text-white mx-2">
                                        <i className="fab fa-instagram fa-lg"></i>
                                    </a>
                                </div>

                                <div className="mt-3">
                                    <p className="mb-0">
                                        Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link>
                                    </p>
                                </div>

                                {error && (
                                    <Message variant="danger">
                                        {error}
                                    </Message>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginScreen;
