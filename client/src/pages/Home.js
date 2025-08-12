import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiEye, FiUser, FiTag } from 'react-icons/fi';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import BlogCard from '../components/BlogCard';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial search params
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    if (search) setSearchQuery(search);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  // Fetch posts and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse] = await Promise.all([
          axios.get('/api/posts'),
          axios.get('/api/categories')
        ]);
        
        setPosts(postsResponse.data);
        setCategories(categoriesResponse.data);
        setFilteredPosts(postsResponse.data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory]);

  // Update URL params when search/category changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    setSearchParams(params);
  }, [searchQuery, selectedCategory, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Discover Amazing
              <span className="hero-highlight"> Stories</span>
            </h1>
            <p className="hero-subtitle">
              Explore insightful articles about technology, design, business, and more. 
              Join our community of writers and readers.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hero-search">
              <div className="search-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hero-search-input"
                />
                <button type="submit" className="btn btn-primary search-btn">
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content-section">
        <div className="container">
          {/* Filters */}
          <div className="filters">
            <div className="filters-left">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              {(searchQuery || selectedCategory !== 'all') && (
                <button onClick={clearFilters} className="btn btn-ghost clear-btn">
                  Clear Filters
                </button>
              )}
            </div>
            
            <div className="results-count">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              className="posts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="no-posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="no-posts-icon">📝</div>
              <h3>No posts found</h3>
              <p>
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or category filter.'
                  : 'No posts available at the moment.'
                }
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;