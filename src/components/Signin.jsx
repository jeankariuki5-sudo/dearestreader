import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/Signin.css'
import Loader from './Loader';
import { useCart } from '../context/CartContext';

const Signin = ({ setUser }) => {
    const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [loading,  setLoading]  = useState(false);
    const [success,  setSuccess]  = useState("");
    const [error,    setError]    = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from    = location.state?.from    || "/";
    const product = location.state?.product || null;   // ← passed by BookDownload
    const { clearCart } = useCart();  // ← clear previous user's cart on new login

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("")
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("password", password);

            const response = await axios.post('https://jeankariuki.alwaysdata.net/api/signin', formdata);
            setLoading(false);

            if (response.data.user) {
                clearCart();  // ← wipe any cart left behind by a previous user
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(response.data.user);
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                }
                navigate(from, { state: { product }, replace: true });
            } else {
                setError("Login failed. Please check your credentials and try again.");
            }
        } catch {
            setLoading(false);
            setError("Something went wrong. Please check your connection and try again.");
        }
    };

    return (
        <div className='all'>
            <div className="wrapper">
                <h1>Sign In</h1>

                <center>{loading && <Loader />}</center>
                {success && <div className="feedback-success">{success}</div>}
                {error   && <div className="feedback-error">{error}</div>}
                {location.state?.from && (
                    <div className="feedback-warning">
                        {product
                            ? `Please sign in to download "${product.product_name}".`
                            : "Please sign in to complete your purchase."
                        }
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="field-group">
                        <label className="field-label">Email Address</label>
                        <input
                            className="field-input"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Password</label>
                        <input
                            className="field-input"
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Signing in…" : "Sign In"}
                    </button>

                </form>

                <div className="switch">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Signin;