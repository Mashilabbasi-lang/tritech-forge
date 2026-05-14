import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";

export default function Privacy() {
  useTitle("Privacy Policy | TriTech Forge", "TriTech Forge privacy policy — how we collect, use, and protect your data.");

  return (
    <Layout>
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: January 1, 2025</p>

            <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-300">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you fill out a contact form, request a demo, or communicate with us. This may include:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Name and business name</li>
                  <li>Email address and phone number</li>
                  <li>Industry and business details</li>
                  <li>Messages and inquiries submitted via our chatbot or contact form</li>
                </ul>
                <p className="mt-3">We also automatically collect certain technical information when you visit our website, including IP address, browser type, pages visited, and time spent on pages.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Respond to your inquiries and schedule demos</li>
                  <li>Provide and improve our AI voice automation services</li>
                  <li>Send you relevant updates, offers, and communications (with your consent)</li>
                  <li>Analyze website usage to improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Sharing Your Information</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Service providers who assist in operating our platform (e.g., Formspree for form submissions)</li>
                  <li>Analytics providers to help us understand website usage</li>
                  <li>Law enforcement or regulatory bodies when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. You may request deletion of your data at any time by contacting us.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2>
                <p>Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of the site.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications at any time</li>
                  <li>Lodge a complaint with a data protection authority</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Security</h2>
                <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us at:</p>
                <div className="mt-3 glass-card p-4 rounded-xl border border-white/10">
                  <p className="text-white font-medium">TriTech Forge</p>
                  <p>Email: <a href="mailto:hello@tritechforge.com" className="text-primary hover:underline">hello@tritechforge.com</a></p>
                </div>
              </section>

            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
