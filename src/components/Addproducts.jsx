import axios from 'axios';
import React, { useState } from 'react'
import Loader from './Loader';

const Addproducts = () => {

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [photo, setPhoto] = useState("");


    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const formdata = new FormData();

            formdata.append("product_name", productName);
            formdata.append("product_description", description);
            formdata.append("product_cost", cost);
            formdata.append("product_photo", photo);

            const response = await axios.post('https://jeankariuki.alwaysdata.net/api/add_product', formdata)

            setLoading(false);
            setSuccess(response.data.message)

            setProductName("");
            setDescription("");
            setCost("");
            setPhoto("")

            e.target.reset()

            setTimeout(() => {
                setSuccess("");
            }, 5000);
        }

        catch (error) {
            setLoading(false);
            setError("Something went wrong")

            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }


    return (
        <div className='row justify-content-center mt-4 all'>
            <div className='card col-md-6 shadow p-4 wrapper'>
                <h1 className='text-light'>Add a Book</h1>

                <center> {loading && <Loader />}</center>
                <h5 className="text-success">{success}</h5>
                <h5 className="text-danger">{error}</h5>

                <form onSubmit={handleSubmit}>

                    <div className="input-box">
                        <input type="text"
                            placeholder='Enter the book name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required /> <br />
                        {/* {productName}  */}
                    </div>


                    <div className="input-box">
                        <input type="text"
                            placeholder='Enter the book description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required />
                        <br />
                        {/* {description} */}
                    </div>


                    <div className="input-box">
                        <input type="text"
                            placeholder='Enter the book cost'
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            required /> <br />
                        {/* {cost} */}
                    </div>


                    <div className="input-box">
                        <input type="file"
                            placeholder='Upload the book photo'
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required /> <br />
                    </div>

                    <input type="submit" value="Add Book" className='btn' />

                </form>

            </div>
        </div>
    )
}

export default Addproducts
