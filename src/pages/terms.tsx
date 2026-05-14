import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";

export default function Terms() {
  useTitle("Terms of Service | TriTech Forge", "TriTech Forge terms of service — the rules and conditions for using our platform.");

  return (
    <Layout>
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: January 1, 2025</p>

            <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-300">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using TriTech Forge's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Description of Services</h2>
                <p>TriTech Forge provides AI voice automation services including but not limited to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>AI receptionist and inbound call handling</li>
                  <li>Outbound calling and lead follow-up automation</li>
                  <li>Appointment scheduling and calendar integration</li>
                  <li>Lead qualification and CRM integration</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Account Responsibilities</h2>
                <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2>
                <p>You agree not to use our services to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Harass, abuse, or harm any individual</li>
                  <li>Send unsolicited communications (spam)</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Payment & Billing</h2>
                <p>Subscription fees are billed monthly in advance. All fees are non-refundable except as required by law. We reserve the right to change pricing with 30 days' notice. Failure to pay may result in suspension of services.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Cancellation</h2>
                <p>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial months of service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
                <p>All content, technology, and materials on the TriTech Forge platform are owned by or licensed to TriTech Forge. You may not copy, modify, distribute, or reverse engineer any part of our platform without written permission.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, TriTech Forge shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid by you in the 3 months preceding the claim.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Disclaimer of Warranties</h2>
                <p>Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or meet your specific requirements.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration or in the courts of the applicable jurisdiction.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">11. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the new Terms. We will notify users of material changes via email or prominent notice on our website.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">12. Contact</h2>
                <p>For questions about these Terms, contact us at:</p>
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
