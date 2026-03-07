import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus } from "lucide-react";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

type Status = "Available" | "Busy" | "On Leave";

interface Member {
  id: string;
  name: string;
  initials: string;
  role: string;
  location: string;
  timezone: string;
  project: string;
  status: Status;
  focusArea: string;
  capacity: number;
  shade: string;
}

const team: Member[] = [
  {
    id: "ee",
    name: "Emirkan Erkara",
    initials: "EE",
    role: "Product Design",
    location: "Istanbul",
    timezone: "UTC+3",
    project: "Atlas CRM",
    status: "Available",
    focusArea: "UI Systems, Interaction Design",
    capacity: 80,
    shade: "#1A1A1A",
  },
  {
    id: "sm",
    name: "Sarah M.",
    initials: "SM",
    role: "Research",
    location: "London",
    timezone: "UTC+0",
    project: "Studio OS v2",
    status: "Available",
    focusArea: "User Research, Usability Testing",
    capacity: 60,
    shade: "#3A3A3A",
  },
  {
    id: "ar",
    name: "Ahsan R.",
    initials: "AR",
    role: "Content",
    location: "Karachi",
    timezone: "UTC+5",
    project: "Website Redesign",
    status: "Busy",
    focusArea: "Copywriting, Content Strategy",
    capacity: 100,
    shade: "#4A4A4A",
  },
  {
    id: "mh",
    name: "Mehdi H.",
    initials: "MH",
    role: "Engineering",
    location: "Berlin",
    timezone: "UTC+1",
    project: "Mobile App",
    status: "Available",
    focusArea: "Frontend, API Integration",
    capacity: 70,
    shade: "#555555",
  },
  {
    id: "ft",
    name: "Farah T.",
    initials: "FT",
    role: "Operations",
    location: "Dubai",
    timezone: "UTC+4",
    project: "Atlas CRM",
    status: "On Leave",
    focusArea: "Project Coordination, QA",
    capacity: 0,
    shade: "#6A6A6A",
  },
  {
    id: "lk",
    name: "Lina K.",
    initials: "LK",
    role: "Client Strategy",
    location: "New York",
    timezone: "UTC−5",
    project: "Website Redesign",
    status: "Available",
    focusArea: "Stakeholder Management, Roadmaps",
    capacity: 75,
    shade: "#7A7A7A",
  },
];

const roles = ["All", "Product Design", "Research", "Content", "Engineering", "Operations", "Client Strategy"];

// ── Status pill ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, React.CSSProperties> = {
    "Available": { background: "#F0F0EE", color: "#4A4A4A" },
    "Busy":      { background: "#1A1A1A", color: "white"   },
    "On Leave":  { background: "#EAEAE8", color: "#6A6A6A" },
  };
  return (
    <span style={{
      ...styles[status],
      fontSize: 10, fontWeight: 500,
      padding: "3px 9px", borderRadius: 999,
      display: "inline-block", whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

// ── Member Card ───────────────────────────────────────────────────────────────

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 + index * 0.04, duration: 0.24 }}
      style={{
        background: "white",
        border: "1px solid #EAEAE8",
        borderRadius: 18,
        padding: "20px 20px 18px",
        cursor: "pointer",
        transition: "background 0.1s",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAFAF9"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
    >
      {/* Avatar + name row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: member.shade,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "white", letterSpacing: "0.03em" }}>
              {member.initials}
            </span>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.3 }}>
              {member.name}
            </p>
            <p style={{ fontSize: 12, color: "#8A8A8A", margin: "2px 0 0" }}>
              {member.role}
            </p>
          </div>
        </div>
        <StatusBadge status={member.status} />
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #F4F4F2", marginBottom: 14 }} />

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#A0A0A0", fontWeight: 500 }}>Location</span>
          <span style={{ fontSize: 12, color: "#3A3A3A" }}>{member.location} · {member.timezone}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#A0A0A0", fontWeight: 500 }}>Project</span>
          <span style={{ fontSize: 12, color: "#3A3A3A", textAlign: "right", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {member.project}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Capacity bar ──────────────────────────────────────────────────────────────

function CapacityBar({ value }: { value: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 3, background: "#F0F0EE", borderRadius: 99, overflow: "hidden", minWidth: 60 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          style={{ height: "100%", background: value >= 90 ? "#3A3A3A" : "#B0B0B0", borderRadius: 99 }}
        />
      </div>
      <span style={{ fontSize: 11, color: "#8A8A8A", width: 28, textAlign: "right", flexShrink: 0 }}>
        {value}%
      </span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return team.filter((m) => {
      const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All" || m.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%", maxWidth: "100%" }}
    >
      {/* ── Header ── */}
      <div
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        style={{ marginBottom: 28 }}
      >
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>
            Team
          </p>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
            Team
          </h1>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            flex: "1 1 180px", minWidth: 0, height: 44,
            background: "white", border: "1px solid #E8E8E6",
            borderRadius: 15, padding: "0 14px", boxSizing: "border-box",
          }}>
            <Search size={15} style={{ color: "#B0B0B0", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search members…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1, background: "transparent",
                outline: "none", border: "none",
                fontSize: 14, color: "#1A1A1A", fontFamily: FONT,
              }}
            />
          </div>

          {/* Role filter */}
          <div style={{
            height: 44,
            background: "white", border: "1px solid #E8E8E6",
            borderRadius: 15, overflow: "hidden",
            display: "flex", alignItems: "center",
          }}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                height: 44, padding: "0 14px",
                background: "transparent", border: "none",
                fontSize: 13, fontWeight: 500, color: "#3A3A3A",
                fontFamily: FONT, cursor: "pointer",
                outline: "none", appearance: "none",
                paddingRight: 32,
              }}
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r === "All" ? "All Roles" : r}</option>
              ))}
            </select>
          </div>

          {/* Invite */}
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
            <UserPlus size={15} strokeWidth={1.5} />
            Invite
          </button>
        </div>
      </div>

      {/* ── Member cards ── */}
      {filtered.length === 0 ? (
        <p style={{ fontSize: 13, color: "#B0B0B0", marginBottom: 28 }}>
          No members match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ marginBottom: 24 }}>
          {filtered.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      )}

      {/* ── Responsibilities ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.26 }}
        style={{
          background: "white",
          border: "1px solid #EAEAE8",
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 22px 12px", borderBottom: "1px solid #F0F0EE" }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>
            Responsibilities
          </h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 560 }}>
            {/* Table header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1.8fr 1.2fr 1fr",
              padding: "9px 22px",
              borderBottom: "1px solid #F0F0EE",
            }}>
              {["Member", "Focus Area", "Active Project", "Capacity"].map((col) => (
                <span key={col} style={{
                  fontSize: 11, fontWeight: 600, color: "#B0B0B0",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            {team.map((m, i) => (
              <div
                key={m.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1.8fr 1.2fr 1fr",
                  padding: "12px 22px",
                  borderBottom: i < team.length - 1 ? "1px solid #F4F4F2" : "none",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAFAF9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
              >
                {/* Member */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: m.shade,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 600, color: "white", letterSpacing: "0.03em" }}>
                      {m.initials}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{m.name}</p>
                    <p style={{ fontSize: 11, color: "#9A9A9A", margin: 0 }}>{m.role}</p>
                  </div>
                </div>

                {/* Focus Area */}
                <span style={{ fontSize: 12, color: "#5A5A5A", paddingRight: 12 }}>
                  {m.focusArea}
                </span>

                {/* Active Project */}
                <span style={{ fontSize: 12, color: "#5A5A5A" }}>
                  {m.status === "On Leave" ? (
                    <span style={{ color: "#B0B0B0", fontStyle: "italic" }}>On leave</span>
                  ) : m.project}
                </span>

                {/* Capacity */}
                {m.status === "On Leave" ? (
                  <span style={{ fontSize: 11, color: "#C0C0C0" }}>—</span>
                ) : (
                  <CapacityBar value={m.capacity} />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
