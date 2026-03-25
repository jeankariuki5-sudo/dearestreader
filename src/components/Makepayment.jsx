import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Makepayment.css'
import Loader from './Loader';
import Footer from './Footer';


const Makepayment = () => {

    // destructure the details passed from the Getproducts component
    // The useLoacation hook allows us to get/destructure the properties passed from the previous component.
    const { product } = useLocation().state || {}

    // declare the navigate hook
    const navigate = useNavigate()

    // console.log("The details passed from getproducts are: ",product)
    // below we specify the image base url
    const img_url = "https://jeankariuki.alwaysdata.net/static/images/"

    // initialize hooks to manage the state of your application
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // create a function that will handle the submit action
    const handlesubmit = async (e) => {
        // prevent the site from reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)

        try {
            // create a form data object
            const formdata = new FormData()

            // append the data to the form data
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response = await axios.post("https://jeankariuki.alwaysdata.net/api/mpesa_payment", formdata)

            // set loading back to default
            setLoading(false)

            // update the success hook with the message
            setSuccess(response.data.message)
        }
        catch (error) {
            // if there is an error respond to error
            setLoading(false)

            // update the error hook with the error message
            setError(error.message)
        }
    }


    return (
        <div>
            <div className="all">
                <div className='row justify-content-center'>
                    {/* <button className='btn btn-outline-primary'> Back to Product </button> */}

                    <h1 className="text-light bg-success">Make Payment - Lipa na M-Pesa</h1>

                    <div className="col-md-1">
                        <input type="button"
                            className="btn btn-dark"
                            value="<- Back"
                            onClick={() => navigate("/")} />
                    </div>

                    <div className="col-md-6 card shadow p-4 green">



                        <img src={img_url + product.product_photo} alt="Product name" className='product-img' />

                        <div className="card-body ">
                            <h2 className="text-light bg-dark"> {product.product_name} </h2>

                            <p className="text-light"> {product.product_description} </p>

                            <h3 className="text-dark bg-light">Kes {product.product_cost} </h3> <br />

                            <form onSubmit={handlesubmit}>

                                {/* bind the loading hook */}
                                <center> {loading && <Loader />}</center>

                                <h3 className="text-success"> {success} </h3>
                                <h4 className="text-danger"> {error} </h4>


                                <input type="number"
                                    className='form-control'
                                    placeholder='Enter the Phone number 254XXXXXXX'
                                    required
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)} /> <br />

                                {/* {number} */}

                                <input type="submit"
                                    value="Make Payment 💳"
                                    className='btn btn-success' />
                            </form>
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Makepayment;