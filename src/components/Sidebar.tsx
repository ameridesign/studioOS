import { useState, useRef, useEffect, useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  ChevronLeft,
  Plus,
  MoreHorizontal,
  ArrowLeftRight,
  X,
  LayoutGrid,
  PenTool,
  User,
  LogOut,
  CreditCard,
  PanelLeftOpen,
} from "lucide-react";
import NewProjectModal from "./NewProjectModal";
import { PROJECT_ICON_MAP } from "../lib/projectIcons";
import type { Project } from "../data/mockData";

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


const supportItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: GitBranch, label: "Releases", path: "/releases" },
];

const appItems = [
  { label: "Trello", icon: LayoutGrid, color: "#0079bf" },
  { label: "Figma", icon: PenTool, color: "#a259ff" },
];

// All searchable items flattened


interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onAddProject: (p: Project) => void;
}

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onClose, projects, onAddProject }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const allSearchItems = useMemo(() => [
    ...essentialItems.map((i) => ({ label: i.label, path: i.path, type: "nav" as const, icon: i.icon })),
    ...projects.map((p) => ({ label: p.name, path: `/projects/${p.id}`, type: "project" as const, icon: PROJECT_ICON_MAP[p.iconKey] ?? PROJECT_ICON_MAP["building2"] })),
    ...supportItems.map((i) => ({ label: i.label, path: i.path, type: "nav" as const, icon: i.icon })),
  ], [projects]);

  const searchResults = searchQuery.trim()
    ? allSearchItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const location = useLocation();
  const navigate = useNavigate();
  const accountRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Close account overlay on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    if (accountOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [accountOpen]);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearchSelect(path: string) {
    navigate(path);
    setSearchQuery("");
    setSearchFocused(false);
    onClose();
  }

  const sidebarContent = (
    <div className="flex flex-col h-full p-3" style={{ fontFamily: SIDEBAR_FONT }}>
      {/* User Card */}
      <div ref={accountRef} className="relative mb-3">
        <button
          onClick={() => setAccountOpen((v) => !v)}
          className="w-full bg-white border border-[#E8E8E6] rounded-[15px] px-[11px] py-[10px] flex items-center gap-[10px] hover:bg-[#F6F6F4] transition-colors text-left"
        >
          <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
            <span className="text-white font-semibold text-[10px] leading-none">EE</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[13px] leading-tight text-[#2A2A2A] truncate">
              Emirkan Erkara
            </p>
            <p className="text-[11px] leading-tight text-[#9A9A9A] truncate mt-0.5">
              Independent Product Des...
            </p>
          </div>
          <ArrowLeftRight size={14} strokeWidth={1.5} className="text-[#9A9A9A] shrink-0" />
        </button>

        {/* Account Overlay */}
        <AnimatePresence>
          {accountOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E8E8E6] rounded-[15px] shadow-lg z-50 overflow-hidden py-1"
            >
              <div className="px-3 py-2 border-b border-[#F0F0EE]">
                <p className="text-[13px] font-semibold text-[#2A2A2A]">Emirkan Erkara</p>
                <p className="text-[11px] text-[#9A9A9A] mt-0.5">emirkan@ameridesign.com</p>
              </div>
              <div className="py-1">
                <AccountMenuItem icon={User} label="View Profile" onClick={() => setAccountOpen(false)} />
                <AccountMenuItem icon={CreditCard} label="Billing & Plan" onClick={() => setAccountOpen(false)} />
                <AccountMenuItem icon={Settings} label="Settings" onClick={() => { setAccountOpen(false); navigate("/settings"); onClose(); }} />
              </div>
              <div className="border-t border-[#F0F0EE] py-1">
                <AccountMenuItem icon={LogOut} label="Sign Out" danger onClick={() => setAccountOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search */}
      <div ref={searchRef} className="relative mb-3">
        <div className={`flex items-center gap-[10px] h-9 px-3 rounded-[13px] text-[13px] transition-colors ${
          searchFocused ? "bg-white border border-[#E8E8E6]" : "bg-[#ECEAE7] border border-transparent"
        }`}>
          <Search size={16} strokeWidth={1.5} className="text-[#9A9A9A] shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") { setSearchQuery(""); setSearchFocused(false); }
              if (e.key === "Enter" && searchResults.length > 0) handleSearchSelect(searchResults[0].path);
            }}
            className="flex-1 bg-transparent outline-none text-[#2A2A2A] placeholder-[#9A9A9A] text-[13px]"
            aria-label="Search"
          />
          {searchQuery ? (
            <button onClick={() => setSearchQuery("")} className="text-[#9A9A9A] hover:text-[#6F6F6F]">
              <X size={12} strokeWidth={2} />
            </button>
          ) : (
            <span className="text-[10px] text-[#B0B0B0]">⌘F</span>
          )}
        </div>

        {/* Search results dropdown */}
        <AnimatePresence>
          {searchFocused && searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E8E8E6] rounded-[15px] shadow-lg z-50 overflow-hidden py-1"
            >
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <button
                    key={item.path}
                    onMouseDown={() => handleSearchSelect(item.path)}
                    className="w-full flex items-center gap-[10px] h-[35px] px-3 text-[13px] text-[#2A2A2A] hover:bg-[#F6F6F4] transition-colors text-left"
                  >
                    {item.type === "project" ? (
                      (() => { const ProjIcon = (item as { icon: React.ComponentType<{size?:number;className?:string}> }).icon; return <ProjIcon size={13} className="text-[#8A8A8A] shrink-0" />; })()
                    ) : (
                      <item.icon size={14} strokeWidth={1.5} className="text-[#9A9A9A] shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-[12px] text-[#B0B0B0]">No results for "{searchQuery}"</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
              <button onClick={() => setNewProjectOpen(true)} className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors" aria-label="Add project">
                <Plus size={14} strokeWidth={1.5} />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors" aria-label="More options">
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
                {projects.map((project) => {
                  const ProjIcon = PROJECT_ICON_MAP[project.iconKey] ?? PROJECT_ICON_MAP["building2"];
                  return (
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
                      <ProjIcon size={13} className="shrink-0 text-[#8A8A8A]" />
                      <span>{project.name}</span>
                    </NavLink>
                  );
                })}
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
              <button className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors" aria-label="Add management item">
                <Plus size={14} strokeWidth={1.5} />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors" aria-label="More options">
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
                <p className="px-[11px] py-2 text-[12px] text-[#B0B0B0] italic">No items yet</p>
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
      {/* Desktop sidebar — overflow:visible so the edge toggle can bleed out */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-[#F6F6F4] border-r border-[#E8E8E6] z-30"
        style={{
          width: collapsed ? 68 : 264,
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Inner content — clips overflowing text during width animation */}
        <div className="flex flex-col h-full overflow-hidden w-full">
          {collapsed ? (
            /* Icon-only collapsed rail */
            <div className="flex flex-col items-center gap-1 pt-3 pb-3 h-full" style={{ fontFamily: SIDEBAR_FONT }}>
              {/* Expand button */}
              <button
                onClick={onToggleCollapse}
                title="Expand sidebar"
                className="w-10 h-10 flex items-center justify-center rounded-[11px] text-[#9A9A9A] hover:bg-white hover:border hover:border-[#E8E8E6] transition-all mb-1"
              >
                <PanelLeftOpen size={17} strokeWidth={1.5} />
              </button>
              <div className="w-8 border-t border-[#E8E8E6] mb-1" />
              {essentialItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={item.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-[11px] transition-all duration-100
                    ${isActive(item.path)
                      ? "bg-white border border-[#E8E8E6] text-[#2A2A2A] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      : "border border-transparent text-[#6F6F6F] hover:bg-white/60"
                    }`}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                </NavLink>
              ))}
              <div className="w-8 border-t border-[#E8E8E6] my-1" />
              {projects.map((project) => {
                const ProjIcon = PROJECT_ICON_MAP[project.iconKey] ?? PROJECT_ICON_MAP["building2"];
                return (
                  <NavLink
                    key={project.id}
                    to={`/projects/${project.id}`}
                    onClick={onClose}
                    title={project.name}
                    className={`w-10 h-10 flex items-center justify-center rounded-[11px] transition-all duration-100
                      ${isActive(`/projects/${project.id}`)
                        ? "bg-white border border-[#E8E8E6] text-[#2A2A2A] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                        : "border border-transparent text-[#6F6F6F] hover:bg-white/60"
                      }`}
                  >
                    <ProjIcon size={14} className="shrink-0" />
                  </NavLink>
                );
              })}
              <div className="flex-1" />
              {supportItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={item.label}
                  className={`w-10 h-10 flex items-center justify-center rounded-[11px] transition-all duration-100
                    ${isActive(item.path)
                      ? "bg-white border border-[#E8E8E6] text-[#2A2A2A] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      : "border border-transparent text-[#6F6F6F] hover:bg-white/60"
                    }`}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                </NavLink>
              ))}
            </div>
          ) : (
            sidebarContent
          )}
        </div>

        {/* Floating edge toggle — sits on the right border, vertically centered */}
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
            style={{
              position: "absolute",
              right: -11,
              top: "50%",
              transform: "translateY(-50%)",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "white",
              border: "1.5px solid #E0E0DE",
              boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 40,
              color: "#9A9A9A",
              transition: "color 0.15s, border-color 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#2A2A2A";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#C0C0BE";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 3px 10px rgba(0,0,0,0.14)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#9A9A9A";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#E0E0DE";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 6px rgba(0,0,0,0.10)";
            }}
          >
            <ChevronLeft size={13} strokeWidth={2} />
          </button>
        )}
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
      <NewProjectModal
        open={newProjectOpen}
        onClose={() => setNewProjectOpen(false)}
        onSubmit={onAddProject}
      />
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

function AccountMenuItem({
  icon: Icon,
  label,
  danger,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-[10px] h-[35px] px-3 text-[13px] transition-colors text-left hover:bg-[#F6F6F4] ${
        danger ? "text-red-500" : "text-[#2A2A2A]"
      }`}
    >
      <Icon size={14} strokeWidth={1.5} className={danger ? "text-red-400" : "text-[#9A9A9A]"} />
      {label}
    </button>
  );
}
