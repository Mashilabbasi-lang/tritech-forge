import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield, LogOut } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const ADMIN_PASSWORD = "TriTech1122@$%";
const SESSION_KEY = "tritech_admin_auth";

export function useIsAdmin(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

export function AdminLogoutButton() {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <button
      onClick={() => { logoutAdmin(); window.location.reload(); }}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors"
      data-testid="button-admin-logout"
    >
      <LogOut className="w-3.5 h-3.5" />
      Sign Out
    </button>
  );
}

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === "true"; } catch { return false; }
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  if (isAuth) return <>{children}</>;

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuth(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  return (
    <Layout>
      <main className="min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-3xl border border-white/10 p-10 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Team Access Only</h1>
            <p className="text-sm text-gray-400 mb-8">
              Blog management is restricted to the TriTech Forge team.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    data-testid="input-admin-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                data-testid="button-admin-login"
              >
                Access Blog Admin
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    </Layout>
  );
}
