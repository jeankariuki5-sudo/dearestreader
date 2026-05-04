import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/Signin.css'
import Loader from './Loader';


const Signin = ({ setUser }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    // Where to send the user after login (defaults to home)
    const from = location.state?.from || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);

            const response = await axios.post('https://jeankariuki.alwaysdata.net/api/signin', formdata);

            setLoading(false);

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(response.data.user);
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                }
                // ← Send them back where they came from
                navigate(from);
            } else {
                setError("Login Failed. Please try again...");
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong. Please check your connection and try again.");
        }
    };

    return (
        <div className='row justify-content-center mt-4 all'>
            <div className="card col-md-6 shadow p-4 wrapper">
                <h1 className='text-light'>Sign In</h1>

                {/* Show a contextual prompt when redirected from a purchase action */}
                {location.state?.from && (
                    <div className="alert alert-warning py-2 mb-3" style={{ fontSize: '0.9rem' }}>
                        Please sign in to complete your purchase.
                    </div>
                )}

                <center>{loading && <Loader />}</center>
                <h1 className="text-success">{success}</h1>
                <h4 className="text-danger">{error}</h4>

                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder='Enter your email address'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /><br />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='Enter your password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br />
                    </div>

                    <input
                        type="submit"
                        value={loading ? "Signing in..." : "Sign in"}
                        className='btn btn-dark'
                        disabled={loading}
                    />
                    <br /><br />
                    <div className='switch'>
                        Don't have an account? <Link to={'/signup'}>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
