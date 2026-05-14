import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GrokChat } from "@/components/ai/GrokChat";
import { useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const hideChat = location.includes("contact");

  return (
    <div className="min-h-dvh flex flex-col relative">
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-background">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>
      
      <Navbar />
      <main className="flex-1 pt-20 overflow-x-hidden">
        {children}
      </main>
      <Footer />
      {!hideChat && <GrokChat />}
    </div>
  );
}
