import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { crmApi, getSession } from "@/lib/crm-api";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Search, Trash2, RefreshCw, Webhook, Copy } from "lucide-react";

// ─── New Booking Modal ────────────────────────────────────
function NewBookingModal({ companyId, onClose, onCreated }: { companyId: string, onClose: () => void, onCreated: (b: any) => void }) {
  const [form, setForm] = useState({
    customerName: "", phone: "", issueType: "", date: "", time: "", city: "", isEmergency: false, notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const iCls = "w-full px-3 py-2.5 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors";
  const iStyle = { background: "#0a0c0f", borderColor: "#1f2530" };

  const handleSubmit = async () => {
    if (!form.customerName.trim()) { setError("Customer name is required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await crmApi.createBooking(companyId, form);
      if (res.success) { onCreated(res.booking); }
      else setError(res.error || "Failed to create booking");
    } catch { setError("Cannot connect to server"); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border shadow-2xl z-10 max-h-[90vh] overflow-y-auto" style={{ background: "#111318", borderColor: "#1f2530" }}>
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0" style={{ borderColor: "#1f2530", background: "#111318" }}>
          <h3 className="font-bold text-white text-lg">New Booking</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Customer Name <span className="text-red-400">*</span></label>
            <input value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} placeholder="John Smith" className={iCls} style={iStyle} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 123-4567" className={iCls} style={iStyle} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Issue Type</label>
              <input value={form.issueType} onChange={e => setForm(f => ({ ...f, issueType: e.target.value }))} placeholder="Pipe Leak" className={iCls} style={iStyle} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={iCls} style={iStyle} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Time</label>
              <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className={iCls} style={iStyle} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">City</label>
            <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="New York" className={iCls} style={iStyle} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Additional details..." rows={2} className={iCls} style={iStyle} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isEmergency} onChange={e => setForm(f => ({ ...f, isEmergency: e.target.checked }))} className="w-4 h-4 accent-red-500" />
            <span className="text-sm text-gray-300">🚨 Mark as Emergency</span>
          </label>
          {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t sticky bottom-0" style={{ borderColor: "#1f2530", background: "#111318" }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-sm text-gray-300" style={{ borderColor: "#1f2530" }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-50">
            {loading ? "Creating..." : "Create Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Status Colors ────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "In Progress": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Completed: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

function StatCard({ label, value, color, icon }: any) {
  return (
    <div className="rounded-xl border p-4 flex items-center gap-3" style={{ background: "#111318", borderColor: "#1f2530" }}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${color}`}>{icon}</div>
      <div><p className="text-xl font-bold text-white">{value ?? 0}</p><p className="text-xs text-gray-500">{label}</p></div>
    </div>
  );
}

// ─── Main CRM Page ────────────────────────────────────────
export default function CompanyCRM() {
  const params = useParams<{ id: string }>();
  const companyId = params.id;
  const [, nav] = useLocation();
  const [company, setCompany] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showWebhook, setShowWebhook] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [cRes, bRes, sRes, aRes] = await Promise.all([
        crmApi.getCompanies(),
        crmApi.getCompanyBookings(companyId, { search, status: statusFilter }),
        crmApi.getCompanyStats(companyId),
        crmApi.getCompanyActivity(companyId),
      ]);
      if (cRes.success) setCompany(cRes.companies.find((c: any) => c.id === companyId));
      if (bRes.success) setBookings(bRes.bookings);
      if (sRes.success) setStats(sRes.stats);
      if (aRes.success) setActivity(aRes.activity);
    } catch { nav("/admin/login"); }
    setLoading(false);
  }, [companyId, search, statusFilter]);

  useEffect(() => {
    if (!localStorage.getItem("crm_token")) { nav("/admin/login"); return; }
    load();
  }, [load]);

  const webhookUrl = `${import.meta.env.VITE_CRM_API_URL || "http://localhost:3001"}/webhook/${companyId}/booking`;

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (id: string) => {
    await crmApi.deleteBooking(companyId, id);
    setBookings(b => b.filter(x => x.id !== id));
    setDeleteId(null);
  };

  const updateStatus = async (booking: any, status: string) => {
    await crmApi.updateBooking(companyId, booking.id, { ...booking, status });
    setBookings(b => b.map(x => x.id === booking.id ? { ...x, status } : x));
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
        <div className="flex items-center gap-4">
          <button onClick={() => nav("/admin")} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />Back
          </button>
          <div className="w-px h-5 bg-gray-700" />
          <div>
            <h1 className="text-sm font-bold text-white">{company?.name || "Company CRM"}</h1>
            <p className="text-xs text-gray-500">{company?.industry} · {bookings.length} bookings</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowWebhook(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs text-gray-400 hover:text-white transition-colors"
            style={{ borderColor: "#1f2530" }}>
            <Webhook className="w-3.5 h-3.5" />Webhook
          </button>
          <button onClick={load} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs text-gray-400 hover:text-white transition-colors" style={{ borderColor: "#1f2530" }}>
            <RefreshCw className="w-3.5 h-3.5" />Refresh
          </button>
          <button onClick={() => setShowNewBooking(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
            <Plus className="w-3.5 h-3.5" />New Booking
          </button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <StatCard label="Total" value={stats?.total} icon="📋" color="bg-blue-500/10 text-blue-400" />
          <StatCard label="Today" value={stats?.today} icon="📅" color="bg-cyan-500/10 text-cyan-400" />
          <StatCard label="Pending" value={stats?.pending} icon="⏳" color="bg-amber-500/10 text-amber-400" />
          <StatCard label="Confirmed" value={stats?.confirmed} icon="✓" color="bg-blue-500/10 text-blue-400" />
          <StatCard label="In Progress" value={stats?.inProgress} icon="🔧" color="bg-violet-500/10 text-violet-400" />
          <StatCard label="Completed" value={stats?.completed} icon="✅" color="bg-green-500/10 text-green-400" />
          <StatCard label="Cancelled" value={stats?.cancelled} icon="✕" color="bg-red-500/10 text-red-400" />
          <StatCard label="Emergency" value={stats?.emergency} icon="🚨" color="bg-red-500/10 text-red-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Bookings table */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-48 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary"
                  style={{ background: "#111318", borderColor: "#1f2530" }} />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border text-sm text-white focus:outline-none focus:border-primary"
                style={{ background: "#111318", borderColor: "#1f2530" }}>
                <option value="">All Statuses</option>
                {["Pending","Confirmed","In Progress","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#1f2530" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ background: "#0a0c0f" }}>
                    <tr>
                      {["ID","Customer","Issue","Date","Status","Source","Actions"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                        <p className="text-3xl mb-2">📭</p>
                        <p>No bookings yet</p>
                        <button onClick={() => setShowNewBooking(true)} className="mt-3 text-primary hover:underline text-sm">+ Create first booking</button>
                      </td></tr>
                    ) : bookings.map((b, i) => (
                      <tr key={b.id} className={`hover:bg-white/5 transition-colors ${i < bookings.length - 1 ? "border-b" : ""}`} style={{ borderColor: "#1f2530" }}>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-primary font-semibold">{b.id}</span>
                          {b.isEmergency && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white font-medium text-sm">{b.customerName}</p>
                          <p className="text-gray-500 text-xs">{b.phone}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-300 text-sm">{b.issueType}</td>
                        <td className="px-4 py-3 text-gray-300 text-sm whitespace-nowrap">{b.date || "—"}</td>
                        <td className="px-4 py-3">
                          <select value={b.status} onChange={e => updateStatus(b, e.target.value)}
                            className="text-xs rounded-lg border px-2 py-1 focus:outline-none focus:border-primary"
                            style={{ background: "#0d0f14", borderColor: "#1f2530", color: "white" }}>
                            {["Pending","Confirmed","In Progress","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${b.source === "AI Booked" ? "bg-violet-500/15 text-violet-400 border-violet-500/30" : "bg-gray-500/15 text-gray-400 border-gray-500/30"}`}>
                            {b.source}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => setDeleteId(b.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-xl border" style={{ background: "#111318", borderColor: "#1f2530" }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: "#1f2530" }}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Activity</p>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
              {activity.length === 0 ? (
                <p className="p-4 text-xs text-gray-600 text-center">No activity yet</p>
              ) : activity.map((a, i) => (
                <div key={i} className={`px-4 py-3 ${i < activity.length - 1 ? "border-b" : ""}`} style={{ borderColor: "#1f2530" }}>
                  <p className="text-xs text-white leading-snug">{a.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.customerName} · {a.bookingId}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Booking Modal */}
      {showNewBooking && (
        <NewBookingModal
          companyId={companyId}
          onClose={() => setShowNewBooking(false)}
          onCreated={(booking) => {
            setBookings(b => [booking, ...b]);
            setShowNewBooking(false);
            load();
          }}
        />
      )}

      {/* Webhook Modal */}
      {showWebhook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowWebhook(false)} />
          <div className="relative w-full max-w-lg rounded-2xl border p-6 z-10 space-y-4" style={{ background: "#111318", borderColor: "#1f2530" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">n8n Webhook URL</h3>
              <button onClick={() => setShowWebhook(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-gray-400">Your AI calling agent sends bookings to this URL.</p>
            <div className="flex gap-2">
              <code className="flex-1 px-3 py-2.5 rounded-lg border text-xs text-green-400 break-all" style={{ background: "#0a0c0f", borderColor: "#1f2530" }}>
                {webhookUrl}
              </code>
              <button onClick={copyWebhook} className="px-3 py-2 rounded-lg bg-primary/20 text-primary border border-primary/30 text-xs hover:bg-primary/30 transition-colors shrink-0">
                {copied ? "✓ Copied" : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="text-green-400 text-xs overflow-x-auto bg-black/30 p-3 rounded-lg">{`{
  "customerName": "John Smith",
  "phone": "(201) 555-0100",
  "issueType": "Leak",
  "date": "2025-05-15",
  "time": "10:00",
  "city": "Newark",
  "isEmergency": false
}`}</pre>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDeleteId(null)} />
          <div className="relative w-full max-w-sm rounded-2xl border p-6 z-10" style={{ background: "#111318", borderColor: "#1f2530" }}>
            <h3 className="font-bold text-white mb-2">Delete Booking?</h3>
            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-lg border text-sm text-gray-300" style={{ borderColor: "#1f2530" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
