import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiUser, FiTag } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import './BlogCard.css';

const BlogCard = ({ post }) => {
  const {
    id,
    title,
    excerpt,
    author,
    category,
    tags,
    image,
    createdAt,
    readTime,
    views
  } = post;

  return (
    <motion.article
      className="blog-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/post/${id}`} className="card-link">
        {/* Image */}
        <div className="card-image">
          <img src={image} alt={title} loading="lazy" />
          <div className="card-overlay">
            <span className="category-badge">{category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="card-content">
          <div className="card-meta">
            <div className="meta-item">
              <FiUser className="meta-icon" />
              <span>{author}</span>
            </div>
            <div className="meta-item">
              <FiClock className="meta-icon" />
              <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
            </div>
          </div>

          <h3 className="card-title">{title}</h3>
          <p className="card-excerpt">{excerpt}</p>

          <div className="card-footer">
            <div className="card-stats">
              <div className="stat-item">
                <FiEye className="stat-icon" />
                <span>{views} views</span>
              </div>
              <div className="stat-item">
                <FiClock className="stat-icon" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="card-tags">
                {tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="tag">
                    <FiTag className="tag-icon" />
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="tag-more">+{tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard; 