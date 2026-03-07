import { motion } from "framer-motion";
import EngagementChart from "../components/EngagementChart";
import ViewsEditsChart from "../components/ViewsEditsChart";
import { docCategories } from "../data/mockData";

export default function ReportingPage() {
  return (
    <div className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-xs font-medium text-warm-gray-400 uppercase tracking-wider mb-1">Reporting</p>
        <h1 className="text-2xl font-bold text-warm-gray-900">Analytics & Reports</h1>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <EngagementChart />
        <ViewsEditsChart />
      </div>

      {/* Category Stats Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-warm-gray-200 overflow-hidden"
      >
        <div className="p-5 border-b border-warm-gray-200">
          <h3 className="font-semibold text-sm text-warm-gray-800">Documentation by Category</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-gray-100">
                <th className="text-left py-3 px-5 font-medium text-warm-gray-500">Category</th>
                <th className="text-left py-3 px-5 font-medium text-warm-gray-500">Files</th>
                <th className="text-left py-3 px-5 font-medium text-warm-gray-500">Recent Activity</th>
              </tr>
            </thead>
            <tbody>
              {docCategories.map((cat) => (
                <tr key={cat.id} className="border-b border-warm-gray-50 hover:bg-warm-gray-50 transition-colors">
                  <td className="py-3 px-5 font-medium text-warm-gray-800">{cat.title}</td>
                  <td className="py-3 px-5 text-warm-gray-600">{cat.filesCount}</td>
                  <td className="py-3 px-5 text-warm-gray-600">{cat.recentFiles.length} recent</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
