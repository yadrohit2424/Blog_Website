import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiUser, FiTag, FiMessageCircle, FiShare2, FiHeart } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`/api/posts/${id}`),
          axios.get(`/api/posts/${id}/comments`)
        ]);
        
        setPost(postResponse.data);
        setComments(commentsResponse.data);
        setLikeCount(postResponse.data.likes || 0);
      } catch (err) {
        setError('Post not found');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      alert('Link copied to clipboard!');
    }
  };

  const handleCommentSubmit = (newComment) => {
    setComments(prev => [newComment, ...prev]);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="error">
        <div className="error-icon">📄</div>
        <h2>Post not found</h2>
        <p>The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="container">
        {/* Hero Section */}
        <motion.section
          className="post-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="post-image">
            <img src={post.image} alt={post.title} />
            <div className="post-overlay">
              <span className="category-badge">{post.category}</span>
            </div>
          </div>

          <div className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>

            <div className="post-meta">
              <div className="meta-item">
                <FiUser className="meta-icon" />
                <span>{post.author}</span>
              </div>
              <div className="meta-item">
                <FiClock className="meta-icon" />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
              <div className="meta-item">
                <FiEye className="meta-icon" />
                <span>{post.views} views</span>
              </div>
              <div className="meta-item">
                <FiClock className="meta-icon" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <FiTag className="tag-icon" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="post-actions">
              <motion.button
                className={`action-btn ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHeart />
                <span>{likeCount}</span>
              </motion.button>
              
              <motion.button
                className="action-btn"
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShare2 />
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <motion.section
          className="post-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="content-wrapper">
            <div className="markdown-content">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </motion.section>

        {/* Comments Section */}
        <motion.section
          className="comments-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="comments-header">
            <h2>
              <FiMessageCircle />
              Comments ({comments.length})
            </h2>
          </div>

          <CommentForm postId={id} onCommentSubmit={handleCommentSubmit} />
          <CommentList comments={comments} />
        </motion.section>
      </div>
    </div>
  );
};

export default BlogPost; 