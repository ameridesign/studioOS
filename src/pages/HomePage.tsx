import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Clock } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import type { LayoutContext } from "../components/Layout";
import { recentFiles } from "../data/mockData";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const stats = [
  { label: "Active Projects", value: "4" },
  { label: "Open Tasks",      value: "12" },
  { label: "Total Files",     value: "156" },
  { label: "Weekly Activity", value: "1,730" },
];

const activityFeed = [
  { id: 1, action: "Updated",      file: "atlas-crm-brief-v3.pdf",       time: "2h ago",     user: "Emir" },
  { id: 2, action: "Shared",       file: "sprint-27-retro-notes.md",      time: "4h ago",     user: "Farhan" },
  { id: 3, action: "Uploaded",     file: "usability-round-3.pdf",         time: "Yesterday",  user: "Mehdi" },
  { id: 4, action: "Commented on", file: "figma-handoff-checklist.xlsx",  time: "Yesterday",  user: "Sarah" },
  { id: 5, action: "Created",      file: "tokens-v2.json",                time: "2 days ago", user: "Emir" },
];

const progresses = [72, 45, 88, 31];

export default function HomePage() {
  const navigate = useNavigate();
  const { projects } = useOutletContext<LayoutContext>();
  const greeting = useMemo(() => getGreeting(), []);
  const today = useMemo(
    () => new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    []
  );

  return (
    <div style={{ padding: "36px 40px 52px", fontFamily: FONT, background: "#F6F6F4", minHeight: "100%", maxWidth: "100%" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", marginBottom: 4, letterSpacing: "0.01em" }}>{today}</p>
        <h1 style={{ fontSize: 54, fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: "0 0 6px" }}>
          {greeting}, Emirkan
        </h1>
        <p style={{ fontSize: 14, color: "#9A9A9A", margin: 0 }}>Here&apos;s what&apos;s happening in your studio today.</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.3 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.04, duration: 0.26 }}
            style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 16, padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <p style={{ fontSize: 28, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "#9A9A9A", margin: 0 }}>{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Projects + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>

        {/* Active Projects */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.28 }}
          style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Active Projects</h2>
            <button
              onClick={() => navigate("/docs")}
              style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#B0B0B0", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: FONT }}
            >
              View all <ArrowRight size={11} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {projects.map((project, i) => (
              <div key={project.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>{project.name}</span>
                  <span style={{ fontSize: 11, color: "#B0B0B0" }}>{progresses[i]}%</span>
                </div>
                <div style={{ height: 3, background: "#F0F0EE", borderRadius: 99, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progresses[i]}%` }}
                    transition={{ delay: 0.35 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                    style={{ height: "100%", background: "#1A1A1A", borderRadius: 99 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.28 }}
          style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Recent Activity</h2>
            <Clock size={13} style={{ color: "#C0C0C0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {activityFeed.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#F0F0EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: "#5A5A5A", letterSpacing: "0.02em" }}>
                    {item.user.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, color: "#3A3A3A", lineHeight: 1.4, margin: "0 0 2px" }}>
                    <span style={{ fontWeight: 500 }}>{item.user}</span>{" "}
                    <span style={{ color: "#7A7A7A" }}>{item.action}</span>{" "}
                    <span style={{ color: "#5A5A5A" }}>{item.file}</span>
                  </p>
                  <p style={{ fontSize: 11, color: "#B0B0B0", margin: 0 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Files */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.28 }}
        style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Recent Files</h2>
          <button
            onClick={() => navigate("/docs")}
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#B0B0B0", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: FONT }}
          >
            View all <ArrowRight size={11} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {recentFiles.slice(0, 5).map((file) => (
            <div
              key={file.id}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", borderRadius: 10, cursor: "pointer", transition: "background 0.12s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8F8F7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "#F4F4F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={13} style={{ color: "#8A8A8A" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.filename}</p>
                <p style={{ fontSize: 11, color: "#B0B0B0", margin: 0 }}>{file.sharedBy} · {file.size}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#8A8A8A", background: "#F4F4F2", padding: "2px 8px", borderRadius: 999, flexShrink: 0 }}>
                {file.type}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
