import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  CheckSquare,
  Calendar,
  Users,
  FileText,
  Zap,
  BarChart3,
  Settings,
  GitBranch,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreHorizontal,
  ArrowLeftRight,
  X,
  Shield,
  LayoutGrid,
  PenTool,
} from "lucide-react";

const SIDEBAR_FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"';

const essentialItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: Users, label: "Team", path: "/team" },
  { icon: FileText, label: "Docs", path: "/docs" },
  { icon: Zap, label: "Automations", path: "/automations" },
  { icon: BarChart3, label: "Reporting", path: "/reporting" },
];

const sidebarProjects = [
  { id: "atlas-crm-revamp", name: "Atlas CRM Revamp", color: "#34A853" },
  { id: "nimbus-dashboard", name: "Nimbus Dashboard", color: "#F59E0B" },
  { id: "orion-api-gateway", name: "Orion API Gateway", color: "#4285F4" },
  { id: "helio-task-system", name: "Helio Task System", color: "#EA4335" },
];

const supportItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: GitBranch, label: "Releases", path: "/releases" },
];

const appItems = [
  { label: "Trello", icon: LayoutGrid, color: "#0079bf" },
  { label: "Figma", icon: PenTool, color: "#a259ff" },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [managementOpen, setManagementOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full p-3" style={{ fontFamily: SIDEBAR_FONT }}>
      {/* User Card */}
      <div className="bg-white border border-[#E8E8E6] rounded-[15px] px-[11px] py-[10px] mb-3 flex items-center gap-[10px]">
        <div className="w-7 h-7 rounded-full bg-[#E8E8E6] flex items-center justify-center shrink-0">
          <Shield size={14} strokeWidth={1.5} className="text-[#6F6F6F]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[13px] leading-tight text-[#2A2A2A] truncate">
            Courtney Henry
          </p>
          <p className="text-[11px] leading-tight text-[#9A9A9A] truncate mt-0.5">
            The Walt Disney Company
          </p>
        </div>
        <ArrowLeftRight size={14} strokeWidth={1.5} className="text-[#9A9A9A] shrink-0" />
      </div>

      {/* Search */}
      <div className="mb-3">
        <div className="flex items-center gap-[10px] h-9 px-3 rounded-[13px] bg-[#ECEAE7] text-[#9A9A9A] text-[13px]">
          <Search size={16} strokeWidth={1.5} />
          <span className="flex-1">Search</span>
          <span className="text-[10px] text-[#B0B0B0]">⌘F</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-0 min-h-0">
        {/* Essentials */}
        <SectionLabel>Essentials</SectionLabel>
        <div className="space-y-[1px]">
          {essentialItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-[10px] h-[35px] px-[11px] rounded-[11px] text-[13px] transition-all duration-100
                ${isActive(item.path)
                  ? "bg-white border border-[#E8E8E6] text-[#2A2A2A] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  : "border border-transparent text-[#6F6F6F] hover:bg-white/60 font-normal"
                }`}
              aria-label={item.label}
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        <div className="py-3">
          <div className="border-t border-[#E8E8E6]" />
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center justify-between px-[11px] mb-2">
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[#9A9A9A] hover:text-[#6F6F6F] transition-colors"
              aria-label="Toggle projects"
            >
              {projectsOpen ? <ChevronDown size={12} strokeWidth={1.5} /> : <ChevronRight size={12} strokeWidth={1.5} />}
              <span>Projects</span>
            </button>
            <div className="flex items-center gap-1">
              <button
                className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors"
                aria-label="Add project"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {projectsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden space-y-[1px]"
              >
                {sidebarProjects.map((project) => (
                  <NavLink
                    key={project.id}
                    to={`/projects/${project.id}`}
                    onClick={onClose}
                    className={`flex items-center gap-[10px] h-[35px] px-[11px] rounded-[11px] text-[13px] transition-all duration-100
                      ${isActive(`/projects/${project.id}`)
                        ? "bg-white border border-[#E8E8E6] text-[#2A2A2A] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                        : "border border-transparent text-[#6F6F6F] hover:bg-white/60 font-normal"
                      }`}
                    aria-label={project.name}
                  >
                    <span
                      className="w-[13px] h-[13px] rounded-[3px] shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <span>{project.name}</span>
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Management */}
        <div className="mt-3">
          <div className="flex items-center justify-between px-[11px] mb-2">
            <button
              onClick={() => setManagementOpen(!managementOpen)}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[#9A9A9A] hover:text-[#6F6F6F] transition-colors"
              aria-label="Toggle management"
            >
              {managementOpen ? <ChevronDown size={12} strokeWidth={1.5} /> : <ChevronRight size={12} strokeWidth={1.5} />}
              <span>Management</span>
            </button>
            <div className="flex items-center gap-1">
              <button
                className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors"
                aria-label="Add management item"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {managementOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="px-[11px] py-2 text-[12px] text-[#B0B0B0] italic">
                  No items yet
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Support */}
        <div className="mt-3">
          <SectionLabel>Support</SectionLabel>
          <div className="space-y-[1px]">
            {supportItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-[10px] h-[35px] px-[11px] rounded-[11px] text-[13px] transition-all duration-100
                  ${isActive(item.path)
                    ? "bg-white border border-[#E8E8E6] text-[#2A2A2A] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                    : "border border-transparent text-[#6F6F6F] hover:bg-white/60 font-normal"
                  }`}
                aria-label={item.label}
              >
                <item.icon size={18} strokeWidth={1.5} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Apps */}
        <div className="mt-3">
          <SectionLabel>Apps</SectionLabel>
          <div className="space-y-[1px]">
            {appItems.map((app) => (
              <div
                key={app.label}
                className="flex items-center gap-[10px] h-[35px] px-[11px] rounded-[11px] text-[13px] text-[#6F6F6F] border border-transparent hover:bg-white/60 transition-all duration-100 cursor-pointer"
              >
                <span
                  className="w-[18px] h-[18px] rounded-[4px] shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: app.color }}
                >
                  <app.icon size={11} strokeWidth={1.5} className="text-white" />
                </span>
                <span>{app.label}</span>
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
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[264px] bg-[#F6F6F4] border-r border-[#E8E8E6] z-30">
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
              className="fixed left-0 top-0 h-screen w-[264px] bg-[#F6F6F4] border-r border-[#E8E8E6] z-50 lg:hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#E8E8E6] text-[#9A9A9A] z-10"
                aria-label="Close sidebar"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-[11px] mt-[14px] mb-2 text-[11px] uppercase tracking-[0.08em] text-[#9A9A9A] font-medium">
      {children}
    </p>
  );
}
