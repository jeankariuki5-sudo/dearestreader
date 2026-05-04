import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'
import Loader from './Loader';
import { Carousel } from 'react-bootstrap';

import banner1 from '../banners/thestrikerbanner.png'
import banner2 from '../banners/harrypotterbanner.png'
import banner3 from '../banners/kingofgluttonybanner.png'
import Footer from './Footer'
import { FiBook, FiSearch, FiShoppingCart, FiDownload, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const BASE_URL = "https://jeankariuki.alwaysdata.net";
const IMG_URL  = `${BASE_URL}/static/images/`;

const getUser = () => {
    try { return JSON.parse(localStorage.getItem("user")); }
    catch { return null; }
};

const Getproducts = () => {

    const [products,         setProducts]         = useState([]);
    const [loading,          setLoading]          = useState(false);
    const [error,            setError]            = useState("");
    const [search,           setSearch]           = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [downloadsLeft,    setDownloadsLeft]    = useState(null);
    const [downloadingId,    setDownloadingId]    = useState(null);
    const [downloadError,    setDownloadError]    = useState("");
    const [addedIds,         setAddedIds]         = useState({});

    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/get_product_details`);
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch {
            setError("Could not load books. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDownloadsLeft = useCallback(async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/download_remaining`);
            setDownloadsLeft(res.data.remaining);
        } catch {
            setDownloadsLeft(5);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchDownloadsLeft();
    }, [fetchProducts, fetchDownloadsLeft]);

    const handleSearch = (value) => {
        setSearch(value);
        if (value.length > 0) {
            const filtered = products.filter(p =>
                p.product_name.toLowerCase().includes(value.toLowerCase()) ||
                (p.genre && p.genre.toLowerCase().includes(value.toLowerCase()))
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    // Add to cart — no login required
    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedIds(prev => ({ ...prev, [product.product_id]: true }));
        setTimeout(() => {
            setAddedIds(prev => ({ ...prev, [product.product_id]: false }));
        }, 1500);
    };

    // Buy Now — login required
    const handleBuyNow = (product) => {
        if (!getUser()) {
            navigate('/signin', { state: { from: '/' } });
            return;
        }
        navigate('/makepayment', { state: { product } });
    };

    const handleDownload = async (product) => {
        if (downloadsLeft !== null && downloadsLeft <= 0) {
            setDownloadError("You've reached your 5 free downloads for today. Come back tomorrow!");
            setTimeout(() => setDownloadError(""), 5000);
            return;
        }
        setDownloadingId(product.product_id);
        setDownloadError("");
        try {
            const response = await axios.get(
                `${BASE_URL}/api/download_pdf/${product.product_pdf}`,
                { responseType: "blob" }
            );
            const url  = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href  = url;
            link.setAttribute("download", product.product_pdf);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setDownloadsLeft(prev => Math.max(0, (prev ?? 5) - 1));
        } catch (err) {
            if (err.response?.status === 429) {
                setDownloadError("Daily download limit reached (5/day). Come back tomorrow!");
            } else {
                setDownloadError("Download failed. Please try again.");
            }
            setTimeout(() => setDownloadError(""), 5000);
        } finally {
            setDownloadingId(null);
        }
    };

    const thirtyDaysAgo  = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const availableBooks = filteredProducts.filter(p => p.product_category !== "new_release");
    const newReleases    = filteredProducts.filter(p =>
        p.product_category === "new_release" &&
        new Date(p.created_at) > thirtyDaysAgo
    );

    const BookCard = ({ product }) => {
        const isEbook           = Boolean(product.product_pdf);
        const isThisDownloading = downloadingId === product.product_id;
        const outOfDownloads    = downloadsLeft !== null && downloadsLeft <= 0;
        const justAdded         = addedIds[product.product_id];
        const inCart            = cartItems.some(i => i.product_id === product.product_id);

        return (
            <div className="col-md-3 justify-content-center mb-3">
                <div className="card shadow green">
                    <img
                        src={IMG_URL + product.product_photo}
                        alt={product.product_name}
                        className='product-img mt-3'
                    />
                    <div className="card-body green">
                        <h5 className="text-light bg-dark">
                            {product.product_name.slice(0, 23)}{product.product_name.length > 23 ? "…" : ""}
                        </h5>

                        {product.genre && (
                            <span className="genre-badge">{product.genre}</span>
                        )}

                        <p className="text-light mt-1">
                            {product.product_description.slice(0, 90)}
                            {product.product_description.length > 90 ? "…" : ""}
                        </p>

                        {!isEbook && (
                            <h4 className="text-dark bg-light">Kes.{product.product_cost}</h4>
                        )}

                        <div className="d-flex gap-2 justify-content-center flex-wrap mt-2">

                            {!isEbook && (
                                <>
                                    {/* Add to Cart — no login required */}
                                    <button
                                        className={`btn btn-sm d-flex align-items-center gap-1 ${
                                            justAdded ? "btn-success" : "btn-outline-success"
                                        }`}
                                        onClick={() => handleAddToCart(product)}
                                        title={inCart ? "Already in cart — adds another" : "Add to cart"}
                                    >
                                        {justAdded
                                            ? <><FiCheck size={14} /> Added!</>
                                            : <><FiShoppingCart size={14} /> {inCart ? "Add again" : "Add to Cart"}</>
                                        }
                                    </button>

                                    {/* Buy Now — login required */}
                                    <button
                                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-1"
                                        onClick={() => handleBuyNow(product)}
                                    >
                                        Buy Now
                                    </button>
                                </>
                            )}

                            {isEbook && (
                                <button
                                    className={`btn btn-sm d-flex align-items-center gap-1 ${
                                        outOfDownloads ? "btn-secondary" : "btn-success"
                                    }`}
                                    onClick={() => handleDownload(product)}
                                    disabled={isThisDownloading || outOfDownloads}
                                    title={outOfDownloads ? "Daily limit reached" : "Free e-book download"}
                                >
                                    <FiDownload size={14} />
                                    {isThisDownloading ? "Downloading…" : outOfDownloads ? "Limit reached" : "Free PDF"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Carousel
                className="mb-4"
                prevIcon={<span className="p-3 bg-dark rounded-circle carousel-control-prev-icon" aria-hidden="true" />}
                nextIcon={<span className="p-3 bg-dark rounded-circle carousel-control-next-icon" aria-hidden="true" />}
                variant='dark'
            >
                <Carousel.Item>
                    <img className="d-block w-100" src={banner1} alt="First slide"  style={{ height: "500px", objectFit: "cover" }} />
                    <Carousel.Caption className='text-dark'></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={banner2} alt="Second slide" style={{ height: "500px", objectFit: "cover" }} />
                    <Carousel.Caption className='text-dark'></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={banner3} alt="Third slide"  style={{ height: "500px", objectFit: "cover" }} />
                    <Carousel.Caption className='text-dark'></Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {downloadsLeft !== null && (
                <div className={`download-quota-bar ${downloadsLeft === 0 ? "quota-empty" : ""}`}>
                    {downloadsLeft > 0
                        ? `📥 Free e-book downloads remaining today: ${downloadsLeft} / 5`
                        : `🚫 Daily download limit reached. Resets at midnight.`
                    }
                </div>
            )}

            {downloadError && (
                <div className="alert alert-danger text-center mx-4 mt-2">{downloadError}</div>
            )}

            <div className="search-wrapper">
                <div className="search-box">
                    <FiSearch className='search-icon' />
                    <input
                        type="text"
                        placeholder="Search by title or genre…"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-btn">Search</button>
                    <button
                        className="clear-btn"
                        onClick={() => { setSearch(""); setFilteredProducts(products); }}
                    >
                        Clear
                    </button>
                </div>

                {search && (
                    <ul className="search-dropdown">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <li
                                    key={product.product_id}
                                    className="search-item"
                                    onClick={() => setSearch(product.product_name)}
                                >
                                    <FiBook className='book-icon' /> {product.product_name}
                                    {product.genre && <span className="search-genre"> — {product.genre}</span>}
                                </li>
                            ))
                        ) : (
                            <li className="no-results">No results found</li>
                        )}
                    </ul>
                )}
            </div>

            <center>{loading && <Loader />}</center>
            <h4 className="text-danger text-center">{error}</h4>

            {newReleases.length > 0 && (
                <div className='row all'>
                    <div className="section-header new-release-header">
                        <span className="section-badge">🆕 NEW</span>
                        <h1>New Releases</h1>
                    </div>
                    {newReleases.map((product) => (
                        <BookCard key={product.product_id} product={product} />
                    ))}
                </div>
            )}

            <div className='row all'>
                <div className="section-header available-header">
                    <h1>📖 Available Books</h1>
                </div>
                {availableBooks.length > 0 ? (
                    availableBooks.map((product) => (
                        <BookCard key={product.product_id} product={product} />
                    ))
                ) : (
                    !loading && <p className="text-light text-center w-100">No books available yet.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Getproducts;
