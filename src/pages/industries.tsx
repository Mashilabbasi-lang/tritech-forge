import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";
import { Link } from "wouter";
import { Wrench, Zap, Building, MapPin, Shield, HeartPulse, Car, Home } from "lucide-react";

export default function Industries() {
  useTitle("Industries | TriTech Forge", "See how our AI receptionists help specific trades: Plumbing, HVAC, Electrical, and more.");

  const industries = [
    {
      icon: Wrench,
      name: "Plumbing",
      problem: "Missing emergency calls means losing $500+ jobs to competitors.",
      solution: "AI answers 24/7, tags emergencies, and dispatches on-call techs immediately.",
      roi: "Average 18% increase in emergency job capture."
    },
    {
      icon: Zap,
      name: "Electrical",
      problem: "Wasting time on small troubleshooting calls when you need panel upgrades.",
      solution: "AI qualifies the job type, estimates size, and prioritizes high-value work.",
      roi: "Saves 10+ hours a week in unqualified phone time."
    },
    {
      icon: Building,
      name: "HVAC",
      problem: "Overwhelmed with calls during seasonal peaks (first freeze / first heat wave).",
      solution: "AI handles simultaneous calls, scheduling routine maintenance efficiently.",
      roi: "Zero abandoned calls during peak seasons."
    },
    {
      icon: Shield,
      name: "Pest Control",
      problem: "Customers need immediate reassurance and fast booking.",
      solution: "AI provides immediate empathy, quotes standard treatments, and books slots.",
      roi: "25% higher booking rate on first contact."
    },
    {
      icon: HeartPulse,
      name: "Medical Clinics",
      problem: "Staff tied up booking appointments instead of helping patients in-office.",
      solution: "AI handles routine scheduling, cancellations, and basic FAQ securely.",
      roi: "Frees up front desk staff by 40%."
    },
    {
      icon: Car,
      name: "Car Dealerships",
      problem: "Leads get cold if service or sales departments don't answer promptly.",
      solution: "AI routes sales calls to active agents and books service appointments.",
      roi: "Increase service department throughput."
    },
    {
      icon: Home,
      name: "Real Estate",
      problem: "Agents are always driving or showing homes, missing inbound buyer calls.",
      solution: "AI answers, captures buyer criteria, and schedules callbacks or showings.",
      roi: "Never lose a hot lead while driving."
    },
    {
      icon: MapPin,
      name: "Cleaning Services",
      problem: "High volume of quoting questions for different square footages.",
      solution: "AI asks for sq ft, provides estimated quotes, and books initial cleans.",
      roi: "Automated estimating reduces admin overhead."
    }
  ];

  return (
    <Layout>
      <div className="pt-32 pb-20 border-b border-white/10 bg-card/30">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Built for the <span className="text-gradient">Real World</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            We don't build generic chatbots. We build specialized AI agents trained on the unique workflows, jargon, and pain points of your specific industry.
          </motion.p>
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col h-full hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <ind.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{ind.name}</h3>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-1">The Problem</h4>
                    <p className="text-sm text-gray-400">{ind.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-1">The Solution</h4>
                    <p className="text-sm text-gray-300">{ind.solution}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="inline-block px-3 py-1 rounded bg-green-500/10 text-green-400 text-xs font-semibold">
                    ROI: {ind.roi}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] pointer-events-none rounded-full transform -translate-y-1/2"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Don't see your industry?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our AI can be custom-trained for any business model that relies on phone calls for revenue or support.
          </p>
          <Link href="/contact" className="px-8 py-4 rounded-lg bg-white text-black font-bold inline-block hover:bg-gray-200 transition-all hover:scale-105">
            Talk to an Expert
          </Link>
        </div>
      </div>
    </Layout>
  );
}
