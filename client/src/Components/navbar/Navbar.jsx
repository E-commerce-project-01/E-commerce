import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiBell, FiMessageSquare, FiChevronDown , FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('/default-avatar.png');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false); 


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    const savedAvatar = userData.avatar || localStorage.getItem(`userAvatar_${userData.id}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
    if (userData.type === 'admin') {
      setIsAdmin(true);
    }
    if (userData.type === 'user') {
      setIsUser(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');  
    navigate('/')
    window.location.reload()
  };

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
          {isAdmin && (
            <a onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>Admin</a>
          )}
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
        {isUser && (   <img 
          onClick={() => navigate("/profile")}
          src={avatar}
          alt="Profile" 
          className="profile-img"
        />)}
         <button className="icon-button" onClick={handleLogout}>
          <FiLogOut size={20} />
        </button>
      
      </div>
    </div>
  );
};

export default Navbar;