import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, Edit3, Trash2, Mail, Power, Share2, Copy, PanelRightClose, PanelRightOpen } from "lucide-react";

const sprintFiles = [
  {
    id: "1",
    filename: "task-api-spec-v1.2.pdf",
    sharedBy: "Sarah M.",
    size: "18 KB",
    createdDate: "June 28, 2025",
    createdTime: "3:46 PM",
  },
  {
    id: "2",
    filename: "sprint-27-retro-notes.md",
    sharedBy: "Ahsan R.",
    size: "320 KB",
    createdDate: "July 1, 2025",
    createdTime: "11:02 AM",
  },
  {
    id: "3",
    filename: "figma-handoff-checklist.xlsx",
    sharedBy: "Farah T.",
    size: "95 KB",
    createdDate: "June 25, 2025",
    createdTime: "9:15 AM",
  },
  {
    id: "4",
    filename: "real-time-sync-architecture.drawio",
    sharedBy: "Mehdi H.",
    size: "1.2 MB",
    createdDate: "June 24, 2025",
    createdTime: "1:37 PM",
  },
  {
    id: "5",
    filename: "user-persona-beta-group-a.pdf",
    sharedBy: "Sarah M.",
    size: "540 KB",
    createdDate: "July 3, 2025",
    createdTime: "9:50 AM",
  },
];

const toolbarIcons = [
  { icon: Bookmark, label: "Bookmark" },
  { icon: Edit3, label: "Edit" },
  { icon: Trash2, label: "Delete" },
  { icon: Mail, label: "Email" },
  { icon: Power, label: "Power" },
  { icon: Share2, label: "Share" },
];

interface RightRailProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onClose: () => void;
}

export default function RightRail({ collapsed, onToggleCollapse, mobileOpen, onClose }: RightRailProps) {
  const railContent = (
    <div className="flex flex-col h-full p-4">
      {/* Icon Toolbar */}
      <div className="flex items-center gap-2 border border-warm-gray-200 rounded-[13px] px-2 py-1.5 mb-4 shrink-0">
        {toolbarIcons.map((item) => (
          <button
            key={item.label}
            title={item.label}
            aria-label={item.label}
            className="w-[28px] h-[28px] flex items-center justify-center rounded-[10px] text-[#6B6B6B] hover:bg-[#F3F3F3] transition-colors"
          >
            <item.icon size={14} />
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={onToggleCollapse}
          title="Collapse panel"
          aria-label="Collapse panel"
          className="w-[28px] h-[28px] flex items-center justify-center rounded-[10px] text-[#9A9A9A] hover:bg-[#F3F3F3] transition-colors"
        >
          <PanelRightClose size={14} />
        </button>
      </div>

      {/* Header */}
      <div className="mb-3 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-[17px] text-warm-gray-900 leading-tight">
            Sprint Archives
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-warm-gray-100 text-warm-gray-500"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-[12px] leading-relaxed text-warm-gray-500">
          Past sprint plans, retrospectives, and key decisions for tracking team
          velocity and iteration history.
        </p>
        <div className="mt-3 border-t border-warm-gray-200" />
      </div>

      {/* Scrollable file list */}
      <div className="flex-1 overflow-y-auto space-y-[10px] pr-0.5 min-h-0">
        {sprintFiles.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.25 }}
            className="border border-warm-gray-200 rounded-[15px] p-3 bg-white hover:border-warm-gray-300 hover:shadow-sm transition-all duration-150 cursor-pointer"
          >
            <p className="font-semibold text-[13px] text-warm-gray-800 truncate mb-2">
              {file.filename}
            </p>
            <div className="space-y-0.5 mb-3">
              <p className="text-[12px] text-warm-gray-400">
                Shared By:{" "}
                <span className="text-warm-gray-600">{file.sharedBy}</span>
              </p>
              <p className="text-[12px] text-warm-gray-400">
                Size: <span className="text-warm-gray-600">{file.size}</span>
              </p>
              <p className="text-[12px] text-warm-gray-400">
                Created Time:{" "}
                <span className="text-warm-gray-600">
                  {file.createdDate} • {file.createdTime}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button className="h-[27px] px-3 rounded-full border border-warm-gray-200 text-[12px] text-warm-gray-600 hover:bg-warm-gray-100 transition-colors">
                Details
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded-[9px] border border-warm-gray-200 text-warm-gray-400 hover:bg-warm-gray-100 transition-colors"
                aria-label="Copy"
                title="Copy"
              >
                <Copy size={11} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop rail */}
      <aside
        className="hidden lg:block fixed right-0 top-0 h-screen bg-white border-l border-[#E8E8E6] z-20 overflow-hidden"
        style={{
          width: collapsed ? 0 : 320,
          borderLeftWidth: collapsed ? 0 : 1,
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), border-left-width 0.25s",
        }}
      >
        <div style={{ width: 320 }}>
          {railContent}
        </div>
      </aside>

      {/* Floating re-open button when right rail is collapsed */}
      <AnimatePresence>
        {collapsed && (
          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.18 }}
            onClick={onToggleCollapse}
            title="Open panel"
            aria-label="Open panel"
            className="hidden lg:flex fixed right-3 top-3 z-20 w-8 h-8 items-center justify-center rounded-[10px] bg-white border border-[#E8E8E6] text-[#9A9A9A] hover:text-[#4A4A4A] hover:border-[#C0C0BE] shadow-sm transition-colors"
          >
            <PanelRightOpen size={15} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
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
              initial={{ x: 340 }}
              animate={{ x: 0 }}
              exit={{ x: 340 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 h-full w-[320px] bg-white z-50 lg:hidden overflow-hidden"
            >
              {railContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
