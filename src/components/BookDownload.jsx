import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/BookDownload.css';
import Loader from './Loader';
import Footer from './Footer';
import { FiDownload, FiArrowLeft, FiBook, FiUser, FiTag, FiFileText, FiLock } from 'react-icons/fi';

const BASE_URL = "https://jeankariuki.alwaysdata.net";
const IMG_URL  = `${BASE_URL}/static/images/`;

// Read the stored auth token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { "Authorization": `Bearer ${token}` } : {};
};

const BookDownload = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { product } = location.state || {};

    const [downloading,   setDownloading]   = useState(false);
    const [downloaded,    setDownloaded]    = useState(false);
    const [downloadsLeft, setDownloadsLeft] = useState(null);   // null = loading
    const [isAdmin,       setIsAdmin]       = useState(false);
    const [error,         setError]         = useState("");
    const [success,       setSuccess]       = useState("");

    // Derived from localStorage — no token means the user is not logged in.
    const isLoggedIn = !!localStorage.getItem("token");

    // Fetch the real per-user quota from the server whenever this page loads.
    // Skip entirely when the user is not logged in — the endpoint requires auth.
    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchQuota = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/download_remaining`, {
                    headers: getAuthHeader()
                });
                setDownloadsLeft(res.data.remaining);
                setIsAdmin(res.data.is_admin ?? false);
            } catch {
                setDownloadsLeft(5);
            }
        };
        fetchQuota();
    }, [isLoggedIn]);

    // Guard — no product passed
    if (!product) {
        return (
            <div className="bd-all text-center py-5">
                <h4 className="text-light">No book details found.</h4>
                <button className="bd-back-btn" onClick={() => navigate('/')}>
                    <FiArrowLeft size={15} /> Browse Books
                </button>
            </div>
        );
    }

    const outOfDownloads = !isAdmin && downloadsLeft !== null && downloadsLeft <= 0;

    const handleDownload = async () => {
        if (!isLoggedIn) {
            navigate('/signin', { state: { from: location.pathname, product } });
            return;
        }
        if (outOfDownloads) return;

        setDownloading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.get(
                `${BASE_URL}/api/download_pdf/${product.product_pdf}`,
                { responseType: "blob", headers: getAuthHeader() }
            );

            const url  = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href  = url;
            link.setAttribute("download", product.product_pdf);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            // Only decrement the visible counter for non-admins
            if (!isAdmin) {
                setDownloadsLeft(prev => Math.max(0, (prev ?? 5) - 1));
            }
            setDownloaded(true);
            setSuccess("Download started! Enjoy your book 📖");
            setTimeout(() => setSuccess(""), 6000);

        } catch (err) {
            if (err.response?.status === 429) {
                setError("Daily download limit reached (5/day). Come back tomorrow!");
                setDownloadsLeft(0);
            } else {
                setError("Download failed. Please try again.");
            }
            setTimeout(() => setError(""), 6000);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div>
            <div className="bd-all">
                <div className="bd-wrapper">

                    {/* Back button */}
                    <button
                        className="bd-back-btn"
                        onClick={() => navigate('/')}
                    >
                        <FiArrowLeft size={15} /> Back to Books
                    </button>

                    <div className="bd-card">

                        {/* Left — cover image */}
                        <div className="bd-cover-col">
                            <div className="bd-cover-frame">
                                <img
                                    src={IMG_URL + product.product_photo}
                                    alt={product.product_name}
                                    className="bd-cover-img"
                                />
                                <div className="bd-free-tag">FREE E-BOOK</div>
                            </div>
                        </div>

                        {/* Right — info + download */}
                        <div className="bd-info-col">

                            <h1 className="bd-title">{product.product_name}</h1>

                            {/* Meta row */}
                            <div className="bd-meta">
                                {product.author && (
                                    <span className="bd-meta-chip">
                                        <FiUser size={12} /> {product.author}
                                    </span>
                                )}
                                {product.genre && (
                                    <span className="bd-meta-chip">
                                        <FiTag size={12} /> {product.genre}
                                    </span>
                                )}
                                <span className="bd-meta-chip">
                                    <FiBook size={12} /> E-Book
                                </span>
                            </div>

                            {/* Description */}
                            <div className="bd-description-block">
                                <div className="bd-desc-label">
                                    <FiFileText size={13} /> About this book
                                </div>
                                <p className="bd-description">
                                    {product.product_description}
                                </p>
                            </div>

                            {/* Download quota */}
                            <div className={`bd-quota ${!isLoggedIn ? "bd-quota--locked" : downloadsLeft === 0 && !isAdmin ? "bd-quota--empty" : ""}`}>
                                {!isLoggedIn
                                    ? `Log in to track your daily download quota`
                                    : isAdmin
                                    ? `Admin — unlimited downloads`
                                    : downloadsLeft === null
                                    ? `Checking your download quota…`
                                    : downloadsLeft > 0
                                    ? `You have ${downloadsLeft} of 5 free downloads remaining today`
                                    : `Daily limit reached — resets at midnight`
                                }
                            </div>

                            {/* Feedback */}
                            {success && <div className="bd-feedback bd-feedback--success">{success}</div>}
                            {error   && <div className="bd-feedback bd-feedback--error">{error}</div>}

                            {/* Download button */}
                            {downloading && (
                                <div className="bd-loader-wrap"><Loader /></div>
                            )}

                            {!isLoggedIn ? (
                                /* Unauthenticated — show a login CTA instead */
                                <button
                                    className="bd-download-btn bd-download-btn--locked"
                                    onClick={() => navigate('/signin', { state: { from: location.pathname, product } })}
                                >
                                    <FiLock size={18} />
                                    Log In to Download
                                </button>
                            ) : (
                                <button
                                    className={`bd-download-btn ${
                                        outOfDownloads
                                            ? "bd-download-btn--disabled"
                                            : downloaded
                                            ? "bd-download-btn--done"
                                            : ""
                                    }`}
                                    onClick={handleDownload}
                                    disabled={downloading || outOfDownloads}
                                >
                                    <FiDownload size={18} />
                                    {downloading
                                        ? "Downloading…"
                                        : outOfDownloads
                                        ? "Daily Limit Reached"
                                        : downloaded
                                        ? "Download Again"
                                        : "Download Free PDF"}
                                </button>
                            )}

                            <p className="bd-disclaimer">
                                This book is offered free of charge. Please respect the author's work.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookDownload;