import React from 'react';
import { useNavigate } from 'react-router-dom'; /// ahmed ////
import Navbar from '../navbar/Navbar';
import './Home.css';


///ahmed///
const Home = () => {
  const navigate = useNavigate();
/// ahmed ///
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
              <button className="explore-btn" onClick={() => navigate('/products')}>Explore Now</button> {/*ahmed*/}
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
              <img src="/src/assets/home-pictures/5.png" alt="Purple Shoes" />
            </div>
            <div className="gallery-item small">
              <img src="/src/assets/home-pictures/6.png" alt="Yellow Shoes" />
            </div>
            <div className="gallery-item tall">
              <img src="/src/assets/home-pictures/7.png" alt="Gold Dress" />
            </div>
            <div className="gallery-item medium">
              <img src="/src/assets/home-pictures/3.png" alt="Blue Jacket" />
            </div>
            <div className="gallery-item medium">
              <img src="/src/assets/home-pictures/4.png" alt="Shoes Display" />
            </div>
            <div className="gallery-item small">
              <img src="/src/assets/home-pictures/2.png" alt="Green Shoes" />
            </div>
            <div className="gallery-item small">
              <img src="/src/assets/home-pictures/1.png" alt="Character" />
            </div>
          </div>
        </div>

        <div className="brands">
          <img src="/src/assets/home-pictures/Adidas_logo.png" alt="Adidas" className="brand-logo" />
          <img src="/src/assets/home-pictures/Puma-logo-PNG.png" alt="Puma" className="brand-logo" />
          <img src="/src/assets/home-pictures/lacoste-logo.png" alt="Lacoste" className="brand-logo" />
        </div>

        <div className="about">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="fashion-speaks">
          <div className="fashion-image">
            <img src="/src/assets/home-pictures/image 1.png" alt="Fashion Statue" />
          </div>
          <div className="fashion-content">
            <h2>Fashion That Speaks</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
              molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
              accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
              Maecenas eget condimentum velit, sit amet feugiat lectus. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
              scelerisque ante pulvinar.
            </p>
            <button className="show-more-btn">Show more</button>
          </div>
        </div>

        <div className="all-collection">
          <h2>All Collection</h2>
          <p>Worlds First Layer 2 Fashion Marketplace</p>
          
          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">
                <img src="/dollar-icon.png" alt="No Gas Fees" />
              </div>
              <h3>No Gas Fees</h3>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <img src="/nft-icon.png" alt="Carbon Natural NFTs" />
              </div>
              <h3>Carbon Natural NFTs</h3>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <img src="/transaction-icon.png" alt="Fast And Easy Transactions" />
              </div>
              <h3>Fast And Easy Transactions</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;