import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

// ─── Brand colours ───────────────────────────────────────────────────────────
const C = {
  orange: "#e8500a",
  orangeHover: "#c03f00",
  navy: "#0d1b2a",
  navyMid: "#1b3a5c",
  blue: "#378ADD",
  green: "#1D9E75",
  amber: "#BA7517",
  purple: "#7F77DD",
  red: "#E24B4A",
};

// ─── Static data ──────────────────────────────────────────────────────────────
const VIEWS = {
  day: {
    label: "Today",
    metrics: [
      { label: "Today's bookings", value: 142, delta: "+18 vs yesterday", up: true, accent: C.orange },
      { label: "Confirmed", value: 109, delta: "77% confirm rate", up: true, accent: C.green },
      { label: "Pending", value: 27, delta: "19% of total", up: false, accent: C.amber },
      { label: "Revenue today", value: "₹1.8L", delta: "+12% vs avg", up: true, accent: C.blue },
    ],
    chartTitle: "Bookings by hour — today",
    chartSub: "Confirmed + pending · 24 h",
    chartType: "bar",
    data: [
      { label: "6am", confirmed: 3, pending: 1 },
      { label: "8am", confirmed: 8, pending: 3 },
      { label: "10am", confirmed: 18, pending: 5 },
      { label: "12pm", confirmed: 12, pending: 3 },
      { label: "2pm", confirmed: 11, pending: 4 },
      { label: "4pm", confirmed: 19, pending: 6 },
      { label: "6pm", confirmed: 13, pending: 4 },
      { label: "8pm", confirmed: 7, pending: 2 },
    ],
  },
  week: {
    label: "This week",
    metrics: [
      { label: "Weekly bookings", value: 874, delta: "+96 vs last week", up: true, accent: C.orange },
      { label: "Confirmed", value: 691, delta: "79% confirm rate", up: true, accent: C.green },
      { label: "Cancelled", value: 47, delta: "5.4% of total", up: false, accent: C.red },
      { label: "Weekly revenue", value: "₹11.2L", delta: "+8% vs last wk", up: true, accent: C.blue },
    ],
    chartTitle: "Bookings by day — this week",
    chartSub: "Mon – Sun · confirmed + pending",
    chartType: "bar",
    data: [
      { label: "Mon", confirmed: 98, pending: 14 },
      { label: "Tue", confirmed: 112, pending: 18 },
      { label: "Wed", confirmed: 105, pending: 16 },
      { label: "Thu", confirmed: 121, pending: 20 },
      { label: "Fri", confirmed: 134, pending: 22 },
      { label: "Sat", confirmed: 158, pending: 28 },
      { label: "Sun", confirmed: 143, pending: 26 },
    ],
  },
  month: {
    label: "This month",
    metrics: [
      { label: "Monthly bookings", value: "3,642", delta: "+430 vs last month", up: true, accent: C.orange },
      { label: "Confirmed", value: "2,901", delta: "80% confirm rate", up: true, accent: C.green },
      { label: "Avg / day", value: 121, delta: "Peak: 189", up: true, accent: C.purple },
      { label: "Monthly revenue", value: "₹48.3L", delta: "+15% vs May", up: true, accent: C.blue },
    ],
    chartTitle: "Bookings by week — June 2026",
    chartSub: "Weekly totals",
    chartType: "bar",
    data: [
      { label: "Wk 1", confirmed: 712, pending: 98 },
      { label: "Wk 2", confirmed: 831, pending: 114 },
      { label: "Wk 3", confirmed: 768, pending: 109 },
      { label: "Wk 4", confirmed: 590, pending: 88 },
    ],
  },
  year: {
    label: "This year",
    metrics: [
      { label: "Yearly bookings", value: "41,280", delta: "+6,140 vs 2025", up: true, accent: C.orange },
      { label: "Best month", value: "April", delta: "4,821 bookings", up: true, accent: C.green },
      { label: "Avg / month", value: "3,440", delta: "On track", up: true, accent: C.purple },
      { label: "Annual revenue", value: "₹5.6Cr", delta: "+22% YoY", up: true, accent: C.blue },
    ],
    chartTitle: "Bookings by month — 2026",
    chartSub: "Jan – Jun (YTD)",
    chartType: "line",
    data: [
      { label: "Jan", confirmed: 3010, pending: 390 },
      { label: "Feb", confirmed: 2840, pending: 310 },
      { label: "Mar", confirmed: 3580, pending: 460 },
      { label: "Apr", confirmed: 4210, pending: 611 },
      { label: "May", confirmed: 3890, pending: 520 },
      { label: "Jun", confirmed: 2901, pending: 409 },
    ],
  },
};

const PIE_DATA = [
  { name: "SUV", value: 34 },
  { name: "Sedan", value: 28 },
  { name: "Hatchback", value: 20 },
  { name: "Luxury", value: 11 },
  { name: "Van", value: 7 },
];
const PIE_COLORS = [C.orange, C.blue, C.green, C.amber, C.purple];

const LOCATIONS = [
  { name: "Chennai Airport", count: 847, pct: 95 },
  { name: "Coimbatore Hub", count: 692, pct: 78 },
  { name: "Bangalore City", count: 581, pct: 65 },
  { name: "Mumbai Terminal", count: 463, pct: 52 },
  { name: "Delhi IGI", count: 374, pct: 42 },
  { name: "Hyderabad Intl", count: 298, pct: 33 },
];

const RECENT = [
  { id: "#DS-9841", customer: "Arun Kumar", car: "Toyota SUV", duration: "3 days", amount: "₹4,200", status: "Confirmed" },
  { id: "#DS-9840", customer: "Priya Nair", car: "Honda Sedan", duration: "1 day", amount: "₹1,100", status: "Pending" },
  { id: "#DS-9839", customer: "Rahul Singh", car: "BMW Luxury", duration: "5 days", amount: "₹18,500", status: "Confirmed" },
  { id: "#DS-9838", customer: "Kavya Reddy", car: "Maruti Hatch", duration: "2 days", amount: "₹1,800", status: "Cancelled" },
  { id: "#DS-9837", customer: "Vikram Patel", car: "Innova Van", duration: "7 days", amount: "₹9,800", status: "Confirmed" },
  { id: "#DS-9836", customer: "Meena Iyer", car: "Hyundai Sedan", duration: "2 days", amount: "₹2,400", status: "Pending" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const CarLogo = ({ size = 20 }) => (
  <svg width={size} height={Math.round(size * 0.65)} viewBox="0 0 28 18" fill="none">
    <path d="M5.5 7L7.5 2.5C8.1 1.3 9.3.5 10.7.5H17.3C18.7.5 19.9 1.3 20.5 2.5L22.5 7"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x=".8" y="7" width="26.4" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="6.5" cy="16.5" r="1.8" fill="currentColor" />
    <circle cx="21.5" cy="16.5" r="1.8" fill="currentColor" />
  </svg>
);

const StatusPill = ({ status }) => {
  const map = {
    Confirmed: { bg: "#e1f5ee", color: "#085041" },
    Pending:   { bg: "#faeeda", color: "#633806" },
    Cancelled: { bg: "#fcebeb", color: "#791f1f" },
  };
  const s = map[status] || map.Pending;
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: 11, fontWeight: 600,
      padding: "3px 10px", borderRadius: 50, display: "inline-block",
    }}>{status}</span>
  );
};

const MetricCard = ({ label, value, delta, up, accent }) => (
  <div style={{
    background: "#f7f9fc", borderRadius: 10, padding: "14px 16px",
    borderLeft: `3px solid ${accent}`, flex: "1 1 140px",
  }}>
    <p style={{ fontSize: 11, color: "#6b7a8d", marginBottom: 6, fontWeight: 600,
      textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</p>
    <p style={{ fontSize: 22, fontWeight: 700, color: "#0d1b2a", margin: 0 }}>
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
    <p style={{ fontSize: 11, fontWeight: 600, marginTop: 4, color: up ? C.green : C.red }}>
      {up ? "▲" : "▼"} {delta}
    </p>
  </div>
);

const LocationBar = ({ name, count, pct, color }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12,
      color: "#6b7a8d", marginBottom: 4 }}>
      <span>{name}</span>
      <span style={{ fontWeight: 600, color: "#0d1b2a" }}>{count.toLocaleString()}</span>
    </div>
    <div style={{ height: 7, background: "#e8ecf1", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4,
        transition: "width .6s ease" }} />
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
      padding: "8px 14px", fontSize: 12 }}>
      <p style={{ fontWeight: 700, marginBottom: 4, color: "#0d1b2a" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "2px 0" }}>
          {p.name}: <strong>{p.value.toLocaleString()}</strong>
        </p>
      ))}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function BookingAnalytics() {
  const [view, setView] = useState("day");
  const [live, setLive] = useState(true);
  const vd = VIEWS[view];

  // Simulate live counter tick
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, [live]);

  const locColors = [C.orange, C.orange, C.blue, C.blue, C.green, C.green];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f0f4f8", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" />

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
        .live-dot{display:inline-block;width:7px;height:7px;background:#1D9E75;border-radius:50%;animation:blink 1.4s ease-in-out infinite;margin-right:5px}
        .tab-btn{border:1.5px solid #dde3ea;background:#fff;color:#6b7a8d;font-size:12px;font-weight:600;
          padding:6px 16px;border-radius:50px;cursor:pointer;transition:all .18s;letter-spacing:.03em;
          display:inline-flex;align-items:center;gap:5px}
        .tab-btn:hover{border-color:#aab;color:#0d1b2a}
        .tab-btn.active{background:#e8500a;border-color:#e8500a;color:#fff}
        .ds-card{background:#fff;border-radius:12px;border:0.5px solid #e2e8f0;padding:18px 20px}
        th{font-size:11px;font-weight:600;color:#6b7a8d;padding:8px 12px;
          border-bottom:1px solid #e8ecf1;text-align:left;text-transform:uppercase;letter-spacing:.04em}
        td{font-size:12px;color:#0d1b2a;padding:10px 12px;border-bottom:0.5px solid #f0f4f8}
        tr:last-child td{border-bottom:none}
        tr:hover td{background:#f7f9fc}
      `}</style>

      {/* ── Topbar ── */}
      <div style={{ background: C.navy, padding: "14px 24px", display: "flex",
        alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: C.orange, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <CarLogo size={18} />
          </div>
          <div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", letterSpacing: "-.02em" }}>
              Vendhan<span style={{ color: C.orange }}>Cars</span>
            </span>
            <span style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginLeft: 8 }}>
              Booking Analytics
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 11, color: "#9ab4cc", fontWeight: 500 }}>
            Last updated: Jun 12, 2026 · 14:30
          </span>
          <span style={{ background: "rgba(29,158,117,.15)", color: "#5DCAA5", fontSize: 11,
            fontWeight: 600, padding: "4px 12px", borderRadius: 50, display: "flex", alignItems: "center" }}>
            <span className="live-dot" />Live
          </span>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>

        {/* ── Tab row ── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {Object.entries(VIEWS).map(([k, v]) => (
            <button key={k} className={`tab-btn ${view === k ? "active" : ""}`} onClick={() => setView(k)}>
              {k === "day" && "☀ "}
              {k === "week" && "📅 "}
              {k === "month" && "🗓 "}
              {k === "year" && "📈 "}
              {v.label}
            </button>
          ))}
        </div>

        {/* ── Metric cards ── */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
          {vd.metrics.map((m, i) => <MetricCard key={i} {...m} />)}
        </div>

        {/* ── Main chart ── */}
        <div className="ds-card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start",
            justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#0d1b2a", margin: 0 }}>{vd.chartTitle}</p>
              <p style={{ fontSize: 11, color: "#6b7a8d", margin: "2px 0 0" }}>{vd.chartSub}</p>
            </div>
            <div style={{ display: "flex", gap: 14, fontSize: 11, color: "#6b7a8d", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 10, height: 10, background: C.orange, borderRadius: 2, display: "inline-block" }} />
                Confirmed
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 10, height: 10, background: C.blue, borderRadius: 2,
                  border: "1px dashed " + C.blue, display: "inline-block" }} />
                Pending
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            {vd.chartType === "line" ? (
              <LineChart data={vd.data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6b7a8d" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7a8d" }} axisLine={false} tickLine={false}
                  tickFormatter={v => v.toLocaleString()} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="confirmed" name="Confirmed" stroke={C.orange}
                  strokeWidth={2.5} dot={{ r: 4, fill: C.orange }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="pending" name="Pending" stroke={C.blue}
                  strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: C.blue }} />
              </LineChart>
            ) : (
              <BarChart data={vd.data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#6b7a8d" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7a8d" }} axisLine={false} tickLine={false}
                  tickFormatter={v => v.toLocaleString()} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="confirmed" name="Confirmed" fill={C.orange} radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="pending" name="Pending" fill={C.blue} radius={[4, 4, 0, 0]} maxBarSize={40} opacity={0.7} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* ── Two-column section ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 16, marginBottom: 16 }}>

          {/* Pie chart */}
          <div className="ds-card">
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0d1b2a", marginBottom: 2 }}>Car category breakdown</p>
            <p style={{ fontSize: 11, color: "#6b7a8d", marginBottom: 10 }}>Share of total bookings</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={78}
                  paddingAngle={3} dataKey="value">
                  {PIE_DATA.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 6 }}>
              {PIE_DATA.map((d, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 7,
                  fontSize: 11, color: "#6b7a8d" }}>
                  <span style={{ width: 10, height: 10, background: PIE_COLORS[i],
                    borderRadius: 2, display: "inline-block", flexShrink: 0 }} />
                  {d.name} — {d.value}%
                </span>
              ))}
            </div>
          </div>

          {/* Location bars */}
          <div className="ds-card">
            <p style={{ fontWeight: 700, fontSize: 14, color: "#0d1b2a", marginBottom: 2 }}>Top pickup locations</p>
            <p style={{ fontSize: 11, color: "#6b7a8d", marginBottom: 14 }}>By booking volume</p>
            {LOCATIONS.map((l, i) => (
              <LocationBar key={i} {...l} color={locColors[i]} />
            ))}
          </div>
        </div>

        {/* ── Recent bookings table ── */}
        <div className="ds-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#0d1b2a", margin: 0 }}>Recent bookings</p>
              <p style={{ fontSize: 11, color: "#6b7a8d", marginTop: 2 }}>Latest 6 transactions</p>
            </div>
            <button style={{ background: "transparent", border: "1.5px solid #dde3ea", color: "#6b7a8d",
              fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 7, cursor: "pointer",
              letterSpacing: ".04em" }}>
              View all →
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
              <thead>
                <tr>
                  {["Booking ID", "Customer", "Car", "Duration", "Amount", "Status"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 600, color: C.orange }}>{r.id}</td>
                    <td>{r.customer}</td>
                    <td style={{ color: "#6b7a8d" }}>{r.car}</td>
                    <td>{r.duration}</td>
                    <td style={{ fontWeight: 600 }}>{r.amount}</td>
                    <td><StatusPill status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Footer ── */}
        <p style={{ textAlign: "center", color: "#9ab4cc", fontSize: 11, marginTop: 20 }}>
          DriveSwift Analytics · Data refreshes every 60 s · June 2026
        </p>
      </div>
    </div>
  );
}
