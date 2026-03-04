import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, ExternalLink, Download, Share2 } from "lucide-react";
import { recentFiles, docCategories } from "../data/mockData";

const typeColors: Record<string, string> = {
  FIG: "bg-purple-100 text-purple-700",
  PDF: "bg-red-100 text-red-700",
  MD: "bg-blue-100 text-blue-700",
  XLSX: "bg-green-100 text-green-700",
  DRAWIO: "bg-amber-100 text-amber-700",
  TXT: "bg-gray-100 text-gray-700",
};

export default function FilePage() {
  const { fileId } = useParams();

  const allFiles = [
    ...recentFiles,
    ...docCategories.flatMap((c) => c.recentFiles),
  ];
  const file = allFiles.find((f) => f.id === fileId);

  if (!file) {
    return (
      <div className="p-8">
        <Link to="/docs" className="flex items-center gap-2 text-sm text-warm-gray-500 hover:text-warm-gray-700 mb-6">
          <ArrowLeft size={16} /> Back to Docs
        </Link>
        <p className="text-warm-gray-600">File not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <Link to="/docs" className="flex items-center gap-2 text-sm text-warm-gray-500 hover:text-warm-gray-700 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Docs
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-6 lg:p-8 max-w-2xl"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-warm-gray-100">
            <FileText size={24} className="text-warm-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-warm-gray-900 break-all">{file.filename}</h1>
            <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[file.type] ?? "bg-gray-100 text-gray-700"}`}>
              {file.type}
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { label: "Shared by", value: file.sharedBy },
            { label: "Size", value: file.size },
            { label: "Created", value: file.createdTime },
            { label: "File type", value: file.type },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2 border-b border-warm-gray-100">
              <span className="text-sm text-warm-gray-500">{row.label}</span>
              <span className="text-sm font-medium text-warm-gray-700">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors">
            <ExternalLink size={14} /> Open File
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-warm-gray-200 text-sm text-warm-gray-600 hover:bg-warm-gray-100 transition-colors">
            <Download size={14} /> Download
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-warm-gray-200 text-sm text-warm-gray-600 hover:bg-warm-gray-100 transition-colors">
            <Share2 size={14} /> Share
          </button>
        </div>
      </motion.div>
    </div>
  );
}
