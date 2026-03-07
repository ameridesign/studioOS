import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Folder,
  CheckSquare,
  BarChart3,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { projects, recentFiles } from "../data/mockData";
import EngagementChart from "../components/EngagementChart";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const stats = [
  { label: "Active Projects", value: "4", icon: Folder, color: "#1A1A1A" },
  { label: "Open Tasks", value: "12", icon: CheckSquare, color: "#10b981" },
  { label: "Total Files", value: "156", icon: FileText, color: "#f59e0b" },
  { label: "Weekly Activity", value: "1,730", icon: BarChart3, color: "#ec4899" },
];

const activityFeed = [
  { id: 1, action: "Updated", file: "atlas-crm-brief-v3.pdf", time: "2h ago", user: "Emir", color: "#1A1A1A" },
  { id: 2, action: "Shared", file: "sprint-27-retro-notes.md", time: "4h ago", user: "Farhan", color: "#10b981" },
  { id: 3, action: "Uploaded", file: "usability-round-3.pdf", time: "Yesterday", user: "Mehdi", color: "#f59e0b" },
  { id: 4, action: "Commented on", file: "figma-handoff-checklist.xlsx", time: "Yesterday", user: "Sarah", color: "#ec4899" },
  { id: 5, action: "Created", file: "tokens-v2.json", time: "2 days ago", user: "Emir", color: "#1A1A1A" },
];

const quickActions = [
  { label: "New Doc", icon: FileText, path: "/docs" },
  { label: "Tasks", icon: CheckSquare, path: "/tasks" },
  { label: "Team", icon: Users, path: "/team" },
  { label: "Automations", icon: Zap, path: "/automations" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const greeting = useMemo(() => getGreeting(), []);
  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  return (
    <div className="p-6 lg:p-8 max-w-full">
      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <p className="text-xs font-medium text-warm-gray-400 uppercase tracking-wider mb-1">
          {today}
        </p>
        <h1 className="text-2xl font-bold text-warm-gray-900">
          {greeting}, Emirkan 👋
        </h1>
        <p className="text-sm text-warm-gray-500 mt-1">
          Here's what's happening in your studio today.
        </p>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.3 }}
        className="flex gap-2 mb-8 flex-wrap"
      >
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className="flex items-center gap-2 h-9 px-4 rounded-[13px] bg-white border border-warm-gray-200 text-[13px] font-medium text-warm-gray-700 hover:border-warm-gray-300 hover:shadow-sm transition-all duration-150"
          >
            <action.icon size={14} className="text-warm-gray-500" />
            {action.label}
          </button>
        ))}
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.3 }}
        className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
            className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: stat.color + "18" }}
            >
              <stat.icon size={16} style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold text-warm-gray-900 leading-none mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-warm-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Active Projects + Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-warm-gray-800">Active Projects</h2>
            <button
              onClick={() => navigate("/docs")}
              className="flex items-center gap-1 text-xs text-warm-gray-400 hover:text-warm-gray-700 transition-colors"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {projects.map((project, i) => {
              const progress = [72, 45, 88, 31][i] ?? 50;
              return (
                <div key={project.id} className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: project.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium text-warm-gray-800 truncate">
                        {project.name}
                      </span>
                      <span className="text-[11px] text-warm-gray-400 ml-2 shrink-0">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-1 bg-warm-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: project.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-warm-gray-800">Recent Activity</h2>
            <Clock size={14} className="text-warm-gray-400" />
          </div>
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: item.color + "18" }}
                >
                  <span
                    className="text-[9px] font-bold"
                    style={{ color: item.color }}
                  >
                    {item.user.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-warm-gray-700 leading-snug">
                    <span className="font-medium">{item.user}</span>{" "}
                    {item.action}{" "}
                    <span className="text-warm-gray-500 truncate">{item.file}</span>
                  </p>
                  <p className="text-[11px] text-warm-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Files */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm text-warm-gray-800">Recent Files</h2>
          <button
            onClick={() => navigate("/docs")}
            className="flex items-center gap-1 text-xs text-warm-gray-400 hover:text-warm-gray-700 transition-colors"
          >
            View all <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {recentFiles.slice(0, 5).map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 py-2 px-3 rounded-[13px] hover:bg-warm-gray-50 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-[10px] bg-warm-gray-100 flex items-center justify-center shrink-0">
                <FileText size={14} className="text-warm-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-warm-gray-800 truncate">
                  {file.filename}
                </p>
                <p className="text-[11px] text-warm-gray-400">
                  {file.sharedBy} · {file.size}
                </p>
              </div>
              <span className="text-[11px] text-warm-gray-400 shrink-0 hidden sm:block">
                {file.createdTime.split("•")[0].trim()}
              </span>
              <span className="text-[10px] font-semibold text-warm-gray-400 bg-warm-gray-100 px-2 py-0.5 rounded-full shrink-0">
                {file.type}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Engagement Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.3 }}
      >
        <EngagementChart />
      </motion.div>
    </div>
  );
}
