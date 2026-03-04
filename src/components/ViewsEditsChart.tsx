import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { weeklyViewsEdits } from "../data/mockData";

const data = [
  { name: "Views", value: weeklyViewsEdits.views },
  { name: "Edits", value: weeklyViewsEdits.edits },
];

const COLORS = ["#6366f1", "#e8e5e0"];

export default function ViewsEditsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-5"
    >
      <h3 className="font-semibold text-sm text-warm-gray-800 mb-4">
        Views & Edits by Week
      </h3>
      <div className="h-52 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              animationDuration={1000}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="text-center">
          <div className="flex items-center gap-1.5 text-xs text-warm-gray-600 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            Views
          </div>
          <p className="font-semibold text-lg text-warm-gray-800">{weeklyViewsEdits.views.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1.5 text-xs text-warm-gray-500 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-warm-gray-200" />
            Edits
          </div>
          <p className="font-semibold text-lg text-warm-gray-800">{weeklyViewsEdits.edits.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
}
