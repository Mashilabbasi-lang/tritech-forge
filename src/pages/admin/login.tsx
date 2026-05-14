import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { crmApi, saveSession, isLoggedIn, getSession } from "@/lib/crm-api";
import { Bot, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [, nav] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (isLoggedIn()) {
      const { user } = getSession();
      if (user?.role === 'company' && user?.companyId) {
        nav(`/admin/crm/${user.companyId}`);
      } else {
        nav("/admin");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError("Enter username and password"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await crmApi.login(username.trim(), password);
      if (res.success) {
        saveSession(res.token, res.user);
        // Redirect based on role
        if (res.user.role === 'company' && res.user.companyId) {
          nav(`/admin/crm/${res.user.companyId}`);
        } else {
          nav("/admin");
        }
      } else {
        setError(res.error || "Invalid username or password");
      }
    } catch {
      setError("Cannot connect to server. Make sure the API is running.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#0a0c0f" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">TriTech Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to access your CRM</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border p-8" style={{ background: "#111318", borderColor: "#1f2530" }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl border text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                style={{ background: "#0d0f14", borderColor: "#1f2530" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary transition-colors pr-12"
                  style={{ background: "#0d0f14", borderColor: "#1f2530" }}
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                : <><Lock className="w-4 h-4" />Sign In</>
              }
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          TriTech Forge · Secure Admin Portal · JWT Protected
        </p>
      </div>
    </div>
  );
}
