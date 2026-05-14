/// <reference types="vite/client" />
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useTitle } from "@/hooks/use-title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, CheckCircle, Loader2, Clock, Globe } from "lucide-react";
import { useState } from "react";

// ─── Formspree Configuration ────────────────────────────────────────────────
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form and copy your Form ID (looks like: xpzvrgkq)
// 3. Set VITE_FORMSPREE_ID=your_form_id in your .env file
// 4. Formspree will email you every time someone fills the form
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "";
// ────────────────────────────────────────────────────────────────────────────

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  business: z.string().min(1, "Business name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  industry: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  useTitle("Contact & Book Demo | TriTech Forge", "Get in touch with our team to see how AI can automate your business calls across the Gulf & USA.");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      business: "",
      email: "",
      phone: "",
      industry: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setSubmitState("loading");
    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Formspree error");
      } else {
        // Fallback: open mailto with form data pre-filled
        const subject = encodeURIComponent(`Demo Request from ${data.business}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nBusiness: ${data.business}\nEmail: ${data.email}\nPhone: ${data.phone}\nIndustry: ${data.industry || "Not specified"}\nMessage: ${data.message || "—"}`
        );
        window.open(`mailto:hello@tritechforge.com?subject=${subject}&body=${body}`);
      }
      setSubmitState("success");
      form.reset();
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <Layout>
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6"
            >
              <Globe className="w-3.5 h-3.5" />
              Gulf Region & USA
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            >
              Let's build your <span className="text-gradient">AI Agent.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Fill out the form and our team will reach out within 2 hours to schedule your live demo.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-3xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Request a Demo</h2>

                {submitState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
                    <p className="text-gray-400 mb-6">
                      Our team has been notified and will reach out within 2 hours to schedule your live demo.
                    </p>
                    <button
                      onClick={() => setSubmitState("idle")}
                      className="text-sm text-primary hover:underline"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="bg-background/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} data-testid="input-contact-name" />
                              </FormControl>
                              <FormMessage className="text-destructive" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="business"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Business Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Apex HVAC" className="bg-background/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} data-testid="input-contact-business" />
                              </FormControl>
                              <FormMessage className="text-destructive" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" className="bg-background/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage className="text-destructive" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" className="bg-background/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} data-testid="input-contact-phone" />
                              </FormControl>
                              <FormMessage className="text-destructive" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Your Industry</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full px-3 py-2.5 rounded-lg bg-background/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                data-testid="select-contact-industry"
                              >
                                <option value="" className="bg-gray-900">Select your industry...</option>
                                <option value="HVAC" className="bg-gray-900">HVAC</option>
                                <option value="Plumbing" className="bg-gray-900">Plumbing</option>
                                <option value="Electrical" className="bg-gray-900">Electrical</option>
                                <option value="Roofing" className="bg-gray-900">Roofing</option>
                                <option value="Car Dealership" className="bg-gray-900">Car Dealership</option>
                                <option value="Real Estate" className="bg-gray-900">Real Estate</option>
                                <option value="Medical Clinic" className="bg-gray-900">Medical Clinic</option>
                                <option value="Pest Control" className="bg-gray-900">Pest Control</option>
                                <option value="Cleaning Services" className="bg-gray-900">Cleaning Services</option>
                                <option value="Agency" className="bg-gray-900">Agency / Multi-location</option>
                                <option value="Other" className="bg-gray-900">Other</option>
                              </select>
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Tell us about your business (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How many calls do you receive per day? What's your biggest challenge right now?"
                                className="min-h-[100px] bg-background/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary resize-none"
                                {...field}
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />

                      {submitState === "error" && (
                        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                          Something went wrong. Please email us directly at hello@tritechforge.com
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitState === "loading"}
                        className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all hover:glow-blue active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                        data-testid="button-contact-submit"
                      >
                        {submitState === "loading" ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                        ) : (
                          "Request My Free Demo"
                        )}
                      </button>

                      <p className="text-xs text-center text-gray-600">
                        We respond within 2 hours · No spam · Gulf & USA coverage
                      </p>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Contact info */}
              <div className="glass-card p-8 rounded-3xl border border-white/10 flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      color: "bg-primary/10",
                      iconColor: "text-primary",
                      label: "Email",
                      value: "hello@tritechforge.com",
                      sub: "We typically reply within 2 hours.",
                    },
                    {
                      icon: Phone,
                      color: "bg-secondary/10",
                      iconColor: "text-secondary",
                      label: "Phone",
                      value: "Call Us Directly",
                      sub: "Mon-Fri 9am–6pm PST · Gulf hours available",
                    },
                    {
                      icon: Clock,
                      color: "bg-green-500/10",
                      iconColor: "text-green-400",
                      label: "Response Time",
                      value: "Under 2 Hours",
                      sub: "For all demo requests submitted via form.",
                    },
                    {
                      icon: Globe,
                      color: "bg-accent/10",
                      iconColor: "text-accent",
                      label: "Service Coverage",
                      value: "Gulf Region & United States",
                      sub: "UAE, Saudi Arabia, Qatar, Kuwait + All US States",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                        <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-0.5">{item.label}</h4>
                        <p className="text-gray-300 font-medium">{item.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar booking placeholder */}
              <div className="glass-card p-8 rounded-3xl border border-white/10 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Prefer to talk first?</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Book a 15-minute discovery call directly on our calendar — no commitment needed.
                </p>
                <a
                  href="tel:+033359823786"
                  className="block w-full px-6 py-3 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors text-sm"
                  data-testid="link-book-call"
                >
                  📞 Book a Call — 15 min
                </a>
                <p className="text-xs text-gray-600 mt-3">Tap to call us directly</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
