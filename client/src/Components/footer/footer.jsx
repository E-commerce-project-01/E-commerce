import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="logo">LOGO</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque donec non pellentesque ut.</p>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li>Product</li>
            <li>Resource</li>
            <li>Term & Condition</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>Our Team</li>
            <li>Partner With Us</li>
            <li>Privacy & Policy</li>
            <li>Features</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>+012 3456789</li>
            <li>adorableprogrammer@gmail.com</li>
            <div className="social-icons">
              <a href="#"><img src="/youtube-icon.svg" alt="YouTube" /></a>
              <a href="#"><img src="/discord-icon.svg" alt="Discord" /></a>
              <a href="#"><img src="/instagram-icon.svg" alt="Instagram" /></a>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;