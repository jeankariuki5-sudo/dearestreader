import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import Footer from './Footer';
import '../css/Cart.css';

const BASE_URL = "https://jeankariuki.alwaysdata.net";
const IMG_URL = `${BASE_URL}/static/images/`;

const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user")); }
  catch { return null; }
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!getUser()) {
      navigate('/signin', { state: { from: '/cart' } });
      return;
    }
    navigate('/makepayment', {
      state: {
        cartItems,
        total: cartTotal,
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-wrapper">
        <div className="cart-empty-box">
          <FiShoppingBag size={64} className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any books yet.</p>
          <button className="btn btn-success px-4 mt-2" onClick={() => navigate('/')}>
            Browse Books
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <button className="cart-back-btn" onClick={() => navigate('/')}>
            <FiArrowLeft size={16} /> Continue Shopping
          </button>
          <h1 className="cart-title">
            <FiShoppingBag size={24} /> Your Cart
          </h1>
          <button className="cart-clear-btn" onClick={clearCart}>
            Clear all
          </button>
        </div>

        <div className="cart-layout">
          {/* Items list */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.product_id} className="cart-item">
                <img
                  src={IMG_URL + item.product_photo}
                  alt={item.product_name}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h5 className="cart-item-name">{item.product_name}</h5>
                  {item.genre && (
                    <span className="cart-item-genre">{item.genre}</span>
                  )}
                  <p className="cart-item-desc">
                    {item.product_description.slice(0, 80)}
                    {item.product_description.length > 80 ? '…' : ''}
                  </p>
                  <div className="cart-item-bottom">
                    <span className="cart-item-price">
                      Kes {(Number(item.product_cost) * item.quantity).toLocaleString()}
                    </span>
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product_id, -1)}
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.product_id, 1)}
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-rows">
              {cartItems.map(item => (
                <div key={item.product_id} className="summary-row">
                  <span className="summary-book-name">
                    {item.product_name.slice(0, 22)}{item.product_name.length > 22 ? '…' : ''} ×{item.quantity}
                  </span>
                  <span>Kes {(Number(item.product_cost) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-total">
              <span>Total</span>
              <span className="summary-total-amount">Kes {cartTotal.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout 💳
            </button>
            <p className="summary-note">Paid securely via M-Pesa</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
