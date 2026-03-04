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
    <div className="p-6 lg:p-8 max-w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <p className="text-xs font-medium text-warm-gray-400 uppercase tracking-wider mb-1">
            Docs
          </p>
          <h1 className="text-2xl font-bold text-warm-gray-900">Docs</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-warm-gray-200 text-sm min-w-0 w-56">
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
            className={`p-2 rounded-xl border transition-colors ${gridView ? "border-accent bg-accent-muted text-accent" : "border-warm-gray-200 text-warm-gray-500 hover:bg-warm-gray-100"}`}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setGridView(false)}
            className={`p-2 rounded-xl border transition-colors ${!gridView ? "border-accent bg-accent-muted text-accent" : "border-warm-gray-200 text-warm-gray-500 hover:bg-warm-gray-100"}`}
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
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6"
          : "flex flex-col gap-3 mb-6"
        }
      >
        {filteredCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? FileText;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
              onClick={() => setSelectedCategory(cat)}
              className={`bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5 cursor-pointer
                hover:shadow-md hover:-translate-y-1 transition-all duration-200 group
                ${!gridView ? "flex items-center gap-4" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl bg-warm-gray-800 flex items-center justify-center shrink-0 ${!gridView ? "" : "mb-3"}`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-warm-gray-800 group-hover:text-accent transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-warm-gray-500 mt-1 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat); }}
                className={`px-3 py-1.5 rounded-full border border-warm-gray-200 text-xs font-medium text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800 transition-colors ${!gridView ? "" : "mt-3"}`}
              >
                Connect
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Toolbar Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex items-center justify-end gap-1 mb-8"
      >
        {toolbarItems.map((item) => (
          <button
            key={item.label}
            className="p-2 rounded-xl text-warm-gray-400 hover:text-warm-gray-700 hover:bg-warm-gray-100 transition-colors"
            aria-label={item.label}
            title={item.label}
          >
            <item.icon size={16} />
          </button>
        ))}
      </motion.div>

      {/* Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider text-warm-gray-400 mb-3">
          Shortcut
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {shortcuts.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-2xl bg-white border border-warm-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-warm-gray-100 flex items-center justify-center group-hover:bg-accent-muted transition-colors">
                <Folder size={18} className="text-warm-gray-500 group-hover:text-accent transition-colors" />
              </div>
              <span className="text-xs font-medium text-warm-gray-600 text-center leading-tight">
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analytics */}
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
