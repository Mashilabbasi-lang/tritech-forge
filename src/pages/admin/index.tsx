import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { crmApi, logout, getSession } from "@/lib/crm-api";
import { motion } from "framer-motion";
import {
  Plus, Building2, LogOut, ExternalLink, Trash2,
  Settings, Bot, Webhook, Copy, Key, RefreshCw,
  Users, BarChart3, AlertCircle
} from "lucide-react";

// ─── Stat Card ───────────────────────────────────────────
function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="rounded-xl border p-5 flex items-center gap-4" style={{ background: "#111318", borderColor: "#1f2530" }}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-white">{value ?? 0}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

// ─── Create Company Modal ─────────────────────────────────
function CreateModal({ onClose, onCreate }: any) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("Plumbing");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) { setError("Company name is required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await crmApi.createCompany({ name, industry, phone, email, address });
      if (res.success) { onCreate(res.company, res.credentials); onClose(); }
      else setError(res.error || "Failed to create company");
    } catch { setError("Cannot connect to API server"); }
    setLoading(false);
  };

  const iCls = "w-full px-3 py-2.5 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors";
  const iStyle = { background: "#0a0c0f", borderColor: "#1f2530" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border shadow-2xl z-10" style={{ background: "#111318", borderColor: "#1f2530" }}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "#1f2530" }}>
          <h3 className="font-bold text-white text-lg">Create New CRM</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Company Name <span className="text-red-400">*</span></label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Apex Plumbing Co." className={iCls} style={iStyle} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className={iCls} style={iStyle}>
              {["Plumbing","HVAC","Electrical","Roofing","Pest Control","Cleaning","Car Dealership","Real Estate","Other"].map(i => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(201) 555-0100" className={iCls} style={iStyle} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="info@company.com" className={iCls} style={iStyle} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Address</label>
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main St, Newark NJ" className={iCls} style={iStyle} />
          </div>
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t" style={{ borderColor: "#1f2530" }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-sm text-gray-300 hover:text-white transition-colors" style={{ borderColor: "#1f2530" }}>Cancel</button>
          <button onClick={handleCreate} disabled={loading || !name.trim()}
            className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {loading ? "Creating..." : "Create CRM"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Company Settings Modal ───────────────────────────────
function SettingsModal({ company, onClose, onSave }: any) {
  const [name, setName] = useState(company.name);
  const [industry, setIndustry] = useState(company.industry);
  const [phone, setPhone] = useState(company.phone || "");
  const [email, setEmail] = useState(company.email || "");
  const [address, setAddress] = useState(company.address || "");
  const [active, setActive] = useState(company.active !== false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const apiBase = import.meta.env.VITE_CRM_API_URL || "http://localhost:3001";
  const webhookUrl = `${apiBase}/webhook/${company.id}/booking`;

  const handleSave = async () => {
    setLoading(true);
    const res = await crmApi.updateCompany(company.id, { name, industry, phone, email, address, active });
    if (res.success) { onSave(res.company); onClose(); }
    setLoading(false);
  };

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iCls = "w-full px-3 py-2.5 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors";
  const iStyle = { background: "#0a0c0f", borderColor: "#1f2530" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border shadow-2xl z-10 max-h-[90vh] overflow-y-auto" style={{ background: "#111318", borderColor: "#1f2530" }}>
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0" style={{ borderColor: "#1f2530", background: "#111318" }}>
          <h3 className="font-bold text-white text-lg">Company Settings</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none">✕</button>
        </div>
        <div className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Basic Info</p>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Company Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className={iCls} style={iStyle} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)} className={iCls} style={iStyle}>
                {["Plumbing","HVAC","Electrical","Roofing","Pest Control","Cleaning","Car Dealership","Real Estate","Other"].map(i => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Phone</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className={iCls} style={iStyle} />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className={iCls} style={iStyle} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Address</label>
              <input value={address} onChange={e => setAddress(e.target.value)} className={iCls} style={iStyle} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <button type="button" onClick={() => setActive(a => !a)}
                className={`relative w-10 h-5 rounded-full transition-colors ${active ? "bg-primary" : "bg-gray-700"}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${active ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
              <span className="text-sm text-gray-300">Company Active</span>
            </label>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">API Key</p>
            <div className="flex gap-2">
              <code className="flex-1 px-3 py-2 rounded-lg border text-xs text-green-400 font-mono truncate" style={{ background: "#0a0c0f", borderColor: "#1f2530" }}>
                {company.apiKey}
              </code>
              <button onClick={() => { navigator.clipboard.writeText(company.apiKey); }}
                className="px-3 py-2 rounded-lg border text-xs text-gray-400 hover:text-white transition-colors" style={{ borderColor: "#1f2530" }}>
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-gray-600">Use this key to authenticate direct API calls for this company</p>
          </div>

          {/* Webhook */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">n8n Webhook URL</p>
            <div className="flex gap-2">
              <code className="flex-1 px-3 py-2 rounded-lg border text-xs text-blue-400 break-all" style={{ background: "#0a0c0f", borderColor: "#1f2530" }}>
                {webhookUrl}
              </code>
              <button onClick={copyWebhook}
                className="px-3 py-2 rounded-lg border text-xs shrink-0 transition-colors"
                style={{ borderColor: "#1f2530", color: copied ? "#4ade80" : "#9ca3af" }}>
                {copied ? "✓" : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-gray-600">AI calling agent sends bookings to this URL via n8n</p>
          </div>

          {/* Company Access */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Company Access Link</p>
            <div className="rounded-lg border p-4 space-y-3" style={{ borderColor: "#1f2530", background: "#0a0c0f" }}>
              <p className="text-xs text-gray-400">Share this direct link with the company to access their CRM:</p>
              <div className="flex gap-2">
                <code className="flex-1 px-3 py-2 rounded-lg border text-xs text-violet-400 break-all" style={{ borderColor: "#1f2530", background: "#111318" }}>
                  {window.location.origin}/admin/crm/{company.id}?key={company.apiKey}
                </code>
                <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/admin/crm/${company.id}?key=${company.apiKey}`)}
                  className="px-3 py-2 rounded-lg border text-xs text-gray-400 hover:text-white shrink-0 transition-colors" style={{ borderColor: "#1f2530" }}>
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-gray-600">Anyone with this link can view and manage this company's bookings only</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t sticky bottom-0" style={{ borderColor: "#1f2530", background: "#111318" }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-sm text-gray-300 hover:text-white transition-colors" style={{ borderColor: "#1f2530" }}>Cancel</button>
          <button onClick={handleSave} disabled={loading}
            className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────
export default function AdminDashboard() {
  const [, nav] = useLocation();
  const [companies, setCompanies] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [settingsCompany, setSettingsCompany] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newCredentials, setNewCredentials] = useState<any>(null);
  const admin = getSession().user || {};

  const load = useCallback(async () => {
    try {
      const [cRes, sRes] = await Promise.all([crmApi.getCompanies(), crmApi.getStats()]);
      if (cRes.success) setCompanies(cRes.companies);
      if (sRes.success) setStats(sRes.stats);
    } catch { nav("/admin/login"); }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("crm_token")) { nav("/admin/login"); return; }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    await crmApi.deleteCompany(id);
    setCompanies(c => c.filter(x => x.id !== id));
    setDeleteId(null);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0c0f" }}>
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#0a0c0f" }}>
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ background: "#0d0f14", borderColor: "#1f2530" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">TriTech Admin</p>
            <p className="text-xs text-gray-500">Multi-tenant CRM Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="p-2 rounded-lg border text-gray-400 hover:text-white transition-colors" style={{ borderColor: "#1f2530" }}>
            <RefreshCw className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 hidden sm:block">👤 {admin.username}</span>
          <button onClick={() => { logout(); nav("/admin/login"); }}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border hover:border-red-500/30"
            style={{ borderColor: "#1f2530" }}>
            <LogOut className="w-3.5 h-3.5" />Logout
          </button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Companies" value={stats?.totalCompanies} icon="🏢" color="bg-blue-500/10 text-blue-400" />
          <StatCard label="Total Bookings" value={stats?.totalBookings} icon="📋" color="bg-violet-500/10 text-violet-400" />
          <StatCard label="Pending" value={stats?.pendingBookings} icon="⏳" color="bg-amber-500/10 text-amber-400" />
          <StatCard label="Today" value={stats?.todayBookings} icon="📅" color="bg-green-500/10 text-green-400" />
        </div>

        {/* Companies */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">CRM Clients</h2>
              <p className="text-xs text-gray-500 mt-0.5">Each company has its own isolated CRM with a unique webhook</p>
            </div>
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />New CRM
            </button>
          </div>

          {companies.length === 0 ? (
            <div className="rounded-2xl border p-16 text-center" style={{ background: "#111318", borderColor: "#1f2530" }}>
              <Building2 className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 font-medium mb-2">No CRM clients yet</p>
              <p className="text-gray-600 text-sm mb-6">Create your first CRM for a client company</p>
              <button onClick={() => setShowCreate(true)}
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
                + Create First CRM
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {companies.map((company, i) => (
                <motion.div key={company.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border p-5 hover:border-primary/30 transition-all"
                  style={{ background: "#111318", borderColor: "#1f2530" }}>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-lg shrink-0">🏢</div>
                      <div>
                        <h3 className="font-bold text-white text-sm leading-tight">{company.name}</h3>
                        <p className="text-xs text-gray-500">{company.industry}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${company.active !== false ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                      {company.active !== false ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-lg p-3 text-center" style={{ background: "#0d0f14" }}>
                      <p className="text-xl font-bold text-white">{company.bookingCount || 0}</p>
                      <p className="text-xs text-gray-500">Bookings</p>
                    </div>
                    <div className="rounded-lg p-3 text-center" style={{ background: "#0d0f14" }}>
                      <p className="text-xl font-bold text-amber-400">{company.pendingCount || 0}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                  </div>

                  {/* Webhook preview */}
                  <div className="rounded-lg px-3 py-2 mb-4 flex items-center gap-2" style={{ background: "#0d0f14" }}>
                    <Webhook className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                    <code className="text-xs text-gray-600 truncate">/webhook/{company.id.slice(0, 12)}...</code>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => nav(`/admin/crm/${company.id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-semibold hover:bg-primary/20 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />Open CRM
                    </button>
                    <button onClick={() => setSettingsCompany(company)}
                      className="p-2 rounded-lg border text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      style={{ borderColor: "#1f2530" }}
                      title="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(company.id)}
                      className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreate={(c: any, creds: any) => {
            setCompanies(prev => [...prev, { ...c, bookingCount: 0, pendingCount: 0 }]);
            setNewCredentials({ company: c, ...creds });
            load();
          }}
        />
      )}

      {settingsCompany && (
        <SettingsModal
          company={settingsCompany}
          onClose={() => setSettingsCompany(null)}
          onSave={(updated: any) => { setCompanies(prev => prev.map(c => c.id === updated.id ? { ...c, ...updated } : c)); setSettingsCompany(null); }}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDeleteId(null)} />
          <div className="relative w-full max-w-sm rounded-2xl border p-6 z-10" style={{ background: "#111318", borderColor: "#1f2530" }}>
            <h3 className="font-bold text-white mb-2">Delete CRM?</h3>
            <p className="text-gray-400 text-sm mb-6">This will permanently delete the company and all its bookings. Cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-lg border text-sm text-gray-300 hover:text-white transition-colors" style={{ borderColor: "#1f2530" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* New company credentials — shown once after creation */}
      {newCredentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border shadow-2xl z-10" style={{ background: "#111318", borderColor: "#1f2530" }}>
            <div className="px-6 py-5 border-b" style={{ borderColor: "#1f2530" }}>
              <h3 className="font-bold text-white text-lg">✅ CRM Created!</h3>
              <p className="text-xs text-gray-500 mt-0.5">Save these credentials — the password is shown only once</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: "#1f2530", background: "#0a0c0f" }}>
                <p className="text-sm font-semibold text-white">{newCredentials.company?.name}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Login URL</span>
                    <code className="text-xs text-blue-400">{window.location.origin}/admin/login</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Username</span>
                    <code className="text-xs text-green-400 font-mono">{newCredentials.username}</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Password</span>
                    <code className="text-xs text-amber-400 font-mono">{newCredentials.password}</code>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  const text = `CRM Access for ${newCredentials.company?.name}\nURL: ${window.location.origin}/admin/login\nUsername: ${newCredentials.username}\nPassword: ${newCredentials.password}`;
                  navigator.clipboard.writeText(text);
                }} className="flex-1 py-2 rounded-lg border text-sm text-gray-300 hover:text-white transition-colors" style={{ borderColor: "#1f2530" }}>
                  Copy Credentials
                </button>
                <button onClick={() => setNewCredentials(null)} className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Done
                </button>
              </div>
              <p className="text-xs text-red-400 text-center">⚠️ Save these now — password cannot be recovered later</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
