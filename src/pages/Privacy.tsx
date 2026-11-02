import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import './Privacy.css';

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email address, phone number)',
        'Business information (Company name, industry, size)',
        'Usage data and analytics',
        'Communication preferences and history',
        'Technical information (IP address, browser type, device information)',
      ],
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'Provide and maintain our services',
        'Process transactions and send related information',
        'Send administrative information and updates',
        'Respond to customer service requests',
        'Analyze usage and improve our services',
        'Detect, prevent, and address technical issues',
      ],
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'Industry-standard encryption for data transmission',
        'Regular security audits and assessments',
        'Secure data centers with 24/7 monitoring',
        'Access controls and authentication measures',
        'Regular data backups and disaster recovery plans',
      ],
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access your personal information',
        'Correct inaccurate data',
        'Request deletion of your data',
        'Object to processing of your data',
        'Export your data in a portable format',
        'Withdraw consent at any time',
      ],
    },
    {
      icon: Eye,
      title: 'Third-Party Services',
      content: [
        'We may share data with trusted service providers',
        'Analytics platforms for usage tracking',
        'Payment processors for transaction handling',
        'Communication tools for customer support',
        'All third parties are contractually bound to protect your data',
      ],
    },
    {
      icon: FileText,
      title: 'Data Retention',
      content: [
        'We retain data only as long as necessary',
        'Account data kept while your account is active',
        'Transactional data retained for legal requirements',
        'You can request deletion of your data at any time',
        'Some data may be retained for legitimate business purposes',
      ],
    },
  ];

  return (
    <div className="privacy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="privacy-hero-content"
          >
            <div className="hero-icon">
              <Shield size={48} />
            </div>
            <h1>Privacy Policy</h1>
            <p className="privacy-hero-description">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <p className="last-updated">
              <strong>Last Updated:</strong> November 2, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="privacy-intro">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="intro-content"
          >
            <h2>Our Commitment to Your Privacy</h2>
            <p>
              At TriTech Forge, we are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy outlines our 
              practices concerning the collection, use, and disclosure of your information 
              when you use our services.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in 
              accordance with this policy. We will not use or share your information with 
              anyone except as described in this Privacy Policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="privacy-sections">
        <div className="container">
          <div className="sections-grid">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="policy-card"
              >
                <div className="policy-icon">
                  <section.icon size={28} />
                </div>
                <h3>{section.title}</h3>
                <ul className="policy-list">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="privacy-additional">
        <div className="container">
          <div className="additional-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <h3>Cookies and Tracking</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our 
                service and hold certain information. You can instruct your browser to refuse 
                all cookies or to indicate when a cookie is being sent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <h3>Children's Privacy</h3>
              <p>
                Our services are not directed to individuals under the age of 18. We do not 
                knowingly collect personal information from children. If you become aware that 
                a child has provided us with personal information, please contact us.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <h3>International Data Transfers</h3>
              <p>
                Your information may be transferred to and maintained on computers located 
                outside of your jurisdiction where data protection laws may differ. We ensure 
                appropriate safeguards are in place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="additional-card"
            >
              <h3>Changes to This Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last 
                Updated" date.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="privacy-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Questions About Your Privacy?</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
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
