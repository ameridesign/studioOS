import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";

const fileTypes = ["FIG", "PDF", "MD", "XLSX", "DRAWIO", "TXT"];
const sharedByOptions = ["Emir", "Farhan", "Sarah", "Mehdi", "Lina", "Client"];
const dateRanges = ["Last 7 days", "Last 30 days", "Last 90 days"];

export interface FilterState {
  types: string[];
  sharedBy: string;
  dateRange: string;
}

interface FilterPopoverProps {
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
}

export const defaultFilters: FilterState = { types: [], sharedBy: "", dateRange: "" };

export default function FilterPopover({ filters, onApply, onReset }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<FilterState>(filters);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setLocal(filters); }, [filters]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasActive = filters.types.length > 0 || filters.sharedBy || filters.dateRange;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          height: 44,
          padding: "0 16px",
          background: "white",
          border: hasActive ? "1.5px solid #C0C0BE" : "1px solid #E8E8E6",
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500,
          color: "#3A3A3A",
        }}
        aria-label="Filter"
      >
        <Filter size={15} style={{ color: hasActive ? "#1A1A1A" : "#A0A0A0" }} />
        Filter
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-warm-gray-200 shadow-lg z-50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-warm-gray-800">Filters</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-warm-gray-100 text-warm-gray-400"
                aria-label="Close filters"
              >
                <X size={14} />
              </button>
            </div>

            {/* File type */}
            <div className="mb-4">
              <p className="text-xs font-medium text-warm-gray-500 mb-2">File Type</p>
              <div className="flex flex-wrap gap-1.5">
                {fileTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setLocal((p) => ({
                        ...p,
                        types: p.types.includes(t)
                          ? p.types.filter((x) => x !== t)
                          : [...p.types, t],
                      }));
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                      ${local.types.includes(t)
                        ? "bg-accent text-white"
                        : "bg-warm-gray-100 text-warm-gray-600 hover:bg-warm-gray-200"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Shared by */}
            <div className="mb-4">
              <p className="text-xs font-medium text-warm-gray-500 mb-2">Shared By</p>
              <select
                value={local.sharedBy}
                onChange={(e) => setLocal((p) => ({ ...p, sharedBy: e.target.value }))}
                className="w-full px-3 py-1.5 rounded-xl border border-warm-gray-200 text-sm bg-white text-warm-gray-700 focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option value="">All</option>
                {sharedByOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Date range */}
            <div className="mb-4">
              <p className="text-xs font-medium text-warm-gray-500 mb-2">Date Range</p>
              <div className="flex flex-wrap gap-1.5">
                {dateRanges.map((d) => (
                  <button
                    key={d}
                    onClick={() => setLocal((p) => ({ ...p, dateRange: p.dateRange === d ? "" : d }))}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                      ${local.dateRange === d
                        ? "bg-accent text-white"
                        : "bg-warm-gray-100 text-warm-gray-600 hover:bg-warm-gray-200"
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => { onReset(); setLocal(defaultFilters); }}
                className="flex-1 px-3 py-1.5 rounded-xl border border-warm-gray-200 text-sm text-warm-gray-600 hover:bg-warm-gray-100 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => { onApply(local); setOpen(false); }}
                className="flex-1 px-3 py-1.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
