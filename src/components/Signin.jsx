import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/Signin.css'
import Loader from './Loader';


const Signin = () => {

    // Define the two hooks for capturing/storing the users input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Declare the three additional hooks
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // below we have the useNavigate hook to redirect us to another page on successful signin
    const navigate = useNavigate()

    // Below is the function to handle the sign in action
    const handleSubmit = async (e) => {
        // prevent the site from reloading
        e.preventDefault()

        // Update the loading hook with a message
        setLoading(true)

        try {
            // Create a form data object
            const formdata = new FormData()

            // insert/append the email and the password on the Formdata created
            formdata.append("email", email);
            formdata.append("password", password);

            // interact with axios for the response
            const response = await axios.post('https://jeankariuki.alwaysdata.net/api/signin', formdata);

            // set the loading hook back to default
            setLoading(false);

            // Check whether the user exists as part of your response from the API
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                // Store JWT token for protected API calls
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                }
                navigate("/");
            }
            else {
                // user is not found, that means the credentials entered in the form are incorrect
                setError("Login Failed. Please try again...")
            }
        }
        catch (error) {
            // Set loading back to default
            setLoading(false)

            // Update the error hook with message
            setError("Something went wrong. Please check your connection and try again.")
        }
    }

    return (
        <div className='row justify-content-center mt-4 all'>
            <div className="card col-md-6 shadow p-4 wrapper">
                <h1 className='text-light'>Sign In</h1>

                <center> {loading && <Loader />} </center>
                <h1 className="text-success">{success}</h1>
                <h4 className="text-danger">{error}</h4>

                <form onSubmit={handleSubmit}>

                    <div className="input-box">
                        <input type="email"
                            placeholder='Enter your email address'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} /> <br />

                        {/* {email} */}

                    </div>


                    <div className="input-box">
                        <input type="password"
                            placeholder='Enter your password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} /> <br />

                        {/* {password} */}
                    </div>


                    {/* FIX #5: Disable submit while loading to prevent double-submission */}
                    <input type="submit"
                        value={loading ? "Signing in..." : "Sign in"}
                        className='btn btn-dark'
                        disabled={loading} />
                    <br /> <br />
                    <div className='switch'>
                        Don't have an account? <Link to={'/signup'}>Sign up</Link>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default Signin