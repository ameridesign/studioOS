import { NavLink, useLocation } from "react-router-dom";
import { FileText, BarChart3, Settings } from "lucide-react";

const navItems = [
  { icon: FileText, label: "Docs", path: "/docs" },
  { icon: BarChart3, label: "Reporting", path: "/reporting" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function MobileNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-warm-gray-200 z-30 flex items-center px-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2"
        >
          <item.icon
            size={22}
            className={isActive(item.path) ? "text-accent" : "text-warm-gray-400"}
          />
          <span
            className={`text-[10px] font-medium ${isActive(item.path) ? "text-accent" : "text-warm-gray-400"}`}
          >
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}

