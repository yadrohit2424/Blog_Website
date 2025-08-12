import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiHeart, FiAward } from 'react-icons/fi';
import './About.css';

const About = () => {
  const features = [
    {
      icon: <FiUsers />,
      title: 'Community Driven',
      description: 'Built by writers, for writers. Our platform fosters meaningful discussions and connections.'
    },
    {
      icon: <FiTarget />,
      title: 'Quality Content',
      description: 'We curate and promote high-quality articles that educate, inspire, and entertain.'
    },
    {
      icon: <FiHeart />,
      title: 'Passion for Writing',
      description: 'Every post is crafted with care, sharing knowledge and experiences that matter.'
    },
    {
      icon: <FiAward />,
      title: 'Excellence',
      description: 'Striving for excellence in every aspect of our platform and content.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Editor',
      bio: 'Passionate about technology and design, Sarah leads our editorial team with over 8 years of experience in digital content creation.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in modern web technologies. Michael ensures our platform runs smoothly and efficiently.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Strategist',
      bio: 'Creative writer and content strategist who helps shape our editorial direction and community engagement.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
    }
  ];

  return (
    <div className="about">
      <div className="container">
        {/* Hero Section */}
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>About Our Blog</h1>
          <p className="hero-subtitle">
            We're passionate about sharing knowledge, inspiring creativity, and building a community of thoughtful writers and readers.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="mission-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At Blog., we believe in the power of words to inspire, educate, and connect people from all walks of life. 
              Our mission is to provide a platform where writers can share their insights, experiences, and expertise with 
              a global audience.
            </p>
            <p>
              We're committed to fostering a community of thoughtful content creators and engaged readers who value 
              quality, authenticity, and meaningful discussions. Whether you're a seasoned writer or just starting your 
              journey, we welcome you to join our growing community.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          className="features-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>What Makes Us Different</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="team-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="stats-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Articles Published</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Contributing Writers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Monthly Readers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Countries Reached</div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>
              Ready to share your story? Start writing today and connect with readers around the world.
            </p>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/create'}
            >
              Start Writing
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About; 