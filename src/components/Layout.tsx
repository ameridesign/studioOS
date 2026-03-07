import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PanelRightOpen, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import RightRail from "./RightRail";
import MobileNav from "./MobileNav";
import { type FilterState, defaultFilters } from "./FilterPopover";
import { projects as initialProjects } from "../data/mockData";
import type { Project } from "../data/mockData";

export default function Layout() {
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [railMobileOpen, setRailMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (p: Project) => setProjects((prev) => [...prev, p]);

  const sidebarW = sidebarCollapsed ? 68 : 264;
  const railW = railCollapsed ? 0 : 320;

  return (
    <div className="w-full h-full overflow-hidden" style={{ background: '#F6F6F4' }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        mobileOpen={sidebarMobileOpen}
        onClose={() => setSidebarMobileOpen(false)}
        projects={projects}
        onAddProject={addProject}
      />

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-warm-gray-200 flex items-center justify-between px-3 z-30">
        <button
          onClick={() => setSidebarMobileOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-warm-gray-600"
          style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)" }}
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <span className="font-semibold text-sm text-warm-gray-800">Studio OS</span>
        <button
          onClick={() => setRailMobileOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-warm-gray-100 text-warm-gray-600"
          aria-label="Open files panel"
        >
          <PanelRightOpen size={18} />
        </button>
      </div>

      {/* Main content — margins animate with sidebar/rail (desktop only) */}
      <main
        className="h-full pt-14 lg:pt-0 pb-16 lg:pb-0 overflow-y-auto bg-white lg:ml-[var(--sidebar-w)] lg:mr-[var(--rail-w)]"
        style={{
          "--sidebar-w": `${sidebarW}px`,
          "--rail-w": `${railW}px`,
          transition: "margin 0.25s cubic-bezier(0.4,0,0.2,1)",
        } as React.CSSProperties}
      >
        <Outlet context={{ filters, setFilters, projects, addProject }} />
      </main>

      <RightRail
        collapsed={railCollapsed}
        onToggleCollapse={() => setRailCollapsed((v) => !v)}
        mobileOpen={railMobileOpen}
        onClose={() => setRailMobileOpen(false)}
      />

      <MobileNav />
    </div>
  );
}

export type LayoutContext = {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  projects: Project[];
  addProject: (p: Project) => void;
};
