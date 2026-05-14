import { Layout } from "@/components/layout/Layout";
import { motion, useInView } from "framer-motion";
import { useTitle } from "@/hooks/use-title";
import { useRef, useState, useEffect } from "react";
import { Bot, PhoneCall, Building2, Server } from "lucide-react";

// Animated counter component
function Counter({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm uppercase tracking-wider text-primary font-semibold">{label}</div>
    </div>
  );
}

export default function About() {
  useTitle("About Us | TriTech Forge", "The team building the future of voice AI for local businesses.");

  return (
    <Layout>
      <div className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            >
              We believe human time <br/>
              <span className="text-gradient">is too valuable for intake.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8"
            >
              TriTech Forge was founded by software engineers and former home service business owners who were tired of losing money to missed calls.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="py-16 border-y border-white/10 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter value={12000} label="Calls Handled" suffix="+" />
            <Counter value={50} label="Active Businesses" suffix="+" />
            <Counter value={99} label="Uptime Guarantee" suffix="%" />
            <Counter value={30} label="Avg ROI (Days)" prefix="<" />
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Local businesses are the backbone of the economy, but they are often stuck using legacy software and outdated processes.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We are bringing enterprise-grade AI automation to the trades. Our goal is to make every small business feel like a Fortune 500 company when a customer calls.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass-card p-6 rounded-2xl space-y-4 aspect-square flex flex-col items-center justify-center text-center">
                <Bot className="w-8 h-8 text-primary" />
                <h3 className="font-bold text-white">Bleeding Edge AI</h3>
              </div>
              <div className="glass-card p-6 rounded-2xl space-y-4 aspect-square flex flex-col items-center justify-center text-center translate-y-8">
                <PhoneCall className="w-8 h-8 text-secondary" />
                <h3 className="font-bold text-white">Voice First</h3>
              </div>
              <div className="glass-card p-6 rounded-2xl space-y-4 aspect-square flex flex-col items-center justify-center text-center">
                <Building2 className="w-8 h-8 text-green-400" />
                <h3 className="font-bold text-white">Local Focus</h3>
              </div>
              <div className="glass-card p-6 rounded-2xl space-y-4 aspect-square flex flex-col items-center justify-center text-center translate-y-8">
                <Server className="w-8 h-8 text-orange-400" />
                <h3 className="font-bold text-white">Secure Infra</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
