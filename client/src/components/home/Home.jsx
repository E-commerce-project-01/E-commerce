import React from 'react';
import Navbar from '../navbar/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="content-wrapper">
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
            <div className="gallery-item small">
              <img src="/shoes-purple.jpg" alt="Purple Shoes" />
            </div>
            <div className="gallery-item small">
              <img src="/shoes-yellow.jpg" alt="Yellow Shoes" />
            </div>
            <div className="gallery-item tall">
              <img src="/dress-gold.jpg" alt="Gold Dress" />
            </div>
            <div className="gallery-item medium">
              <img src="/jacket-blue.jpg" alt="Blue Jacket" />
            </div>
            <div className="gallery-item medium">
              <img src="/shoes-display.jpg" alt="Shoes Display" />
            </div>
            <div className="gallery-item small">
              <img src="/shoes-green.jpg" alt="Green Shoes" />
            </div>
            <div className="gallery-item small">
              <img src="/character.jpg" alt="Character" />
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
      </div>
    </div>
  );
};

export default Home;