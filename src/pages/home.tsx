import { Layout } from "@/components/layout/Layout";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { useTitle } from "@/hooks/use-title";
import { 
  Bot, Phone, Calendar, Users, TrendingUp, Shield, Zap, 
  CheckCircle, ArrowRight, Star, Clock, Wrench, Headset,
  Building, MapPin, Activity, Mic
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FadeIn = ({ children, delay = 0, direction = "up" }: { children: React.ReactNode, delay?: number, direction?: "up" | "left" | "right" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const y = direction === "up" ? 40 : 0;
  const x = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  useTitle("TriTech Forge | AI Voice Agents That Never Miss a Call", "Automate your home services or trade business calls 24/7 with TriTech Forge AI receptionists.");

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-primary text-sm font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                TriTech Forge — AI Voice Automation
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1]"
              >
                AI Voice Agents That <br className="hidden lg:block" />
                <span className="text-gradient">Never Miss a Call</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                Give your trade business a 24/7 Fortune 500 call center. Our AI answers instantly, books appointments, qualifies leads, and scales your operations.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:glow-blue flex items-center justify-center gap-2 group"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/pricing" 
                  className="w-full sm:w-auto px-8 py-4 rounded-lg glass-card text-white font-semibold hover:bg-white/10 transition-all text-center"
                >
                  View Pricing
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-white">4.8/5</span>
                  <span>from 50+ businesses</span>
                </div>
              </motion.div>
            </div>
            
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2, type: "spring" }}
                className="relative z-10 glass-card rounded-2xl p-6 border border-primary/20 shadow-2xl shadow-primary/20"
                style={{ perspective: 1000 }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-primary" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white leading-tight">Live Call</h3>
                      <p className="text-xs text-primary flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        Processing voice...
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground">00:42</div>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="glass-card p-3 rounded-lg border-l-2 border-l-primary/50 text-gray-300">
                    <span className="text-primary font-semibold block mb-1">AI Agent:</span>
                    "Hi, thanks for calling Smith Plumbing. How can I help you today?"
                  </div>
                  <div className="glass-card p-3 rounded-lg border-l-2 border-l-secondary/50 text-gray-300 ml-4">
                    <span className="text-secondary font-semibold block mb-1">Customer:</span>
                    "My water heater is leaking everywhere. Do you have someone who can come out today?"
                  </div>
                  <div className="glass-card p-3 rounded-lg border-l-2 border-l-primary text-white">
                    <span className="text-primary font-semibold block mb-1">AI Agent:</span>
                    "I can absolutely help with that emergency. I have a technician available at 2:00 PM today. Could I get your address to dispatch them?"
                    <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse align-middle"></span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Emergency Tagged</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-4 h-4" />
                    <span>Slot Reserved</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/30 rounded-full blur-[40px] mix-blend-screen" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/30 rounded-full blur-[50px] mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">Trusted by home services businesses across the Gulf & USA</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Placeholder logos */}
            <div className="flex items-center gap-2 font-bold text-xl"><Wrench /> Apex Plumbing</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Zap /> Volt Electric</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Building /> Horizon Roofing</div>
            <div className="flex items-center gap-2 font-bold text-xl"><MapPin /> City HVAC</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Shield /> Shield Pest</div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Everything a call center does, <span className="text-gradient">automated.</span></h2>
              <p className="text-lg text-muted-foreground">TriTech Forge isn't just an answering machine. It's an intelligent agent that understands context, checks schedules, and closes deals.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Headset, title: "AI Receptionist", desc: "Human-like voice conversations that handle common questions instantly." },
              { icon: Calendar, title: "Smart Booking", desc: "Integrates with your calendar to book, reschedule, or cancel appointments." },
              { icon: Zap, title: "Lead Qualification", desc: "Asks the right questions to separate tire-kickers from high-value jobs." },
              { icon: Users, title: "CRM Automation", desc: "Automatically logs call notes, transcripts, and action items in your CRM." },
              { icon: Clock, title: "24/7 Support", desc: "Never miss an emergency call at 2 AM on a Sunday ever again." },
              { icon: Phone, title: "Outbound Calling", desc: "Automate follow-ups, appointment reminders, and past customer reactivation." },
              { icon: TrendingUp, title: "Missed Call Recovery", desc: "Instantly texts or calls back if a human misses a direct line call." },
              { icon: Shield, title: "Spam Filtering", desc: "Automatically blocks robocalls and spam before they waste your time." }
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-card p-6 rounded-xl hover:-translate-y-2 transition-all duration-300 hover:glow-blue group h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-card/30 relative border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How TriTech Forge Works</h2>
              <p className="text-lg text-muted-foreground">Setup takes less than 15 minutes. Once active, it works tirelessly in the background.</p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-primary/10 via-primary/50 to-primary/10 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {[
                { step: "01", title: "Connect", desc: "Forward your missed calls or route your main number to your AI agent." },
                { step: "02", title: "Train", desc: "Give the AI your pricing, FAQs, and business policies in plain English." },
                { step: "03", title: "Answer", desc: "The agent handles inbound calls, speaks naturally, and assists customers." },
                { step: "04", title: "Grow", desc: "Watch your calendar fill up and revenue grow while you sleep." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.15} direction="up">
                  <div className="flex flex-col items-center text-center relative">
                    <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xl font-bold text-primary mb-6 shadow-[0_0_15px_rgba(var(--glow-blue),0.3)]">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                    <p className="text-muted-foreground text-sm max-w-[200px]">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What our clients say</h2>
              <p className="text-muted-foreground">Real feedback from businesses using TriTech Forge every day.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "We went from missing half our calls to booking jobs at 2 AM. The AI sounds so natural our customers don't even know.",
                name: "Mike Torres",
                role: "Owner, Apex Plumbing Co.",
                rating: 5,
              },
              {
                quote: "The lead qualification alone paid for the entire platform. We only talk to serious customers now.",
                name: "Sarah Kim",
                role: "Operations Manager, Volt Electric",
                rating: 5,
              },
              {
                quote: "Our customers in the Gulf expect instant service in Arabic. TriTech Forge delivers exactly that.",
                name: "Ahmed Al-Rashid",
                role: "GM, Gulf Auto Group",
                rating: 5,
              },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col gap-4 h-full">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-linear-to-r from-primary/30 to-secondary/30 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center glass-card p-10 md:p-16 rounded-3xl border border-white/20 shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Stop losing thousands to missed calls.
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join hundreds of smart home service business owners who use TriTech Forge to dominate their local market.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto px-10 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--glow-blue),0.4)]"
                >
                  Automate Your Calls Today
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}

// Simple User icon for hero section
function User(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
