import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ── Data ──────────────────────────────────────────────────────────────────────

const ENGAGEMENT_DATA = [
  { week: "W1", views: 24 },
  { week: "W2", views: 32 },
  { week: "W3", views: 28 },
  { week: "W4", views: 45 },
  { week: "W5", views: 38 },
  { week: "W6", views: 52 },
  { week: "W7", views: 48 },
  { week: "W8", views: 61 },
];

const VIEWS_EDITS_DATA = [
  { week: "W3", views: 120, edits: 34 },
  { week: "W4", views: 145, edits: 42 },
  { week: "W5", views: 130, edits: 38 },
  { week: "W6", views: 168, edits: 56 },
  { week: "W7", views: 155, edits: 48 },
  { week: "W8", views: 192, edits: 62 },
];

type DeliveryStatus = "On Track" | "Delayed";

interface ProjectRow {
  name: string;
  owner: string;
  filesUpdated: number;
  tasksClosed: number;
  reviewCycles: number;
  status: DeliveryStatus;
}

const PROJECTS: ProjectRow[] = [
  { name: "Atlas CRM",        owner: "Emirkan E.", filesUpdated: 12, tasksClosed: 34, reviewCycles: 2, status: "On Track" },
  { name: "Studio OS v2",     owner: "Sarah M.",   filesUpdated: 8,  tasksClosed: 21, reviewCycles: 3, status: "On Track" },
  { name: "Mobile App",       owner: "Mehdi H.",   filesUpdated: 5,  tasksClosed: 18, reviewCycles: 4, status: "Delayed"  },
  { name: "Website Redesign", owner: "Ahsan R.",   filesUpdated: 9,  tasksClosed: 27, reviewCycles: 2, status: "On Track" },
];

const METRICS = [
  { label: "Active Projects",   value: "4",    sub: "+1 this month"         },
  { label: "Avg. Review Cycle", value: "3.2d", sub: "↓ 0.4 days vs last"   },
  { label: "Docs Updated",      value: "28",   sub: "this month"            },
  { label: "On-Time Delivery",  value: "87%",  sub: "↑ 4% vs last month"   },
];

// ── Chart tooltip ─────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "white", border: "1px solid #EAEAE8",
      borderRadius: 10, padding: "8px 12px",
      fontFamily: FONT,
    }}>
      <p style={{ margin: "0 0 4px", color: "#9A9A9A", fontSize: 11 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ margin: 0, color: "#1A1A1A", fontSize: 12, fontWeight: 500 }}>
          {p.value}{" "}
          <span style={{ fontWeight: 400, color: "#9A9A9A" }}>{p.name}</span>
        </p>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReportingPage() {
  const [_date] = useState("Jan 1 – Mar 9, 2026");

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>
            Reporting
          </p>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
            Reporting
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {/* Date range */}
          {[`${_date}`, "Filter"].map((label) => (
            <button key={label} style={{
              height: 36, padding: "0 12px",
              background: "white", border: "1px solid #E8E8E6",
              borderRadius: 12, display: "flex", alignItems: "center",
              gap: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 500, color: "#3A3A3A",
              fontFamily: FONT, whiteSpace: "nowrap",
            }}>
              {label}
              <ChevronDown size={13} style={{ color: "#B0B0B0" }} />
            </button>
          ))}
          {/* Export */}
          <button style={{
            height: 36, padding: "0 14px",
            background: "#1A1A1A", border: "none",
            borderRadius: 12, display: "flex", alignItems: "center",
            gap: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 600, color: "white",
            fontFamily: FONT, whiteSpace: "nowrap",
          }}>
            <Download size={14} strokeWidth={2.5} />
            Export
          </button>
        </div>
      </div>

      {/* ── Metric blocks ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ marginBottom: 20 }}>
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + i * 0.04 }}
            style={{
              background: "white",
              border: "1px solid #EAEAE8",
              borderRadius: 16,
              padding: "18px 20px",
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 500, color: "#A0A0A0", margin: "0 0 10px", letterSpacing: "0.01em" }}>
              {m.label}
            </p>
            <p style={{ fontSize: 32, fontWeight: 300, color: "#1A1A1A", margin: "0 0 6px", lineHeight: 1, letterSpacing: "-0.025em" }}>
              {m.value}
            </p>
            <p style={{ fontSize: 11, color: "#B8B8B6", margin: 0 }}>{m.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ marginBottom: 20 }}>

        {/* Engagement area chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, padding: "22px 22px 18px" }}
        >
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: "0 0 2px" }}>
              Documentation Engagement Trend
            </h3>
            <p style={{ fontSize: 12, color: "#B0B0B0", margin: 0 }}>Weekly doc views · last 8 weeks</p>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENGAGEMENT_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="engFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#1A1A1A" stopOpacity={0.07} />
                    <stop offset="100%" stopColor="#1A1A1A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F0F0EE" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#C0C0BE", fontFamily: FONT }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#C0C0BE", fontFamily: FONT }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#E8E8E6", strokeWidth: 1 }} />
                <Area
                  type="monotone" dataKey="views" name="views"
                  stroke="#1A1A1A" strokeWidth={1.5}
                  fill="url(#engFill)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#1A1A1A", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Views & Edits bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, padding: "22px 22px 18px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: "0 0 2px" }}>
                Views &amp; Edits by Week
              </h3>
              <p style={{ fontSize: 12, color: "#B0B0B0", margin: 0 }}>Last 6 weeks</p>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              {[{ label: "Views", color: "#D8D8D4" }, { label: "Edits", color: "#1A1A1A" }].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 9, height: 9, background: l.color, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, color: "#9A9A9A" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VIEWS_EDITS_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barCategoryGap="32%">
                <CartesianGrid stroke="#F0F0EE" strokeDasharray="0" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#C0C0BE", fontFamily: FONT }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#C0C0BE", fontFamily: FONT }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "#F8F8F6" }} />
                <Bar dataKey="views" name="views" fill="#D8D8D4" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="edits" name="edits" fill="#1A1A1A" radius={[3, 3, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ── Project performance table ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, overflow: "hidden" }}
      >
        <div style={{ padding: "15px 22px 12px", borderBottom: "1px solid #F0F0EE" }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Project Performance</h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 580 }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 0.9fr 0.9fr 0.9fr 1fr", padding: "9px 22px", borderBottom: "1px solid #F0F0EE" }}>
              {["Project", "Owner", "Files Updated", "Tasks Closed", "Review Cycles", "Delivery Status"].map((col) => (
                <span key={col} style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            {PROJECTS.map((p, i) => (
              <div
                key={p.name}
                style={{
                  display: "grid", gridTemplateColumns: "1.8fr 1fr 0.9fr 0.9fr 0.9fr 1fr",
                  padding: "13px 22px",
                  borderBottom: i < PROJECTS.length - 1 ? "1px solid #F4F4F2" : "none",
                  alignItems: "center", cursor: "pointer", transition: "background 0.1s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAFAF9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
              >
                <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{p.name}</p>
                <p style={{ fontSize: 12, color: "#5A5A5A", margin: 0 }}>{p.owner}</p>
                <p style={{ fontSize: 12, color: "#5A5A5A", margin: 0 }}>{p.filesUpdated}</p>
                <p style={{ fontSize: 12, color: "#5A5A5A", margin: 0 }}>{p.tasksClosed}</p>
                <p style={{ fontSize: 12, color: "#5A5A5A", margin: 0 }}>{p.reviewCycles}</p>
                <span style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 999, display: "inline-block",
                  fontWeight: p.status === "Delayed" ? 600 : 400,
                  background: p.status === "On Track" ? "#F0F0EE" : "#EAEAE8",
                  color: p.status === "On Track" ? "#4A4A4A" : "#1A1A1A",
                }}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
