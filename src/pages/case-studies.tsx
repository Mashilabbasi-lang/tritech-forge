import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";
import { Link } from "wouter";
import { CheckCircle, ArrowRight, Star, TrendingUp, Phone, Calendar, Zap } from "lucide-react";

const caseStudies = [
  {
    id: "apex-plumbing",
    client: "Apex Plumbing Co.",
    industry: "Plumbing",
    location: "Houston, TX",
    logo: "AP",
    color: "from-blue-500/20 to-blue-600/10",
    accent: "text-blue-400",
    border: "border-blue-500/20",
    challenge: "Missing 40% of inbound calls during peak hours, losing an estimated $15,000/month in potential jobs.",
    solution: "Deployed TriTech Forge AI receptionist to handle all inbound calls 24/7, with emergency job routing and instant appointment booking.",
    results: [
      { metric: "98%", label: "Call Answer Rate" },
      { metric: "$22K", label: "Extra Revenue / Month" },
      { metric: "3x", label: "Lead Conversion" },
    ],
    quote: "We went from missing half our calls to booking jobs at 2 AM. The AI sounds so natural our customers don't even know.",
    author: "Mike Torres, Owner",
    tags: ["AI Receptionist", "Appointment Booking", "24/7 Coverage"],
  },
  {
    id: "volt-electric",
    client: "Volt Electric Services",
    industry: "Electrical",
    location: "Dallas, TX",
    logo: "VE",
    color: "from-yellow-500/20 to-yellow-600/10",
    accent: "text-yellow-400",
    border: "border-yellow-500/20",
    challenge: "Small team couldn't handle call volume during busy season. Leads were going to competitors.",
    solution: "Implemented AI lead qualification to filter high-value commercial jobs and auto-schedule site visits.",
    results: [
      { metric: "65%", label: "Reduction in Missed Leads" },
      { metric: "4.2x", label: "ROI in 60 Days" },
      { metric: "18hrs", label: "Saved Per Week" },
    ],
    quote: "The lead qualification alone paid for the entire platform. We only talk to serious customers now.",
    author: "Sarah Kim, Operations Manager",
    tags: ["Lead Qualification", "Outbound Calling", "CRM Integration"],
  },
  {
    id: "horizon-roofing",
    client: "Horizon Roofing Group",
    industry: "Roofing",
    location: "Phoenix, AZ",
    logo: "HR",
    color: "from-orange-500/20 to-orange-600/10",
    accent: "text-orange-400",
    border: "border-orange-500/20",
    challenge: "Storm season created call surges impossible to handle manually. Customer satisfaction was dropping.",
    solution: "Scaled with TriTech Forge outbound calling for storm damage follow-ups and AI triage for emergency repairs.",
    results: [
      { metric: "300+", label: "Calls Handled in One Day" },
      { metric: "91%", label: "Customer Satisfaction" },
      { metric: "$180K", label: "Storm Season Revenue" },
    ],
    quote: "During the last storm season we handled 3x the volume with zero extra staff. Absolutely game-changing.",
    author: "James Whitfield, CEO",
    tags: ["Outbound Calling", "Emergency Routing", "Scale"],
  },
  {
    id: "city-hvac",
    client: "City HVAC Solutions",
    industry: "HVAC",
    location: "Chicago, IL",
    logo: "CH",
    color: "from-cyan-500/20 to-cyan-600/10",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    challenge: "After-hours emergency calls were being lost. Technicians were getting woken up for non-urgent issues.",
    solution: "AI triage system to classify emergency vs. routine calls, route urgent jobs to on-call techs, and schedule the rest for next day.",
    results: [
      { metric: "100%", label: "Emergency Response Rate" },
      { metric: "70%", label: "Fewer After-Hours Interruptions" },
      { metric: "2.8x", label: "Technician Productivity" },
    ],
    quote: "My techs are happier, customers get faster responses, and we haven't missed a real emergency since day one.",
    author: "Linda Park, Operations Director",
    tags: ["Emergency Triage", "AI Receptionist", "Scheduling"],
  },
  {
    id: "gulf-auto",
    client: "Gulf Auto Group",
    industry: "Car Dealership",
    location: "Dubai, UAE",
    logo: "GA",
    color: "from-purple-500/20 to-purple-600/10",
    accent: "text-purple-400",
    border: "border-purple-500/20",
    challenge: "Multilingual customer base across UAE. Sales team overwhelmed with inquiry calls, losing hot leads.",
    solution: "Enterprise plan with Arabic + English AI support, lead qualification for serious buyers, and test drive scheduling automation.",
    results: [
      { metric: "Arabic+EN", label: "Bilingual AI Support" },
      { metric: "55%", label: "More Test Drive Bookings" },
      { metric: "40hrs", label: "Sales Team Time Saved / Week" },
    ],
    quote: "Our customers in the Gulf expect instant, professional service in Arabic. TriTech Forge delivers exactly that.",
    author: "Ahmed Al-Rashid, GM",
    tags: ["Arabic Support", "Lead Qualification", "Enterprise"],
  },
  {
    id: "shield-pest",
    client: "Shield Pest Control",
    industry: "Pest Control",
    location: "Miami, FL",
    logo: "SP",
    color: "from-green-500/20 to-green-600/10",
    accent: "text-green-400",
    border: "border-green-500/20",
    challenge: "High call volume with repetitive questions about pricing and availability. Staff spending 60% of time on basic inquiries.",
    solution: "AI handles all FAQ calls, books recurring service appointments, and sends automated reminders — freeing staff for complex jobs.",
    results: [
      { metric: "60%", label: "Fewer Repetitive Calls" },
      { metric: "85%", label: "Appointment Show Rate" },
      { metric: "$8K", label: "Monthly Labor Savings" },
    ],
    quote: "We cut our phone staff hours in half and actually improved customer experience. The AI never has a bad day.",
    author: "Carlos Mendez, Founder",
    tags: ["FAQ Automation", "Appointment Reminders", "Cost Savings"],
  },
];

const stats = [
  { value: "50+", label: "Businesses Served" },
  { value: "12K+", label: "Calls Handled" },
  { value: "98%", label: "Avg Answer Rate" },
  { value: "$500K+", label: "Revenue Generated for Clients" },
];

export default function CaseStudies() {
  useTitle("Clients & Case Studies | TriTech Forge", "See how 500+ home service and trade businesses use TriTech Forge AI to capture more leads and grow revenue.");

  return (
    <Layout>
      {/* Hero */}
      <div className="pt-32 pb-16 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6"
        >
          <Star className="w-3.5 h-3.5 fill-primary" />
          Real Results from Real Businesses
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
        >
          Our Clients <span className="text-gradient">Win More Jobs.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          From solo plumbers to Gulf region dealerships — see how businesses use TriTech Forge to never miss a call again.
        </motion.p>
      </div>

      {/* Global Stats */}
      <div className="border-y border-white/10 bg-white/[0.02] py-12 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="container mx-auto px-4 pb-24 max-w-6xl">
        <div className="space-y-12">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`glass-card rounded-3xl border ${cs.border} overflow-hidden`}
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Left */}
                  <div className="flex-1 space-y-6">
                    {/* Client header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${cs.color} border ${cs.border} flex items-center justify-center text-lg font-extrabold text-white shrink-0`}>
                        {cs.logo}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{cs.client}</h2>
                        <p className="text-sm text-muted-foreground">{cs.industry} · {cs.location}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">Challenge</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Solution</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className={`border-l-2 border-l-primary pl-4`}>
                      <p className="text-sm text-gray-200 italic leading-relaxed">"{cs.quote}"</p>
                      <p className={`text-xs font-semibold mt-2 ${cs.accent}`}>— {cs.author}</p>
                    </blockquote>
                  </div>

                  {/* Right — Results */}
                  <div className="lg:w-72 shrink-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Results</p>
                    <div className="space-y-4">
                      {cs.results.map((r, j) => (
                        <div key={j} className={`bg-linear-to-br ${cs.color} border ${cs.border} rounded-2xl p-5 text-center`}>
                          <p className={`text-3xl font-extrabold ${cs.accent} mb-1`}>{r.metric}</p>
                          <p className="text-xs text-gray-400">{r.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">5.0 rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center glass-card rounded-3xl p-12 border border-white/10"
        >
          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to be our next success story?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join 500+ businesses already using TriTech Forge to capture every lead and grow revenue on autopilot.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all hover:glow-blue group"
          >
            Book a Free Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
