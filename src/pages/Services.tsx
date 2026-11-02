import { motion } from 'framer-motion';
import { 
  Headset, Phone, Calendar, Zap, 
  Users, TrendingUp, Shield, Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

export default function Services() {
  const services = [
    {
      icon: Headset,
      title: 'AI Receptionist',
      description: 'Professional AI-powered receptionist that answers calls, handles inquiries, and provides information 24/7 with human-like conversations.',
      features: [
        'Natural language processing',
        'Multi-language support',
        'Custom greetings and scripts',
        'Call routing and transfers',
      ],
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automated appointment booking system that integrates with your calendar, manages availability, and sends reminders automatically.',
      features: [
        'Real-time calendar sync',
        'Automatic confirmations',
        'Rescheduling management',
        'Time zone handling',
      ],
    },
    {
      icon: Zap,
      title: 'Lead Qualification',
      description: 'Intelligent lead scoring and qualification system that identifies high-value opportunities and prioritizes your sales efforts.',
      features: [
        'Custom qualification criteria',
        'Lead scoring algorithms',
        'Automated follow-ups',
        'CRM integration',
      ],
    },
    {
      icon: Phone,
      title: 'Outbound Calling',
      description: 'Automated outbound calling campaigns for customer follow-ups, reminders, and engagement with detailed analytics and reporting.',
      features: [
        'Campaign management',
        'Call scheduling',
        'Performance tracking',
        'Voicemail detection',
      ],
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless integration with your team workflows, enabling better communication and coordination across all touchpoints.',
      features: [
        'Team dashboards',
        'Real-time notifications',
        'Role-based access',
        'Activity logs',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics dashboard providing actionable insights into call patterns, customer behavior, and business performance.',
      features: [
        'Custom reports',
        'Real-time metrics',
        'Trend analysis',
        'Export capabilities',
      ],
    },
  ];

  const additionalBenefits = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry standards',
    },
    {
      icon: Clock,
      title: '99.9% Uptime',
      description: 'Reliable service with redundant systems and backups',
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Expert support team available whenever you need assistance',
    },
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="services-hero-content"
          >
            <h1>
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="services-hero-description">
              Comprehensive AI-powered solutions designed to automate your business 
              communications and drive growth. Choose the services that fit your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card"
              >
                <div className="service-icon">
                  <service.icon size={32} />
                </div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="benefits-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Why Choose <span className="gradient-text">Us</span></h2>
            <p>Built with reliability, security, and your success in mind</p>
          </motion.div>

          <div className="benefits-grid">
            {additionalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="benefit-card"
              >
                <div className="benefit-icon">
                  <benefit.icon size={28} />
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="services-cta-card"
          >
            <h2>Ready to Get Started?</h2>
            <p>
              Let's discuss how our services can transform your business operations
            </p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
