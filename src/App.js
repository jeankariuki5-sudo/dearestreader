import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.min.js"
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import NotFound from './components/Notfound'
import weblogo from './weblogo.png'
import Aboutus from './components/Aboutus';
import BookHeader from './components/BookHeader';


function App() {
  return (
    <Router>
      <div className="App">
        <BookHeader />

        <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm'>
          {/* Left side (Logo) */}
          <Link to="/" className="navbar-brand">
            <img
              src={weblogo}
              alt="Logo"
              style={{ height: "35px", filter: "brightness(1.1)" }}
            />
          </Link>

          {/* Right side (Links) */}
          <div className="d-flex align-items-center">
            <Link to="/" className='nav-link text-white-50 mx-3 hover-link'>Home</Link>
            <Link to="/aboutus" className='nav-link text-white-50 mx-3 hover-link'>About Us</Link>
            <Link to="/addbook" className='nav-link text-white-50 mx-3 hover-link'>Add Book</Link>

            {/* Action Buttons: Keep these slightly distinct but minimal */}
            <Link to="/signin" className='btn btn-outline-light btn-sm ms-3 px-3 rounded-pill'>Signin</Link>
            <Link to="/signup" className='btn btn-success btn-sm ms-2 px-3 rounded-pill'>Signup</Link>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addbook' element={<Addproducts />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
