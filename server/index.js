const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Data file path
const dataPath = path.join(__dirname, 'data');
const postsFile = path.join(dataPath, 'posts.json');
const commentsFile = path.join(dataPath, 'comments.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(dataPath, { recursive: true });
  }
}

// Initialize data files if they don't exist
async function initializeData() {
  await ensureDataDir();
  
  try {
    await fs.access(postsFile);
  } catch {
    const initialPosts = [
      {
        id: uuidv4(),
        title: "Welcome to Our Blog",
        content: "This is the first post of our amazing blog. We'll be sharing interesting articles about technology, design, and more!",
        excerpt: "Welcome to our blog where we share insights about technology and design.",
        author: "Admin",
        category: "General",
        tags: ["welcome", "blog"],
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readTime: 2,
        views: 0
      },
      {
        id: uuidv4(),
        title: "The Future of Web Development",
        content: "Web development is evolving rapidly with new technologies like React, Vue, and modern CSS frameworks. The future looks bright for developers who stay updated with the latest trends.",
        excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
        author: "Tech Writer",
        category: "Technology",
        tags: ["web-development", "react", "future"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        readTime: 5,
        views: 0
      },
      {
        id: uuidv4(),
        title: "Design Principles for Modern Websites",
        content: "Good design is crucial for user experience. We'll explore key design principles that make websites both beautiful and functional.",
        excerpt: "Learn the essential design principles that create engaging and user-friendly websites.",
        author: "Design Expert",
        category: "Design",
        tags: ["design", "ux", "ui"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        readTime: 4,
        views: 0
      }
    ];
    await fs.writeFile(postsFile, JSON.stringify(initialPosts, null, 2));
  }

  try {
    await fs.access(commentsFile);
  } catch {
    await fs.writeFile(commentsFile, JSON.stringify([], null, 2));
  }
}

// API Routes

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const data = await fs.readFile(postsFile, 'utf8');
    const posts = JSON.parse(data);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const data = await fs.readFile(postsFile, 'utf8');
    const posts = JSON.parse(data);
    const post = posts.find(p => p.id === req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, excerpt, author, category, tags, image, readTime } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    const data = await fs.readFile(postsFile, 'utf8');
    const posts = JSON.parse(data);
    
    const newPost = {
      id: uuidv4(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      author,
      category: category || 'General',
      tags: tags || [],
      image: image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: readTime || Math.ceil(content.split(' ').length / 200),
      views: 0
    };

    posts.unshift(newPost);
    await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const data = await fs.readFile(postsFile, 'utf8');
    const posts = JSON.parse(data);
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updatedPost = {
      ...posts[postIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    posts[postIndex] = updatedPost;
    await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
    
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const data = await fs.readFile(postsFile, 'utf8');
    const posts = JSON.parse(data);
    const filteredPosts = posts.filter(p => p.id !== req.params.id);
    
    if (filteredPosts.length === posts.length) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await fs.writeFile(postsFile, JSON.stringify(filteredPosts, null, 2));
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Get comments for a post
app.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const data = await fs.readFile(commentsFile, 'utf8');
    const comments = JSON.parse(data);
    const postComments = comments.filter(c => c.postId === req.params.id);
    res.json(postComments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add comment
app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { name, email, content } = req.body;
    
    if (!name || !email || !content) {
      return res.status(400).json({ error: 'Name, email, and content are required' });
    }

    const data = await fs.readFile(commentsFile, 'utf8');
    const comments = JSON.parse(data);
    
    const newComment = {
      id: uuidv4(),
      postId: req.params.id,
      name,
      email,
      content,
      createdAt: new Date().toISOString()
    };

    comments.unshift(newComment);
    await fs.writeFile(commentsFile, JSON.stringify(comments, null, 2));
    
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Search posts
app.get('/api/search', async (req, res) => {
  try {
    const { q, category } = req.query;
    const data = await fs.readFile(postsFile, 'utf8');
    let posts = JSON.parse(data);

    if (q) {
      const searchTerm = q.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (category && category !== 'all') {
      posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search posts' });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const data = await fs.readFile(postsFile, 'utf8');
    const posts = JSON.parse(data);
    const categories = [...new Set(posts.map(post => post.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Blog API available at http://localhost:${PORT}/api`);
  });
}).catch(error => {
  console.error('Failed to initialize data:', error);
  process.exit(1);
}); 