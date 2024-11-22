import React from 'react';
import { FiSearch, FiShoppingCart, FiBell, FiMessageSquare, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate =useNavigate()
  return (
    <div className="nav-container">
      <a href="/" className="logo">Logo</a>
      <div className="nav-center">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="search"
            className="search-bar"
            placeholder="Search Items, Fashion, Collection and Users"
          />
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#explore">Explore <FiChevronDown /></a>
          <a href="#collection">Personal Collection</a>
          <a href="#drops">Drops</a>
          <a href="#more" className="more-link">More <FiChevronDown /></a>
        </nav>
      </div>
      <div className="nav-right">
        <button className="icon-button">
          <FiBell size={20} />
        </button>
        <button className="icon-button">
          <FiMessageSquare size={20} />
        </button>
        <button className="wallet-btn">
          <FiShoppingCart size={18} />
        </button>
        <img 
          onClick={()=>{navigate("/profile")}}
          src="/path-to-your-profile-image.jpg" 
          alt="Profile" 
          className="profile-img"
        />
      </div>
    </div>
  );
};

export default Navbar;