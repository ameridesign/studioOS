import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  LayoutGrid,
  List,
  Bookmark,
  Edit3,
  Trash2,
  Mail,
  Power,
  Share2,
  FileText,
  Palette,
  FlaskConical,
  CheckCircle,
  PenTool,
  Archive,
  Folder,
} from "lucide-react";
import { docCategories, shortcuts } from "../data/mockData";
import type { DocCategory } from "../data/mockData";
import FilterPopover, { defaultFilters } from "../components/FilterPopover";
import CategoryDrawer from "../components/CategoryDrawer";
import EngagementChart from "../components/EngagementChart";
import ViewsEditsChart from "../components/ViewsEditsChart";
import type { LayoutContext } from "../components/Layout";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileText,
  Palette,
  FlaskConical,
  CheckCircle,
  PenTool,
  Archive,
};

const toolbarItems = [
  { icon: Bookmark, label: "Bookmark" },
  { icon: Edit3, label: "Edit" },
  { icon: Trash2, label: "Delete" },
  { icon: Mail, label: "Email" },
  { icon: Power, label: "Power" },
  { icon: Share2, label: "Share" },
];

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
    <div className="p-5 lg:p-6 max-w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <p className="text-xs font-medium text-warm-gray-400 uppercase tracking-wider mb-1">
            Docs
          </p>
          <h1 className="text-2xl font-bold text-warm-gray-900">Docs</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-warm-gray-200/60 text-sm min-w-0 w-56">
            <Search size={14} className="text-warm-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-warm-gray-700 placeholder-warm-gray-400 min-w-0"
              aria-label="Search docs"
            />
          </div>
          <FilterPopover
            filters={filters}
            onApply={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
          <button
            onClick={() => setGridView(true)}
            className={`p-2 rounded-xl border transition-colors ${gridView ? "border-warm-gray-300 bg-warm-gray-100 text-warm-gray-700" : "border-warm-gray-200/60 text-warm-gray-500 hover:bg-warm-gray-100"}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setGridView(false)}
            className={`p-2 rounded-xl border transition-colors ${!gridView ? "border-warm-gray-300 bg-warm-gray-100 text-warm-gray-700" : "border-warm-gray-200/60 text-warm-gray-500 hover:bg-warm-gray-100"}`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </motion.div>

      {/* Doc Category Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={gridView
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-5"
          : "flex flex-col gap-2 mb-5"
        }
      >
        {filteredCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? FileText;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
              onClick={() => setSelectedCategory(cat)}
              className={`bg-white rounded-xl border border-warm-gray-200/60 p-4 cursor-pointer
                hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group
                ${!gridView ? "flex items-center gap-4" : ""}`}
            >
              <div className={`w-9 h-9 rounded-lg bg-warm-gray-800 flex items-center justify-center shrink-0 ${!gridView ? "" : "mb-2.5"}`}>
                <Icon size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-warm-gray-800 group-hover:text-warm-gray-900 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-warm-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat); }}
                className={`px-3 py-1 rounded-full border border-warm-gray-200/60 text-xs font-medium text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800 transition-colors ${!gridView ? "" : "mt-2.5"}`}
              >
                Connect
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Toolbar Palette */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex items-center justify-end mb-6"
      >
        <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-xl bg-warm-gray-100 border border-warm-gray-200/60">
          {toolbarItems.map((item) => (
            <button
              key={item.label}
              className="p-1.5 rounded-lg text-warm-gray-400 hover:text-warm-gray-700 hover:bg-white transition-colors"
              aria-label={item.label}
              title={item.label}
            >
              <item.icon size={15} />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Shortcuts - Wide Gray Panel with Large Folder Tiles */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider text-warm-gray-400 mb-2.5">
          Shortcut
        </h2>
        <div className="bg-warm-gray-100 rounded-xl p-4 border border-warm-gray-200/40">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {shortcuts.map((s) => (
              <div
                key={s.id}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-warm-gray-100 flex items-center justify-center group-hover:bg-warm-gray-200 transition-colors">
                  <Folder size={20} className="text-warm-gray-500 group-hover:text-warm-gray-700 transition-colors" />
                </div>
                <span className="text-[11px] font-medium text-warm-gray-600 text-center leading-tight">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
