import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { engagementData } from "../data/mockData";

export default function EngagementChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5"
    >
      <h3 className="font-semibold text-sm text-warm-gray-800 mb-4">
        Documentation Engagement Trend
      </h3>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e5e0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#8a8378" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#8a8378" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e8e5e0",
                borderRadius: 12,
                fontSize: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="edits"
              stroke="#d6d2cb"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              animationDuration={1200}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#6366f1", stroke: "white", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#6366f1", stroke: "white", strokeWidth: 2 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-warm-gray-600">
          <span className="w-3 h-0.5 bg-accent rounded-full" />
          Views
        </div>
        <div className="flex items-center gap-1.5 text-xs text-warm-gray-500">
          <span className="w-3 h-0.5 bg-warm-gray-300 rounded-full border-dashed" />
          Edits
        </div>
      </div>
    </motion.div>
  );
}
