import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.jsx';
import Login from './components/signup/Login.jsx';
import Products from './components/AllProducts/ProductList.jsx';
import Cart from './components/AllProducts/Cart.jsx';
import AboutUs from './components/About/About.jsx';
import Admin from './components/Admin/Admin.jsx';
import CreatePost from './components/Profile/CreatePost.jsx';
import Profile from './components/Profile/Profile.jsx';
import BrandAdmin from './components/Admin/BrandsAdmin.jsx';
import BrandProducts from './components/Admin/Brandproducts.jsx';
import UsersAdmin from './components/Admin/UsersAdmin.jsx';
import Userdetails from './components/Admin/Userdetails.jsx';
import Signup from './components/signup/Signup.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import CreateProduct from './components/createProduct/createProduct.jsx';

import "./App.css";

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      {user ? (
        user.type === "user" ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
            <Footer />
          </>
        ) : user.type === "admin" ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/Admin" element={<Admin />} />
              <Route path="/brandsAdmin" element={<BrandAdmin />} />
              <Route path="/adminbrandproducts" element={<BrandProducts />} />
              <Route path="/UsersAdmin" element={<UsersAdmin />} />
              <Route path="/userdetails" element={<Userdetails />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
            <Footer />
          </>
        ) : null
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
