import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, ChevronRight, LayoutList, LayoutGrid } from "lucide-react";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

type Status = "To Do" | "In Progress" | "Review" | "Completed";
type Priority = "High" | "Medium" | "Low";

interface Task {
  id: string;
  title: string;
  project: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  description: string;
}

const tasks: Task[] = [
  {
    id: "t1",
    title: "Finalize Atlas CRM handoff",
    project: "Atlas CRM",
    owner: "Emirkan",
    dueDate: "Mar 10",
    priority: "High",
    status: "In Progress",
    description:
      "Prepare final design files, annotate all edge cases, and transfer Figma ownership. Ensure all component states are documented and dev notes are complete.",
  },
  {
    id: "t2",
    title: "Review Studio OS v2 navigation",
    project: "Studio OS v2",
    owner: "Farhan",
    dueDate: "Mar 12",
    priority: "High",
    status: "Review",
    description:
      "Walk through the updated nav structure with the team, validate mobile breakpoints, and collect feedback on the new sidebar collapse behaviour.",
  },
  {
    id: "t3",
    title: "Prepare mobile app audit notes",
    project: "Mobile App",
    owner: "Mehdi",
    dueDate: "Mar 14",
    priority: "Medium",
    status: "To Do",
    description:
      "Document UX findings from the latest round of usability testing. Highlight critical friction points and include annotated screenshots per flow.",
  },
  {
    id: "t4",
    title: "Update website redesign content",
    project: "Website Redesign",
    owner: "Sarah",
    dueDate: "Mar 15",
    priority: "Medium",
    status: "To Do",
    description:
      "Swap placeholder copy for final approved text across all landing sections. Coordinate with the content team for the hero and services blocks.",
  },
  {
    id: "t5",
    title: "QA docs search states",
    project: "Studio OS v2",
    owner: "Emirkan",
    dueDate: "Mar 11",
    priority: "Low",
    status: "In Progress",
    description:
      "Verify empty-state, no-results, and loading states in the Docs search flow. Test across viewport widths and log any inconsistencies.",
  },
  {
    id: "t6",
    title: "Close out Sprint 27 retro actions",
    project: "Atlas CRM",
    owner: "Farhan",
    dueDate: "Mar 9",
    priority: "Medium",
    status: "Completed",
    description:
      "Mark all Sprint 27 retrospective action items as resolved, archive the doc, and update the velocity tracker in the project dashboard.",
  },
];

const priorityTasks: Task[] = [tasks[0], tasks[1], tasks[2], tasks[4]];

const statusCounts: Record<Status, number> = {
  "To Do": tasks.filter((t) => t.status === "To Do").length,
  "In Progress": tasks.filter((t) => t.status === "In Progress").length,
  "Review": tasks.filter((t) => t.status === "Review").length,
  "Completed": tasks.filter((t) => t.status === "Completed").length,
};

// ── Pill helpers ──────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: Status }) {
  const styles: Record<Status, React.CSSProperties> = {
    "To Do":      { background: "#F4F4F2", color: "#6A6A6A" },
    "In Progress":{ background: "#1A1A1A", color: "white"   },
    "Review":     { background: "#EAEAE8", color: "#3A3A3A" },
    "Completed":  { background: "#F0F0EE", color: "#4A4A4A" },
  };
  return (
    <span style={{
      ...styles[status],
      fontSize: 11, fontWeight: 500,
      padding: "3px 10px", borderRadius: 999,
      whiteSpace: "nowrap", display: "inline-block",
    }}>
      {status}
    </span>
  );
}

function PriorityLabel({ priority }: { priority: Priority }) {
  const styles: Record<Priority, React.CSSProperties> = {
    High:   { color: "#1A1A1A", fontWeight: 600 },
    Medium: { color: "#6A6A6A", fontWeight: 500 },
    Low:    { color: "#A0A0A0", fontWeight: 400 },
  };
  return (
    <span style={{ fontSize: 12, ...styles[priority] }}>
      {priority}
    </span>
  );
}

// ── Task Drawer ───────────────────────────────────────────────────────────────

function TaskDrawer({ task, onClose }: { task: Task | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {task && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.12)",
              zIndex: 50,
            }}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(400px, 100vw)",
              background: "white",
              borderLeft: "1px solid #E8E8E6",
              zIndex: 51,
              display: "flex", flexDirection: "column",
              fontFamily: FONT,
            }}
          >
            {/* Header */}
            <div style={{
              padding: "20px 22px 16px",
              borderBottom: "1px solid #F0F0EE",
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#A0A0A0", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                  {task.project}
                </p>
                <h2 style={{ fontSize: 17, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                  {task.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  border: "1px solid #E8E8E6", background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0, color: "#8A8A8A",
                }}
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px 28px" }}>

              {/* Meta grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: 24 }}>
                {[
                  { label: "Status",   value: <StatusPill status={task.status} /> },
                  { label: "Priority", value: <PriorityLabel priority={task.priority} /> },
                  { label: "Owner",    value: <span style={{ fontSize: 13, color: "#1A1A1A" }}>{task.owner}</span> },
                  { label: "Due",      value: <span style={{ fontSize: 13, color: "#1A1A1A" }}>{task.dueDate}</span> },
                ].map((row) => (
                  <div key={row.label}>
                    <p style={{ fontSize: 11, fontWeight: 500, color: "#A0A0A0", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                      {row.label}
                    </p>
                    {row.value}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #F0F0EE", marginBottom: 20 }} />

              {/* Description */}
              <p style={{ fontSize: 11, fontWeight: 500, color: "#A0A0A0", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
                Description
              </p>
              <p style={{ fontSize: 13, color: "#4A4A4A", lineHeight: 1.65, margin: 0 }}>
                {task.description}
              </p>
            </div>

            {/* Footer */}
            <div style={{ padding: "14px 22px", borderTop: "1px solid #F0F0EE", display: "flex", gap: 8 }}>
              <button
                style={{
                  flex: 1, height: 36, borderRadius: 10,
                  background: "#1A1A1A", border: "none",
                  fontSize: 13, fontWeight: 500, color: "white",
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                Mark Complete
              </button>
              <button
                style={{
                  height: 36, padding: "0 16px", borderRadius: 10,
                  background: "white", border: "1px solid #E8E8E6",
                  fontSize: 13, fontWeight: 500, color: "#4A4A4A",
                  cursor: "pointer", fontFamily: FONT,
                }}
              >
                Edit
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [listView, setListView] = useState(true);
  const [selected, setSelected] = useState<Task | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.project.toLowerCase().includes(q) ||
        t.owner.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%", maxWidth: "100%" }}
    >
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>
            Tasks
          </p>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
            Tasks
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
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1, background: "transparent",
                outline: "none", border: "none",
                fontSize: 14, color: "#1A1A1A", fontFamily: FONT,
              }}
            />
          </div>

          {/* View switcher */}
          <button
            onClick={() => setListView(true)}
            style={{
              width: 44, height: 44, background: "white",
              border: listView ? "1.5px solid #C0C0BE" : "1px solid #E8E8E6",
              borderRadius: 15, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              color: listView ? "#1A1A1A" : "#A0A0A0",
            }}
            aria-label="List view"
          >
            <LayoutList size={17} />
          </button>
          <button
            onClick={() => setListView(false)}
            style={{
              width: 44, height: 44, background: "white",
              border: !listView ? "1.5px solid #C0C0BE" : "1px solid #E8E8E6",
              borderRadius: 15, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              color: !listView ? "#1A1A1A" : "#A0A0A0",
            }}
            aria-label="Board view"
          >
            <LayoutGrid size={17} />
          </button>

          {/* New task */}
          <button
            style={{
              height: 44, padding: "0 18px",
              background: "#1A1A1A", border: "none",
              borderRadius: 15, display: "flex", alignItems: "center",
              gap: 8, cursor: "pointer",
              fontSize: 14, fontWeight: 500, color: "white",
              fontFamily: FONT, whiteSpace: "nowrap",
            }}
          >
            <Plus size={15} strokeWidth={2} />
            New Task
          </button>
        </div>
      </div>

      {/* ── Summary strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        style={{ marginBottom: 20 }}
      >
        {(Object.entries(statusCounts) as [Status, number][]).map(([label, count], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + i * 0.04, duration: 0.22 }}
            style={{
              background: "white",
              border: "1px solid #EAEAE8",
              borderRadius: 16,
              padding: "16px 20px",
            }}
          >
            <p style={{ fontSize: 26, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, margin: "0 0 5px", letterSpacing: "-0.02em" }}>{count}</p>
            <p style={{ fontSize: 12, color: "#9A9A9A", margin: 0 }}>{label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Task list ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.26 }}
        style={{
          background: "white",
          border: "1px solid #EAEAE8",
          borderRadius: 18,
          marginBottom: 20,
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 1fr 0.9fr 0.8fr 1fr",
          padding: "10px 20px",
          borderBottom: "1px solid #F0F0EE",
        }}>
          {["Task", "Project", "Owner", "Due Date", "Priority", "Status"].map((col) => (
            <span key={col} style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <p style={{ padding: "28px 20px", fontSize: 13, color: "#B0B0B0", margin: 0 }}>
            No tasks match your search.
          </p>
        ) : (
          filtered.map((task, i) => (
            <TaskRow
              key={task.id}
              task={task}
              isLast={i === filtered.length - 1}
              onClick={() => setSelected(task)}
            />
          ))
        )}
      </motion.div>

      {/* ── My Priorities ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.26 }}
        style={{
          background: "white",
          border: "1px solid #EAEAE8",
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #F0F0EE" }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>My Priorities</h2>
        </div>
        <div>
          {priorityTasks.map((task, i) => (
            <div
              key={task.id}
              onClick={() => setSelected(task)}
              style={{
                display: "flex", alignItems: "center",
                gap: 14, padding: "11px 20px",
                borderBottom: i < priorityTasks.length - 1 ? "1px solid #F4F4F2" : "none",
                cursor: "pointer", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAFAF9"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
            >
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: task.priority === "High" ? "#1A1A1A" : task.priority === "Medium" ? "#A0A0A0" : "#D0D0D0",
                flexShrink: 0,
              }} />
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#1A1A1A", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {task.title}
              </span>
              <span style={{ fontSize: 11, color: "#B0B0B0", flexShrink: 0, marginRight: 8 }}>{task.dueDate}</span>
              <StatusPill status={task.status} />
              <ChevronRight size={13} style={{ color: "#C0C0C0", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </motion.div>

      <TaskDrawer task={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function TaskRow({ task, isLast, onClick }: { task: Task; isLast: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.2fr 1fr 0.9fr 0.8fr 1fr",
        padding: "12px 20px",
        borderBottom: isLast ? "none" : "1px solid #F4F4F2",
        cursor: "pointer",
        transition: "background 0.1s",
        alignItems: "center",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAFAF9"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>
        {task.title}
      </span>
      <span style={{ fontSize: 12, color: "#6A6A6A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>
        {task.project}
      </span>
      <span style={{ fontSize: 12, color: "#6A6A6A" }}>{task.owner}</span>
      <span style={{ fontSize: 12, color: "#6A6A6A" }}>{task.dueDate}</span>
      <PriorityLabel priority={task.priority} />
      <StatusPill status={task.status} />
    </div>
  );
}
