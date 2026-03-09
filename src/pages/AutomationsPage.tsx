import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal } from "lucide-react";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ── Data ──────────────────────────────────────────────────────────────────────

type AutoStatus = "Active" | "Draft" | "Paused" | "Failed";

interface Automation {
  id: string;
  title: string;
  category: string;
  trigger: string;
  owner: string;
  lastRun: string;
  status: AutoStatus;
}

const AUTOMATIONS: Automation[] = [
  { id: "a1", title: "Weekly project status recap",  category: "Reports",       trigger: "Every Monday · 9:00 AM",      owner: "Emirkan E.", lastRun: "2 days ago",  status: "Active" },
  { id: "a2", title: "New client intake checklist",  category: "Onboarding",    trigger: "On new project creation",     owner: "Sarah M.",   lastRun: "5 days ago",  status: "Active" },
  { id: "a3", title: "Handoff reminder sequence",    category: "Communication", trigger: "3 days before deadline",      owner: "Ahsan R.",   lastRun: "1 week ago",  status: "Paused" },
  { id: "a4", title: "Invoice follow-up reminder",   category: "Finance",       trigger: "Every 30 days",               owner: "Farah T.",   lastRun: "3 days ago",  status: "Active" },
  { id: "a5", title: "Sprint archive export",        category: "Projects",      trigger: "On sprint close",             owner: "Mehdi H.",   lastRun: "1 day ago",   status: "Draft"  },
  { id: "a6", title: "Research summary digest",      category: "Research",      trigger: "Every Friday · 6:00 PM",      owner: "Sarah M.",   lastRun: "4 days ago",  status: "Failed" },
];

const ACTIVITY = [
  { id: "e1", time: "Today · 9:04 AM",      event: "Weekly project status recap ran successfully",        status: "Active" as AutoStatus },
  { id: "e2", time: "Today · 8:47 AM",      event: "Invoice follow-up reminder triggered for Atlas CRM", status: "Active" as AutoStatus },
  { id: "e3", time: "Yesterday · 6:02 PM",  event: "Research summary digest failed — check configuration",status: "Failed" as AutoStatus },
  { id: "e4", time: "2 days ago · 2:15 PM", event: "New client intake checklist completed for Mobile App",status: "Active" as AutoStatus },
  { id: "e5", time: "4 days ago · 11:00 AM",event: "Handoff reminder sequence paused by Ahsan R.",       status: "Paused" as AutoStatus },
  { id: "e6", time: "5 days ago · 3:30 PM", event: "Sprint archive export saved as draft by Mehdi H.",   status: "Draft"  as AutoStatus },
];

const CATEGORIES = ["All", "Reports", "Onboarding", "Communication", "Finance", "Projects", "Research"];

// ── Status pill ───────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<AutoStatus, React.CSSProperties> = {
  Active: { background: "#1A1A1A", color: "white" },
  Draft:  { background: "#EAEAE8", color: "#5A5A5A" },
  Paused: { background: "#F0F0EE", color: "#8A8A8A" },
  Failed: { background: "white",   color: "#1A1A1A", border: "1px solid #CACAC8", fontStyle: "italic" },
};

const ACTIVITY_DOT: Record<AutoStatus, string> = {
  Active: "#1A1A1A",
  Draft:  "#C8C8C6",
  Paused: "#D8D8D4",
  Failed: "#7A7A7A",
};

function StatusPill({ status }: { status: AutoStatus }) {
  return (
    <span style={{
      ...STATUS_STYLES[status],
      fontSize: 11, fontWeight: 500,
      padding: "3px 10px", borderRadius: 999,
      display: "inline-block", whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

// ── Summary strip ─────────────────────────────────────────────────────────────

function SummaryStrip({ automations }: { automations: Automation[] }) {
  const counts = {
    Active: automations.filter((a) => a.status === "Active").length,
    Draft:  automations.filter((a) => a.status === "Draft").length,
    Paused: automations.filter((a) => a.status === "Paused").length,
    Failed: automations.filter((a) => a.status === "Failed").length,
  } as const;

  const total = AUTOMATIONS.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.07 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      style={{ marginBottom: 20 }}
    >
      {(["Active", "Draft", "Paused", "Failed"] as AutoStatus[]).map((status) => (
        <div
          key={status}
          style={{
            background: "white",
            border: "1px solid #EAEAE8",
            borderRadius: 16,
            padding: "16px 18px",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 500, color: "#A0A0A0", margin: "0 0 8px", letterSpacing: "0.01em" }}>
            {status}
          </p>
          <p style={{ fontSize: 28, fontWeight: 300, color: "#1A1A1A", margin: "0 0 6px", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {counts[status]}
          </p>
          <p style={{ fontSize: 11, color: "#C0C0BE", margin: 0 }}>
            of {total} total
          </p>
        </div>
      ))}
    </motion.div>
  );
}

// ── Automation row ────────────────────────────────────────────────────────────

function AutomationRow({ item, index }: { item: Automation; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.08 + index * 0.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.6fr 1fr 0.9fr 0.8fr 28px",
        alignItems: "center",
        padding: "13px 20px",
        borderBottom: "1px solid #F4F4F2",
        background: hovered ? "#FAFAF9" : "white",
        cursor: "pointer",
        transition: "background 0.1s",
        gap: 8,
      }}
    >
      {/* Title + category */}
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.title}
        </p>
        <p style={{ fontSize: 11, color: "#A0A0A0", margin: 0 }}>{item.category}</p>
      </div>
      {/* Trigger */}
      <p style={{ fontSize: 12, color: "#5A5A5A", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {item.trigger}
      </p>
      {/* Owner */}
      <p style={{ fontSize: 12, color: "#5A5A5A", margin: 0 }}>{item.owner}</p>
      {/* Last run */}
      <p style={{ fontSize: 12, color: "#9A9A9A", margin: 0 }}>{item.lastRun}</p>
      {/* Status */}
      <div><StatusPill status={item.status} /></div>
      {/* Actions */}
      <button
        style={{ background: "none", border: "none", cursor: "pointer", color: "#C0C0BE", padding: 2, opacity: hovered ? 1 : 0, transition: "opacity 0.1s" }}
      >
        <MoreHorizontal size={15} />
      </button>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AutomationsPage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [activeOnly, setActiveOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return AUTOMATIONS.filter((a) => {
      const matchSearch   = !q || a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
      const matchCategory = category === "All" || a.category === category;
      const matchStatus   = !activeOnly || a.status === "Active";
      return matchSearch && matchCategory && matchStatus;
    });
  }, [search, category, activeOnly]);

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>
            Automations
          </p>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
            Automations
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            flex: "1 1 160px", minWidth: 0, height: 44,
            background: "white", border: "1px solid #E8E8E6",
            borderRadius: 15, padding: "0 14px", boxSizing: "border-box",
          }}>
            <Search size={15} style={{ color: "#B0B0B0", flexShrink: 0 }} />
            <input
              placeholder="Search automations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#1A1A1A", fontFamily: FONT }}
            />
          </div>

          {/* Category filter */}
          <div style={{ height: 44, background: "white", border: "1px solid #E8E8E6", borderRadius: 15, display: "flex", alignItems: "center" }}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ height: 44, padding: "0 32px 0 14px", background: "transparent", border: "none", fontSize: 13, fontWeight: 500, color: "#3A3A3A", fontFamily: FONT, cursor: "pointer", outline: "none", appearance: "none" }}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
            </select>
          </div>

          {/* Active-only toggle */}
          <button
            onClick={() => setActiveOnly((v) => !v)}
            style={{
              height: 44, padding: "0 16px",
              background: activeOnly ? "#1A1A1A" : "white",
              border: `1px solid ${activeOnly ? "#1A1A1A" : "#E8E8E6"}`,
              borderRadius: 15,
              fontSize: 13, fontWeight: 500,
              color: activeOnly ? "white" : "#5A5A5A",
              cursor: "pointer", fontFamily: FONT,
              whiteSpace: "nowrap",
            }}
          >
            {activeOnly ? "Active only" : "All statuses"}
          </button>

          {/* New Automation */}
          <button
            style={{
              height: 44, padding: "0 18px",
              background: "#1A1A1A", border: "none",
              borderRadius: 15, display: "flex", alignItems: "center",
              gap: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 500, color: "white",
              fontFamily: FONT, whiteSpace: "nowrap",
            }}
          >
            <Plus size={15} strokeWidth={2} />
            New Automation
          </button>
        </div>
      </div>

      {/* ── Summary strip ── */}
      <SummaryStrip automations={AUTOMATIONS} />

      {/* ── Automation list ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, overflow: "hidden", marginBottom: 20 }}
      >
        {/* Column headers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.6fr 1fr 0.9fr 0.8fr 28px",
          padding: "9px 20px",
          borderBottom: "1px solid #F0F0EE",
          gap: 8,
        }}>
          {["Automation", "Trigger", "Owner", "Last Run", "Status", ""].map((col) => (
            <span key={col} style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <p style={{ padding: "24px 20px", fontSize: 13, color: "#B0B0B0", margin: 0 }}>No automations match your filter.</p>
        ) : (
          filtered.map((item, i) => <AutomationRow key={item.id} item={item} index={i} />)
        )}
      </motion.div>

      {/* ── Recent Activity ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, overflow: "hidden" }}
      >
        <div style={{ padding: "15px 20px 12px", borderBottom: "1px solid #F0F0EE" }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Recent Activity</h2>
        </div>
        {ACTIVITY.map((item, i) => (
          <div key={item.id}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 20px" }}>
              {/* Status dot */}
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: ACTIVITY_DOT[item.status], marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, color: "#1A1A1A", margin: "0 0 2px", lineHeight: 1.4 }}>{item.event}</p>
                <p style={{ fontSize: 11, color: "#A0A0A0", margin: 0 }}>{item.time}</p>
              </div>
            </div>
            {i < ACTIVITY.length - 1 && <div style={{ borderTop: "1px solid #F4F4F2", marginLeft: 40 }} />}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
