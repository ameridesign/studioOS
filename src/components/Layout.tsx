import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PanelRightOpen } from "lucide-react";
import Sidebar from "./Sidebar";
import RightRail from "./RightRail";
import MobileNav from "./MobileNav";
import { type FilterState, defaultFilters } from "./FilterPopover";
import { projects as initialProjects } from "../data/mockData";
import type { Project } from "../data/mockData";

export default function Layout() {
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [railMobileOpen, setRailMobileOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (p: Project) => setProjects((prev) => [...prev, p]);

  return (
    <div className="w-full h-full overflow-hidden" style={{ background: '#F6F6F4' }}>
      <Sidebar
        collapsed={false}
        mobileOpen={sidebarMobileOpen}
        onClose={() => setSidebarMobileOpen(false)}
        projects={projects}
        onAddProject={addProject}
      />

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-warm-gray-200 flex items-center justify-between px-4 z-30">
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
      <main className="h-full lg:ml-[264px] lg:mr-[320px] pt-14 lg:pt-0 pb-16 lg:pb-0 overflow-y-auto bg-white">
        <Outlet context={{ filters, setFilters, projects, addProject }} />
      </main>

      <RightRail
        mobileOpen={railMobileOpen}
        onClose={() => setRailMobileOpen(false)}
      />

      <MobileNav onMorePress={() => setSidebarMobileOpen(true)} />
    </div>
  );
}

export type LayoutContext = {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  projects: Project[];
  addProject: (p: Project) => void;
};
