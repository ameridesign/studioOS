import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { FileItem } from "../data/mockData";

interface RightRailProps {
  files: FileItem[];
  mobileOpen: boolean;
  onClose: () => void;
}

export default function RightRail({ files, mobileOpen, onClose }: RightRailProps) {
  const navigate = useNavigate();

  const fileList = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-warm-gray-200/60 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-base text-warm-gray-800">Sprint Archives</h2>
          <p className="text-xs text-warm-gray-500 mt-0.5">Past sprint plans, retros & decisions</p>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg hover:bg-warm-gray-100 text-warm-gray-500"
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
            className="p-3 rounded-xl border border-warm-gray-200/50 bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(`/files/${file.id}`)}
          >
            <p className="font-semibold text-sm text-warm-gray-800 truncate group-hover:text-warm-gray-900 transition-colors">
              {file.filename}
            </p>
            <div className="mt-1.5 space-y-0.5">
              <p className="text-[11px] text-warm-gray-500">Shared by: <span className="text-warm-gray-700">{file.sharedBy}</span></p>
              <p className="text-[11px] text-warm-gray-500">Size: <span className="text-warm-gray-700">{file.size}</span></p>
              <p className="text-[11px] text-warm-gray-500">Created: <span className="text-warm-gray-700">{file.createdTime}</span></p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/files/${file.id}`); }}
              className="mt-2 px-3 py-1 text-xs font-medium rounded-full border border-warm-gray-200/60 text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800 transition-colors"
              aria-label={`View details for ${file.filename}`}
            >
              Details
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop rail */}
      <aside className="hidden lg:flex flex-col absolute right-0 top-0 h-full w-72 bg-white border-l border-warm-gray-200/60 z-20 rounded-r-2xl">
        {fileList}
      </aside>

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
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 h-screen w-72 bg-white border-l border-warm-gray-200 z-50 lg:hidden"
            >
              {fileList}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
