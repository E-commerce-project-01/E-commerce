import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiBell, FiMessageSquare, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

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
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/products')}>Explore <FiChevronDown /></button>
          <a href="#collection">Personal Collection</a>
          <a href="#drops">Drops</a>
          <button onClick={() => navigate('/about')} className="more-link">More <FiChevronDown /></button> 
        </nav>
      </div>
      <div className="nav-right">
        <button className="icon-button">
          <FiBell size={20} />
        </button>
        <button className="icon-button">
          <FiMessageSquare size={20} />
        </button>
        <button className="wallet-btn" onClick={() => navigate('/cart')}>
        <FiShoppingCart size={18} />
        </button>
        <img 
          src="/path-to-your-profile-image.jpg" 
          alt="Profile" 
          className="profile-img"
        />
      </div>
    </div>
  );
};

export default Navbar;