import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Makepayment.css'
import Loader from './Loader';
import Footer from './Footer';
import { useCart } from '../context/CartContext';

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    // Supports two modes:
    //  1. Single product:  navigate('/makepayment', { state: { product } })
    //  2. Cart checkout:   navigate('/makepayment', { state: { cartItems, total } })
    const { product, cartItems, total } = location.state || {};

    const isCart = Boolean(cartItems && cartItems.length > 0);
    const paymentAmount = isCart ? total : product?.product_cost;

    const img_url = "https://jeankariuki.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // If state is missing entirely, bounce back
    if (!product && !isCart) {
        return (
            <div className="all text-center py-5">
                <h4 className="text-light">No order details found.</h4>
                <button className="btn btn-success mt-3" onClick={() => navigate('/')}>
                    ← Browse Books
                </button>
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
            formdata.append("phone", number);
            formdata.append("amount", paymentAmount);

            const response = await axios.post(
                "https://jeankariuki.alwaysdata.net/api/mpesa_payment",
                formdata
            );

            setLoading(false);
            setSuccess(response.data.message);

            // Clear cart after successful payment initiation
            if (isCart) clearCart();

        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div>
            <div className="all">
                <div className='row justify-content-center'>
                    <h1 className="text-light bg-success">Make Payment – Lipa na M-Pesa</h1>

                    <div className="col-md-1">
                        <input
                            type="button"
                            className="btn btn-dark"
                            value="← Back"
                            onClick={() => navigate(isCart ? '/cart' : '/')}
                        />
                    </div>

                    <div className="col-md-6 card shadow p-4 green">

                        {/* ── Single product view ── */}
                        {!isCart && product && (
                            <>
                                <img
                                    src={img_url + product.product_photo}
                                    alt={product.product_name}
                                    className='product-img'
                                />
                                <div className="card-body">
                                    <h2 className="text-light bg-dark">{product.product_name}</h2>
                                    <p className="text-light">{product.product_description}</p>
                                    <h3 className="text-dark bg-light">Kes {product.product_cost}</h3>
                                </div>
                            </>
                        )}

                        {/* ── Cart summary view ── */}
                        {isCart && (
                            <div className="card-body">
                                <h2 className="text-light bg-dark mb-3">Order Summary</h2>

                                {/* Mini cart item list */}
                                <div className="mb-3">
                                    {cartItems.map(item => (
                                        <div
                                            key={item.product_id}
                                            className="d-flex align-items-center gap-3 mb-3 pb-3"
                                            style={{ borderBottom: '1px solid #444' }}
                                        >
                                            <img
                                                src={img_url + item.product_photo}
                                                alt={item.product_name}
                                                style={{
                                                    width: 60, height: 80,
                                                    objectFit: 'cover', borderRadius: 6,
                                                    flexShrink: 0
                                                }}
                                            />
                                            <div className="flex-grow-1">
                                                <div className="text-light fw-semibold" style={{ fontSize: '0.9rem' }}>
                                                    {item.product_name}
                                                </div>
                                                <div className="text-secondary" style={{ fontSize: '0.8rem' }}>
                                                    Qty: {item.quantity}
                                                </div>
                                            </div>
                                            <div className="text-success fw-bold">
                                                Kes {(Number(item.product_cost) * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-dark bg-light">
                                    Total: Kes {Number(total).toLocaleString()}
                                </h3>
                            </div>
                        )}

                        {/* ── Payment form (shared) ── */}
                        <div className="card-body">
                            <form onSubmit={handlesubmit}>
                                <center>{loading && <Loader />}</center>
                                {success && <h3 className="text-success">{success}</h3>}
                                {error   && <h4 className="text-danger">{error}</h4>}

                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Enter phone number 254XXXXXXX'
                                    required
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                                <br />
                                <input
                                    type="submit"
                                    value={`Pay Kes ${Number(paymentAmount).toLocaleString()} 💳`}
                                    className='btn btn-success'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Makepayment;
