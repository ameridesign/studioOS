import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  CheckSquare,
  Calendar,
  FileText,
  Zap,
  BarChart3,
  Settings,
  Rocket,
  Search,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { projects } from "../data/mockData";

const navSections = [
  {
    label: "Essentials",
    items: [
      { icon: Home, label: "Home", path: "/" },
      { icon: CheckSquare, label: "Tasks", path: "/tasks" },
      { icon: Calendar, label: "Calendar", path: "/calendar" },
    ],
  },
  {
    label: "Team",
    items: [
      { icon: FileText, label: "Docs", path: "/docs" },
      { icon: Zap, label: "Automations", path: "/automations" },
      { icon: BarChart3, label: "Reporting", path: "/reporting" },
    ],
  },
];

const supportItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Rocket, label: "Releases", path: "/releases" },
];

const appItems = [
  { label: "Trello", color: "#0079bf" },
  { label: "Figma", color: "#a259ff" },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ collapsed, mobileOpen, onClose }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [managementOpen, setManagementOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* User Card */}
      <div className={`p-4 ${collapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-white font-semibold text-sm shrink-0">
            EE
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-semibold text-sm text-warm-gray-800 truncate">Emirkan Erkara</p>
              <p className="text-xs text-warm-gray-500 truncate">Independent Product Designer</p>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-warm-gray-100 text-warm-gray-500 text-sm">
            <Search size={14} />
            <span className="flex-1">Search...</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-warm-gray-200 text-warm-gray-500 font-mono">⌘K</kbd>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="px-2 mb-4 flex justify-center">
          <button className="p-2 rounded-xl bg-warm-gray-100 text-warm-gray-500" aria-label="Search">
            <Search size={16} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gray-400">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150
                    ${isActive(item.path)
                      ? "bg-accent text-white shadow-sm"
                      : "text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800"
                    }
                    ${collapsed ? "justify-center px-2" : ""}
                  `}
                  aria-label={item.label}
                >
                  <item.icon size={18} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {/* Projects */}
        <div>
          <button
            onClick={() => setProjectsOpen(!projectsOpen)}
            className={`flex items-center gap-2 w-full px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gray-400 hover:text-warm-gray-600 transition-colors ${collapsed ? "justify-center" : ""}`}
            aria-label="Toggle projects"
          >
            {!collapsed && <span>Projects</span>}
            {!collapsed && (projectsOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
          </button>
          <AnimatePresence>
            {projectsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden space-y-0.5"
              >
                {projects.map((project) => (
                  <NavLink
                    key={project.id}
                    to={`/projects/${project.id}`}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150
                      ${isActive(`/projects/${project.id}`)
                        ? "bg-accent text-white shadow-sm"
                        : "text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800"
                      }
                      ${collapsed ? "justify-center px-2" : ""}
                    `}
                    aria-label={project.name}
                  >
                    <span
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    {!collapsed && <span>{project.name}</span>}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Management */}
        <div>
          <button
            onClick={() => setManagementOpen(!managementOpen)}
            className={`flex items-center gap-2 w-full px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gray-400 hover:text-warm-gray-600 transition-colors ${collapsed ? "justify-center" : ""}`}
            aria-label="Toggle management"
          >
            {!collapsed && <span>Management</span>}
            {!collapsed && (managementOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
          </button>
          <AnimatePresence>
            {managementOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="px-3 py-2 text-xs text-warm-gray-400 italic">No items yet</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support */}
        <div>
          {!collapsed && (
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gray-400">
              Support
            </p>
          )}
          <div className="space-y-0.5">
            {supportItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive(item.path)
                    ? "bg-accent text-white shadow-sm"
                    : "text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800"
                  }
                  ${collapsed ? "justify-center px-2" : ""}
                `}
                aria-label={item.label}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Apps */}
        <div>
          {!collapsed && (
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-warm-gray-400">
              Apps
            </p>
          )}
          <div className="space-y-0.5">
            {appItems.map((app) => (
              <div
                key={app.label}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800 transition-all cursor-pointer ${collapsed ? "justify-center px-2" : ""}`}
              >
                <span className="w-4 h-4 rounded shrink-0" style={{ backgroundColor: app.color }} />
                {!collapsed && <span>{app.label}</span>}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-warm-gray-200 z-30 transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-warm-gray-200 z-50 lg:hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-warm-gray-100 text-warm-gray-500"
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
