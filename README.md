# Modern Blog Website

A full-stack blog website built with React, Node.js, and Express. Features a modern design with smooth animations, responsive layout, and excellent user experience.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Framer Motion**: Beautiful page transitions and micro-interactions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Search & Filter**: Advanced search functionality with category filtering
- **Markdown Support**: Rich text editing with Markdown syntax
- **Comments System**: Interactive commenting system
- **Dark Mode Ready**: CSS variables for easy theming

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations for posts and comments
- **File-based Storage**: JSON files for data persistence (easily upgradable to database)
- **Search API**: Full-text search across posts
- **Category Management**: Dynamic category system
- **View Tracking**: Post view counting
- **Security**: Helmet.js for security headers

### Key Features
- ✨ Beautiful animations and transitions
- 📱 Fully responsive design
- 🔍 Advanced search and filtering
- 💬 Interactive comments system
- 📝 Markdown content support
- 🎨 Modern design system
- ⚡ Fast and optimized performance
- 🔒 Security best practices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Date-fns** - Date formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Helmet.js** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **UUID** - Unique ID generation

### Styling
- **CSS3** - Custom CSS with CSS variables
- **CSS Grid & Flexbox** - Modern layout techniques
- **Responsive Design** - Mobile-first approach

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Start the development servers**
   ```bash
   # Start both frontend and backend (recommended)
   npm run dev
   
   # Or start them separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
blog/
├── server/                 # Backend code
│   ├── index.js           # Main server file
│   └── data/              # JSON data files
│       ├── posts.json     # Blog posts data
│       └── comments.json  # Comments data
├── client/                # Frontend React app
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🎯 API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/posts/:id/comments` - Add comment to a post

### Search & Categories
- `GET /api/search?q=query&category=category` - Search posts
- `GET /api/categories` - Get all categories

## 🎨 Design System

The project uses a comprehensive design system with CSS variables:

### Colors
- Primary: `#6366f1` (Indigo)
- Secondary: `#f59e0b` (Amber)
- Accent: `#10b981` (Emerald)
- Text: `#1f2937` (Gray-800)
- Background: `#ffffff` (White)

### Typography
- Primary Font: Inter
- Heading Font: Poppins
- Responsive font sizes with fluid scaling

### Spacing
- Consistent spacing scale using CSS variables
- Responsive breakpoints for mobile-first design

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🚀 Deployment

### Frontend (React)
```bash
cd client
npm run build
```

### Backend (Node.js)
```bash
npm start
```

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=production
```

## 🔧 Customization

### Adding New Categories
Edit the category options in `client/src/pages/CreatePost.js`

### Styling Changes
Modify CSS variables in `client/src/index.css`

### Backend Configuration
Update server settings in `server/index.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Unsplash for beautiful images
- React community for excellent documentation
- Framer Motion for smooth animations

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us at hello@blog.com.

---

**Happy Blogging! 🎉** 