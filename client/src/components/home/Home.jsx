import React from 'react';
import { FiSearch, FiShoppingCart, FiBell, FiMessageSquare, FiChevronDown } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="header">
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
            src="/path-to-your-profile-image.jpg" 
            alt="Profile" 
            className="profile-img"
          />
        </div>
      </header>

      <main className="main-content">
        <div className="tabs">
          <button className="tab active">Main Collection</button>
          <button className="tab">Creators Market</button>
        </div>

        <div className="hero">
          <div className="hero-content">
            <h1>Clothes are the Spirit of Fashion</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.</p>
            
            <div className="hero-buttons">
              <button className="explore-btn">Explore Now</button>
              <button className="create-btn">Create</button>
            </div>

            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Brands</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20k+</span>
                <span className="stat-label">Fashion Designer</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">60+</span>
                <span className="stat-label">Fashion Shows</span>
              </div>
            </div>
          </div>

          <div className="gallery">
            <div className="gallery-item">
              <img src="/path-to-image-1.jpg" alt="Fashion item 1" />
            </div>
            <div className="gallery-item">
              <img src="/path-to-image-2.jpg" alt="Fashion item 2" />
            </div>
            <div className="gallery-item">
              <img src="/path-to-image-3.jpg" alt="Fashion item 3" />
            </div>
            <div className="gallery-item">
              <img src="/path-to-image-4.jpg" alt="Fashion item 4" />
            </div>
            <div className="gallery-item">
              <img src="/path-to-image-5.jpg" alt="Fashion item 5" />
            </div>
            <div className="gallery-item">
              <img src="/path-to-image-6.jpg" alt="Fashion item 6" />
            </div>
          </div>
        </div>

        <div className="brands">
          <img src="/adidas-logo.png" alt="Adidas" className="brand-logo" />
          <img src="/puma-logo.png" alt="Puma" className="brand-logo" />
          <img src="/lacoste-logo.png" alt="Lacoste" className="brand-logo" />
        </div>

        <div className="about">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </main>
    </div>
  );
};

export default Home;