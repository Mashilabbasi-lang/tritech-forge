import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Heart } from 'lucide-react';
import './About.css';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge AI solutions.',
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Your success is our success. We put customers at the heart of everything.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in every interaction.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together with clients to achieve extraordinary results.',
    },
  ];

  const stats = [
    { value: '2020', label: 'Founded' },
    { value: '500+', label: 'Clients' },
    { value: '50K+', label: 'Calls Handled' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="about-hero-content"
          >
            <h1>
              About <span className="gradient-text">TriTech Forge</span>
            </h1>
            <p className="about-hero-description">
              We're on a mission to transform how businesses communicate with their customers 
              through intelligent AI automation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="story-content"
            >
              <h2>Our Story</h2>
              <p>
                Founded in 2020, TriTech Forge began with a simple yet powerful vision: 
                to make enterprise-level communication technology accessible to businesses 
                of all sizes.
              </p>
              <p>
                We recognized that missed calls and inefficient communication were costing 
                businesses thousands in lost revenue. Our team of AI experts and business 
                professionals came together to create a solution that would change the game.
              </p>
              <p>
                Today, we're proud to serve over 500 businesses, handling thousands of 
                customer interactions daily with our advanced AI technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="story-stats"
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-box">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mv-card"
            >
              <div className="mv-icon">
                <Target size={36} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower businesses with intelligent AI solutions that enhance customer 
                experiences, boost productivity, and drive sustainable growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mv-card"
            >
              <div className="mv-icon">
                <Eye size={36} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the leading provider of AI communication solutions, setting the 
                standard for innovation, reliability, and customer success worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our <span className="gradient-text">Values</span></h2>
            <p>The principles that guide everything we do</p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="value-card"
              >
                <div className="value-icon">
                  <value.icon size={28} />
                </div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="team-content"
          >
            <div className="team-icon">
              <Users size={48} />
            </div>
            <h2>Built by Experts</h2>
            <p>
              Our team combines decades of experience in AI, software engineering, 
              and business operations. We're passionate about creating solutions 
              that make a real difference for our clients.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
