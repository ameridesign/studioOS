import { useState, useMemo, useId } from "react";
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
  const uid = useId().replace(/:/g, "");
  const body   = `fBody-${uid}`;
  const tab    = `fTab-${uid}`;
  const lip    = `fLip-${uid}`;
  const shadow = `fShadow-${uid}`;

  return (
    <svg width="80" height="60" viewBox="0 0 96 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={body} x1="48" y1="18" x2="48" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#D9D9D9" />
          <stop offset="55%"  stopColor="#C8C8C8" />
          <stop offset="100%" stopColor="#B7B7B7" />
        </linearGradient>
        <linearGradient id={tab} x1="28" y1="10" x2="28" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#BEBEBE" />
          <stop offset="100%" stopColor="#A9A9A9" />
        </linearGradient>
        <linearGradient id={lip} x1="48" y1="16" x2="48" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E4E4E4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#CFCFCF" stopOpacity="0.6" />
        </linearGradient>
        <filter id={shadow} x="-10%" y="-10%" width="120%" height="130%" filterUnits="objectBoundingBox">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.12" />
        </filter>
      </defs>
      <g filter={`url(#${shadow})`}>
        {/* Folder tab */}
        <path
          d="M16 18C16 14.6863 18.6863 12 22 12H34.5C36.3 12 37.9 12.8 39 14.2L42.2 18H74C77.3137 18 80 20.6863 80 24V26H16V18Z"
          fill={`url(#${tab})`}
        />
        {/* Top lip */}
        <path
          d="M16 24C16 20.6863 18.6863 18 22 18H74C77.3137 18 80 20.6863 80 24V27H16V24Z"
          fill={`url(#${lip})`}
        />
        {/* Folder body */}
        <rect x="16" y="22" width="64" height="38" rx="8" fill={`url(#${body})`} />
        {/* Inner highlight */}
        <path
          d="M20 28C20 25.7909 21.7909 24 24 24H72C74.2091 24 76 25.7909 76 28V30H20V28Z"
          fill="white"
          fillOpacity="0.18"
        />
        {/* Soft bottom shading */}
        <path
          d="M16 48H80V52C80 56.4183 76.4183 60 72 60H24C19.5817 60 16 56.4183 16 52V48Z"
          fill="black"
          fillOpacity="0.05"
        />
        {/* Edge stroke */}
        <rect x="16.5" y="22.5" width="63" height="37" rx="7.5" stroke="#AFAFAF" strokeOpacity="0.7" />
      </g>
    </svg>
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
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{
        fontFamily: FONT,
        background: "#F6F6F4",
        minHeight: "100%",
        maxWidth: "100%",
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        style={{ marginBottom: 28 }}
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
              fontSize: "clamp(28px, 7vw, 54px)",
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 6, flexWrap: "wrap" }}>
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: "1 1 200px",
              minWidth: 0,
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
        className={gridView
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px] mb-5"
          : "grid grid-cols-1 gap-[14px] mb-5"}
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
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
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
                flex: "0 0 auto",
                minWidth: 80,
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
