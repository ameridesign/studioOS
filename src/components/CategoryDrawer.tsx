import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Upload, Link } from "lucide-react";
import type { DocCategory } from "../data/mockData";

interface CategoryDrawerProps {
  category: DocCategory | null;
  onClose: () => void;
}

export default function CategoryDrawer({ category, onClose }: CategoryDrawerProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {category && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 lg:right-72 top-0 h-screen w-full max-w-md bg-white border-l border-warm-gray-200 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-5 border-b border-warm-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-warm-gray-800">{category.title}</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-warm-gray-100 text-warm-gray-500 transition-colors"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <p className="text-sm text-warm-gray-600 leading-relaxed">{category.description}</p>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-gray-400 mb-3">
                  Quick Actions
                </h3>
                <div className="flex gap-2">
                  {[
                    { icon: Plus, label: "Create new" },
                    { icon: Upload, label: "Upload" },
                    { icon: Link, label: "Share link" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-warm-gray-200 text-sm text-warm-gray-600 hover:bg-warm-gray-100 hover:text-warm-gray-800 transition-colors"
                      aria-label={action.label}
                    >
                      <action.icon size={14} />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-gray-400 mb-3">
                  Recent Files ({category.recentFiles.length})
                </h3>
                <div className="space-y-2.5">
                  {category.recentFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 rounded-xl border border-warm-gray-200/60 hover:shadow-sm transition-all duration-200 cursor-pointer"
                      onClick={() => { onClose(); navigate(`/files/${file.id}`); }}
                    >
                      <p className="font-medium text-sm text-warm-gray-800">{file.filename}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-warm-gray-500">
                        <span>{file.sharedBy}</span>
                        <span>{file.size}</span>
                        <span>{file.createdTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-warm-gray-500">
                {category.filesCount} files total
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
