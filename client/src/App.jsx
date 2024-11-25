import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home/Home.jsx';
import Login from './component/signup/Login.jsx';
import Products from './component/AllProducts/ProductList.jsx';
import Cart from './component/AllProducts/Cart.jsx';
import AboutUs from './component/About/About.jsx'; 
import Admin from './component/Admin/Admin.jsx';
import CreatePost from './component/Profile/CreatePost.jsx';
import Profile from './component/Profile/Profile.jsx';
import BrandAdmin from './component/Admin/BrandsAdmin.jsx';
import BrandProducts from './component/Admin/Brandproducts.jsx';
import UsersAdmin from './component/Admin/UsersAdmin.jsx';
import Userdetails from './component/Admin/Userdetails.jsx';
import Signup from './component/signup/Signup.jsx';
import "./App.css"
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/brandsAdmin" element={<BrandAdmin />} />
      <Route path="/adminbrandproducts" element={<BrandProducts />} />
      <Route path="/UsersAdmin" element={<UsersAdmin />} />
      <Route path="/userdetails" element={<Userdetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-post" element={<CreatePost />} />





        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};



export default App;