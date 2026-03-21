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



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2> Welcome My Dearest Reader</h2>
        </header>
        <nav className='bg-dark'>

          <Link to="/" className='btn btn-success btn-sm m-1'> Home</Link>
          <Link to="/addproducts" className='btn btn-success btn-sm m-1' >Add Book</Link>
          <Link to="/signin" className='btn btn-success btn-sm m-1' >Signin</Link>
          <Link to="/signup" className='btn btn-success btn-sm m-1' >Signup</Link>
        </nav>


        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
