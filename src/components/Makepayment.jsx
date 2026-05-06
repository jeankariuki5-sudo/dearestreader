import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Makepayment.css';
import Loader from './Loader';
import Footer from './Footer';
import { useCart } from '../context/CartContext';
import {
    FiArrowLeft, FiBook, FiTag, FiShoppingCart,
    FiCreditCard, FiPhone, FiFileText, FiUser
} from 'react-icons/fi';

const IMG_URL = "https://jeankariuki.alwaysdata.net/static/images/";

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const { product, cartItems, total } = location.state || {};
    const isCart        = Boolean(cartItems && cartItems.length > 0);
    const paymentAmount = isCart ? total : product?.product_cost;

    const [number,  setNumber]  = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error,   setError]   = useState("");

    // Guard — no state passed
    if (!product && !isCart) {
        return (
            <div className="mp-all">
                <div className="mp-wrapper">
                    <p className="mp-description" style={{ textAlign: 'center' }}>No order details found.</p>
                    <button className="mp-back-btn" onClick={() => navigate('/')}>
                        <FiArrowLeft size={15} /> Browse Books
                    </button>
                </div>
            </div>
        );
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        try {
            const formdata = new FormData();
            formdata.append("phone",  number);
            formdata.append("amount", paymentAmount);

            const response = await axios.post(
                "https://jeankariuki.alwaysdata.net/api/mpesa_payment",
                formdata
            );
            setLoading(false);
            setSuccess(response.data.message);
            if (isCart) clearCart();
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div>
            <div className="mp-all">
                <div className="mp-wrapper">

                    {/* Back button */}
                    <button
                        className="mp-back-btn"
                        onClick={() => navigate(isCart ? '/cart' : '/')}
                    >
                        <FiArrowLeft size={15} /> {isCart ? 'Back to Cart' : 'Back to Books'}
                    </button>

                    <div className="mp-card">

                        {/* LEFT COLUMN */}
                        <div className="mp-cover-col">
                            {!isCart && product && (
                                <div className="mp-cover-frame">
                                    <img
                                        src={IMG_URL + product.product_photo}
                                        alt={product.product_name}
                                        className="mp-cover-img"
                                    />
                                    <div className="mp-price-tag">
                                        Kes {Number(product.product_cost).toLocaleString()}
                                    </div>
                                </div>
                            )}

                            {isCart && (
                                <div className="mp-cart-icon-wrap">
                                    <FiShoppingCart size={56} className="mp-cart-icon" />
                                    <p className="mp-cart-count">
                                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="mp-info-col">

                            <h1 className="mp-title">
                                {isCart ? 'Order Summary' : product.product_name}
                            </h1>

                            {/* Meta chips — single product */}
                            {!isCart && product && (
                                <div className="mp-meta">
                                    {product.author && (
                                        <span className="mp-meta-chip">
                                            <FiUser size={12} /> {product.author}
                                        </span>
                                    )}
                                    {product.genre && (
                                        <span className="mp-meta-chip">
                                            <FiTag size={12} /> {product.genre}
                                        </span>
                                    )}
                                    <span className="mp-meta-chip">
                                        <FiBook size={12} /> Physical Book
                                    </span>
                                </div>
                            )}

                            {/* Description — single product */}
                            {!isCart && product && (
                                <div className="mp-description-block">
                                    <div className="mp-desc-label">
                                        <FiFileText size={13} /> About this book
                                    </div>
                                    <p className="mp-description">{product.product_description}</p>
                                </div>
                            )}

                            {/* Cart item list */}
                            {isCart && (
                                <div className="mp-cart-list">
                                    {cartItems.map(item => (
                                        <div key={item.product_id} className="mp-cart-item">
                                            <img
                                                src={IMG_URL + item.product_photo}
                                                alt={item.product_name}
                                                className="mp-cart-thumb"
                                            />
                                            <div className="mp-cart-item-info">
                                                <span className="mp-cart-item-name">{item.product_name}</span>
                                                <span className="mp-cart-item-qty">Qty: {item.quantity}</span>
                                            </div>
                                            <span className="mp-cart-item-price">
                                                Kes {(Number(item.product_cost) * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="mp-cart-total">
                                        <span>Total</span>
                                        <span>Kes {Number(total).toLocaleString()}</span>
                                    </div>
                                </div>
                            )}

                            {/* M-Pesa strip */}
                            <div className="mp-mpesa-strip">
                                {/* <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/320px-M-PESA_LOGO-01.svg.png"
                                    alt="M-Pesa"
                                    className="mp-mpesa-logo"
                                /> */}
                                <span>Lipa na M-Pesa — STK push will be sent to your phone</span>
                            </div>

                            {/* Feedback */}
                            {success && <div className="mp-feedback mp-feedback--success">{success}</div>}
                            {error   && <div className="mp-feedback mp-feedback--error">{error}</div>}
                            {loading && <div className="mp-loader-wrap"><Loader /></div>}

                            {/* Payment form */}
                            <form onSubmit={handlesubmit} className="mp-form">
                                <div className="mp-phone-field">
                                    <FiPhone className="mp-phone-icon" size={16} />
                                    <input
                                        type="number"
                                        className="mp-phone-input"
                                        placeholder="254XXXXXXXXX"
                                        required
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mp-pay-btn"
                                    disabled={loading}
                                >
                                    <FiCreditCard size={18} />
                                    {loading ? "Processing…" : `Pay Kes ${Number(paymentAmount).toLocaleString()}`}
                                </button>
                            </form>

                            <p className="mp-disclaimer">
                                You will receive an M-Pesa prompt on your phone. Enter your PIN to complete the payment.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Makepayment;