import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  LayoutGrid,
  List,
  FileText,
  Palette,
  FlaskConical,
  CheckCircle,
  PenTool,
  Archive,
} from "lucide-react";
import { docCategories } from "../data/mockData";
import type { DocCategory } from "../data/mockData";
import FilterPopover, { defaultFilters } from "../components/FilterPopover";
import CategoryDrawer from "../components/CategoryDrawer";
import EngagementChart from "../components/EngagementChart";
import ViewsEditsChart from "../components/ViewsEditsChart";
import type { LayoutContext } from "../components/Layout";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  FileText,
  Palette,
  FlaskConical,
  CheckCircle,
  PenTool,
  Archive,
};

const shortcutItems = [
  "Research &\nTesting",
  "Integrations &\nWebhooks",
  "API Specs &\nReferences",
  "Analytics &\nMetrics",
  "Security &\nCompliance",
  "Roadmaps &\nOKRs",
  "Archived\nProjects",
];

function MacFolderThumbnail() {
  return (
    <div style={{ position: "relative", width: 76, height: 62 }}>
      {/* Tab */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 5,
          width: 27,
          height: 11,
          borderRadius: "5px 5px 0 0",
          background: "linear-gradient(to bottom, #b4b4b4, #a6a6a6)",
          zIndex: 1,
        }}
      />
      {/* Body */}
      <div
        style={{
          position: "absolute",
          top: 9,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "3px 9px 9px 9px",
          background: "linear-gradient(175deg, #cbcbcb 0%, #b9b9b9 100%)",
          boxShadow:
            "0 3px 8px rgba(0,0,0,0.11), 0 1px 2px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.22)",
          border: "0.5px solid rgba(0,0,0,0.07)",
        }}
      />
    </div>
  );
}

export default function DocsPage() {
  const { filters, setFilters } = useOutletContext<LayoutContext>();
  const [searchQuery, setSearchQuery] = useState("");
  const [gridView, setGridView] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | null>(null);

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return docCategories;
    const q = searchQuery.toLowerCase();
    return docCategories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div
      style={{
        padding: "36px 40px 52px",
        fontFamily: FONT,
        background: "#F6F6F4",
        minHeight: "100%",
        maxWidth: "100%",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {/* Title */}
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#A0A0A0",
              letterSpacing: "0.01em",
              marginBottom: 4,
            }}
          >
            Docs
          </p>
          <h1
            style={{
              fontSize: 54,
              fontWeight: 400,
              color: "#1A1A1A",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Docs
          </h1>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 6 }}>
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: 340,
              height: 44,
              background: "white",
              border: "1px solid #E8E8E6",
              borderRadius: 15,
              padding: "0 14px",
              boxSizing: "border-box",
            }}
          >
            <Search size={16} style={{ color: "#B0B0B0", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                outline: "none",
                border: "none",
                fontSize: 14,
                color: "#1A1A1A",
                fontFamily: FONT,
              }}
            />
            <span style={{ fontSize: 11, color: "#C0C0C0", flexShrink: 0, letterSpacing: "0.04em" }}>
              ⌘ F
            </span>
          </div>

          {/* Filter — uses FilterPopover (trigger button restyled inside that component) */}
          <FilterPopover
            filters={filters}
            onApply={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />

          {/* Grid */}
          <button
            onClick={() => setGridView(true)}
            style={{
              width: 44,
              height: 44,
              background: "white",
              border: gridView ? "1.5px solid #C0C0BE" : "1px solid #E8E8E6",
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: gridView ? "#1A1A1A" : "#A0A0A0",
            }}
            aria-label="Grid view"
          >
            <LayoutGrid size={17} />
          </button>

          {/* List */}
          <button
            onClick={() => setGridView(false)}
            style={{
              width: 44,
              height: 44,
              background: "white",
              border: !gridView ? "1.5px solid #C0C0BE" : "1px solid #E8E8E6",
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: !gridView ? "#1A1A1A" : "#A0A0A0",
            }}
            aria-label="List view"
          >
            <List size={17} />
          </button>
        </div>
      </div>

      {/* ── Doc Category Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridView ? "repeat(3, 1fr)" : "1fr",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {filteredCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? FileText;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.26 }}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: "white",
                border: "1px solid #EAEAE8",
                borderRadius: 18,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                padding: 20,
                cursor: "pointer",
                display: gridView ? "block" : "flex",
                alignItems: gridView ? undefined : "center",
                gap: gridView ? undefined : 18,
                transition: "box-shadow 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Icon badge */}
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginBottom: gridView ? 16 : 0,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                <Icon size={15} style={{ color: "white" }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1A1A1A",
                    margin: "0 0 6px",
                    lineHeight: 1.3,
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#9A9A9A",
                    lineHeight: 1.48,
                    margin: "0 0 18px",
                  }}
                >
                  {cat.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat);
                  }}
                  style={{
                    height: 28,
                    padding: "0 13px",
                    background: "white",
                    border: "1px solid #E0E0DE",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#6A6A6A",
                    cursor: "pointer",
                    fontFamily: FONT,
                    lineHeight: 1,
                  }}
                >
                  Connect
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Shortcut Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        style={{
          background: "white",
          border: "1px solid #EAEAE8",
          borderRadius: 18,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          padding: "22px 24px 24px",
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "#1A1A1A",
            margin: "0 0 20px",
            letterSpacing: "-0.01em",
          }}
        >
          Shortcut
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {shortcutItems.map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                flex: 1,
                minWidth: 0,
              }}
            >
              <MacFolderThumbnail />
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#7A7A7A",
                  lineHeight: 1.28,
                  textAlign: "center",
                  marginTop: 10,
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Analytics ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EngagementChart />
        <ViewsEditsChart />
      </div>

      {/* Category Drawer */}
      <CategoryDrawer
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
}
