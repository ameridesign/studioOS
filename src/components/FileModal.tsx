import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText } from "lucide-react";
import type { FileItem } from "../data/mockData";

interface FileModalProps {
  file: FileItem | null;
  onClose: () => void;
}

const typeColors: Record<string, string> = {
  FIG: "bg-warm-gray-100 text-warm-gray-600",
  PDF: "bg-red-100 text-red-700",
  MD: "bg-warm-gray-100 text-warm-gray-600",
  XLSX: "bg-green-100 text-green-700",
  DRAWIO: "bg-amber-100 text-amber-700",
  TXT: "bg-gray-100 text-gray-700",
};

export default function FileModal({ file, onClose }: FileModalProps) {
  return (
    <AnimatePresence>
      {file && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl border border-warm-gray-200 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-5 border-b border-warm-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-warm-gray-100">
                  <FileText size={16} className="text-warm-gray-600" />
                </div>
                <h2 className="font-semibold text-sm text-warm-gray-800">File Details</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-warm-gray-100 text-warm-gray-500 transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <p className="font-semibold text-warm-gray-800 text-sm">{file.filename}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${typeColors[file.type] ?? "bg-gray-100 text-gray-700"}`}>
                  {file.type}
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "Shared by", value: file.sharedBy },
                  { label: "Size", value: file.size },
                  { label: "Created", value: file.createdTime },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm">
                    <span className="text-warm-gray-500">{row.label}</span>
                    <span className="font-medium text-warm-gray-700">{row.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                aria-label="Open file"
              >
                <ExternalLink size={14} />
                Open File
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
