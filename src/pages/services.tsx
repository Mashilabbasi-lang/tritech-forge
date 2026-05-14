import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";
import { Link } from "wouter";
import { Headset, Phone, Calendar, Zap, Users, Activity, CheckCircle, Mic, BarChart2, Clock, Star, ArrowRight, PhoneCall, TrendingUp } from "lucide-react";

// ─── Custom UI Mockups ────────────────────────────────────

function AIReceptionistMockup() {
  return (
    <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#0a0c0f] overflow-hidden shadow-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-semibold">Live Call — 02:14</span>
        </div>
        <span className="text-xs text-gray-500">Smith Plumbing AI</span>
      </div>
      <div className="flex-1 space-y-3 overflow-hidden">
        <div className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Mic className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tl-none px-3 py-2 text-xs text-gray-200 max-w-xs">
            "Hi, thanks for calling Smith Plumbing! How can I help you today?"
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="bg-white/5 border border-white/10 rounded-xl rounded-tr-none px-3 py-2 text-xs text-gray-300 max-w-xs">
            "My water heater is leaking. Can someone come today?"
          </div>
          <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center shrink-0 text-xs">👤</div>
        </div>
        <div className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Mic className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tl-none px-3 py-2 text-xs text-gray-200 max-w-xs">
            "Absolutely! I have a technician available at 2 PM. Can I get your address?"
            <span className="inline-block w-1 h-3 bg-primary ml-1 animate-pulse align-middle" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-green-400"><CheckCircle className="w-3 h-3" /> Emergency Flagged</div>
        <div className="flex items-center gap-1.5 text-xs text-primary"><Calendar className="w-3 h-3" /> Slot Reserved</div>
      </div>
    </div>
  );
}

function OutboundCallingMockup() {
  const campaigns = [
    { name: "Follow-up Campaign", calls: 142, answered: 98, status: "Running" },
    { name: "Appointment Reminders", calls: 87, answered: 81, status: "Running" },
    { name: "Past Customer Reactivation", calls: 210, answered: 134, status: "Paused" },
  ];
  return (
    <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#0a0c0f] overflow-hidden shadow-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">Outbound Campaigns</span>
        <span className="text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">3 Active</span>
      </div>
      <div className="space-y-2.5">
        {campaigns.map((c, i) => (
          <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${c.status === "Running" ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
              <span className="text-xs text-white font-medium">{c.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span><PhoneCall className="w-3 h-3 inline mr-1" />{c.calls}</span>
              <span className="text-green-400">{Math.round(c.answered / c.calls * 100)}% answered</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mt-auto">
        {[["Total Calls", "439"], ["Avg Answer Rate", "72%"], ["Booked Jobs", "87"]].map(([label, val]) => (
          <div key={label} className="bg-white/5 rounded-xl p-2.5 text-center">
            <p className="text-base font-bold text-white">{val}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchedulingMockup() {
  const slots = [
    { time: "9:00 AM", name: "John Smith", type: "HVAC Repair", status: "Confirmed" },
    { time: "11:30 AM", name: "Mary Johnson", type: "Pipe Leak", status: "Confirmed" },
    { time: "2:00 PM", name: "Robert Davis", type: "Water Heater", status: "Pending" },
    { time: "4:30 PM", name: "Sarah Wilson", type: "Inspection", status: "Confirmed" },
  ];
  return (
    <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#0a0c0f] overflow-hidden shadow-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">Today's Schedule</span>
        <span className="text-xs text-gray-400">May 14, 2026</span>
      </div>
      <div className="space-y-2 flex-1 overflow-hidden">
        {slots.map((s, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-3 py-2">
            <span className="text-xs text-primary font-mono w-16 shrink-0">{s.time}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white font-medium truncate">{s.name}</p>
              <p className="text-xs text-gray-500 truncate">{s.type}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${s.status === "Confirmed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-gray-500">
        <span>4 appointments today</span>
        <span className="text-green-400">3 confirmed · 1 pending</span>
      </div>
    </div>
  );
}

function LeadQualificationMockup() {
  const leads = [
    { name: "Alex Turner", score: 92, budget: "$800+", urgency: "Emergency", tag: "Hot" },
    { name: "Lisa Chen", score: 74, budget: "$400-600", urgency: "This week", tag: "Warm" },
    { name: "Mike Brown", score: 31, budget: "Unknown", urgency: "Just browsing", tag: "Cold" },
  ];
  return (
    <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#0a0c0f] overflow-hidden shadow-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">Lead Qualification</span>
        <span className="text-xs text-gray-400">AI Scored</span>
      </div>
      <div className="space-y-2.5 flex-1">
        {leads.map((l, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-xl px-3 py-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-white font-medium">{l.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${l.tag === "Hot" ? "bg-red-500/20 text-red-400" : l.tag === "Warm" ? "bg-amber-500/20 text-amber-400" : "bg-gray-500/20 text-gray-400"}`}>
                {l.tag}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${l.score > 80 ? "bg-green-400" : l.score > 50 ? "bg-amber-400" : "bg-gray-500"}`} style={{ width: `${l.score}%` }} />
              </div>
              <span className="text-xs text-gray-400 w-8">{l.score}%</span>
            </div>
            <div className="flex gap-3 mt-1.5 text-xs text-gray-500">
              <span>💰 {l.budget}</span>
              <span>⚡ {l.urgency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CRMMockup() {
  return (
    <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#0a0c0f] overflow-hidden shadow-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">CRM Dashboard</span>
        <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">Live Sync</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[["Total", "284", "text-white"], ["Pending", "23", "text-amber-400"], ["In Progress", "41", "text-violet-400"], ["Completed", "198", "text-green-400"]].map(([label, val, color]) => (
          <div key={label} className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-center">
            <p className={`text-lg font-bold ${color}`}>{val}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {[
          ["TF-A1B2", "John Smith", "Pipe Leak", "Confirmed"],
          ["TF-C3D4", "Mary Jones", "HVAC Service", "In Progress"],
          ["TF-E5F6", "Bob Wilson", "Electrical", "Pending"],
        ].map(([id, name, type, status]) => (
          <div key={id} className="flex items-center gap-2 text-xs bg-white/5 rounded-lg px-2.5 py-1.5">
            <span className="text-primary font-mono w-14 shrink-0">{id}</span>
            <span className="text-white flex-1">{name}</span>
            <span className="text-gray-400 flex-1">{type}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${status === "Confirmed" ? "bg-blue-500/20 text-blue-400" : status === "In Progress" ? "bg-violet-500/20 text-violet-400" : "bg-amber-500/20 text-amber-400"}`}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  const bars = [65, 82, 54, 91, 73, 88, 95];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#0a0c0f] overflow-hidden shadow-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">Call Analytics</span>
        <span className="text-xs text-gray-400">Last 7 days</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["Total Calls", "548", <TrendingUp className="w-3 h-3" />], ["Answer Rate", "94%", <Star className="w-3 h-3" />], ["Avg Duration", "3:42", <Clock className="w-3 h-3" />]].map(([label, val, icon]) => (
          <div key={label as string} className="bg-white/5 border border-white/5 rounded-xl p-2.5">
            <div className="flex items-center gap-1 text-primary mb-1">{icon}<span className="text-xs">{label as string}</span></div>
            <p className="text-lg font-bold text-white">{val as string}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 flex items-end gap-1.5 px-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full rounded-t-md bg-primary/60 hover:bg-primary transition-colors" style={{ height: `${h}%` }} />
            <span className="text-xs text-gray-600">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SERVICE_MOCKUPS = [
  AIReceptionistMockup,
  OutboundCallingMockup,
  SchedulingMockup,
  LeadQualificationMockup,
  CRMMockup,
  AnalyticsMockup,
];

export default function Services() {
  useTitle("Services | TriTech Forge", "Explore our AI voice automation services: inbound reception, outbound calling, scheduling, and CRM integration.");

  const services = [
    {
      id: "ai-receptionist",
      icon: Headset,
      title: "AI Receptionist",
      desc: "An intelligent inbound agent that handles calls 24/7 with a human-like voice.",
      features: ["Natural language processing", "Customizable voice and accent", "Context-aware responses", "Spam and robocall blocking"],
    },
    {
      id: "outbound",
      icon: Phone,
      title: "Outbound Calling",
      desc: "Automate follow-ups, appointment reminders, and lead reactivation campaigns at scale.",
      features: ["Batch calling campaigns", "Custom conversational scripts", "Voicemail detection", "Automatic call logging"],
    },
    {
      id: "scheduling",
      icon: Calendar,
      title: "Appointment Scheduling",
      desc: "Direct integration with your calendar to book, reschedule, or cancel jobs automatically.",
      features: ["Real-time availability checking", "Time zone management", "Confirmation texts/emails", "Double-booking prevention"],
    },
    {
      id: "qualification",
      icon: Zap,
      title: "Lead Qualification",
      desc: "Ask the right questions to separate tire-kickers from high-value jobs before human intervention.",
      features: ["Custom qualification trees", "Urgency detection", "Budget screening", "Automatic high-priority routing"],
    },
    {
      id: "crm",
      icon: Users,
      title: "CRM Integration",
      desc: "Seamlessly push call transcripts, summaries, and action items to your existing CRM.",
      features: ["ServiceTitan integration", "HubSpot & Salesforce ready", "Webhook support", "Custom field mapping"],
    },
    {
      id: "analytics",
      icon: Activity,
      title: "Call Analytics",
      desc: "Deep insights into call volumes, outcomes, common questions, and missed opportunities.",
      features: ["Real-time dashboards", "Call sentiment analysis", "Keyword tracking", "Conversion rate metrics"],
    },
  ];

  return (
    <Layout>
      <div className="pt-32 pb-20 border-b border-white/10 bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            >
              Enterprise Automation <br />
              <span className="text-gradient">For Every Business</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              We provide a complete suite of voice AI tools designed specifically to help local businesses capture more leads and operate efficiently.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-28">
            {services.map((service, index) => {
              const Mockup = SERVICE_MOCKUPS[index];
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Text */}
                  <div className="flex-1 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                    <p className="text-lg text-muted-foreground">{service.desc}</p>
                    <ul className="space-y-3 pt-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-white transition-colors group">
                        Discuss this feature
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Mockup */}
                  <div className="flex-1 w-full">
                    <Mockup />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-20 border-t border-white/10 bg-card/50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to see it in action?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop reading about it and hear it for yourself. Book a demo to experience the most realistic AI voice agent on the market.
          </p>
          <Link href="/contact" className="px-8 py-4 rounded-lg bg-primary text-white font-bold inline-block hover:bg-primary/90 transition-all hover:scale-105">
            Book a Live Demo
          </Link>
        </div>
      </div>
    </Layout>
  );
}
