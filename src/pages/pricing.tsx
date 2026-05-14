import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";
import { CheckCircle, X, Phone, Globe } from "lucide-react";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Pricing() {
  useTitle("Pricing | TriTech Forge", "Transparent AI voice automation pricing for HVAC, car dealerships, and home service businesses across the Gulf and USA.");

  const tiers = [
    {
      name: "Starter",
      price: "100",
      badge: null,
      desc: "Perfect for HVAC, plumbing, and small home services businesses ready to stop missing calls.",
      idealFor: "HVAC · Plumbing · Electrical · Cleaning",
      features: [
        "500 AI minutes / month",
        "1 AI Voice Profile",
        "Standard Business Hours",
        "Basic Call Transcripts",
        "Appointment Booking",
        "Email Support",
        "Standard Analytics Dashboard",
      ],
      missing: [
        "24/7 After-Hours Answering",
        "CRM Integration",
        "Outbound Calling",
        "Multi-location Support",
      ],
      highlight: false,
      cta: "Start Free Trial",
      ctaLink: "/contact",
    },
    {
      name: "Agency",
      price: "180",
      badge: "Most Popular",
      desc: "For agencies and multi-location businesses managing multiple clients or service areas.",
      idealFor: "Car Dealerships · Roofing · Real Estate · Agencies",
      features: [
        "2,000 AI minutes / month",
        "3 AI Voice Profiles",
        "24/7 Always-On Answering",
        "Direct Calendar Booking",
        "Full CRM Integrations",
        "Custom Qualification Logic",
        "Outbound Follow-up Calling",
        "Multi-location Support",
        "Priority Support",
        "Advanced Analytics Dashboard",
      ],
      missing: [
        "Unlimited Minutes",
        "Dedicated Success Manager",
      ],
      highlight: true,
      cta: "Get Started",
      ctaLink: "/contact",
    },
    {
      name: "Enterprise",
      price: null,
      badge: null,
      desc: "Custom-built for large dealership groups, medical networks, and high-volume operations across the Gulf & USA.",
      idealFor: "Car Dealerships · Medical Groups · Large Operations",
      features: [
        "Unlimited AI minutes",
        "10+ AI Voice Profiles",
        "Outbound Calling Campaigns",
        "Custom API Access & Webhooks",
        "White-glove Onboarding",
        "Dedicated Success Manager",
        "Custom Voice Cloning",
        "Gulf & US Multi-region Support",
        "Arabic + English AI Support",
        "SLA Guarantee",
        "Custom Integrations",
      ],
      missing: [],
      highlight: false,
      cta: "Contact Sales",
      ctaLink: "/contact",
    },
  ];

  return (
    <Layout>
      <div className="pt-32 pb-16 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6"
        >
          <Globe className="w-3.5 h-3.5" />
          Serving the Gulf Region & USA
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
        >
          Pricing that pays for <br />
          <span className="text-gradient">itself in one call.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground"
        >
          A single missed emergency call costs a plumbing company $500+. Our AI costs a fraction of that — and never sleeps.
        </motion.p>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className={`relative glass-card rounded-3xl p-8 flex flex-col h-full ${
                tier.highlight
                  ? "border-primary shadow-[0_0_40px_rgba(99,102,241,0.25)] md:-mt-8 md:mb-8 md:scale-105 z-10 bg-card/80"
                  : "border-white/10"
              }`}
            >
              {tier.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-3">{tier.idealFor}</p>
                <p className="text-sm text-muted-foreground min-h-[48px]">{tier.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  {tier.price ? (
                    <>
                      <span className="text-5xl font-extrabold text-white">${tier.price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-white">Custom Pricing</span>
                  )}
                </div>
              </div>

              <Link
                href={tier.ctaLink}
                className={`w-full py-3 rounded-xl font-bold text-center mb-8 transition-all block ${
                  tier.highlight
                    ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                    : tier.price === null
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
                data-testid={`link-pricing-cta-${tier.name}`}
              >
                {tier.cta}
              </Link>

              <div className="space-y-3 flex-1">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                  What's included
                </p>
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{f}</span>
                  </div>
                ))}

                {tier.missing.length > 0 && (
                  <>
                    <div className="pt-3 mt-3 border-t border-white/10" />
                    {tier.missing.map((f) => (
                      <div key={f} className="flex items-start gap-3 opacity-40">
                        <X className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-400 line-through">{f}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-3xl mx-auto glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Based in the Gulf or running a large operation?</h4>
              <p className="text-sm text-gray-400 mt-0.5">We offer custom plans with Arabic + English AI support, Gulf-region onboarding, and dedicated account management.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all text-sm whitespace-nowrap"
            data-testid="link-enterprise-contact"
          >
            Talk to Sales
          </Link>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-32 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {[
            {
              q: "What happens if I go over my minutes?",
              a: "You'll be billed at $0.15 per additional minute. You can upgrade your plan at any time to avoid overages.",
            },
            {
              q: "Can the AI transfer calls to a human?",
              a: "Yes. You can set rules for when calls should route to a live person — such as high-value jobs, frustrated customers, or specific keywords.",
            },
            {
              q: "Does it work for car dealerships in the Gulf?",
              a: "Absolutely. Our Enterprise plan includes Arabic + English bilingual AI support, making it ideal for Gulf-region dealerships and service businesses.",
            },
            {
              q: "Does it integrate with ServiceTitan or dealer DMS systems?",
              a: "Yes. Agency and Enterprise plans include direct integrations with ServiceTitan, Housecall Pro, Jobber, and major dealer management systems.",
            },
            {
              q: "Is there a setup fee?",
              a: "No setup fees for Starter or Agency. We provide self-serve onboarding that takes about 15 minutes. Enterprise plans include white-glove setup.",
            },
            {
              q: "Can I try it before I pay?",
              a: "Yes — book a live demo and we'll show you the AI handling real calls for your business type before you commit to anything.",
            },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 rounded-xl px-6 bg-white/5">
              <AccordionTrigger className="text-white hover:text-primary text-left py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
