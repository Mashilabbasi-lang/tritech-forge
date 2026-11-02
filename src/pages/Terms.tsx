import { motion } from 'framer-motion';
import { Scale, FileText, AlertCircle, CheckCircle, XCircle, Users } from 'lucide-react';
import './Terms.css';

export default function Terms() {
  const terms = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: 'By accessing and using TriTech Forge services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
    },
    {
      icon: Users,
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.',
    },
    {
      icon: FileText,
      title: 'Service Description',
      content: 'TriTech Forge provides AI-powered voice automation services for businesses. We reserve the right to modify, suspend, or discontinue any part of our services at any time with or without notice.',
    },
    {
      icon: Scale,
      title: 'User Obligations',
      content: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that violates applicable laws or regulations.',
    },
    {
      icon: AlertCircle,
      title: 'Prohibited Activities',
      content: 'You may not use our services to transmit spam, malware, or engage in fraudulent activities. Any misuse of our services may result in immediate termination of your account.',
    },
    {
      icon: XCircle,
      title: 'Limitation of Liability',
      content: 'TriTech Forge shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.',
    },
  ];

  const specificTerms = [
    {
      title: '1. Service Availability',
      points: [
        'We strive to maintain 99.9% uptime but do not guarantee uninterrupted service',
        'Scheduled maintenance will be announced in advance when possible',
        'We are not responsible for downtime caused by circumstances beyond our control',
        'Service credits may be issued for extended outages per our SLA',
      ],
    },
    {
      title: '2. Payment Terms',
      points: [
        'All fees are billed in advance on a monthly or annual basis',
        'Prices are subject to change with 30 days notice',
        'Refunds are provided only as specified in our refund policy',
        'You are responsible for all taxes associated with your purchase',
      ],
    },
    {
      title: '3. Intellectual Property',
      points: [
        'All content and materials are owned by TriTech Forge or our licensors',
        'You are granted a limited license to use our services for business purposes',
        'You may not copy, modify, or distribute our proprietary content',
        'Any feedback you provide may be used by us without compensation',
      ],
    },
    {
      title: '4. Data and Privacy',
      points: [
        'We process your data in accordance with our Privacy Policy',
        'You retain ownership of all data you submit to our services',
        'We implement industry-standard security measures',
        'You are responsible for backing up your important data',
      ],
    },
    {
      title: '5. Termination',
      points: [
        'Either party may terminate the agreement with 30 days notice',
        'We may suspend or terminate access immediately for violations',
        'Upon termination, you must cease all use of our services',
        'Some provisions survive termination, including payment obligations',
      ],
    },
    {
      title: '6. Modifications',
      points: [
        'We may update these Terms from time to time',
        'Material changes will be communicated via email or service notification',
        'Continued use after changes constitutes acceptance',
        'You should review these Terms periodically',
      ],
    },
  ];

  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="terms-hero-content"
          >
            <div className="hero-icon">
              <Scale size={48} />
            </div>
            <h1>Terms of Service</h1>
            <p className="terms-hero-description">
              Please read these terms carefully before using our services. 
              These terms constitute a legally binding agreement between you and TriTech Forge.
            </p>
            <p className="last-updated">
              <strong>Effective Date:</strong> November 2, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="terms-overview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Key Terms <span className="gradient-text">Overview</span></h2>
            <p>Essential terms and conditions for using our services</p>
          </motion.div>

          <div className="overview-grid">
            {terms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="term-card"
              >
                <div className="term-icon">
                  <term.icon size={24} />
                </div>
                <h3>{term.title}</h3>
                <p>{term.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="terms-detailed">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Detailed <span className="gradient-text">Terms</span></h2>
            <p>Complete terms and conditions</p>
          </motion.div>

          <div className="detailed-content">
            {specificTerms.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="detailed-section"
              >
                <h3>{section.title}</h3>
                <ul className="detailed-list">
                  {section.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="terms-additional">
        <div className="container">
          <div className="additional-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="additional-box"
            >
              <h3>Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws 
                of the State of California, without regard to its conflict of law provisions. 
                Any disputes arising from these Terms shall be resolved in the courts of 
                San Francisco, California.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="additional-box"
            >
              <h3>Severability</h3>
              <p>
                If any provision of these Terms is held to be unenforceable or invalid, 
                such provision will be changed and interpreted to accomplish the objectives 
                of such provision to the greatest extent possible under applicable law, and 
                the remaining provisions will continue in full force and effect.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="additional-box"
            >
              <h3>Entire Agreement</h3>
              <p>
                These Terms constitute the entire agreement between you and TriTech Forge 
                regarding the use of our services, superseding any prior agreements between 
                you and TriTech Forge relating to your use of the services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="terms-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Questions About These Terms?</h2>
            <p>
              If you have any questions or concerns about these Terms of Service, 
              please contact our legal team.
            </p>
            <a href="/contact" className="btn btn-primary btn-large">
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
