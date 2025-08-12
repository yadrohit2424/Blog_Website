import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import './CommentForm.css';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`/api/posts/${postId}/comments`, formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        content: ''
      });
      
      // Notify parent component
      onCommentSubmit(response.data);
      
    } catch (err) {
      setError('Failed to post comment. Please try again.');
      console.error('Error posting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="comment-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Leave a Comment</h3>
      
      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {error}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Comment *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Share your thoughts..."
            rows="4"
            required
          />
        </div>
        
        <motion.button
          type="submit"
          className="btn btn-primary submit-btn"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <div className="spinner-small"></div>
          ) : (
            <>
              <FiSend />
              Post Comment
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CommentForm; 