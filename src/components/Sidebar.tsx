import { useState, useRef, useEffect } from "react";
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
  Plus,
  MoreHorizontal,
  ArrowLeftRight,
  X,
  LayoutGrid,
  PenTool,
  User,
  LogOut,
  CreditCard,
  Building2,
  Layers,
  Smartphone,
  Globe,
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
  { id: "atlas-crm",        name: "Atlas CRM",         icon: Building2  },
  { id: "studioos-v2",      name: "Studio OS v2",       icon: Layers     },
  { id: "mobile-app",       name: "Mobile App",         icon: Smartphone },
  { id: "website-redesign", name: "Website Redesign",   icon: Globe      },
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
const allSearchItems = [
  ...essentialItems.map((i) => ({ label: i.label, path: i.path, type: "nav" as const, icon: i.icon })),
  ...sidebarProjects.map((p) => ({ label: p.name, path: `/projects/${p.id}`, type: "project" as const, icon: p.icon })),
  ...supportItems.map((i) => ({ label: i.label, path: i.path, type: "nav" as const, icon: i.icon })),
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [managementOpen, setManagementOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const accountRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const searchResults = searchQuery.trim()
    ? allSearchItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
              <button className="w-6 h-6 flex items-center justify-center rounded-lg text-[#9A9A9A] hover:bg-[#E8E8E6] transition-colors" aria-label="Add project">
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
                    <project.icon size={13} className="shrink-0 text-[#8A8A8A]" />
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
