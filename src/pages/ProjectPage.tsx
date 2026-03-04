import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, FileText, CheckCircle } from "lucide-react";
import { projects, docCategories } from "../data/mockData";

const projectStats = [
  { label: "Documents", value: "24", icon: FileText },
  { label: "Team Members", value: "6", icon: Users },
  { label: "Sprints", value: "12", icon: Calendar },
  { label: "Completed Tasks", value: "89", icon: CheckCircle },
];

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="p-8">
        <Link to="/docs" className="flex items-center gap-2 text-sm text-warm-gray-500 hover:text-warm-gray-700 mb-6">
          <ArrowLeft size={16} /> Back to Docs
        </Link>
        <p className="text-warm-gray-600">Project not found.</p>
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
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: project.color }} />
          <h1 className="text-2xl font-bold text-warm-gray-900">{project.name}</h1>
        </div>
        <p className="text-sm text-warm-gray-500">Project overview and documentation hub</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {projectStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={16} className="text-warm-gray-400" />
              <span className="text-xs font-medium text-warm-gray-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-warm-gray-800">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Related Docs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider text-warm-gray-400 mb-3">
          Related Documentation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {docCategories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <h3 className="font-semibold text-sm text-warm-gray-800">{cat.title}</h3>
              <p className="text-xs text-warm-gray-500 mt-1 leading-relaxed">{cat.description}</p>
              <p className="text-xs text-warm-gray-400 mt-2">{cat.filesCount} files</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
