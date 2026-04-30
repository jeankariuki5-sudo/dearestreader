import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css'
import Loader from './Loader';
import Footer from './Footer'
import { FiBook, FiSearch, FiDownload } from 'react-icons/fi';
import Section from './Section';

const BASE_URL = "https://jeankariuki.alwaysdata.net";

const Newreleases = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [downloadsLeft, setDownloadsLeft] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);
    const [downloadError, setDownloadError] = useState("");

    const navigate = useNavigate()

    const img_url = `${BASE_URL}/static/images/`

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/api/get_product_details`)
            const newReleaseOnly = response.data.filter(p =>
                p.product_category === "new_release" &&
                new Date(p.created_at) > thirtyDaysAgo
            );
            setProducts(newReleaseOnly);
            setFilteredProducts(newReleaseOnly);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("Something went wrong")
        }
    }

    const fetchDownloadsLeft = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/download_remaining`);
            setDownloadsLeft(res.data.remaining);
        } catch {
            setDownloadsLeft(5);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchDownloadsLeft();
    }, [])

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
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
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
            <div className="search-wrapper">
                <div className="search-box">
                    <FiSearch className='search-icon' />
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-btn">Search</button>
                    <button
                        className="clear-btn"
                        onClick={() => {
                            setSearch("");
                            setFilteredProducts(products);
                        }}
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
                                </li>
                            ))
                        ) : (
                            <li className="no-results">No results found</li>
                        )}
                    </ul>
                )}
            </div>

            {downloadError && (
                <div className="alert alert-danger text-center mx-4 mt-2">{downloadError}</div>
            )}

            {downloadsLeft !== null && (
                <div className={`download-quota-bar ${downloadsLeft === 0 ? "quota-empty" : ""}`}>
                    {downloadsLeft > 0
                        ? `📥 Free e-book downloads remaining today: ${downloadsLeft} / 5`
                        : `🚫 Daily download limit reached. Resets at midnight.`
                    }
                </div>
            )}

            <div className='row all'>
                <div className="section-header new-release-header">
                    <span className="section-badge">🆕 NEW</span>
                    <h1>New Releases</h1>
                </div>

                <center>{loading && <Loader />}</center>
                <h4 className="text-danger text-center">{error}</h4>

                <Section />

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                        const isEbook = Boolean(product.product_pdf);
                        const isThisDownloading = downloadingId === product.product_id;
                        const outOfDownloads = downloadsLeft !== null && downloadsLeft <= 0;

                        return (
                            <div key={product.product_id} className="col-md-3 justify-content-center mb-3">
                                <div className="card shadow green">
                                    <img
                                        src={img_url + product.product_photo}
                                        alt={product.product_name}
                                        className='product-img mt-3' />

                                    <div className="card-body green">
                                        <h5 className="text-light bg-dark"> {product.product_name.slice(0, 23)}... </h5>
                                        <p className="text-light"> {product.product_description.slice(0, 90)}... </p>

                                        {!isEbook && (
                                            <h4 className="text-dark bg-light"> Kes.{product.product_cost} </h4>
                                        )}

                                        <div className="d-flex gap-2 justify-content-center flex-wrap mt-2">
                                            {!isEbook && (
                                                <button
                                                    className="btn btn-outline-light btn-sm"
                                                    onClick={() => navigate("/makepayment", { state: { product } })}
                                                >
                                                    💳 Purchase
                                                </button>
                                            )}

                                            {isEbook && (
                                                <button
                                                    className={`btn btn-sm d-flex align-items-center gap-1 ${outOfDownloads ? "btn-secondary" : "btn-success"}`}
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
                    })
                ) : (
                    !loading && <p className="text-light text-center w-100">No new releases at the moment.</p>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Newreleases
