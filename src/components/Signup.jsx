import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader';
import '../css/Signup.css'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (!/^(07|01|2547|2541)\d{8,}$/.test(phone.replace(/\s/g, ""))) {
            setError("Please enter a valid Kenyan phone number.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("username", username);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", phone);

            const response = await axios.post('https://jeankariuki.alwaysdata.net/api/signup', formdata);
            setLoading(false);

            if (!response.data.success) {
                // Backend returned an error (e.g. duplicate email)
                setError(response.data.error);
            } else {
                setSuccess(response.data.message);
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setPhone("");
            }
        } catch {
            setLoading(false);
            setError("Registration failed. Please check your connection and try again.");
        }
    };
    return (
        <div className='all'>
            <div className="wrapper">
                <h1>Sign Up</h1>

                <center>{loading && <Loader />}</center>
                {success && <div className="feedback-success">{success}</div>}
                {error && <div className="feedback-error">{error}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="field-group">
                        <label className="field-label">Username</label>
                        <input
                            className="field-input"
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Email Address</label>
                        <input
                            className="field-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Password</label>
                        <input
                            className="field-input"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Confirm Password</label>
                        <input
                            className="field-input"
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Phone Number</label>
                        <input
                            className="field-input"
                            type="tel"
                            placeholder="07XXXXXXXX or 2547XXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Creating account…" : "Sign Up"}
                    </button>

                </form>

                <div className="switch">
                    Already have an account? <Link to="/signin">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
