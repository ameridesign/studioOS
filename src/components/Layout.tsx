import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Menu, PanelRightOpen } from "lucide-react";
import Sidebar from "./Sidebar";
import RightRail from "./RightRail";
import { recentFiles } from "../data/mockData";
import { type FilterState, defaultFilters } from "./FilterPopover";

export default function Layout() {
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [railMobileOpen, setRailMobileOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filteredFiles = useMemo(() => {
    let files = recentFiles;
    if (filters.types.length > 0) {
      files = files.filter((f) => filters.types.includes(f.type));
    }
    if (filters.sharedBy) {
      files = files.filter((f) => f.sharedBy === filters.sharedBy);
    }
    return files;
  }, [filters]);

  return (
    <div className="w-full max-w-[1440px] h-[calc(100vh-32px)] bg-warm-gray-50 rounded-2xl shadow-xl overflow-hidden relative">
      <Sidebar
        collapsed={false}
        mobileOpen={sidebarMobileOpen}
        onClose={() => setSidebarMobileOpen(false)}
      />

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-warm-gray-200/60 flex items-center justify-between px-4 z-30">
        <button
          onClick={() => setSidebarMobileOpen(true)}
          className="p-2 rounded-xl hover:bg-warm-gray-100 text-warm-gray-600"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <span className="font-semibold text-sm text-warm-gray-800">Studio OS</span>
        <button
          onClick={() => setRailMobileOpen(true)}
          className="p-2 rounded-xl hover:bg-warm-gray-100 text-warm-gray-600"
          aria-label="Open files panel"
        >
          <PanelRightOpen size={20} />
        </button>
      </div>

      {/* Main content */}
      <main className="lg:ml-60 lg:mr-72 pt-14 lg:pt-0 h-full overflow-y-auto">
        <Outlet context={{ filters, setFilters }} />
      </main>

      <RightRail
        files={filteredFiles}
        mobileOpen={railMobileOpen}
        onClose={() => setRailMobileOpen(false)}
      />
    </div>
  );
}

export type LayoutContext = {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
};
