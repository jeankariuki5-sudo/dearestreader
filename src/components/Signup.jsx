import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader';

const Signup = () => {
    // initialize hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");


    // define the 3 states an application will move to
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    // below is a function that will handle the submit action
    const handleSubmit = async (e) => {
        // below we prevent our sight from realoading
        e.preventDefault()

        // update our loading hook with a message thet will be displayed to the users who are trying to register
        setLoading(true)

        try {
            // create a form data object that will enable you to capture the form details entered on the form
            const formdata = new FormData();

            // insert form details(username, email, password, phone) in terms of key-value pairs
            formdata.append("username", username);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", phone);

            // by use of axios we can access the method POST
            const response = await axios.post('https://jeankariuki.alwaysdata.net/api/signup', formdata)

            // set back the loading hook to default
            setLoading(false);

            // just incase everything goes on well update the success hook with a message
            setSuccess(response.data.success)

            // clear your hooks 
            setUsername("")
            setEmail("")
            setPassword("")
            setPhone("")
        }
        catch (error) {
            // set the loading hook back to default
            setLoading(false);

            // update the error hook with the message given back from the response
            setError(error.message)
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
                        {/* {username} */}
                    </div>

                    <div className="input-box">
                        <input type="email"
                            placeholder='Enter the email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required /> <br />
                        {/* {email} */}
                    </div>

                    <div className="input-box">
                        <input type="password"
                            placeholder='Enter the password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required /> <br />
                        {/* {password} */}
                    </div>

                    <div className="input-box">
                        <input type="tel"
                            placeholder='Enter the mobile phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required /> <br />
                        {/* {phone} */}
                    </div>

                    <input type="submit" value="Signup" className='btn' />
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