import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home/Home.jsx';
import Login from './Components/signup/Login.jsx';
import Products from './Components/AllProducts/ProductList.jsx';
import Cart from './Components/AllProducts/Cart.jsx';
import AboutUs from './Components/About/About.jsx'; 
import Admin from './components/Admin/Admin.jsx';
import CreatePost from './Components/Profile/CreatePost.jsx';
import Profile from './Components/Profile/Profile.jsx';
import BrandAdmin from './components/Admin/BrandsAdmin.jsx';
import BrandProducts from './components/Admin/Brandproducts.jsx';
import "./App.css"
const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Cart />} />
       <Route path="/brandsAdmin" element={<BrandAdmin />} />
       <Route path="/adminbrandproducts" element={<BrandProducts />} />

        {/* <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} /> */}
      </Routes>
    </Router>
  );
};



export default App;
