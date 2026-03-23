import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'
import Loader from './Loader';
import { Carousel } from 'react-bootstrap';

import banner1 from '../banners/thestrikerbanner.png'
import banner2 from '../banners/harrypotterbanner.png'
import banner3 from '../banners/kingofgluttonybanner.png'
import Footer from './Footer'

const Getproducts = () => {

    // Initialize hooks to help you manage the state of your application
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // search bar
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Declare the navigate hook
    const navigate = useNavigate()

    // below we specify the image base url
    const img_url = "https://jeankariuki.alwaysdata.net/static/images/"

    // Create a function to help you fetch the products of your API
    const fetchProducts = async () => {
        try {
            // Update the loading hook
            setLoading(true)



            // interact with your endpoint for fetching the products
            const response = await axios.get('https://jeankariuki.alwaysdata.net/api/get_product_details')

            // update the products hook with the response given by the API
            setProducts(response.data);
            setFilteredProducts(response.data);

            // set the loading hook back to default
            setLoading(false)
        }

        // If there is an error
        catch (error) {
            // set loading hook back to default
            setLoading(false)


            // update the error hook with a message
            setError("Something went wrong")
        }
    }

    // we shall use the useEffect hook that automatically re-render new features in case of any changes
    useEffect(() => {
        fetchProducts()
    }, [])

    // console.log("The products fetched are:", products)
    const handleSearch = (value) => {
        setSearch(value);

        if (value.length > 0) {
            const filtered = products.filter(product =>
                product.product_name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <div>


            <Carousel className="mb-4"
                prevIcon={<span className="p-3 bg-dark rounded-circle carousel-control-prev-icon" aria-hidden="true" />}
                nextIcon={<span className="p-3 bg-dark rounded-circle carousel-control-next-icon" aria-hidden="true" />}
                variant='dark'
            >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner1}
                        alt="First slide"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <Carousel.Caption className='text-dark'>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner2}
                        alt="Second slide"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <Carousel.Caption className='text-dark'>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner3}
                        alt="Third slide"
                        style={{ height: "500px", objectFit: "cover" }}
                    />
                    <Carousel.Caption className='text-dark'>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Search books..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                />

                {search && (
                    <ul className="search-dropdown">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <li
                                    key={product.product_id}
                                    className="search-item"
                                    onClick={() => setSearch(product.product_name)}
                                >
                                    📚 {product.product_name}
                                </li>
                            ))
                        ) : (
                            <li className="no-results">No results found</li>
                        )}
                    </ul>
                )}
            </div>


            <div className='row all'>


                <h1 className="text-light bg-success">Available Books</h1>

                <center> {loading && <Loader />}</center>
                <h4 className="text-danger">{error}</h4>

                {/* map the products fetched from the API to the user interface */}

                {filteredProducts.map((product) => (
                    <div className="col-md-3 justify-content-center mb-3">



                        <div className="card shadow green">
                            <img
                                src={img_url + product.product_photo}
                                alt="product name"
                                className='product-img mt-3' />

                            <div className="card-body brown">
                                <h5 className="text-light bg-dark"> {product.product_name.slice(0, 23)}... </h5>

                                <p className="text-dark"> {product.product_description.slice(0, 90)}... </p>

                                <h4 className="text-dark bg-light"> Kes.{product.product_cost} </h4>

                                <button className="btn btn-outline-dark" onClick={() => navigate("/makepayment", { state: { product } })}>Purchase now</button>
                            </div>
                        </div>
                    </div>
                ))
                }

            </div >

            <Footer />

        </div>
    )
}

export default Getproducts
