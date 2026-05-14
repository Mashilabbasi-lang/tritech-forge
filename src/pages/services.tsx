import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";
import { Link } from "wouter";
import { Headset, Phone, Calendar, Zap, Users, Activity, Sliders, CheckCircle } from "lucide-react";

export default function Services() {
  useTitle("Services | TriTech Forge", "Explore our AI voice automation services: inbound reception, outbound calling, scheduling, and CRM integration.");

  const services = [
    {
      id: "ai-receptionist",
      icon: Headset,
      title: "AI Receptionist",
      desc: "An intelligent inbound agent that handles calls 24/7 with a human-like voice.",
      features: ["Natural language processing", "Customizable voice and accent", "Context-aware responses", "Spam and robocall blocking"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    },
    {
      id: "outbound",
      icon: Phone,
      title: "Outbound Calling",
      desc: "Automate follow-ups, appointment reminders, and lead reactivation campaigns at scale.",
      features: ["Batch calling campaigns", "Custom conversational scripts", "Voicemail detection", "Automatic call logging"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
    },
    {
      id: "scheduling",
      icon: Calendar,
      title: "Appointment Scheduling",
      desc: "Direct integration with your calendar to book, reschedule, or cancel jobs automatically.",
      features: ["Real-time availability checking", "Time zone management", "Confirmation texts/emails", "Double-booking prevention"],
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80"
    },
    {
      id: "qualification",
      icon: Zap,
      title: "Lead Qualification",
      desc: "Ask the right questions to separate tire-kickers from high-value jobs before human intervention.",
      features: ["Custom qualification trees", "Urgency detection", "Budget screening", "Automatic high-priority routing"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    },
    {
      id: "crm",
      icon: Users,
      title: "CRM Integration",
      desc: "Seamlessly push call transcripts, summaries, and action items to your existing CRM.",
      features: ["ServiceTitan integration", "HubSpot & Salesforce ready", "Webhook support", "Custom field mapping"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      id: "analytics",
      icon: Activity,
      title: "Call Analytics",
      desc: "Deep insights into call volumes, outcomes, common questions, and missed opportunities.",
      features: ["Real-time dashboards", "Call sentiment analysis", "Keyword tracking", "Conversion rate metrics"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    }
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
              Enterprise Automation <br/>
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
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                  <p className="text-lg text-muted-foreground">{service.desc}</p>
                  
                  <ul className="space-y-3 pt-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-white transition-colors group">
                      Discuss this feature
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex-1 w-full relative">
                  <div className="aspect-video rounded-2xl border border-white/10 overflow-hidden shadow-2xl group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="py-20 border-t border-white/10 bg-card/50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to see it in action?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Stop reading about it and hear it for yourself. Book a demo to experience the most realistic AI voice agent on the market.</p>
          <Link href="/contact" className="px-8 py-4 rounded-lg bg-primary text-white font-bold inline-block hover:bg-primary/90 transition-all hover:scale-105">
            Book a Live Demo
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
