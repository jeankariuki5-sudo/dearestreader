import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const FloatingCartButton = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={() => navigate('/cart')}
      aria-label={`View cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
      style={{
        position: 'fixed',
        bottom: '200px',
        right: '27px',
        width: '55px',
        height: '55px',
        borderRadius: '50%',
        background: '#000',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(29,158,117,0.45)',
        zIndex: 1000,
        transition: 'background 0.15s, transform 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#0F6E56'}
      onMouseLeave={e => e.currentTarget.style.background = '#000'}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.94)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <FiShoppingCart size={24} color="#fff" />

      <span style={{
        position: 'absolute',
        top: '2px',
        right: '2px',
        minWidth: '20px',
        height: '20px',
        padding: '0 5px',
        background: '#fff',
        color: '#1D9E75',
        borderRadius: '10px',
        border: '2px solid #1D9E75',
        fontSize: '11px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}>
        {cartCount}
      </span>
    </button>
  );
};

export default FloatingCartButton;
