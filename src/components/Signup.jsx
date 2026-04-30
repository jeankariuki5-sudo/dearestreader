import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // FIX #7: Password confirmation
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        // FIX #7: Validate passwords match before submitting
        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        // FIX #6: Basic phone format validation
        if (!/^(07|01|2547|2541)\d{8,}$/.test(phone.replace(/\s/g, ""))) {
            setError("Please enter a valid Kenyan phone number.");
            return;
        }

        setLoading(true)
        setError("")

        try {
            const formdata = new FormData();
            formdata.append("username", username);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", phone);

            const response = await axios.post('https://jeankariuki.alwaysdata.net/api/signup', formdata)

            setLoading(false);
            setSuccess(response.data.message)

            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setPhone("")
        }
        catch (error) {
            setLoading(false);
            // FIX #8: Show a user-friendly error, not raw Axios internals
            setError("Registration failed. Please check your details and try again.")
        }
    }


    return (
        <div className='row justify-content-center mt-4 all'>
            <div className="card col-md-6 shadow p-4 wrapper">
                <h1 className='text-light'>Sign Up</h1>

                <center> {loading && <Loader />} </center>
                <h3 className="text-success">{success}</h3>
                <h4 className="text-danger">{error}</h4>

                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input type="text"
                            placeholder='Enter the username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required /> <br />
                    </div>

                    <div className="input-box">
                        <input type="email"
                            placeholder='Enter the email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required /> <br />
                    </div>

                    <div className="input-box">
                        <input type="password"
                            placeholder='Enter the password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required /> <br />
                    </div>

                    {/* FIX #7: Confirm password field */}
                    <div className="input-box">
                        <input type="password"
                            placeholder='Confirm your password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required /> <br />
                    </div>

                    <div className="input-box">
                        <input type="tel"
                            placeholder='Enter the mobile phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required /> <br />
                    </div>

                    {/* FIX #5: Disable submit while loading */}
                    <input type="submit" value={loading ? "Signing up..." : "Signup"} className='btn' disabled={loading} />
                    <br /> <br />

                    <div className='switch'>
                        Already have an account? <Link to={'/signin'}>Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
