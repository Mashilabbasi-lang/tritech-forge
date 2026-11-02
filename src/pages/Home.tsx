import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Clock, Users, 
  ArrowRight, Star,
  Headset, Calendar, TrendingUp 
} from 'lucide-react';
import './Home.css';

export default function Home() {
  const features = [
    {
      icon: Headset,
      title: 'AI Receptionist',
      description: 'Never miss a call with our 24/7 AI-powered receptionist that handles inquiries professionally.',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automatic appointment booking and calendar management that syncs with your systems.',
    },
    {
      icon: TrendingUp,
      title: 'Lead Qualification',
      description: 'Intelligent lead scoring and qualification to focus on high-value opportunities.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee for your peace of mind.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock service ensures you never miss an opportunity, day or night.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless integration with your team workflows and communication tools.',
    },
  ];

  const stats = [
    { value: '500+', label: 'Happy Clients' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
    { value: '50K+', label: 'Calls Handled' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-content"
            >
              <div className="hero-badge">
                <Star size={16} fill="currentColor" />
                <span>Trusted by 500+ Businesses</span>
              </div>
              
              <h1 className="hero-title">
                Transform Your Business With
                <span className="gradient-text"> AI Voice Automation</span>
              </h1>
              
              <p className="hero-description">
                Never miss a call again. Our intelligent AI agents handle customer inquiries, 
                book appointments, and qualify leads 24/7 while you focus on growing your business.
              </p>
              
              <div className="hero-cta">
                <Link to="/contact" className="btn btn-primary">
                  Get Started Free
                  <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  Explore Services
                </Link>
              </div>

              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="stat-item"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <motion.div 
                      className="stat-value"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Robot Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-image"
            >
              <motion.div 
                className="robot-container"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src="/robot.png" 
                  alt="AI Robot Assistant" 
                  className="robot-image"
                />
                
                {/* Floating elements around robot */}
                <motion.div 
                  className="floating-icon floating-icon-1"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Headset size={24} />
                </motion.div>
                
                <motion.div 
                  className="floating-icon floating-icon-2"
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <Calendar size={24} />
                </motion.div>
                
                <motion.div 
                  className="floating-icon floating-icon-3"
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <TrendingUp size={24} />
                </motion.div>

                {/* Glow effect behind robot */}
                <div className="robot-glow"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Why Choose <span className="gradient-text">TriTech Forge</span></h2>
            <p>
              Powerful features designed to automate your communication and boost productivity
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
                className="feature-card"
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon size={28} />
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>How It <span className="gradient-text">Works</span></h2>
            <p>Get started in three simple steps</p>
          </motion.div>

          <div className="steps-container">
            {[
              {
                number: '01',
                title: 'Sign Up',
                description: 'Create your account and set up your business profile in minutes.',
              },
              {
                number: '02',
                title: 'Configure',
                description: 'Customize your AI agent with your business rules and preferences.',
              },
              {
                number: '03',
                title: 'Go Live',
                description: 'Activate your AI receptionist and start handling calls automatically.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)',
                }}
                className="step-card"
              >
                <motion.div 
                  className="step-number"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {step.number}
                </motion.div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="cta-card"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join hundreds of businesses that trust TriTech Forge to handle their communications
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="btn btn-primary btn-large">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
