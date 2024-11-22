import './App.css';
import Home from './Components/home/Home.jsx';
import Signup from './Components/signup/Signup.jsx';
import Login from './Components/signup/Login.jsx';
import Products from './Components/AllProducts/ProductList.jsx';
import Cart from './Components/AllProducts/Cart.jsx';
import AboutUs from './Components/About/About.jsx'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;