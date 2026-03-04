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
      className="bg-white rounded-xl border border-warm-gray-200/60 p-4"
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
                borderRadius: 10,
                fontSize: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Line
              type="monotone"
              dataKey="edits"
              stroke="#d6d2cb"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              animationDuration={1200}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#4d473e"
              strokeWidth={2}
              dot={{ r: 3, fill: "#dc2626", stroke: "white", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#dc2626", stroke: "white", strokeWidth: 2 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-warm-gray-600">
          <span className="w-3 h-0.5 bg-warm-gray-800 rounded-full" />
          Views
          <span className="w-2 h-2 rounded-full bg-red-600 ml-0.5" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-warm-gray-500">
          <span className="w-3 h-0.5 bg-warm-gray-300 rounded-full" style={{ borderTop: "1px dashed #d6d2cb" }} />
          Edits
        </div>
      </div>
    </motion.div>
  );
}
