import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiBell, FiMessageSquare, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('/default-avatar.png');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const savedAvatar = userData.avatar || localStorage.getItem(`userAvatar_${userData.id}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  return (
    <div className="nav-container">
      <a href="/home" className="logo">Logo</a>
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
          <a onClick={() => navigate('/home')} style={{'cursor':'pointer'}}>Home</a>
          <a onClick={() => navigate('/products')} style={{'cursor':'pointer'}}>Explore <FiChevronDown /></a>
          <a href="#collection">Personal Collection</a>
          <a href="#drops">Drops</a>
          <a onClick={() => navigate('/about')} className="more-link" style={{'cursor':'pointer'}}>More <FiChevronDown /></a> 
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
          onClick={() => navigate("/profile")}
          src={avatar}
          alt="Profile" 
          className="profile-img"
        />
      </div>
    </div>
  );
};

export default Navbar;