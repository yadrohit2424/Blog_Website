import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiClock } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import './CommentList.css';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <motion.div
        className="no-comments"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>No comments yet. Be the first to share your thoughts!</p>
      </motion.div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          className="comment-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="comment-header">
            <div className="comment-author">
              <div className="author-avatar">
                <FiUser />
              </div>
              <div className="author-info">
                <h4 className="author-name">{comment.name}</h4>
                <div className="comment-meta">
                  <FiClock className="meta-icon" />
                  <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="comment-content">
            <p>{comment.content}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CommentList; 