import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, ChevronDown } from "lucide-react";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ── Data ──────────────────────────────────────────────────────────────────────

type NoteType = "Added" | "Improved" | "Fixed";

interface ReleaseNote {
  type: NoteType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  summary: string;
  notes: ReleaseNote[];
}

const RELEASES: Release[] = [
  {
    version: "v2.4.0",
    date: "March 6, 2026",
    summary: "New Automations engine, Settings appearance controls, and Team directory.",
    notes: [
      { type: "Added",    text: "Automations page with trigger-based workflow management" },
      { type: "Added",    text: "Team directory with responsibilities and workload view" },
      { type: "Added",    text: "Appearance settings: dark mode, font size, and density controls" },
      { type: "Improved", text: "Settings page fully rearchitected into tabbed sections" },
      { type: "Improved", text: "Calendar navigation and month view interactions" },
      { type: "Fixed",    text: "Tasks list view not reflecting filter state on refresh" },
      { type: "Fixed",    text: "Sidebar active state not persisting across page navigation" },
    ],
  },
  {
    version: "v2.3.1",
    date: "February 18, 2026",
    summary: "Patch addressing reporting chart rendering and minor copy corrections.",
    notes: [
      { type: "Fixed",    text: "Engagement chart clipping on smaller viewports" },
      { type: "Fixed",    text: "Views & Edits bar chart tooltip misalignment" },
      { type: "Fixed",    text: "Incorrect project count shown in reporting metric strip" },
      { type: "Improved", text: "Chart tooltip styling now matches design system" },
    ],
  },
  {
    version: "v2.3.0",
    date: "February 4, 2026",
    summary: "Reporting page, Calendar page, and monochrome design system refinements.",
    notes: [
      { type: "Added",    text: "Reporting page with metric blocks, area/bar charts, and project table" },
      { type: "Added",    text: "Calendar page with month view and event management" },
      { type: "Added",    text: "Tasks page with board and list view toggle" },
      { type: "Improved", text: "Monochrome design system — all shadow treatments removed" },
      { type: "Improved", text: "Typography scale refined across all page headers" },
      { type: "Fixed",    text: "Mobile layout overflow on project cards" },
    ],
  },
  {
    version: "v2.2.5",
    date: "January 14, 2026",
    summary: "Stability release with file page improvements and sidebar refinements.",
    notes: [
      { type: "Improved", text: "File page detail panel layout and metadata display" },
      { type: "Improved", text: "Sidebar collapse animation smoothed out" },
      { type: "Fixed",    text: "Docs page search not clearing on route change" },
      { type: "Fixed",    text: "Project page header overflowing on tablet breakpoint" },
      { type: "Fixed",    text: "Dark hover states using accent color instead of neutral" },
    ],
  },
];

const RELATED_DOCS = [
  { label: "Handoff checklist",   href: "#" },
  { label: "Sprint archive",      href: "#" },
  { label: "QA notes",            href: "#" },
  { label: "Deployment summary",  href: "#" },
];

const NOTE_STYLES: Record<NoteType, { label: string; style: React.CSSProperties }> = {
  Added:    { label: "Added",    style: { background: "#1A1A1A", color: "white" } },
  Improved: { label: "Improved", style: { background: "#EAEAE8", color: "#3A3A3A" } },
  Fixed:    { label: "Fixed",    style: { background: "#F0F0EE", color: "#7A7A7A" } },
};

// ── Note tag ──────────────────────────────────────────────────────────────────

function NoteTag({ type }: { type: NoteType }) {
  const { label, style } = NOTE_STYLES[type];
  return (
    <span style={{
      ...style,
      fontSize: 10, fontWeight: 600,
      letterSpacing: "0.06em", textTransform: "uppercase",
      padding: "2px 8px", borderRadius: 999,
      display: "inline-block", flexShrink: 0,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

// ── Release entry ─────────────────────────────────────────────────────────────

function ReleaseEntry({ release, index }: { release: Release; index: number }) {
  const [open, setOpen] = useState(index === 0);

  const grouped = useMemo(() => {
    const g: Partial<Record<NoteType, ReleaseNote[]>> = {};
    for (const n of release.notes) {
      (g[n.type] ??= []).push(n);
    }
    return g;
  }, [release.notes]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.07 + index * 0.05 }}
      style={{ borderBottom: "1px solid #F0F0EE" }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", textAlign: "left",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          padding: "20px 22px",
          background: "none", border: "none",
          cursor: "pointer", gap: 16,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
              {release.version}
            </span>
            <span style={{ fontSize: 12, color: "#A0A0A0" }}>{release.date}</span>
          </div>
          <p style={{ fontSize: 13, color: "#5A5A5A", margin: 0, lineHeight: 1.5 }}>{release.summary}</p>
        </div>
        <ChevronDown
          size={15}
          style={{
            color: "#C0C0BE", flexShrink: 0, marginTop: 2,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.18s",
          }}
        />
      </button>

      {/* Notes body */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <div style={{ padding: "0 22px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {(["Added", "Improved", "Fixed"] as NoteType[]).map((type) => {
              const items = grouped[type];
              if (!items?.length) return null;
              return (
                <div key={type}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {items.map((note, ni) => (
                      <div key={ni} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <NoteTag type={type} />
                        <p style={{ fontSize: 13, color: "#3A3A3A", margin: 0, lineHeight: 1.5, flex: 1 }}>
                          {note.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ReleasesPage() {
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RELEASES.filter((r) => {
      const matchSearch = !q || r.version.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || r.notes.some((n) => n.text.toLowerCase().includes(q));
      const matchFilter = filter === "All" || r.notes.some((n) => n.type === filter);
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>
            Releases
          </p>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
            Releases
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
              placeholder="Search releases…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#1A1A1A", fontFamily: FONT }}
            />
          </div>

          {/* Filter */}
          <div style={{ height: 44, background: "white", border: "1px solid #E8E8E6", borderRadius: 15, display: "flex", alignItems: "center" }}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ height: 44, padding: "0 32px 0 14px", background: "transparent", border: "none", fontSize: 13, fontWeight: 500, color: "#3A3A3A", fontFamily: FONT, cursor: "pointer", outline: "none", appearance: "none" }}
            >
              {["All", "Added", "Improved", "Fixed"].map((f) => (
                <option key={f} value={f}>{f === "All" ? "All types" : f}</option>
              ))}
            </select>
          </div>

          {/* New release note */}
          <button style={{
            height: 44, padding: "0 18px",
            background: "#1A1A1A", border: "none",
            borderRadius: 15, display: "flex", alignItems: "center",
            gap: 8, cursor: "pointer",
            fontSize: 13, fontWeight: 500, color: "white",
            fontFamily: FONT, whiteSpace: "nowrap",
          }}>
            <Plus size={15} strokeWidth={2} />
            New Release
          </button>
        </div>
      </div>

      {/* ── Two-column layout on desktop ── */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">

        {/* ── Release list ── */}
        <div className="flex-1 min-w-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, overflow: "hidden" }}
          >
            {/* Column label row */}
            <div style={{ padding: "9px 22px", borderBottom: "1px solid #F0F0EE", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Version history
              </span>
              <span style={{ fontSize: 11, color: "#C0C0BE" }}>{filtered.length} release{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {filtered.length === 0 ? (
              <p style={{ padding: "24px 22px", fontSize: 13, color: "#B0B0B0", margin: 0 }}>No releases match your search.</p>
            ) : (
              filtered.map((r, i) => (
                <ReleaseEntry key={r.version} release={r} index={i} />
              ))
            )}
          </motion.div>
        </div>

        {/* ── Related Docs sidebar ── */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.14 }}
          className="w-full lg:w-56 xl:w-64 shrink-0"
        >
          <div style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px 11px", borderBottom: "1px solid #F0F0EE" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                Related Docs
              </p>
            </div>
            <div style={{ padding: "6px 8px" }}>
              {RELATED_DOCS.map((doc) => (
                <a
                  key={doc.label}
                  href={doc.href}
                  style={{
                    display: "block",
                    padding: "9px 12px",
                    borderRadius: 10,
                    fontSize: 13, color: "#3A3A3A",
                    textDecoration: "none",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8F8F6"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {doc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Version count strip */}
          <div style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, padding: "16px 18px", marginTop: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 12px" }}>
              Summary
            </p>
            {(["Added", "Improved", "Fixed"] as NoteType[]).map((type) => {
              const count = RELEASES.flatMap((r) => r.notes).filter((n) => n.type === type).length;
              return (
                <div key={type} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderBottom: type !== "Fixed" ? "1px solid #F4F4F2" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <NoteTag type={type} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#5A5A5A" }}>{count}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
