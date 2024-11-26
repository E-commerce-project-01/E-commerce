import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/home/Home.jsx';
import Login from './Components/signup/Login.jsx';
import Products from './Components/AllProducts/ProductList.jsx';
import Cart from './Components/AllProducts/Cart.jsx';
import AboutUs from './Components/About/About.jsx';
import Admin from './Components/Admin/Admin.jsx';
import CreatePost from './Components/Profile/CreatePost.jsx';
import Profile from './Components/Profile/Profile.jsx';
import BrandAdmin from './Components/Admin/BrandsAdmin.jsx';
import BrandProducts from './Components/Admin/Brandproducts.jsx';
import UsersAdmin from './Components/Admin/UsersAdmin.jsx';
import Userdetails from './Components/Admin/Userdetails.jsx';
import Signup from './Components/signup/Signup.jsx';
import Navbar from './Components/navbar/Navbar.jsx';
import Footer from './Components/footer/Footer.jsx';
import CreateProduct from './Components/createProduct/createProduct.jsx';

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
              <Route path="/create-product" element={<CreateProduct />} />

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
