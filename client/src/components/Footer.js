import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiTwitter, FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Main Footer Section */}
          <div className="footer-main">
            <div className="footer-section">
              <h3 className="footer-title">Blog.</h3>
              <p className="footer-description">
                A modern blog platform for sharing ideas, stories, and insights. 
                Join our community of writers and readers.
              </p>
              <div className="social-links">
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="social-link"
                >
                  <FiTwitter />
                </motion.a>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="social-link"
                >
                  <FiGithub />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="social-link"
                >
                  <FiLinkedin />
                </motion.a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/create">Write Post</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Categories</h4>
              <ul className="footer-links">
                <li><Link to="/?category=technology">Technology</Link></li>
                <li><Link to="/?category=design">Design</Link></li>
                <li><Link to="/?category=business">Business</Link></li>
                <li><Link to="/?category=lifestyle">Lifestyle</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-subtitle">Newsletter</h4>
              <p className="newsletter-description">
                Stay updated with our latest posts and insights.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="newsletter-input-wrapper">
                  <FiMail className="newsletter-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary newsletter-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="success-message"
                >
                  Thanks for subscribing!
                </motion.div>
              )}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © {currentYear} Blog. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
              </div>
            </div>
            <div className="footer-heart">
              <p>
                Made with <FiHeart className="heart-icon" /> for the community
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 