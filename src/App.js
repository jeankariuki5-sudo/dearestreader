import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.min.js"
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import NotFound from './components/NotFound'
import weblogo from './weblogo.png'
import Aboutus from './components/Aboutus';
import BookHeader from './components/BookHeader';
import CorrespondenceDesk from './components/CorrespondenceDesk';
import Newreleases from './components/Newreleases';
import Cart from './components/Cart';
import { CartProvider, useCart } from './context/CartContext';
import { ADMIN_EMAILS } from './config';
import { FiShoppingCart } from 'react-icons/fi';
import BookDownload from './components/BookDownload';


// Inner component so useCart() can access CartProvider
function AppContent() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const { cartCount, clearCart } = useCart();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();   // ← wipe the cart so it doesn't bleed into the next user's session
    setUser(null);
  };

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  return (
    <div className="App">
      <BookHeader />

      <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm'>

        {/* Logo — far left */}
        <Link to="/" className="navbar-brand">
          <img
            src={weblogo}
            alt="Logo"
            style={{ height: "35px", filter: "brightness(1.1)" }}
          />
        </Link>

        {/* Nav links — middle */}
        <div className="d-flex align-items-center">
          <Link to="/" className='nav-link text-white-50 mx-3 hover-link'>Home</Link>
          <Link to="/aboutus" className='nav-link text-white-50 mx-3 hover-link'>About Us</Link>
          {isAdmin && (
            <Link to="/addbook" className='nav-link text-white-50 mx-3 hover-link'>Add Book</Link>
          )}
          <Link to="/writetous" className='nav-link text-white-50 mx-3 hover-link'>Write To Us</Link>
          <Link to="/newreleases" className='nav-link text-white-50 mx-3 hover-link'>New Releases</Link>
        </div>

        {/* Auth + Cart — far right */}
        <div className="d-flex align-items-center ms-auto gap-2">

          {/* Cart icon with badge */}
          <Link to="/cart" className="cart-nav-btn" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.3)', padding: '5px 12px', borderRadius: 20, textDecoration: 'none', fontSize: '0.88rem', transition: 'all 0.2s' }}>
            <FiShoppingCart size={16} />
            Cart
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#28a745', color: '#fff',
                borderRadius: '50%', width: 18, height: 18,
                fontSize: '0.7rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'pop 0.2s ease'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <div
                className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                style={{ width: 32, height: 32, fontSize: 13 }}
              >
                {user.username.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-white fw-semibold" style={{ fontSize: 14 }}>
                {user.username}
              </span>
              <button
                className="btn btn-outline-light btn-sm px-3 rounded-pill"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className='btn btn-outline-light btn-sm px-3 rounded-pill'>Sign in</Link>
              <Link to="/signup" className='btn btn-success btn-sm px-3 rounded-pill'>Sign up</Link>
            </>
          )}
        </div>

      </nav>

      <Routes>
        <Route path='/' element={<Getproducts />} />
        <Route path='/signin' element={<Signin setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/addbook' element={<Addproducts />} />
        <Route path='/makepayment' element={<Makepayment />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/writetous' element={<CorrespondenceDesk />} />
        <Route path='/newreleases' element={<Newreleases />} />
        <Route path="/bookdownload" element={<BookDownload />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
